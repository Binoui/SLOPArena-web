import { MAX_BODY_BYTES, validateFeedback } from '../../src/lib/feedback.js'

const json = (status, body) => Response.json(body, {
  status,
  headers: { 'Cache-Control': 'no-store' },
})

const readBody = async (request) => {
  if (!request.body) return ''
  const reader = request.body.getReader()
  const decoder = new TextDecoder()
  let size = 0
  let body = ''
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > MAX_BODY_BYTES) {
        await reader.cancel()
        throw new Error('request body is too large')
      }
      body += decoder.decode(value, { stream: true })
    }
    return body + decoder.decode()
  } finally {
    reader.releaseLock()
  }
}

export async function onRequest({ request, env }) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: { Allow: 'POST, OPTIONS' } })
  }
  if (request.method !== 'POST') {
    return json(405, { error: 'method not allowed' })
  }

  let record
  try {
    record = validateFeedback(JSON.parse(await readBody(request)))
  } catch (error) {
    return json(400, { error: error.message })
  }

  try {
    await env.FEEDBACK_DB.prepare(`
      INSERT INTO feedback (received_at, language, topic, favorite_character, record_json)
      VALUES (?, ?, ?, ?, ?)
    `).bind(record.receivedAt, record.language, record.topic, record.favoriteCharacter, JSON.stringify(record)).run()
    return json(201, { ok: true })
  } catch {
    return json(500, { error: 'internal server error' })
  }
}
