import type { Lang } from '../i18n'

const locales: Record<Lang, string> = { en: 'en-US', fr: 'fr-FR' }

export const formatNumber = (lang: Lang, value: number, digits = 1) =>
  new Intl.NumberFormat(locales[lang], { maximumFractionDigits: digits }).format(value)

export const formatDate = (lang: Lang, date: Date) =>
  new Intl.DateTimeFormat(locales[lang], { dateStyle: 'long', timeZone: 'UTC' }).format(date)
