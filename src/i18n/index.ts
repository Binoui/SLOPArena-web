export const languages = { en: 'English', fr: 'Français' } as const
export type Lang = keyof typeof languages
export const defaultLang: Lang = 'en'
export const langs = Object.keys(languages) as Lang[]
export const storageKey = 'sloparena-language'

const base = import.meta.env.BASE_URL.replace(/\/?$/, '/')

/** URL of a route in a language: href('fr', 'fighters/manki/') → '/fr/fighters/manki/' (base included). */
export function href(lang: Lang, route = '') {
  const prefix = lang === defaultLang ? '' : `${lang}/`
  return `${base}${prefix}${route.replace(/^\/+/, '')}`
}

/** URL of a file in public/. */
export function asset(path: string) {
  return `${base}${path.replace(/^\/+/, '')}`
}

/** Absolute URL on the canonical site, independent of the deploy base. */
export function canonical(site: URL | undefined, lang: Lang, route = '') {
  const prefix = lang === defaultLang ? '' : `${lang}/`
  return new URL(`/${prefix}${route.replace(/^\/+/, '')}`, site).href
}

/** Picks the value for a language from a { en, fr } pair. */
export function pick<T>(lang: Lang, value: Record<Lang, T>): T {
  return value[lang]
}
