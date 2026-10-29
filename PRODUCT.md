# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary users are friends and curious players joining the SLOPArena playtest. They need to understand what the game is and who the fighters are, request Steam Playtest access, learn the controls and the lobby flow, find other players, and report what happened after playing. Contributors and people interested in how the game is made use the docs.

## Product Purpose

SLOPArena-web turns curiosity into a completed playtest: visitors see real gameplay and the roster, request access on the Steam store page, fight friends or meet players on Discord, and send useful feedback that informs the next build. It also hosts the bilingual docs that explain how the game is made.

## Positioning

SLOPArena is a transparent, solo-developed, open-source pre-alpha built with AI agents in the open. It is unreleased: the Steam store page is listed as coming soon, and only a limited playtest is available. Players are invited into an unfinished platform fighter, shown its rough edges honestly, and given a direct role in making the next build less broken.

## Operating Context

- Players arrive through a shared link, the Steam page or the playtest video.
- The Steam store page (app `5324910`) is public and wishlistable, listed as coming soon. Its limited Steam Playtest (app `5325920`) is joined by requesting access there; Steam emails players when they are let in. `steam://run/5325920` launches the playtest once access is granted. The site states this flow plainly and never promises instant access.
- Keyboard/mouse and gamepad controls are supported in the game; players meet through the server browser and lobby.
- Discord helps players find matches; Reddit hosts public discussion, and the game repository shows its source.
- Live presence distinguishes confirmed zero players from an unavailable request.
- After playing, users can send one required message anonymously or with an optional handle. A topic, four 1–5 ratings and a favorite fighter are optional.
- Online play still has known connection problems; copy says so instead of promising working netcode.

## Capabilities and Constraints

- The product is a small, chaotic free 3D online platform fighter for friends.
- The public experience supports English and French, including automatic language selection and a persistent manual switch.
- The roster on the site is FightGuy, Manki, Wibou, Sir Bonk, Bashie, Salamander and Nyx (Bashie, Salamander and Nyx tagged work in progress), with kits, cooldowns and movement copied from the game's character packages; the snapshot date lives in `src/data/fighters.ts`.
- The primary CTA links to the Steam store page and explains access by request. Do not invent download routes or claim instant access.
- The feedback flow requires only a nonblank message; blank name means anonymous, a topic is optional, four ratings can be unselected, scored, or explicitly marked `notTried`, and the favorite fighter covers every fighter on the roster.
- The site must remain usable when live presence is unavailable.
- The project is an Astro static site deployed through Cloudflare Pages at https://playsloparena.com, with a Pages Function and D1 for feedback. Docs are Markdown in `src/content/docs/<lang>/`; a missing French page falls back to English.

## Brand Commitments

Preserve the SLOPArena name (player-facing spelling; shorthand SLOPA), the roster, the candid early-playtest status, and self-aware humor about questionable balance. The shared visual north star is “Low-poly underground toy-fight-club, with DIY internet-game energy”: chunky low-poly forms, exaggerated silhouettes, curated asset-pack collage, and toy as scavenged construction—not literal plastic or mandatory cuteness. Be cool first, joke second, slightly crappy on purpose, and extremely readable. Use Action Yellow `#FFCC22` for graphic primary actions and selection; preserve character/team colors and blue specials. Archivo Black is the shared name-mark and native menu display voice; keep Archivo Black + Space Mono for marketing, with readable sans-serif for dense HUD/settings. Preserve character identity, proportions, and chunky model forms in art. Adapt the graphic treatment to the setting rather than forcing warehouse stages or decoration-only generic grit.

The website flyer is the strongest existing graphic reference. Source hierarchy: usability/readability first; shared guide `../SlopArena/docs/design/visual-language.md` is brand authority, art conventions owns 3D/assets, this local DESIGN document realizes the website surface, and `.impeccable/design.json` mirrors it rather than acting as a separate guide. The website now ships Action Yellow and the Archivo family; native UI migration is tracked in the game repository.

Preserve the free 3D fighter pitch, real gameplay media, bilingual copy, video, keyboard/gamepad guidance, purposeful community links, presence states, message-first feedback, and honest docs about the AI-assisted workflow.

## Evidence on Hand

- `src/assets/fighters/*-portrait.png`: the game's illustrated fighter portraits (from the Unity client's `Resources/UI/Portraits`), also used as Steam key art.
- `src/assets/screens/`: real gameplay stills from the Steam store shoot, the 2026-10-28 promo clips and in-game captures; sources in its README.
- `src/assets/stages/`: stage-select previews of the seven PvP picker stages.
- `https://youtu.be/2_6SbaZ5sA8`: “SLOPArena Playtest Trailer” (16:9, 2026-10-28), embedded on the home page behind a click-to-load facade.
- `src/views/` and `src/data/`: complete English and French copy, roster data, access, controls and feedback content.
- `README.md`: development, deployment, Steam, feedback, and presence behavior.
- `src/lib/feedback.js` and `functions/api/feedback.js`: strict v3 feedback record contract and D1 storage.
- There is no committed testimonial, player count, benchmark, press quote, pricing plan, or other third-party proof. Future work must not fabricate these.
- `public/social-preview.png`: 1200×630 language-neutral share card with the name plate and four of the portraits (FightGuy, Manki, Wibou, Sir Bonk), generated from `scripts/social-preview.html`.

## Product Principles

1. Complete the invitation-to-feedback loop: every product decision should help friends get into a match and report what they learned.
2. Be honest about the pre-alpha: expose uncertainty and rough edges with humor rather than making unsupported polish or quality claims.
3. Make community input consequential: feedback is a core part of how the prototype improves, not a decorative contact form.
4. Keep the playtest accessible: preserve bilingual content, a short install path, resilient offline states, and practical inclusive interaction.
5. Preserve product truth over promotional convention: use real builds, characters, status, and evidence; never invent social proof.

## Accessibility & Inclusion

Maintain a practical inclusive baseline: keyboard-operable interactions, semantic structure, readable contrast, reduced-motion respect, and usable responsive layouts. English and French must remain first-class product languages. No formal accessibility certification target is currently committed.
