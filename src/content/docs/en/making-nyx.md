---
title: Making Nyx in a day
description: One evening of concept art, one day of agents. How Nyx went from a goth-girl idea to a playable two-form fighter, with every prompt, agent task and mistake on one timeline.
section: build
order: 15
updated: 2026-10-29
---

<figure>
<video src="../../devlog/nyx/hero.mp4" poster="../../devlog/nyx/hero.webp" autoplay muted loop playsinline></video>
<figcaption>Nyx's real form in Training, with her own run, Grasping Hands and idle.</figcaption>
</figure>

Nyx is the newest SLOPArena fighter. She swaps between two forms, a bit like Zelda and Sheik in Melee. Her real form is an actual goth who fights as a shadow witch. Her fake form is a goth influencer who brawls with her phone and the ring light on her backpack.

On 28 October at 19:41 she was a one-line idea in a chat. 22 hours later, 9 of them asleep, she was playable in both forms, with 24 animations of her own, her effects, and an engine change so a fighter can have forms at all. This page shows how, including what went wrong.

<div class="duo">
<figure><img src="../../devlog/nyx/portrait-real.webp" alt="Nyx's real form portrait, a goth witch with shadow claws" loading="lazy"><figcaption>Nyx, the real goth.</figcaption></figure>
<figure><img src="../../devlog/nyx/portrait-fake.webp" alt="Nyxxie, the fake form, holding her phone and making a peace sign" loading="lazy"><figcaption>Nyxxie, the influencer.</figcaption></figure>
</div>

<div class="stats">
<div><b>21</b>prompts from me</div>
<div><b>30</b>agent tasks</div>
<div><b>12 h 47</b>of agent work</div>
<div><b>24</b>animations</div>
<div><b>$43</b>for all 24 animation takes</div>
</div>

## How I work with the agents

I talk to one coordinator thread (Claude). It doesn't build much itself. It writes briefs, hands them to other agent threads (OpenAI Codex or Claude, picked per job), then checks what comes back before showing it to me. On Nyx it ran 30 of those tasks and was itself busy for only about two hours of the 22. I give direction, say yes or no, and play the result.

## The evening: finding her look

Most of my prompts went here. Codex generated three or four concepts per round, with the real roster as a reference, and I picked or rejected.

<div class="duo">
<figure><img src="../../devlog/nyx/r1-literal.webp" alt="Round 1 concept: a literal goth girl next to a pink e-girl" loading="lazy"><figcaption>Round 1. Fine, but none of them looked like SLOPArena.</figcaption></figure>
<figure><img src="../../devlog/nyx/r2-gremlin.webp" alt="Round 2 concept: a squat gremlin goth with huge hair" loading="lazy"><figcaption>Round 2. Better clothes, still not the style of the roster.</figcaption></figure>
</div>

The real form locked in round 4: straight posture, straight hair, white face, more jewelry. The fake form took three more rounds. Round 5 came back as costume-shop goths, which wasn't the brief at all (“Those are not fake goth girl concepts? I'm confused why you did those”). The reference I had in mind was the goth OnlyFans e-girl, and the trick was to make that read as a parody without sexualizing her. Round 7's parody take won, minus one of its two phones.

<div class="trio">
<figure><img src="../../devlog/nyx/r4-curtain.webp" alt="Round 4: the real form that got approved" loading="lazy"><figcaption>Round 4. Real form locked.</figcaption></figure>
<figure><img src="../../devlog/nyx/r5-costume.webp" alt="Round 5: an off-brief costume-shop goth" loading="lazy"><figcaption>Round 5. Off-brief.</figcaption></figure>
<figure><img src="../../devlog/nyx/r7-parody.webp" alt="Round 7: the parody influencer that got approved" loading="lazy"><figcaption>Round 7. Fake form locked.</figcaption></figure>
</div>

Then one sheet per form, front, back and face, which I approved as is.

<div class="duo">
<figure><img src="../../devlog/nyx/sheet-real.webp" alt="Approved character sheet of the real form" loading="lazy"></figure>
<figure><img src="../../devlog/nyx/sheet-fake.webp" alt="Approved character sheet of the fake form" loading="lazy"></figure>
</div>

## The kit

I asked for each form to be good on its own, with swapping as the fun combo tool. The real form is a calm zoner whose shadows do the hitting: Hex Crow (a slow homing crow that perches on you), Bat Scatter (she becomes bats to recover) and Grasp (a shadow hand drags you in). The fake form is a fast brawler: a Ring Light flash, the ring light spun like a rotor to recover, and Selfie Grab. Swapping on F hits too. Going Live pulls the opponent in, Logging Off pushes them away. The coordinator painted every special as a concept frame before anything was built.

<figure><img src="../../devlog/nyx/moves-board.webp" alt="Nine concept frames of Nyx's specials and swaps" loading="lazy"><figcaption>Move concepts, before any engine work.</figcaption></figure>

## The night: models

From the approved sheets, the agents made clean front, back and side inputs. I ran them through Tripo to get one 3D model per form. Before I went to bed, the coordinator started four tasks: 24 pose sheets, the model prep for Mixamo, and the engine design for forms. I answered its six design questions in the morning, together with the two Mixamo rigs.

<figure><img src="../../devlog/nyx/pose-sheets.webp" alt="Pose sheets for the fake form's specials" loading="lazy"><figcaption>Pose sheets for the fake form's specials, one of 24.</figcaption></figure>

## Build day

From 10:49 to about 16:15, 15 tasks ran, up to three at once.

- **One body, two meshes.** Both forms share one skeleton, and swapping changes which mesh is drawn. The first package used FightGuy's animations as stand-ins, so the whole kit was playable in Training by lunchtime.
- **The engine, in four phases.** Forms and the swap, then her normals and simple specials, then Grasp, Hex Crow and Selfie Grab, then the CPU, the HUD and Ability Lab. After the phases, the coordinator reran the tests and checked that the other fighters' data hadn't changed.
- **Her own animations.** 24 moves through the [GenRA animation workflow](../how-its-made/), one round, $43 in total. 20 passed the automatic checks. I approved all 24 after one look.
- **Effects.** Painted as concepts over her own animation frames, approved, then built.

<figure>
<video src="../../devlog/nyx/animation-takes.mp4" poster="../../devlog/nyx/animation-takes.webp" autoplay muted loop playsinline></video>
<figcaption>Unbound animation takes from three angles. Ring Light Uppercut, Logging Off, Grasp.</figcaption>
</figure>

<figure><img src="../../devlog/nyx/genra-board.webp" alt="Review board of animation candidates with key poses and check results" loading="lazy"><figcaption>The review board. Each move gets its pose sheet, key poses and check results.</figcaption></figure>

## What went wrong

Five of the 19 build tasks were rework, and two of my seven prompts after the design were bug reports.

**The dress.** Unity Cloth failed twice on the real form's long dress. The first try spread her legs under it. The second rested like a lampshade and collapsed between her legs when she ran. The third try kept the approved dress shape and hung it on 12 spring bone chains, with no cloth simulation at all.

<div class="duo">
<figure><video src="../../devlog/nyx/dress-v2-fail.mp4" poster="../../devlog/nyx/dress-v2-fail.webp" autoplay muted loop playsinline></video><figcaption>Cloth, try 2. No.</figcaption></figure>
<figure><video src="../../devlog/nyx/dress-final.mp4" poster="../../devlog/nyx/dress-final.webp" autoplay muted loop playsinline></video><figcaption>Spring chains. Yes.</figcaption></figure>
</div>

**The broken spine.** A bit later I asked “it looks like she has a broken spine?”. Fitting the real form onto the shared skeleton had kept her torso exactly as modelled, but the skeleton's spine sat 2 to 6 cm in front of it. A refit to the skeleton fixed it.

<figure><img src="../../devlog/nyx/spine-fix.webp" alt="Side view of the approved model, the broken fit and the fixed fit" loading="lazy"><figcaption>Side view. Left: the approved model. Middle: the first fit. Right: the fix.</figcaption></figure>

**The effects.** The concepts were great. The build turned flat comic drawings into flat cutouts: 15 of 25 effect meshes had no depth at all, and from the game camera Going Live looked like stacked pink tape. A depth pass is running as I write this.

<div class="duo">
<figure><img src="../../devlog/nyx/vfx-concept-golive.webp" alt="Going Live effect concept" loading="lazy"><figcaption>Going Live, the concept.</figcaption></figure>
<figure><img src="../../devlog/nyx/vfx-ingame-flat.webp" alt="Going Live in game, reading as flat pink rings" loading="lazy"><figcaption>Going Live, the first build.</figcaption></figure>
</div>

## The whole thing on one timeline

Every prompt, task and video, read back from the coordinator's own log. Hover the [interactive version](../../devlog/nyx/timeline.html) for the text of each prompt and the details of each task.

<figure><a href="../../devlog/nyx/timeline.html"><img src="../../devlog/nyx/timeline.webp" alt="Timeline of the Nyx thread: prompts, agent tasks, context size and tool calls over 22 hours" loading="lazy"></a><figcaption>Dots are my prompts, bars are agent tasks (teal Codex, orange Claude, hatched rework). The gap is me sleeping.</figcaption></figure>

- **14 of my 21 prompts came before any build.** Taste is the slow part, and it's mine.
- **The coordinator stayed small.** It handed out the heavy work and filled its context only twice. Both times I compacted it at a natural break.
- **I answered fast when it mattered.** The median reply was 12 minutes. During the dress and spine fixes, it was 2 to 3.

<figure>
<video src="../../devlog/nyx/ingame-combos.mp4" poster="../../devlog/nyx/ingame-combos.webp" muted loop playsinline controls></video>
<figcaption>The three combos the kit was designed around, landing on the Training dummy.</figcaption>
</figure>

## Why it went this fast

Nyx took 21 prompts because the game had already taken thousands. Every part of her rode on something built for an earlier fighter:

- the character package format and its cook, so a fighter is data and not new code;
- the animation workflow, rig packs and automatic checks, built while animating the earlier fighters;
- engine pieces she could reuse, like homing projectiles and Bashie's tether, which became Grasp;
- Training captures, so I could judge every step from video on my phone.

And the design was settled before a single task started. When the agents know exactly what you want, they're fast. When they guess, you get a lampshade dress.

Nyx isn't in the playtest build yet. [Wishlist SLOPArena on Steam ↗](https://store.steampowered.com/app/5324910/) or join the [Discord ↗](https://discord.gg/VvfaxDCF6Z) to know when she lands.
