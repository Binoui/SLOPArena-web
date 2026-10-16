import { defineConfig } from 'astro/config'

// Production lives at the site root. GitHub Pages serves the repository under
// a sub-path, which the deploy workflow passes in from actions/configure-pages.
const base = process.env.SITE_BASE || '/'

export default defineConfig({
  site: process.env.SITE_URL || 'https://sloparena.barakaslurp.fr',
  base: base.endsWith('/') ? base : `${base}/`,
  devToolbar: { enabled: false },
})
