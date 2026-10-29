// The browser demo is its own Pages project (client/Web in the game repo). /demo serves
// its page from here; the base tag makes every asset load straight from that project.
export const DEMO_ORIGIN = 'https://sloparena-play.pages.dev'

export const withDemoBase = (html) =>
  html.replace(/<head>/i, `<head>\n<base href="${DEMO_ORIGIN}/">`)

export const onRequestGet = async () => {
  const upstream = await fetch(`${DEMO_ORIGIN}/`)
  if (!upstream.ok) return new Response('Demo unavailable', { status: 502 })
  return new Response(withDemoBase(await upstream.text()), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  })
}
