---
title: Making Nyx in a day
description: One evening of concept art, one day of agents. How Nyx went from a goth-girl idea to a playable two-form fighter, every prompt and mistake on one timeline, and the tools that let dozens of agents share one Unity Editor.
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

<div class="credits">
<div><b>Claude Opus</b>ran the show and wrote the animations through GenRA</div>
<div><b>Codex</b>drew the concept art, wrote most of the code and the effects</div>
<div><b>Tripo</b>made the models</div>
<div><b>Mixamo</b>rigged them</div>
<p>All in one <a href="#t3-code-one-window-for-every-agent">T3 Code</a> window.</p>
</div>

## How I work with the agents

I talk to one coordinator thread (Claude). It doesn't build much itself. It writes briefs, hands them to other agent threads (OpenAI Codex or Claude, picked per job), then checks what comes back before showing it to me. On Nyx it ran 30 of those tasks and was itself busy for only about two hours of the 22. I give direction, say yes or no, and play the result. The tools that make this work are [at the end of the page](#the-tools-behind-it).

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
- **Her own animations.** 24 moves through [GenRA](#genra-an-ai-that-animates-with-code), one round, $43 in total. 20 passed the automatic checks. I approved all 24 after one look.
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

## The tools behind it

Nyx took 21 prompts because the game had already taken thousands. A fighter is data here, not new code, and every step of her build ran on tools made for the fighters before her. Four of them do most of the work.

### T3 Code: one window for every agent

[T3 Code ↗](https://github.com/pingdotgg/t3code) is an open-source app for running coding agents, made by the Ping.gg team. I run Claude and Codex threads side by side in it, all on the same copy of the game. Two things made the Nyx run possible. A thread can hand a task to a new thread on either provider, with the model and effort it chooses, and gets the report back when it's done. And pictures, pages and videos show up right in the conversation, so I review concept boards, animation takes and this timeline where I chat, often from my phone.

### pstack: how the agents work

[pstack ↗](https://github.com/backnotprop/pstack) is a free pack of agent skills by poteto, an engineer at Cursor. It gives agents a method instead of a blank page. A task gets routed to a playbook (investigate, build a feature, fix a bug), and every playbook carries principles like “prove it works on the real thing” and “fix the root cause, not the symptom”. It also decides which model does which job. On Nyx, Codex built most things and Claude Opus took the judgment calls and the hardest engine work. And it makes the coordinator keep a decision log: 40 lines of what it decided, why, and how it checked. Without that file, this page couldn't have been written.

### The Unity gateway: many agents, one Editor

How do this many agents not step on each other's toes? Almost everything they do ends up in one Unity Editor: importing models, cooking the fighter, playing Training, recording clips. Unity does one thing at a time. If one agent starts a recompile while another is recording a capture, both break.

So I built a gateway in front of the Editor, on top of a fork of Unity's Pipeline package. Agents never drive Unity directly. An agent hands the gateway a batch, like “import these clips, cook Nyx, open Training, record the swap”, and gets a lease. Everyone else waits in line. The gateway checks who is asking, so no agent can run on another's lease, and it recompiles before every batch so nobody records stale code. When I want to play, a “Hold Editor for Me” switch puts me at the front of the line, and the agents wait until I'm done.

<div class="queue" aria-hidden="true">
<div class="queue__line"><span class="queue__me">Me · Play</span><span>Codex · import clips</span><span>Claude · cook Nyx</span><span>Codex · record the swap</span></div>
<div class="queue__gate">Gateway<small>one lease at a time</small></div>
<div class="queue__editor">Unity Editor</div>
</div>

On 29 October, the transcripts show this traffic, Nyx's and other fighters' together:

<div class="stats">
<div><b>~600</b>gateway requests</div>
<div><b>47</b>agent sessions</div>
<div><b>1</b>Unity Editor</div>
</div>

### GenRA: an AI that animates with code

Nobody hand-keys her animations. Our animation toolkit (we still call it GenRA, after the [MacPaw project ↗](https://github.com/MacPaw/GenRA) it grew out of) has Claude Opus write each move as a small program against her real skeleton: key poses, arms and legs solved so joints only bend the way joints bend, then the motion between them.

Then it checks its own work. Bones that stretch, knees that bend backwards, limbs that snap, hands that go through the body, and what we call flow: stiff stops and dead holds that make motion look robotic. It renders the move, looks at the renders and fixes what it sees. What reaches me is the board above, every move from three angles with its check results. A move costs one to three dollars. On our benchmark move, this takes two to four minutes for well under a dollar, where GenRA's own prompting route took 25 minutes and seven dollars and still failed two checks.

### And the design came first

None of this helps if the agents have to guess. Nyx's look and kit were settled before the first build task started. When the agents know exactly what you want, they're fast. When they guess, you get a lampshade dress.

Nyx isn't in the playtest build yet. [Wishlist SLOPArena on Steam ↗](https://store.steampowered.com/app/5324910/) or join the [Discord ↗](https://discord.gg/VvfaxDCF6Z) to know when she lands.
