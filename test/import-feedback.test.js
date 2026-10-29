import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { test } from 'node:test'

const convert = (t, contents) => {
  const dir = mkdtempSync(join(tmpdir(), 'sloparena-import-'))
  t.after(() => rmSync(dir, { recursive: true, force: true }))
  const file = join(dir, 'feedback.ndjson')
  writeFileSync(file, contents)
  return spawnSync(process.execPath, ['scripts/import-feedback.mjs', file], { encoding: 'utf8' })
}

test('import SQL preserves historic records, apostrophes, Unicode and null columns', (t) => {
  const record = { receivedAt: '2026-09-01T12:00:00.000Z', language: 'fr', name: "O'Brien", message: "C'est drôle!'); DROP TABLE feedback; --\nEncore!", favoriteCharacter: null, questionnaireVersion: 2 }
  const result = convert(t, `${JSON.stringify(record)}\r\n\n`)
  assert.equal(result.status, 0, result.stderr)
  const db = new DatabaseSync(':memory:')
  t.after(() => db.close())
  db.exec(readFileSync(new URL('../migrations/0001_feedback.sql', import.meta.url), 'utf8'))
  db.exec(result.stdout)
  const row = db.prepare('SELECT * FROM feedback').get()
  assert.deepEqual(JSON.parse(row.record_json), record)
  assert.equal(row.topic, null)
  assert.equal(row.favorite_character, null)
  assert.equal(row.language, 'fr')
  assert.equal(row.received_at, record.receivedAt)
})

test('invalid NDJSON emits no SQL and identifies the bad line', (t) => {
  const result = convert(t, '{"receivedAt":"2026-01-01","language":"en"}\n{\n')
  assert.equal(result.status, 1)
  assert.equal(result.stdout, '')
  assert.match(result.stderr, /Line 2:/)
})
