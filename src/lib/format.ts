const locale = 'en-US'

export const formatNumber = (value: number, digits = 1) =>
  new Intl.NumberFormat(locale, { maximumFractionDigits: digits }).format(value)

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(date)

export const formatDay = (date: Date) =>
  new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(date)
