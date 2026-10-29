import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { DatabaseSync } from 'node:sqlite'
import { test } from 'node:test'
import { onRequest } from '../functions/api/feedback.js'
import { MAX_BODY_BYTES, validateFeedback } from '../src/lib/feedback.js'

const report = (overrides = {}) => ({
  language: 'en',
  name: null,
  message: 'Bonk is slow.',
  ratings: { fun: 4, hitDifficulty: null, camera: 'notTried', lockOn: null },
  favoriteCharacter: 'bonk',
  topic: 'balance',
  ...overrides,
})

const setup = (t) => {
  const db = new DatabaseSync(':memory:')
  db.exec(readFileSync(new URL('../migrations/0001_feedback.sql', import.meta.url), 'utf8'))
  t.after(() => db.close())
  // Exercise real SQLite statements with the D1 prepare/bind/run interface.
  const env = { FEEDBACK_DB: { prepare: (sql) => ({ bind: (...values) => ({ run: () => db.prepare(sql).run(...values) }) }) } }
  const rawPost = (body) => onRequest({ request: new Request('https://playsloparena.com/api/feedback', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body,
  }), env })
  return {
    rawPost,
    post: (body) => rawPost(JSON.stringify(body)),
    rows: () => db.prepare('SELECT * FROM feedback ORDER BY id').all(),
  }
}

test('stores a v3 report with a topic and any rostered fighter', async (t) => {
  const { post, rows } = setup(t)
  const response = await post(report({ favoriteCharacter: 'wibou', topic: 'bug' }))
  assert.equal(response.status, 201)
  assert.deepEqual(await response.json(), { ok: true })
  const row = rows().at(-1)
  const record = JSON.parse(row.record_json)
  assert.equal(record.favoriteCharacter, 'wibou')
  assert.equal(record.topic, 'bug')
  assert.equal(record.questionnaireVersion, 3)
  assert.equal(record.anonymous, true)
  assert.equal(record.name, null)
  assert.equal(row.received_at, record.receivedAt)
  assert.equal(row.language, record.language)
  assert.equal(row.topic, record.topic)
  assert.equal(row.favorite_character, record.favoriteCharacter)
  assert.equal(new Date(record.receivedAt).toISOString(), record.receivedAt)
})

test('still accepts reports from pages that predate the topic field', async (t) => {
  const { post, rows } = setup(t)
  const { topic, ...legacy } = report({ favoriteCharacter: 'manki' })
  assert.equal((await post(legacy)).status, 201)
  assert.equal(JSON.parse(rows()[0].record_json).topic, null)
  assert.equal(rows()[0].topic, null)
})

test('rejects unknown fields, unknown topics and blank messages without storing them', async (t) => {
  const { post, rows } = setup(t)
  for (const body of [
    { ...report(), extra: true }, report({ topic: 'rant' }),
    report({ favoriteCharacter: 'kistu' }), report({ message: '   ' }),
  ]) assert.equal((await post(body)).status, 400)
  assert.equal(rows().length, 0)
})

test('shared validator preserves normalization, optional fields and rating values', () => {
  const record = validateFeedback(report({ name: '  Player  ', message: '  Good game!  ', language: 'fr', topic: null }))
  assert.equal(record.name, 'Player')
  assert.equal(record.anonymous, false)
  assert.equal(record.message, 'Good game!')
  assert.equal(record.language, 'fr')
  assert.equal(record.topic, null)
  assert.deepEqual(record.ratings, report().ratings)
  assert.equal(validateFeedback(report({ name: '   ' })).anonymous, true)
  for (const favoriteCharacter of ['fightguy', 'manki', 'wibou', 'bonk', 'none', 'unsure', null]) {
    assert.equal(validateFeedback(report({ favoriteCharacter })).favoriteCharacter, favoriteCharacter)
  }
})

test('shared validator keeps strict field, type, length and rating boundaries', () => {
  const { name, ...missingName } = report()
  for (const input of [
    null, [], 'text', missingName, report({ language: 'de' }),
    report({ name: 2 }), report({ name: 'x'.repeat(81) }),
    report({ message: 'x'.repeat(2001) }), report({ message: null }),
    report({ ratings: [] }), report({ ratings: { fun: 1 } }),
    ...[0, 6, 1.5, '4', undefined].map((fun) => report({ ratings: { ...report().ratings, fun } })),
  ]) assert.throws(() => validateFeedback(input))
  assert.equal(validateFeedback(report({ name: 'x'.repeat(80), message: 'x'.repeat(2000) })).message.length, 2000)
})

test('malformed JSON and bodies over the byte limit return 400 without writes', async (t) => {
  const { rawPost, rows } = setup(t)
  assert.equal((await rawPost('{')).status, 400)
  const tooLarge = await rawPost(JSON.stringify(report({ message: 'é'.repeat(MAX_BODY_BYTES) })))
  assert.equal(tooLarge.status, 400)
  assert.deepEqual(await tooLarge.json(), { error: 'request body is too large' })
  assert.equal(rows().length, 0)
})

test('database failures return 500 without exposing internal details', async () => {
  const response = await onRequest({
    request: new Request('https://playsloparena.com/api/feedback', { method: 'POST', body: JSON.stringify(report()) }),
    env: { FEEDBACK_DB: { prepare() { throw new Error('private database details') } } },
  })
  assert.equal(response.status, 500)
  assert.deepEqual(await response.json(), { error: 'internal server error' })
})

test('OPTIONS succeeds and other methods cannot submit feedback', async () => {
  for (const [method, status] of [['OPTIONS', 204], ['GET', 405]]) {
    const response = await onRequest({ request: new Request('https://playsloparena.com/api/feedback', { method }), env: {} })
    assert.equal(response.status, status)
    assert.equal(response.headers.get('Access-Control-Allow-Origin'), null)
  }
})
