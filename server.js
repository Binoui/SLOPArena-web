import { appendFile, mkdir } from 'node:fs/promises'
import { createServer } from 'node:http'
import { join } from 'node:path'

const HOST = process.env.HOST || '0.0.0.0'
const PORT = Number(process.env.PORT || 3000)
const DATA_DIR = process.env.DATA_DIR || './data'
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*'
const MAX_BODY_BYTES = 32 * 1024
const languages = new Set(['en', 'fr'])
const characters = new Set(['fightguy', 'manki', 'wibou', 'bonk', 'none', 'unsure', null])
const topics = new Set(['bug', 'balance', 'love', 'idea', 'other', null])
const ratingKeys = ['fun', 'hitDifficulty', 'camera', 'lockOn']
const requiredKeys = new Set(['language', 'name', 'message', 'ratings', 'favoriteCharacter'])
// Optional so reports from older pages without a topic stay valid.
const optionalKeys = new Set(['topic'])

const json = (response, status, body, headers = {}) => {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    ...corsHeaders(),
    ...headers,
  })
  response.end(JSON.stringify(body))
}

const corsHeaders = () => ({
  ...(ALLOWED_ORIGIN ? { 'Access-Control-Allow-Origin': ALLOWED_ORIGIN } : {}),
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
})

const text = (value, max, field) => {
  if (typeof value !== 'string' || value.length > max) throw new Error(`${field} must be a string of at most ${max} characters`)
  return value.trim()
}

const rating = (value, field) => {
  if (value === null || value === 'notTried') return value
  if (!Number.isInteger(value) || value < 1 || value > 5) throw new Error(`${field} must be an integer from 1 to 5, notTried, or null`)
  return value
}

const validate = (input) => {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('body must be an object')
  const keys = Object.keys(input)
  if (keys.some((key) => !requiredKeys.has(key) && !optionalKeys.has(key)) || [...requiredKeys].some((key) => !Object.hasOwn(input, key))) {
    throw new Error('body has unknown or missing fields')
  }
  if (!languages.has(input.language)) throw new Error('language must be en or fr')
  if (input.name !== null && typeof input.name !== 'string') throw new Error('name must be a string or null')
  const name = input.name === null ? null : (text(input.name, 80, 'name') || null)
  const message = text(input.message, 2000, 'message')
  if (!message) throw new Error('message must be a nonblank string')
  if (!input.ratings || typeof input.ratings !== 'object' || Array.isArray(input.ratings) || Object.keys(input.ratings).length !== ratingKeys.length || ratingKeys.some((key) => !Object.hasOwn(input.ratings, key))) {
    throw new Error('ratings must contain exactly the four rating fields')
  }
  const ratings = Object.fromEntries(ratingKeys.map((key) => [key, rating(input.ratings[key], key)]))
  if (!characters.has(input.favoriteCharacter)) throw new Error('favoriteCharacter is invalid')
  const topic = input.topic ?? null
  if (!topics.has(topic)) throw new Error('topic is invalid')
  return {
    language: input.language,
    anonymous: name === null,
    name,
    message,
    ratings,
    favoriteCharacter: input.favoriteCharacter,
    topic,
    receivedAt: new Date().toISOString(),
    questionnaireVersion: 3,
  }
}

const readBody = (request) => new Promise((resolve, reject) => {
  let size = 0
  let tooLarge = false
  const chunks = []
  request.on('data', (chunk) => {
    size += chunk.length
    if (size > MAX_BODY_BYTES) {
      if (!tooLarge) reject(new Error('request body is too large'))
      tooLarge = true
      return
    }
    chunks.push(chunk)
  })
  request.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  request.on('error', reject)
})

await mkdir(DATA_DIR, { recursive: true })
const server = createServer(async (request, response) => {
  if (request.method === 'OPTIONS') {
    response.writeHead(204, corsHeaders())
    response.end()
    return
  }
  if (request.method === 'GET' && request.url === '/health') {
    json(response, 200, { ok: true })
    return
  }
  if (request.method !== 'POST' || request.url !== '/api/feedback') {
    json(response, 404, { error: 'not found' })
    return
  }
  try {
    const record = validate(JSON.parse(await readBody(request)))
    await appendFile(join(DATA_DIR, 'feedback.ndjson'), `${JSON.stringify(record)}\n`, 'utf8')
    json(response, 201, { ok: true })
  } catch (error) {
    const status = error instanceof SyntaxError || /body|must be|invalid|too large|unknown|missing|ratings/.test(error.message) ? 400 : 500
    json(response, status, { error: status === 400 ? error.message : 'internal server error' })
  }
})

server.listen(PORT, HOST, () => console.log(`Feedback API listening on ${HOST}:${server.address().port}`))
