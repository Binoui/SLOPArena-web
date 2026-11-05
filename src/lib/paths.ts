const base = import.meta.env.BASE_URL.replace(/\/?$/, '/')

/** URL of a route, base included: href('fighters/manki/') → '/fighters/manki/'. */
export function href(route = '') {
  return `${base}${route.replace(/^\/+/, '')}`
}

/** URL of a file in public/. */
export function asset(path: string) {
  return `${base}${path.replace(/^\/+/, '')}`
}

/** Absolute URL on the canonical site, independent of the deploy base. */
export function canonical(site: URL | undefined, route = '') {
  return new URL(`/${route.replace(/^\/+/, '')}`, site).href
}
