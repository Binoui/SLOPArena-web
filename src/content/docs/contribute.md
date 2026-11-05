---
title: Contribute
description: SLOPArena is MIT-licensed. Report bugs, argue balance, fix the website, or open a pull request on the game.
section: build
order: 30
updated: 2026-10-16
---

SLOPArena is open source under the MIT license. Code, art, docs, design feedback and playtesting all count.

## The easy ways

- **Play and report.** The [feedback form](../../feedback/) goes straight to the developer. Bugs you can reproduce make great [GitHub issues ↗](https://github.com/Binoui/SLOPArena/issues).
- **Argue about balance.** That’s what the [Discord ↗](https://discord.gg/VvfaxDCF6Z) is for.
- **Fix the website.** This site has its own small [repository ↗](https://github.com/Binoui/SLOPArena-web), and every docs page links to its source at the bottom.

## Working on the game

Clone [the game repository ↗](https://github.com/Binoui/SLOPArena). The simulation, server and tools need the .NET 8 SDK and build and test without Unity:

```bash
dotnet build SlopArena.sln --nologo -p:SkipUnityPluginCopy=true
dotnet test SlopArena.sln --no-build --nologo -p:SkipUnityPluginCopy=true
```

The full Unity client needs Unity 6000.0.78f1, the separately installed Animancer package and some local art assets, so a fresh clone can’t run the complete game yet. The [contributing guide ↗](https://github.com/Binoui/SLOPArena/blob/main/CONTRIBUTING.md) covers the setup.

## Working with AI assistants

Go ahead. Point your assistant at `AGENTS.md`; the project’s workflows live in `skills/`. Every patch gets the same review however it was produced: determinism, licensing, gameplay correctness and maintainability come first.

## Making a fighter

New fighters are package-native. Start with [Adding a character ↗](https://github.com/Binoui/SLOPArena/blob/main/docs/characters/adding-a-new-character.md). The **SlopBot** workflows can guide an assistant through humanoid character creation one step at a time.

## House rules

Be decent: the project follows a [code of conduct ↗](https://github.com/Binoui/SLOPArena/blob/main/CODE_OF_CONDUCT.md). Keep pull requests small and focused.
