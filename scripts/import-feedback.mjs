import { readFile } from 'node:fs/promises'

const sqlText = (value) => value === null ? 'NULL' : `'${value.replaceAll("'", "''")}'`

try {
  if (process.argv.length !== 3) throw new Error('Usage: node scripts/import-feedback.mjs /path/to/feedback.ndjson > /tmp/feedback.sql')
  const contents = await readFile(process.argv[2], 'utf8')
  // Parse the whole file before emitting SQL, so a bad line cannot produce a partial import.
  const statements = contents.split(/\r?\n/).flatMap((line, index) => {
    if (!line.trim()) return []
    try {
      const record = JSON.parse(line)
      if (!record || Array.isArray(record) || typeof record !== 'object' ||
          typeof record.receivedAt !== 'string' || !record.receivedAt ||
          !['en', 'fr'].includes(record.language) ||
          (record.topic != null && typeof record.topic !== 'string') ||
          (record.favoriteCharacter != null && typeof record.favoriteCharacter !== 'string')) {
        throw new Error('expected a stored feedback record with receivedAt and language')
      }
      // Preserve historic questionnaire versions, timestamps and fields verbatim.
      const values = [record.receivedAt, record.language, record.topic ?? null, record.favoriteCharacter ?? null, JSON.stringify(record)]
      return [`INSERT INTO feedback (received_at, language, topic, favorite_character, record_json) VALUES (${values.map(sqlText).join(', ')});`]
    } catch (error) {
      throw new Error(`Line ${index + 1}: ${error.message}`)
    }
  })
  process.stdout.write(statements.length ? `${statements.join('\n')}\n` : '-- No feedback records to import.\n')
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
