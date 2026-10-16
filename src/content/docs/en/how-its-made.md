---
title: How SLOPArena is made
description: One developer, one deterministic simulation, a pile of AI agents and a playtest loop. The workflow behind the game.
section: build
order: 10
updated: 2026-10-16
---

SLOPArena is made by one developer, in public, with a lot of help from AI coding agents. That’s where the name comes from. This page walks through the loop that turns an idea into a playtest build, and shows where your feedback lands.

## The loop

1. **Design a kit.** Every fighter starts as a short design doc: who they are, how they win, what they’re bad at. Every kit fits the same grid of eight normals and four specials. See the [kit design principles ↗](https://github.com/Binoui/SLOPArena/blob/main/docs/characters/character-kit-design-principles.md).
2. **Author a character package.** A fighter is a package: `character.json` holds the gameplay, an asset catalog binds the model and animations. Those files are editing input, never what the game actually runs.
3. **Tune it in Ability Lab.** A Unity tool scrubs a move frame by frame and shows the real hitboxes and hurtboxes, computed by the same code the server uses. What you see in the Lab is what the server will compute.
4. **Cook it.** A compiler turns the package into an immutable, hashed artifact. Matches pin exact versions and hashes, so the game and the server always agree on what a move does.
5. **Test it.** Automated checks run on the simulation: unit tests, golden kit scenarios, move-data reports. Then a human plays it, because no test can tell you whether a move feels good.
6. **Ship a playtest build.** The Windows client is built in isolation and uploaded to the Steam playtest, and the matching servers deploy alongside it.
7. **Read the reports.** What comes in through the [feedback form](../../feedback/), Discord and GitHub decides what gets fixed and tuned next. Then the loop starts again.

## Where AI fits

AI agents write a lot of SLOPArena’s code and docs, and generated art is part of the asset pipeline. They work from public project instructions and task workflows that live in the repository, so any assistant (Codex, Claude Code, OMP, or anything else that can read files) follows the same rules.

- **Same instructions for everyone.** `AGENTS.md` sets the rules. `skills/` holds step-by-step workflows for building a character, authoring animations, designing a stage, running Ability Lab or shipping a release.
- **A human decides.** Agents propose and implement. The developer reviews, playtests and accepts. Passing tests never counts as “it feels good”.
- **No faked success.** When a workflow needs a tool that isn’t available, it hands off with concrete next steps instead of pretending it worked.
- **AI is a method, not a style.** Generated models get cleaned up in Blender, retargeted and checked on the actual character. Diffusion gloss counts as a bug.

## Animation: from poses to moves

New moves follow a documented pipeline: write a brief, block key poses on the real rig, let [GenRA ↗](https://github.com/MacPaw/GenRA) process and interpolate them, preview the result on the actual character, and only bind the move into the package once it’s approved. Candidates stay unbound until then. The full procedure is in the [GenRA animation workflow ↗](https://github.com/Binoui/SLOPArena/blob/main/docs/characters/genra-animation-workflow.md).

## The toolbox

| Tool | What it does |
| --- | --- |
| Unity 6 | The game client, Ability Lab and editor tooling |
| Shared C# simulation | The 60 Hz gameplay rules, used by both the game and the servers |
| GameServer and Master | Authoritative matches, rooms, chat and the server browser |
| Blender | Model cleanup, rig fixes and procedural stage art |
| GitHub Actions | Checks, release builds and deploys |

Want the technical side? Read [Under the hood](../under-the-hood/), or dig into the [game’s docs on GitHub ↗](https://github.com/Binoui/SLOPArena/tree/main/docs).
