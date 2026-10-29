---
name: SLOPArena
description: Bold DIY fight-flyer marketing for an unreleased low-poly underground toy-fight-club.
colors:
  newsprint: "#ded8c9"
  soot: "#171814"
  action-yellow: "#FFCC22"
  corner-orange: "#f05b35"
  registration-line: "rgba(23, 24, 20, 0.28)"
  field-paper: "#f4efe3"
  success: "#216b26"
  error: "#9a2819"
typography:
  display:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: "clamp(72px, 10vw, 142px)"
    fontWeight: 700
    lineHeight: 0.89
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: "clamp(38px, 5vw, 68px)"
    fontWeight: 700
    lineHeight: 0.89
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Archivo Black, sans-serif"
    fontSize: "19px"
    fontWeight: 700
    lineHeight: 1
  body:
    fontFamily: "Archivo, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  prose:
    fontFamily: "Archivo, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.68
  label:
    fontFamily: "Space Mono, monospace"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.06em"
rounded:
  square: "0px"
  circle: "50%"
spacing:
  xs: "8px"
  sm: "12px"
  md: "18px"
  lg: "24px"
  xl: "32px"
components:
  download-primary:
    backgroundColor: "{colors.action-yellow}"
    textColor: "{colors.soot}"
    rounded: "{rounded.square}"
    padding: "18px 30px"
    typography: "{typography.title}"
  feedback-submit:
    backgroundColor: "{colors.action-yellow}"
    textColor: "{colors.soot}"
    rounded: "{rounded.square}"
    padding: "13px 16px"
    typography: "{typography.label}"
  field:
    backgroundColor: "{colors.field-paper}"
    textColor: "{colors.soot}"
    rounded: "{rounded.square}"
    padding: "10px"
    typography: "{typography.body}"
  language-active:
    backgroundColor: "{colors.soot}"
    textColor: "{colors.newsprint}"
    rounded: "{rounded.square}"
    padding: "8px 10px"
    typography: "{typography.label}"
  dark-card:
    backgroundColor: "{colors.soot}"
    textColor: "{colors.newsprint}"
    rounded: "{rounded.square}"
    padding: "12px"
---

# Design System: SLOPArena

**Authority:** [SlopArena Visual Language](../SlopArena/docs/design/visual-language.md) defines the shared identity; [Art and Asset Conventions](../SlopArena/docs/contributing/conventions.md) own 3D presentation and assets. This document specifies the marketing realization, mirrored by `.impeccable/design.json`, not a competing guide. Marketing is Persuade; access instructions and feedback controls prioritize usability over expression.

## Overview

**Creative North Star: "Low-poly underground toy-fight-club, with DIY internet-game energy."**

The website’s strongest existing graphic reference is its basement-fight flyer: a local match announcement assembled from paper, marker, and disciplined layout. That flyer is a useful expression of the brand, not a complete approved implementation. The shared identity extends to the game: chunky low-poly forms, exaggerated silhouettes, and a curated asset-pack collage. “Toy” means scavenged, hand-built construction—not a requirement for literal plastic, cuteness, or a cozy mood.

Keep the presentation slightly crappy on purpose, cool first and joke second, while making every action and character extremely readable. Harmonize scale, lighting, material response, palette/value hierarchy, and composition; do not force one universal shader onto every asset. The direction rejects generic esports polish, cute/cozy styling, generic stock UI, and diffusion-like gloss or hyperdetail.

**Approved visual reference:** use the [offline visual board](../SlopArena/docs/design/references/sloparena-visual-identity/visual-reference-board.html) and [rooftop composition study](../SlopArena/docs/design/references/sloparena-visual-identity/visual-reference-study.png), approved on 2026-09-30, as marketing evidence for torn-paper framing, blunt headlines, restrained crude symbols, and graphic/world coherence. The rooftop and its angular lettering are illustrative, not mandatory stage art or a second name mark. Proposed neutral/orange shades do not replace this document's tokens. [Shared reference boundaries](../SlopArena/docs/design/visual-language.md#approved-visual-board--rough-edges-clear-decisions) remain authoritative; no runtime migration or release prerequisite is implied.

**Key Characteristics:**
- Warm newsprint surfaces under near-black structural ink, echoing the existing flyer construction.
- Action Yellow `#FFCC22` identifies graphic primary actions and selection; existing local paper/ink values may vary, and orange remains an accent.
- Archivo Black is the shared name-mark and native menu display voice; Space Mono remains the marketing utility voice.
- Square corners, hard edges, controlled print offsets, authored asymmetry, and stable interaction geometry.
- Preserve actual character identity, proportions, and chunky model forms in all artwork; favor curated low-poly collage over generic decorative grit.
- Stage themes may range from industrial spaces to pools, rooftops, night cities, or tabletop settings; the improvised-fight premise, not a warehouse, connects them.
- Editorial sectioning collapses cleanly from asymmetric desktop grids to single-column mobile flow.

**Status:** The website implements this direction: Action Yellow `#FFCC22`, Archivo Black, Space Mono and Archivo, self-hosted. Native UI still retains Baloo and older yellow shades. SLOPArena is solo-developed and unreleased; its Steam store page is listed as coming soon and the playtest is joined by requesting access there, which is exactly what the primary CTA says.

## Colors

The flyer palette uses warm stock and structural ink, with Action Yellow for graphic primary actions and selection and orange retained as a local accent. Paper and ink values may vary by surface.

### Primary
- **Action Yellow:** `#FFCC22`. Use consistently for graphic primary actions and selection. Do not recolor character/team colors or blue specials.

### Secondary
- **Corner Orange:** Keep the existing local orange (`#F05B35` in marketing) for emphasis and interruption; native orange (`#E05C2A`) remains distinct.

### Neutral
- **Newsprint:** The dominant warm page stock and reversed text on Soot.
- **Soot:** Structural ink for text, rules, dark bands, and offset shadows.
- **Registration Line:** A translucent Soot rule for oversized background geometry where a full-strength border would compete.
- **Field Paper:** A lighter stock reserved for editable fields inside Newsprint panels.
- **Success:** Semantic confirmation copy only.
- **Error:** Validation and submission failure copy only.

**The Action Rule.** Action Yellow marks graphic primary action and selection; do not use it as general decoration or impose it on character/team colors or blue specials.

## Typography

**Display Font:** Archivo Black (with sans-serif fallback)  
**Body Font:** Archivo (variable, with system sans fallback)  
**Label/Mono Font:** Space Mono

**Character:** Archivo Black is the shared name-mark and target display voice, including native menu declarations. Space Mono remains the marketing voice for compact utility copy. Use a readable sans-serif for dense settings and HUD content; short native utility labels may use mono where practical. The website’s current typography is not evidence that native font changes have shipped.

### Hierarchy
- **Display / Headline / Title:** Archivo Black for the mark, declarations, and compact action titles.
- **Body / Prose:** Archivo for paragraphs, fighter briefs and docs. It shares the name mark's family and stays readable at length.
- **Label:** Space Mono for buttons, kickers, tags, metadata, status and short dry annotations; do not use it for long-form reading.
- **Dense runtime UI:** Prefer readable sans-serif type for settings and HUD; mono is optional for short utility labels.

**The Shout and Type Rule.** Archivo Black declares; Space Mono handles marketing utility copy. Keep dense runtime information readable rather than forcing a typeface everywhere.

## Layout

The site is multi-page: Home, Fighters (index and one brief per fighter), How to play, Feedback and Docs, in English at the root and French under `/fr/`. Pages alternate full-bleed structural bands (paper, an ink stage band, an orange feedback band) with a content frame capped at 1180px and section padding of roughly 64–118px.

The home hero is a two-column poster: a tape strip, the torn Action Yellow name plate, the pitch and the Steam CTA on the left; a tilted gameplay screenshot with an orange print offset, a “not a render” sticker and a fan of small cards for the whole roster on the right. Below it come the live-presence band, the trailer with four pillars and a screenshot strip, the roster, the stage wall, the three access steps, the feedback band and the docs teaser. Fighter briefs pair a large portrait card with the name, epithet, pitch, tags and actions, then game plan, strengths and weaknesses, specials, normals, movement bars and an in-game screenshot. Docs use a sticky sidebar beside a 72-character prose column.

At 900px and below, grids become single-column. At 760px and below the header becomes two rows (mark, Steam and language; then a scrollable nav) and stops being sticky. At 600px and below fighter cards turn horizontal, stages use two columns, the hero cards sit in a row under the screenshot and the decorative circle disappears. The 390px layouts have no horizontal overflow.

**The Structure Before Slop Rule.** Establish the grid, reading order, and section boundary first; rotation and overlap may disturb the surface but never the task flow.

## Elevation & Depth

Depth follows a structural offset-print philosophy. Most surfaces remain flat. Priority cards use unblurred offset shadows in Soot or Corner Orange, as if a second ink plate or paper layer slipped during printing; slight rotation reinforces the physical registration error. The presence indicator is the exception: its soft Action Yellow glow communicates live state rather than elevation.

### Shadow Vocabulary
- **Primary press:** A 7px Soot offset for the Steam CTA (9px for the report card); compresses to 4px as the CTA is pressed by hover movement.
- **Compact press:** A 5px Soot offset for the feedback submit control; compresses to 3px on hover.
- **Feature offset:** A 10–12px Corner Orange offset for dark gameplay frames (trailer, hero screenshot); fighter pages use the fighter's signature color instead.
- **Live glow:** A soft 12px Action Yellow halo around the presence light; never use it on containers.
- **Character ground:** A downward translucent Soot drop-shadow under fighter renders.

**The Printed Depth Rule.** Hard shadows indicate physical offset or pressability, not ambient light. Never put them on every container.

## Shapes

The system is overwhelmingly square. Cards, buttons, fields, switches, and structural bands use zero-radius corners with two-pixel Soot rules. Circles are reserved for the oversized hero registration mark and the live-presence dot. Slight rotations between roughly one-half and two degrees create human placement without weakening the grid.

**The Circle Has a Job Rule.** Circular geometry means presence or print registration; it is not a generic container shape.

**The Two-Pixel Rule.** Interactive and sectional outlines use decisive two-pixel Soot strokes. One-pixel borders belong only to low-emphasis detail inside a dark surface.

## Components

Components are rough but orderly: hard-edged, visibly interactive, and placed on disciplined grids. Keep interaction geometry stable; authored asymmetry belongs in composition, not shifting controls.

### Buttons
- **Shape:** Square, two-pixel Soot outline.
- **Primary:** Action Yellow fill, Soot type, and a hard offset shadow. The large primary action uses an Archivo Black title and tracked Space Mono note; the compact submit action uses bold Space Mono.
- **Hover / Focus:** Hover translates the control toward its shadow and shortens the offset, producing a physical press. Keyboard focus uses a three-pixel Corner Orange outline with a two-pixel gap.
- **Disabled:** Retains its silhouette and shadow, reduces opacity, removes press movement, and uses the appropriate waiting cursor.

### Cards / Containers
- **Corner Style:** Square.
- **Background:** Soot for media presentation; Newsprint for forms; Corner Orange for the feedback section field.
- **Shadow Strategy:** Apply only to priority layers—the gameplay card and feedback panel—not routine section wrappers.
- **Border:** Two-pixel Soot borders on Newsprint containers; low-contrast one-pixel inner rule on the dark media frame.
- **Internal Padding:** Compact 12px media frame; responsive 18–30px form panel.

### Inputs / Fields
- **Style:** Field Paper fill, two-pixel Soot stroke, square corners, 10px internal padding, and a 16px Space Mono input size that avoids mobile focus zoom.
- **Focus:** Three-pixel Corner Orange outline with a two-pixel offset.
- **Error / Disabled:** Error appears as semantic Error text with an explicit retry action. Failed submission preserves the visible draft; the submit control is disabled only while sending.

### Navigation
- The sticky top bar is a 68px Newsprint band separated by a two-pixel Soot rule. The wordmark sits on a small rotated Action Yellow name plate; tracked Space Mono links (How to play, Fighters, Docs, Feedback), a Soot Steam button with an orange offset, and a boxed language switch align right with 40–44px targets.
- The current section gets a three-pixel Corner Orange underline. The active language is a Soot block reversed to Newsprint; hover inverts to Action Yellow.
- On narrow screens, keep every link and the language switch by wrapping the header into two rows instead of hiding navigation.

### Steam CTA
- The primary action everywhere: an Action Yellow block with a Soot disc holding the Steam mark, an Archivo Black title (“Request access on Steam”) and a Space Mono note (“Free playtest · Windows”). It links to the store page and is followed, where space allows, by the access-by-request explanation and a `steam://` launch link for players already in.

### Fighter and stage cards
- Fighter cards: Field Paper, two-pixel Soot border, hard offset shadow, the square portrait with a six-pixel stripe in the fighter's signature color, the name, epithet, pitch, tags and one “must try” special.
- Stage cards: the stage-select preview in a Newsprint frame on the ink band, a rotated name strip with an orange offset, and a one-line Space Mono joke about the setting only.

### Report form
- The feedback form is a “match report” card: optional topic chips, a large message field with a live counter, portrait tiles for the favorite fighter (desaturated until chosen), collapsible 1–5 ratings, and an optional name. Drafts persist locally; success replaces the form with a stamped confirmation.

### Presence Band
- A full-width Soot strip with reversed Newsprint status copy and a glowing Action Yellow dot.
- Player names follow the status; a Discord link sits at the far edge on desktop and wraps beneath the status on mobile.
- A confirmed empty response invites a friend or Discord match; a failed or malformed response says live status is unavailable and does not claim zero players.

### Section Titles
- Oversized Archivo Black headings carry each section without decorative sequence numbers. Numbers appear only where order matters: the three access steps and each fighter's game plan, set in Corner Orange or on Soot squares.

## Do's and Don'ts

### Do:
- **Do** build with Newsprint and Soot before assigning Action Yellow or Corner Orange.
- **Do** use Archivo Black for the mark and declarations; use Space Mono for concise marketing utility copy.
- **Do** keep square corners and two-pixel structural rules across controls and panels.
- **Do** let authored asymmetry and controlled print offsets disrupt an otherwise disciplined composition.
- **Do** preserve character identity, proportions, and chunky low-poly forms in artwork.
- **Do** collapse asymmetric desktop grids into a clear single-column mobile reading order.
- **Do** preserve visible keyboard focus and reduced-motion behavior.

### Don't:
- **Don't** introduce neon gradients, glass panels, glossy chrome, or generic esports spectacle.
- **Don't** soften the system with rounded cards, pill-shaped buttons, or diffuse ambient card shadows.
- **Don't** use Action Yellow as general decoration or recolor characters, team colors, or blue specials.
- **Don't** scatter rotations, annotations, or hard shadows across every element.
- **Don't** replace real character renders with generic gaming icons, altered model proportions, or abstract hero decoration.
- **Don't** add decorative colors outside the local palette hierarchy.
