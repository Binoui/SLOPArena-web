import { getCollection, type CollectionEntry } from 'astro:content'

export interface Doc {
  slug: string
  entry: CollectionEntry<'docs'>
}

/** Every doc in reading order. */
export async function getDocs(): Promise<Doc[]> {
  const entries = await getCollection('docs')
  return entries
    .map((entry) => ({ slug: entry.id, entry }))
    .sort((a, b) => a.entry.data.order - b.entry.data.order)
}
