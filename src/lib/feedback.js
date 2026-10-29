export const MAX_BODY_BYTES = 32 * 1024
const languages = new Set(['en', 'fr'])
export const fighterIds = ['fightguy', 'manki', 'wibou', 'bonk', 'bashie', 'salamander', 'nyx']
const characters = new Set([...fighterIds, 'none', 'unsure', null])
const topics = new Set(['bug', 'balance', 'love', 'idea', 'other', null])
const ratingKeys = ['fun', 'hitDifficulty', 'camera', 'lockOn']
const requiredKeys = new Set(['language', 'name', 'message', 'ratings', 'favoriteCharacter'])
// Optional so reports from older pages without a topic stay valid.
const optionalKeys = new Set(['topic'])

const text = (value, max, field) => {
  if (typeof value !== 'string' || value.length > max) throw new Error(`${field} must be a string of at most ${max} characters`)
  return value.trim()
}

const rating = (value, field) => {
  if (value === null || value === 'notTried') return value
  if (!Number.isInteger(value) || value < 1 || value > 5) throw new Error(`${field} must be an integer from 1 to 5, notTried, or null`)
  return value
}

export const validateFeedback = (input) => {
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
