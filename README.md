# SLOPArena Web

The bilingual (English/French) website for SLOPArena, a free 3D platform fighter in early playtest: what the game is, the four fighters, how to get in and play, a feedback form, and docs about how the game is made.

SLOPArena has a public [Steam store page](https://store.steampowered.com/app/5324910/) (app `5324910`, listed as coming soon, wishlistable) with a limited **Steam Playtest** (app `5325920`). Players request access on the store page and Steam emails them when they are let in. The 2026-10-04 rollout activated `0.2.0-playtest.5` on the Playtest default branch, BuildID `25702912`, alongside the compatible VPS backend; release and backend proof lives in the game repository's [`docs/testing.md`](https://github.com/Binoui/SLOPArena/blob/main/docs/testing.md).

## Local development

Requires Node.js 22.22 or newer (CI and Docker use Node 24).

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
npm test         # feedback API tests
```

Copy `.env.example` to `.env` to override the Steam, feedback API and presence URLs. Without overrides the site links to the SLOPArena store page and calls `/api/feedback` and `/api/presence` on its own host.

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
| `server.js` | The feedback API |
| `scripts/social-preview.html` | Source of `public/social-preview.png` (regeneration command inside) |

To add a doc, drop `src/content/docs/en/<slug>.md` (and optionally `fr/<slug>.md`) with `title`, `description`, `section` (`play` or `build`), `order` and `updated` frontmatter. It appears in the docs hub and sidebar automatically. Link to other pages with relative URLs such as `../../feedback/` so links work under any base path and in both languages.

Fighter move names, cooldowns and movement numbers are copied from each package's `character.json` in the game repository (snapshot date in `src/data/fighters.ts`). Update them when kits change.

First-time French browsers are redirected to the French pages; after that the manual EN/FR switch wins and is remembered.

## Feedback API

The form submits `{language, name, message, ratings, favoriteCharacter, topic}` as JSON to `POST /api/feedback`. A nonblank message (up to 2000 characters) is required; name is optional (blank means anonymous). Each of the four rating values is an integer from 1 to 5, `null` (unanswered) or `"notTried"`. `favoriteCharacter` is `fightguy`, `manki`, `wibou`, `bonk`, `none`, `unsure` or `null`. `topic` is optional: `bug`, `balance`, `love`, `idea`, `other` or `null`.

The API rejects unknown fields and appends version 3 records to `data/feedback.ndjson` (set `DATA_DIR` to a persistent volume). Reports from older pages without `topic` are still accepted and stored with `topic: null`. `GET /health` is the container health check.

**Deploy the API before the site:** the previous API rejects `topic`, `wibou` and `bonk`, so the new form fails against it.

## Docker

The default image serves the static site through nginx. The Compose file also builds the dependency-free feedback API and persists its data in a named volume:

```bash
docker compose up -d --build
```

The web service binds to `127.0.0.1:8081`, ready for a reverse proxy or Cloudflare tunnel. nginx proxies `/api/feedback` to the feedback service and `/api/presence` to `sloparena-master-server:8080/internal/presence`. Until the master server answers there, the page says live status is unavailable rather than showing zero players.

## GitHub Pages

Pushes to `main` test the feedback API and deploy through GitHub Actions. The base path comes from the Pages configuration (currently `/SLOPArena-web/`), so renaming the repository no longer breaks asset URLs. Canonical links and the social preview always point at `https://sloparena.barakaslurp.fr`.

Optional repository variables `VITE_STEAM_URL`, `VITE_FEEDBACK_API_URL` and `VITE_PRESENCE_URL` configure the Pages build. Without them, the Pages build calls the production API on `sloparena.barakaslurp.fr`, which must stay reachable over HTTPS with CORS allowed for feedback.

The social preview metadata uses `https://sloparena.barakaslurp.fr/social-preview.png`; that host must serve the deployed `public/social-preview.png`.
