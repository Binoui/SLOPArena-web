---
title: "Making the slop #1: Ability Lab"
description: The Unity tool where every SLOPArena move is edited as data. Drag a hitbox's timing, move it to another bone, change its damage, then run it against an opponent through the same simulation the server runs.
section: build
order: 16
updated: 2026-11-01
---

<figure>
<video src="../../devlog/making-the-slop/01-ability-lab/episode.mp4" poster="../../devlog/making-the-slop/01-ability-lab/episode.webp" controls playsinline preload="metadata"></video>
<figcaption>Episode 1 in 45 seconds: timing, bones, numbers, and a real run against an opponent.</figcaption>
</figure>

*Making the slop* is a series about the tools I built to make SLOPArena. One short video per tool, and a page like this one with the details.

The first one is Ability Lab. It's the Unity window where I make and tune every move in the game. I started it in August.

## A move is data

In SLOPArena a fighter is a package. Its moves live in a file called `character.json`: how many ticks a move lasts (the game runs at 60 ticks a second), when each hitbox comes out, how hard it hits and which bone it follows. Nothing about a move is hardcoded.

Ability Lab is a window onto that file. Pick a fighter and a move, and you get the model in a preview, a timeline of the move under it, and every field of the selected effect on the right.

<figure><img src="../../devlog/making-the-slop/01-ability-lab/lab.webp" alt="The Ability Lab window: FightGuy's Straight Punch in the preview with its hitbox sphere, the move timeline below, and the hitbox fields on the right" loading="lazy"><figcaption>FightGuy's Straight Punch. The preview, the timeline under it, and the hitbox's fields on the right.</figcaption></figure>

## Timing

Each effect is a bar on the timeline. Drag the hitbox bar and it comes out later. Drag its end and it stays out longer. Scrub the move frame by frame and the hitbox appears on exactly the ticks you gave it.

<figure><img src="../../devlog/making-the-slop/01-ability-lab/timing.webp" alt="The Lab timeline with the yellow hitbox bar selected under FightGuy's punch" loading="lazy"><figcaption>The yellow bar is the punch's hitbox, active from tick 7 to 14.</figcaption></figure>

## Bones

A hitbox follows a bone of the animation. In the video the punch's hitbox moves from the right hand to the toes with one dropdown, and from then on it follows the foot through the whole animation. A hitbox can also be a capsule between two bones, for a long limb or a whole body, like here from the toes to the head.

The Lab also draws, in darker orange, the band a bone hitbox swept since the last tick. A fast swing can travel a long way in one tick, and the band shows what it actually covered.

<div class="duo">
<figure><img src="../../devlog/making-the-slop/01-ability-lab/bone-list.webp" alt="The start bone dropdown open, listing the skeleton's bones" loading="lazy"><figcaption>Pick any bone of the skeleton.</figcaption></figure>
<figure><img src="../../devlog/making-the-slop/01-ability-lab/capsule.webp" alt="A capsule hitbox stretched from FightGuy's toes to his head" loading="lazy"><figcaption>Or span two bones with a capsule.</figcaption></figure>
</div>

## The numbers

Every hitbox has the fields you'd expect from a platform fighter: damage, launch angle, base knockback, knockback growth, hitstun, shape, radius and offsets. Change one and the preview updates right away. Edits stay in a live draft in memory, and nothing is written to disk until I press Save + Cook.

## Same code as the server

This is the part that matters most to me. SLOPArena's gameplay is one C# simulation, and the game, the servers and the Lab all run it. The hitboxes and hurtboxes the Lab draws are the ones the simulation tested on that tick, not a drawing of what I think the move does.

The Lab can also run a move against an opponent. You set the distance, the facing, the opponent's damage, and whether they stand idle or hold shield, and the simulation plays it out. The Lab doesn't fake the result. It shows whatever happened: a hit, a block, a whiff.

<div class="duo">
<figure><img src="../../devlog/making-the-slop/01-ability-lab/hit-1m.webp" alt="FightGuy's punch hitting an opponent standing 1 metre away, who flies back" loading="lazy"><figcaption>1 metre away: hit on frame 5, 7%.</figcaption></figure>
<figure><img src="../../devlog/making-the-slop/01-ability-lab/miss-2m.webp" alt="The same punch with the opponent 2 metres away, no contact" loading="lazy"><figcaption>2 metres away: no contact.</figcaption></figure>
</div>

When a move looks right in the Lab, I press Save + Cook. That compiles the package into a cooked, hashed file, and the game and the servers load that exact file. The last shot of the video is the game itself.

## The agents use it too

A lot of SLOPArena is built with AI agents, and they need to test moves as well. The Lab has commands an agent can call without clicking anything: open a fighter, run a move against an opponent, step to a frame, capture a picture. They get back the run frame by frame: positions, damage, hitstun, and every hit or block that happened. The agent sees the same outcome I would see in the window.

## What I'd tell another dev

If you make a fighting game, make your move editor run your real game code, not a copy of it. A copy drifts from the game, and then you tune moves nobody will ever play. With the Lab, what I tune is what players get.

Want more? Read how the whole game is put together in [How it's made](../how-its-made/), or see the Lab working on a whole fighter in [Making Nyx in a day](../making-nyx/).
