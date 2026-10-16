---
title: Under the hood
description: How a SLOPArena match runs. One deterministic simulation, an authoritative server, prediction and rollback, and rooms instead of queues.
section: build
order: 20
updated: 2026-10-16
---

SLOPArena looks like a party game and is built like a fighting game. Here’s what happens when you press a button.

## One simulation, everywhere

All gameplay rules live in one pure C# library, **Shared**, that ticks at **60 Hz**. It knows nothing about Unity: no physics engine, no animation callbacks. The game client, the GameServer, Training and the dev tools all run the same code, so a move behaves the same everywhere.

Hitboxes and hurtboxes come from animation poses baked ahead of time, not from Unity physics. The server never renders a frame, yet it knows where every fist and greatsword is on every tick.

## The server is the referee

In an online match the **GameServer** is authoritative. It runs the real simulation, decides hits, damage and knockouts, and sends the result to everyone. Your game renders that state and adds the show: animation, effects and sound.

## Prediction and rollback

Waiting for the server before your fighter moves would feel awful, so the game **predicts**. Your own inputs apply immediately. When the server’s state arrives, the game **reconciles**: if it guessed wrong, it rolls back and replays. Opponents are predicted where that’s safe and corrected where it isn’t.

This is the part being fixed right now. If fighters snap, freeze or desync, [report it](../../feedback/).

## Rooms, not queues

There’s no matchmaking queue. A **Master server** runs the server browser, rooms and chat, and signs players in through Steam. A room holds up to four players and survives character select, the match, the results screen and the rematch. When a match starts, Master hands it to a GameHost to run.

## Content you can trust

Fighters ship as **cooked packages**: immutable artifacts with a manifest and hashes. Every match pins the exact package versions, so the game and the server can’t disagree about what a move does.

That’s also the groundwork for community fighters later. Creators would build from approved, deterministic building blocks instead of shipping arbitrary code.

## Read more

- [Architecture overview ↗](https://github.com/Binoui/SLOPArena/blob/main/docs/architecture-overview.md)
- [Netcode architecture ↗](https://github.com/Binoui/SLOPArena/blob/main/docs/systems/netcode-architecture.md)
- [Combat systems ↗](https://github.com/Binoui/SLOPArena/blob/main/docs/systems/combat-systems.md)
- [Ability Lab ↗](https://github.com/Binoui/SLOPArena/blob/main/docs/systems/ability-lab.md)
