# SLOPArena Web

The bilingual (English/French) website for SLOPArena, a free 3D platform fighter in early playtest: what the game is, the seven fighters, how to get in and play, a feedback form, and docs about how the game is made.

SLOPArena has a public [Steam store page](https://store.steampowered.com/app/5324910/) (app `5324910`, listed as coming soon, wishlistable) with a limited **Steam Playtest** (app `5325920`). Players request access on the store page and Steam emails them when they are let in. The 2026-10-04 rollout activated `0.2.0-playtest.5` on the Playtest default branch, BuildID `25702912`, alongside the compatible VPS backend; release and backend proof lives in the game repository's [`docs/testing.md`](https://github.com/Binoui/SLOPArena/blob/main/docs/testing.md).

## Local development

Requires Node.js 22.22 or newer (CI uses Node 24).

```bash
npm ci
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
npm test         # feedback validation, Function and import tests
```

Copy `.env.example` to `.env` to override the Steam, feedback API and presence URLs. Without overrides the site links to the SLOPArena store page, posts feedback to `/api/feedback` on its own host and fetches presence from `https://master-test.sloparena.barakaslurp.fr/presence`. See below to run the feedback Function locally.

## How the site is built

[Astro](https://astro.build) renders every page to static HTML; the only client scripts are the language switch, live presence, the video facade and the feedback form.

| Path | What lives there |
| --- | --- |
| `src/pages/` | Routes. English at the root, French under `fr/`; each file renders a view with a `lang` |
| `src/views/` | Page bodies with their English and French copy side by side |
| `src/data/fighters.ts` | Roster: briefs, kits, cooldowns and movement tuning |
| `src/data/stages.ts` | The curated PvP stage list |
| `src/content/docs/<lang>/` | Docs as Markdown. A page missing in French falls back to English with a notice |
| `src/i18n/` | Shared UI strings and URL helpers |
| `src/assets/` | Portraits, screenshots and stage art, optimized at build time |
| `functions/api/feedback.js` | The Pages feedback API, using shared validation in `src/lib/feedback.js` |
| `functions/demo/[[path]].js` | Serves the browser demo at `/demo`: the page of the `sloparena-play` Pages project, with a `<base>` so its assets load from that project |
| `migrations/` | D1 schema migrations |
| `scripts/social-preview.html` | Source of `public/social-preview.png` (regeneration command inside) |

To add a doc, drop `src/content/docs/en/<slug>.md` (and optionally `fr/<slug>.md`) with `title`, `description`, `section` (`play` or `build`), `order` and `updated` frontmatter. It appears in the docs hub and sidebar automatically. Link to other pages with relative URLs such as `../../feedback/` so links work under any base path and in both languages.

Fighter move names, cooldowns and movement numbers are copied from each package's `character.json` in the game repository (snapshot date in `src/data/fighters.ts`). Update them when kits change.

The portraits match the game’s current roster art. Gameplay images come from the
18 October store shoot, the 28 October promo clips and later in-game captures; their
sources are recorded in [`src/assets/screens/README.md`](src/assets/screens/README.md).
Fighters still being built carry `wip: true` in `src/data/fighters.ts`, mirroring the
game’s `MenuRoster.IsWorkInProgress`.

First-time French browsers are redirected to the French pages; after that the manual EN/FR switch wins and is remembered.

## Feedback API

The form submits `{language, name, message, ratings, favoriteCharacter, topic}` as JSON to same-origin `POST /api/feedback`. A nonblank message (up to 2000 characters) is required; name is optional (blank means anonymous). Each of the four rating values is an integer from 1 to 5, `null` (unanswered) or `"notTried"`. `favoriteCharacter` is one of the fighter ids in `fighterIds` (`src/lib/feedback.js`: `fightguy`, `manki`, `wibou`, `bonk`, `bashie`, `salamander`, `nyx`), `none`, `unsure` or `null`. `topic` is optional: `bug`, `balance`, `love`, `idea`, `other` or `null`.

The shared validator in `src/lib/feedback.js` rejects unknown fields and preserves the previous API's version 3 record format, including `receivedAt`, `anonymous` and `questionnaireVersion`. Reports from older pages without `topic` are still accepted and stored with `topic: null`. Bodies over 32 KiB are rejected. Successful submissions return HTTP 201 `{ "ok": true }`; invalid submissions return 400 and database failures return 500.

`functions/api/feedback.js` stores the complete validated JSON in D1's `feedback.record_json`, alongside queryable `received_at`, `language`, `topic` and `favorite_character` columns. There is no read endpoint. Same-origin requests need no CORS configuration.

## Cloudflare Pages + D1

Production is **https://playsloparena.com**, served from the Cloudflare Pages project `playsloparena`. `wrangler.toml` is the source of truth for the Pages output directory and the `FEEDBACK_DB` D1 binding. The GitHub Actions workflow `.github/workflows/deploy-cloudflare-pages.yml` runs `npm ci`, `npm test` and `npm run build`, then deploys `dist/` on pushes to `main`. PRs run tests and builds without deploying. Manual workflow runs deploy only from `main`.

This replaces the GitHub Pages preview and the home-server website. The Dockerfile, Compose file, nginx configuration and Node feedback server have been removed; local development uses the actual Pages Function and local D1 instead. The old `/health` route, NDJSON append storage and nginx `/api/presence` proxy are gone. Preserve a backup of the old feedback volume before retiring the home-server containers/tunnel. Redirects from the old domain, if wanted, must be configured on that domain; this repository does not control it.

### One-time setup (owner, before merging/deploying)

Run the following from this repository with Cloudflare credentials available. Wrangler commands below use the same version as CI, `4.156.0`.

```bash
npx wrangler@4.156.0 d1 create sloparena-feedback
```

Copy the returned `database_id` into `wrangler.toml`, replacing `00000000-0000-0000-0000-000000000000` under `[[d1_databases]]`, and commit that configuration before the first deployment. Keep the binding `FEEDBACK_DB` and database name `sloparena-feedback`.

```bash
npx wrangler@4.156.0 d1 migrations apply sloparena-feedback --remote
npx wrangler@4.156.0 pages project create playsloparena --production-branch main
```

In GitHub's **Settings → Secrets and variables → Actions**, add repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. The CI token needs Account → Cloudflare Pages → Edit on the target account; the owner also needs D1 Edit to create/migrate the database. Migrations are intentionally manual, rather than run on every deployment. No Cloudflare credentials are needed for tests, builds or local D1.

Attach the custom apex domain with **Workers & Pages → playsloparena → Custom domains → Set up a domain → playsloparena.com**. The domain must be an active Cloudflare DNS zone in the same account, using Cloudflare's assigned nameservers. Confirm the CNAME to `playsloparena.pages.dev` in that setup flow and wait for the domain/certificate to become active. The equivalent domain association API command is:

```bash
curl --fail-with-body --request POST \
  "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/pages/projects/playsloparena/domains" \
  --header "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  --header 'Content-Type: application/json' \
  --data '{"name":"playsloparena.com"}'
```

The API associates the domain; ensure DNS also has the apex CNAME to `playsloparena.pages.dev` (the dashboard setup handles this). Adding DNS alone is insufficient. After provisioning and merging, the main-branch workflow performs the first deployment. Verify `/`, `/fr/`, `/feedback/`, a successful feedback submission, an unknown route returning 404, and custom-domain activation before retiring the old host.

References: [Pages configuration](https://developers.cloudflare.com/pages/functions/wrangler-configuration/), [D1 migrations](https://developers.cloudflare.com/d1/reference/migrations/), [custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/), [domain association API](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/domains/methods/create/).

### Local Pages Function and database

`npm run dev` serves Astro only. To exercise feedback, build and serve the complete site through Wrangler:

```bash
npm ci
npm test
npm run build
npx wrangler@4.156.0 d1 migrations apply sloparena-feedback --local
npx wrangler@4.156.0 pages dev dist
```

Open the URL printed by Wrangler (normally `http://localhost:8788`). The binding in `wrangler.toml` automatically connects to a persistent **local** D1 database in ignored `.wrangler/`; the placeholder database ID works locally. Never add `--remote` for local testing. `npm run preview` serves only the static build, without the Function.

### Import old feedback once

Export/copy the old `feedback.ndjson` from the home-server volume. The converter preserves historic record versions, fields and timestamps, escapes SQL strings, and aborts without emitting SQL if a line is invalid. It only writes SQL to stdout; it never contacts Cloudflare.

```bash
node scripts/import-feedback.mjs /path/to/feedback.ndjson > /tmp/sloparena-feedback.sql
# Inspect the generated SQL and test on the local database first:
npx wrangler@4.156.0 d1 execute sloparena-feedback --local --file=/tmp/sloparena-feedback.sql
# Owner only, after backup/review; run once against the empty migrated database:
npx wrangler@4.156.0 d1 execute sloparena-feedback --remote --file=/tmp/sloparena-feedback.sql
```

Only run the execute commands if the converter exits successfully. Repeating an import inserts duplicates. The SQL contains the original feedback, so keep it outside the repository.

### URLs, presence and caching

Presence defaults to `https://master-test.sloparena.barakaslurp.fr/presence` and expects `{ "onlinePlayerCount": n }`. The Master endpoint must allow CORS for `https://playsloparena.com`; until that endpoint is live, or whenever it fails, the site says live status is unavailable. It never invents a zero count. For local development, the endpoint may also need to allow the local origin.

Optional repository variables `VITE_STEAM_URL` and `VITE_PRESENCE_URL` configure CI builds. `.env` also accepts `VITE_FEEDBACK_API_URL` for local development, but CI deliberately uses the same-origin `/api/feedback` default so feedback follows the Pages deployment.

`public/_headers` caches fingerprinted `/_astro/*` assets immutably for one year and the unfingerprinted public images for seven days, with separate paths to avoid conflicting cache headers. Pages provides compression and serves the existing Astro-generated `404.html`; no `_redirects` file or SPA fallback is needed. See [Pages headers](https://developers.cloudflare.com/pages/configuration/headers/) and [404 behavior](https://developers.cloudflare.com/pages/configuration/serving-pages/).

Canonical and social URLs use `https://playsloparena.com`, including `https://playsloparena.com/social-preview.png?v=4`. Bump the `v` query in `src/layouts/Base.astro` whenever the card changes, because link-preview services cache it by URL.
