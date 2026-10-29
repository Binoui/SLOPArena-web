import assert from 'node:assert/strict'
import { test } from 'node:test'
import { DEMO_ORIGIN, onRequestGet, withDemoBase } from '../functions/demo/[[path]].js'

test('the demo page loads its assets from the demo project', () => {
  const html = withDemoBase('<!doctype html><html><head><title>x</title></head></html>')
  assert.match(html, new RegExp(`<head>\\n<base href="${DEMO_ORIGIN}/">`))
})

test('/demo serves the upstream page with the base tag', async (t) => {
  t.mock.method(globalThis, 'fetch', async (url) => {
    assert.equal(url, `${DEMO_ORIGIN}/`)
    return new Response('<html><head></head></html>')
  })
  const response = await onRequestGet()
  assert.equal(response.status, 200)
  assert.match(await response.text(), /<base href=/)
})

test('/demo reports an unavailable demo', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => new Response('', { status: 404 }))
  assert.equal((await onRequestGet()).status, 502)
})
