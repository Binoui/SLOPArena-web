import { getCollection, type CollectionEntry } from 'astro:content'
import { defaultLang, type Lang } from '../i18n'

export interface Doc {
  slug: string
  entry: CollectionEntry<'docs'>
  /** True when the requested language is missing and the English text is shown. */
  fallback: boolean
}

const split = (id: string) => {
  const [lang, ...rest] = id.split('/')
  return { lang: lang as Lang, slug: rest.join('/') }
}

/** Every doc in reading order, in the requested language when it exists. */
export async function getDocs(lang: Lang): Promise<Doc[]> {
  const entries = await getCollection('docs')
  const docs = new Map<string, Doc>()
  for (const entry of entries) {
    const { lang: entryLang, slug } = split(entry.id)
    if (entryLang === lang) docs.set(slug, { slug, entry, fallback: false })
    else if (entryLang === defaultLang && !docs.has(slug)) docs.set(slug, { slug, entry, fallback: lang !== defaultLang })
  }
  return [...docs.values()].sort((a, b) => a.entry.data.order - b.entry.data.order)
}
