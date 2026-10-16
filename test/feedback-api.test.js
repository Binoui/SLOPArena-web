import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { after, before, test } from 'node:test'

let server
let dataDir
let baseUrl

const report = (overrides = {}) => ({
  language: 'en',
  name: null,
  message: 'Bonk is slow.',
  ratings: { fun: 4, hitDifficulty: null, camera: 'notTried', lockOn: null },
  favoriteCharacter: 'bonk',
  topic: 'balance',
  ...overrides,
})

const post = (body) => fetch(`${baseUrl}/api/feedback`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
})

const records = async () => (await readFile(join(dataDir, 'feedback.ndjson'), 'utf8')).trim().split('\n').map((line) => JSON.parse(line))

before(async () => {
  dataDir = await mkdtemp(join(tmpdir(), 'sloparena-feedback-'))
  server = spawn(process.execPath, ['server.js'], { env: { ...process.env, HOST: '127.0.0.1', PORT: '0', DATA_DIR: dataDir } })
  const port = await new Promise((resolve, reject) => {
    server.stdout.on('data', (chunk) => {
      const match = /listening on [^:]+:(\d+)/.exec(String(chunk))
      if (match) resolve(match[1])
    })
    server.once('exit', (code) => reject(new Error(`server exited with ${code}`)))
  })
  baseUrl = `http://127.0.0.1:${port}`
})

after(async () => {
  server.kill()
  await rm(dataDir, { recursive: true, force: true })
})

test('stores a v3 report with a topic and any rostered fighter', async () => {
  const response = await post(report({ favoriteCharacter: 'wibou', topic: 'bug' }))
  assert.equal(response.status, 201)
  const record = (await records()).at(-1)
  assert.equal(record.favoriteCharacter, 'wibou')
  assert.equal(record.topic, 'bug')
  assert.equal(record.questionnaireVersion, 3)
  assert.equal(record.anonymous, true)
})

test('still accepts reports from pages that predate the topic field', async () => {
  const { topic, ...legacy } = report({ favoriteCharacter: 'manki' })
  const response = await post(legacy)
  assert.equal(response.status, 201)
  assert.equal((await records()).at(-1).topic, null)
})

test('rejects unknown fields, unknown topics and blank messages', async () => {
  assert.equal((await post({ ...report(), extra: true })).status, 400)
  assert.equal((await post(report({ topic: 'rant' }))).status, 400)
  assert.equal((await post(report({ favoriteCharacter: 'kistu' }))).status, 400)
  assert.equal((await post(report({ message: '   ' }))).status, 400)
})
