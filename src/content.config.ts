import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

// One Markdown file per language: src/content/docs/<lang>/<slug>.md.
// A page missing in French falls back to the English text.
const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.enum(['play', 'build']),
    order: z.number(),
    updated: z.coerce.date(),
  }),
})

export const collections = { docs }
