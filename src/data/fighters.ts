import type { ImageMetadata } from 'astro'
import fightguyPortrait from '../assets/fighters/fightguy-portrait.png'
import mankiPortrait from '../assets/fighters/manki-portrait.png'
import wibouPortrait from '../assets/fighters/wibou-portrait.png'
import bonkPortrait from '../assets/fighters/bonk-portrait.png'
import bashiePortrait from '../assets/fighters/bashie-portrait.png'
import salamanderPortrait from '../assets/fighters/salamander-portrait.png'
import nyxPortrait from '../assets/fighters/nyx-portrait.png'
import nyxxiePortrait from '../assets/fighters/nyxxie-portrait.png'
import fightguyShot from '../assets/screens/fightguy-fist-of-fury.jpg'
import mankiShot from '../assets/screens/manki-bazooka-rooftop.jpg'
import wibouShot from '../assets/screens/wibou-skyfall.jpg'
import bonkShot from '../assets/screens/sir-bonk-cake-slam.jpg'
import bashieShot from '../assets/screens/bashie-whistle-splash-deck.jpg'
import salamanderShot from '../assets/screens/salamander-finger-guns.jpg'
import nyxShot from '../assets/screens/nyx-grasp-slop-pit.jpg'

/** The package's special slot ids. The key each one sits on is `ui.specialKeys`. */
export type SpecialSlot = 'A' | 'E' | 'R' | 'F'

export interface Special {
  slot: SpecialSlot
  name: string
  cooldownSeconds: number
  /** Shown instead of the cooldown for specials limited by ammo rather than time. */
  limit?: string
  text: string
}

export interface Kit {
  specials: Special[]
  /** Normals 1, 2 and 3 (package slots 1, 3 and 4). */
  normals: { ground: string[]; air: string[] }
  /** Character-package tuning: m/s for speeds, m/s² for gravity. */
  movement: { run: number; air: number; jump: number; gravity: number }
}

/** A fighter's second form (ADR-0051), swapped to with F. */
export interface Form extends Kit {
  name: string
  portrait: ImageMetadata
  pitch: string
}

export interface Fighter extends Kit {
  id: 'fightguy' | 'manki' | 'wibou' | 'bonk' | 'bashie' | 'salamander' | 'nyx'
  name: string
  accent: string
  /** Mirrors the game's MenuRoster.IsWorkInProgress: kit and art still being built. */
  wip?: true
  portrait: ImageMetadata
  shot: ImageMetadata
  shotAlt: string
  epithet: string
  pitch: string
  tags: string[]
  signature: SpecialSlot
  gameplan: string[]
  strengths: string[]
  weaknesses: string[]
  alternateForm?: Form
}

// Move names, cooldowns and movement come from each package's character.json
// on the game repository's main branch (snapshot of 29 October 2026). Playtest values move.
export const tuningSnapshot = '2026-10-29'

export const fighters: Fighter[] = [
  {
    id: 'fightguy',
    name: 'FightGuy',
    accent: '#3a8dde',
    portrait: fightguyPortrait,
    shot: fightguyShot,
    shotAlt: 'FightGuy’s flurry finisher sends his opponent flying across the Slop Pit.',
    epithet: 'The all-rounder',
    pitch: 'The underground champion, and very pleased about it. FightGuy backs up the grin with quick punches, flying kicks and blue ki. A straightforward all-rounder with a show-off streak.',
    tags: ['Close range', 'All-rounder', 'Projectile'],
    signature: 'F',
    gameplan: [
      'Poke from range with Ki Shot. Hold Q to charge it bigger.',
      'Get in with Cyclone Kick (R): it carries them along and launches them at the end.',
      'Shields won’t save them: Title Match (F) grabs straight through a block, punches away, then kicks them off the stage.',
    ],
    strengths: ['Fast, simple normals', 'A projectile for every distance', 'Rising Dragon kills point blank and brings you home'],
    weaknesses: ['Has to get close to really hurt', 'A whiffed Cyclone Kick or Title Match leaves him wide open'],
    specials: [
      {
        slot: 'A', name: 'Ki Shot', cooldownSeconds: 2,
        text: 'Hold to charge through three tiers, release to fire a ki ball at your target. More charge means a bigger ball, not more damage.',
      },
      {
        slot: 'E', name: 'Rising Dragon', cooldownSeconds: 4,
        text: 'A rising uppercut and your ticket back to the stage. Land it point blank in the first frames and it launches straight up, hard enough to KO. A late catch only pops them up.',
      },
      {
        slot: 'R', name: 'Cyclone Kick', cooldownSeconds: 4,
        text: 'Spin forward in a long kicking cyclone that drags whoever it catches along, then launches them at the end. Whiff it and you finish seeing stars.',
      },
      {
        slot: 'F', name: 'Title Match', cooldownSeconds: 12,
        text: 'Lunge at your target and grab them, shield or not. Hold them through a punch flurry, then a heavy right-foot kick sends them flying. An air dodge slips it, and a miss leaves you hanging.',
      },
    ],
    normals: {
      ground: ['Straight Punch', 'High Kick', 'Double Kick'],
      air: ['Floating Kick', 'Flip Kick', 'Air Smash'],
    },
    movement: { run: 12, air: 7, jump: 10.8, gravity: 28 },
  },
  {
    id: 'manki',
    name: 'Manki',
    accent: '#f07a1e',
    portrait: mankiPortrait,
    shot: mankiShot,
    shotAlt: 'Manki’s bazooka blast sends FightGuy flying off a neon rooftop dance floor.',
    epithet: 'The mad bomber monkey',
    pitch: 'A pyromaniac monkey with a jetpack and no safety training. Manki takes off, drops bombs on your head, fires homing rockets and, when the moment is right, flies straight into you.',
    tags: ['Zoner', 'Flyer', 'Explosives'],
    signature: 'E',
    gameplan: [
      'Take off with Jetpack Flight (E): steer with the stick, tap jump for height and watch the fuel bar.',
      'Make a bombing run with Bombs Away (Q) and fire the Bazooka (R). Neither ends the flight.',
      'When they’re ripe, Kamikaze (F) locks on and flies you straight into them. Boom.',
    ],
    strengths: ['He flies: Jetpack Flight is a long, steerable recovery', 'Bombs and homing rockets, straight from the air', 'Kamikaze is a kill threat from anywhere'],
    weaknesses: ['Any hit knocks him out of the sky', 'Fuel only refills on landing, and E recharges only once the flight ends', 'Stand too close to your own rocket and it hurts you too'],
    specials: [
      {
        slot: 'A', name: 'Bombs Away', cooldownSeconds: 0.3,
        limit: '3 bombs, one back every 6 s',
        text: 'No aiming. In flight, a bomb drops straight down and blows up on the ground or on whoever is under it. On foot, Manki hops back and leaves a short-fuse bomb where he stood. Only opponents get hurt.',
      },
      {
        slot: 'E', name: 'Jetpack Flight', cooldownSeconds: 3.5,
        text: 'A short ignition, then real flight: the stick steers, jump gives a burst of height, E again cuts the engine. Fuel only refills on landing.',
      },
      {
        slot: 'R', name: 'Bazooka', cooldownSeconds: 4,
        text: 'Press to fire a homing rocket at your target, even mid-flight. Dodge past it or get behind it to break the lock.',
      },
      {
        slot: 'F', name: 'Kamikaze', cooldownSeconds: 7,
        text: 'Lock onto your target and rocket into them for a huge explosive finisher. From flight, it’s a dive-bomb. The blast throws Manki too, but only hurts them.',
      },
    ],
    normals: {
      ground: ['Monkey Punch', 'Sweeping Kick', 'Head Slam'],
      air: ['Air Kick', 'Double Fist Slam', 'Air Smash'],
    },
    movement: { run: 11.5, air: 9, jump: 10.4, gravity: 24 },
  },
  {
    id: 'wibou',
    name: 'Wibou',
    accent: '#5fd84a',
    portrait: wibouPortrait,
    shot: wibouShot,
    shotAlt: 'Wibou slashes down at FightGuy from above in a forest campsite at sunset.',
    epithet: 'The sword duelist',
    pitch: 'Shades, katana and far too much anime. Wibou is a mall ninja with green hacker effects and the fastest run in the roster. Keep people at sword’s reach, cut through a gap and, when it’s time, cut everyone at once.',
    tags: ['Mid range', 'Fast', 'Sword'],
    signature: 'F',
    gameplan: [
      'Control mid-range with sword normals and Shuriken Toss (Q).',
      'Close the gap with Quick Draw (R). It always dashes the same distance, so space it: the tip cuts hardest.',
      'Cash out with Omae wa mou shindeiru (F): lock everyone in range, cut through each one, sheathe. Then they all pop.',
    ],
    strengths: ['Fastest run in the roster', 'Sword normals outrange fists', 'Cheap specials: Rising Slash and Quick Draw recharge in 1.5 s'],
    weaknesses: ['Falls fast, so less time to make it back', 'Shields and walls stop Quick Draw short of the tip', 'Nobody in range for his F? He just stands there'],
    specials: [
      {
        slot: 'A', name: 'Shuriken Toss', cooldownSeconds: 2,
        text: 'Tap to throw three projectiles toward your current target after a short startup. They fly straight: no manual aiming or homing.',
      },
      {
        slot: 'E', name: 'Rising Slash', cooldownSeconds: 1.5,
        text: 'An upward slash that carries you into the air. Recovery with an edge.',
      },
      {
        slot: 'R', name: 'Quick Draw', cooldownSeconds: 1.5,
        text: 'Tap to dash a fixed distance toward your target and slash. Anyone you pass takes a light cut; whoever ends up on the tip takes the big one. A green bracket on their floor ring says the spacing is right.',
      },
      {
        slot: 'F', name: 'Omae wa mou shindeiru', cooldownSeconds: 9,
        text: 'A short stance locks up to three opponents nearby. Wibou cuts through each one and sheathes his sword. NANI?! They all pop at once. Runners can escape it; shields and air dodges get out.',
      },
    ],
    normals: {
      ground: ['Quick Slash', 'Up Slash', 'Heavy Down Slash'],
      air: ['Air Slash', 'Air Up Slash', 'Air Heavy Down Slash'],
    },
    movement: { run: 14, air: 7, jump: 12, gravity: 32 },
  },
  {
    id: 'bonk',
    name: 'Sir Bonk',
    accent: '#d2402f',
    portrait: bonkPortrait,
    shot: bonkShot,
    shotAlt: 'Sir Bonk’s Targeted Jump Slam lands on Manki in the middle of a birthday cake. BONK!',
    epithet: 'The self-made knight',
    pitch: 'He knighted himself. A big, good-natured brute in homemade armour: a bucket for a helm, a plank for a sword and pot lids on his shoulders. Sir Bonk protects anyone smaller than him (everyone) and can’t tell a windmill from a giant. Big hits, easy to play. BONK!',
    tags: ['Heavy hitter', 'Armor', 'Reach'],
    signature: 'R',
    gameplan: [
      'Wall them out with the plank: Squire’s Cut is quick, Sunrise swats jumpers, The BONK ends stocks.',
      'Skim the Pot-Lid Throw (Q). It hits on the way out and again on the way back, pulling them toward you.',
      'Mount up for The Joust (R): gallop at them, armoured, steering with the stick. Off the stage? Targeted Jump Slam (E) picks your landing spot.',
    ],
    strengths: ['Plank reach on every normal', 'An armoured gallop on The Joust', 'Biggest jump in the roster'],
    weaknesses: ['Joint-slowest run and the least air control', 'The Joust rears before it charges, with no armour yet, and a miss skids to a stop', 'Blade Storm has the longest cooldown in the game'],
    specials: [
      {
        slot: 'A', name: 'Pot-Lid Throw', cooldownSeconds: 0,
        limit: 'One lid: wait for it to come back',
        text: 'Skim the pot lid off your shoulder like a frisbee. It hits on the way out and on the way back, knocking them toward you, and you catch it. Busy when it returns? It rings off your own bucket.',
      },
      {
        slot: 'E', name: 'Targeted Jump Slam', cooldownSeconds: 4,
        text: 'Hold to place a ring on the ground, release to leap onto it and slam on landing.',
      },
      {
        slot: 'R', name: 'The Joust', cooldownSeconds: 4,
        text: 'Rear your hobby horse (neigh included), then gallop a long way with the plank couched as a lance, armoured and steered with the stick. The first fighter you meet is unhorsed. A miss skids to a stop. Off a ledge, you gallop on thin air, look down and drop.',
      },
      {
        slot: 'F', name: 'Blade Storm', cooldownSeconds: 15,
        text: 'Three windmill turns with the plank flat: the first two hold whoever they catch, the third launches them. You can walk slowly while you spin. You end dizzy, and that’s your opponent’s chance.',
      },
    ],
    normals: {
      ground: ['Squire’s Cut', 'Sunrise', 'The BONK'],
      air: ['Squire’s Cut', 'Sunrise', 'The BONK'],
    },
    movement: { run: 10, air: 6, jump: 13, gravity: 26 },
  },
  {
    id: 'bashie',
    name: 'Bashie',
    accent: '#e8383d',
    wip: true,
    portrait: bashiePortrait,
    shot: bashieShot,
    shotAlt: 'Bashie blows her whistle on Splash Deck while FightGuy and Wibou fight behind her.',
    epithet: 'The lifeguard turtle',
    pitch: 'A pool lifeguard turtle who blows her whistle at everyone for breaking the pool rules, then breaks every one of them herself. Bashie throws her life ring, cannonballs onto you and surfs a wave in her shell. NO RUNNING! (She speed-walks.)',
    tags: ['Close range', 'Shell', 'Pull-in'],
    signature: 'F',
    gameplan: [
      'Reel them in with Rescue Ring (Q): whoever it catches lands at your feet, stuck just long enough for one normal.',
      'Cannonball (R) onto where they stand. The splash launches everyone around up into your normals.',
      'Blow the whistle for Wave Pool (F) and ride your wave toward the edge, carrying everyone it meets. Jump off to send them flying.',
    ],
    strengths: ['Rescue Ring sets up a free normal', 'Every tucked landing splashes everyone around her', 'Wave Pool carries opponents toward the edge, shields and all'],
    weaknesses: ['A missed Cannonball pops her up open to a punish', 'Hydro Jet has no armour, and its direction is locked once it starts', 'The whistle is the tell, and any hit ends the ride'],
    specials: [
      {
        slot: 'A', name: 'Rescue Ring', cooldownSeconds: 2.5,
        text: 'Throw your life ring straight at your target. The first fighter it meets is reeled in to your feet, stuck just long enough for one normal. A miss, a wall or a shield means reeling the empty ring back.',
      },
      {
        slot: 'E', name: 'Hydro Jet', cooldownSeconds: 3.5,
        text: 'Tuck and jet off where the stick points, with no wind-up (neutral goes straight up). The jet behind you shoves. Press R mid-jet to dive without untucking; landing tucked splashes.',
      },
      {
        slot: 'R', name: 'Cannonball', cooldownSeconds: 2.5,
        text: 'Hop up tucked and cannonball onto where your target stood. In the air it’s the Cannonball Dive, a steep dive at the ground ahead. Either landing splashes everyone around upward. If they moved, you pop up open to a punish.',
      },
      {
        slot: 'F', name: 'Wave Pool', cooldownSeconds: 9,
        text: 'Blow your whistle: a wave rises behind you and you ride it in your shell toward your target, carrying everyone it meets toward the edge, shields and all. It breaks at the lip. Jump off to send them flying into your aerial.',
      },
    ],
    normals: {
      ground: ['Whirlpool Spin', 'Shell Flip', 'Rising Shell'],
      air: ['Air Whirlpool Spin', 'Air Shell Flip', 'Air Diagonal Shell'],
    },
    movement: { run: 11.5, air: 9, jump: 10.4, gravity: 24 },
  },
  {
    id: 'salamander',
    name: 'Salamander',
    accent: '#e8a21c',
    wip: true,
    portrait: salamanderPortrait,
    shot: salamanderShot,
    shotAlt: 'Salamander’s finger guns hit FightGuy among the giant trees of Log Off.',
    epithet: 'The gunslinger',
    pitch: 'The fastest fingers in the West. A lanky salamander in a poncho and sombrero, with a fake mustache and no actual gun. He fires finger guns, blows the smoke off and twirls them back into the holster.',
    tags: ['Mid range', 'Projectiles', 'Mobility'],
    signature: 'A',
    gameplan: [
      'Tap Q for Finger Guns: one shot per tap, six in the cylinder, then the reload. Count your shots.',
      'Roll past them with Tumbleweed (R) and pop out firing back the way you came.',
      'Hold F to charge Big Iron, then release a big, slow shot at your target.',
    ],
    strengths: ['Finger Guns have no cooldown, just a six-shot cylinder', 'Shooting in the air slows his fall and pushes him back', 'Sombrero Copter works with his jumps spent'],
    weaknesses: ['Six shots, then a reload, and no refill over time', 'Tumbleweed’s shot only goes back the way he came'],
    specials: [
      {
        slot: 'A', name: 'Finger Guns', cooldownSeconds: 0,
        limit: '6 shots, then a reload',
        text: 'Tap to fire one shot where you face; the stick turns you first. Six shots, then you blow the smoke, twirl and holster: that’s the reload. No refill over time. In the air each shot slows your fall and pushes you back.',
      },
      {
        slot: 'E', name: 'Sombrero Copter', cooldownSeconds: 3.5,
        text: 'Grab the brim and spin the sombrero like a rotor: it lifts you high. Push the stick to trade height for reach and steer on the way up. Works with your jumps spent.',
      },
      {
        slot: 'R', name: 'Tumbleweed', cooldownSeconds: 4,
        text: 'Tuck into a ball and roll forward like a tumbleweed, then pop out and fire one shot back over your shoulder, the way you came.',
      },
      {
        slot: 'F', name: 'Big Iron', cooldownSeconds: 5,
        text: 'Hold to charge a two-handed finger gun, release a big, slow shot toward your target. The recoil throws your arms up and half peels off the mustache.',
      },
    ],
    normals: {
      ground: ['Haymaker', 'Jumping Uppercut', 'Tail Spin'],
      air: ['Double Tap', 'Tail Whip', 'Spur Stomp'],
    },
    movement: { run: 11.5, air: 9, jump: 10.4, gravity: 24 },
  },
  {
    id: 'nyx',
    name: 'Nyx',
    accent: '#8a4fd8',
    wip: true,
    portrait: nyxPortrait,
    shot: nyxShot,
    shotAlt: 'In the Slop Pit, Nyx raises a shadow hand behind FightGuy: Grasp is about to drag him to her feet.',
    epithet: 'The witch with another side',
    pitch: 'A goth witch with a second life as an influencer. Nyx barely moves while her shadows hit from range. Go live and she’s Nyxxie, who never stops moving and hits hard up close. The swap is the fun part.',
    tags: ['Two forms', 'Zoner', 'Combos'],
    signature: 'F',
    gameplan: [
      'As Nyx, keep them busy from range: Hex Crow (Q) chases them, Grasp (R) drags them to your feet.',
      'Going Live (F) swaps you to Nyxxie, and the flash pulls everyone nearby in, right where the brawler wants them.',
      'Land a hit, then press F during its recovery to swap on the spot. A perched crow survives the swap: Nyxxie’s next hit pops it.',
    ],
    strengths: ['Two kits in one fighter', 'Both swaps hit: Going Live pulls in, Logging Off pushes out', 'Floaty as Nyx, fast as Nyxxie'],
    weaknesses: ['Nyx is slow on the ground', 'Nyxxie falls fast', 'Hex Crow is slow: outrun it, shield it or hit it away'],
    specials: [
      {
        slot: 'A', name: 'Hex Crow', cooldownSeconds: 2,
        text: 'A slow crow flies at your target. They can outrun it, shield it or hit it away. If it arrives, it perches on their head, and Nyxxie’s next hit pops it for a bonus hit.',
      },
      {
        slot: 'E', name: 'Bat Scatter', cooldownSeconds: 4,
        text: 'Burst into bats, fly where the stick points and re-form.',
      },
      {
        slot: 'R', name: 'Grasp', cooldownSeconds: 4,
        text: 'After a warning, a shadow hand rises under your target and drags them to your feet.',
      },
      {
        slot: 'F', name: 'Going Live', cooldownSeconds: 5,
        text: 'A white and pink flash swaps you to Nyxxie and pulls nearby enemies in.',
      },
    ],
    normals: {
      ground: ['Shadow Flick', 'Grasping Hands', 'Shadow Lash'],
      air: ['Shadow Ring', 'Up Claw', 'Shadow Fist'],
    },
    movement: { run: 10, air: 7, jump: 10, gravity: 20 },
    alternateForm: {
      name: 'Nyxxie',
      portrait: nyxxiePortrait,
      pitch: 'The influencer. Phone, ring light and platform boots: she never stops moving and hits hard up close.',
      specials: [
        {
          slot: 'A', name: 'Ring Light', cooldownSeconds: 2,
          text: 'Snap toward your target and flash a short cone that dazzles everyone facing you. Back turned? Nothing.',
        },
        {
          slot: 'E', name: 'Ring Light Rise', cooldownSeconds: 4,
          text: 'The ring light spins like a helicopter rotor and lifts you. Steer on the way up.',
        },
        {
          slot: 'R', name: 'Selfie Grab', cooldownSeconds: 4,
          text: 'A short lunge into a command grab. Pose, and the selfie flash blasts them away.',
        },
        {
          slot: 'F', name: 'Logging Off', cooldownSeconds: 5,
          text: 'A violet shard burst swaps you back to Nyx and pushes nearby enemies away.',
        },
      ],
      normals: {
        ground: ['Phone Slaps', 'Ring Light Uppercut', 'Platform Stomp-Kick'],
        air: ['Spinning Slap', 'Ring Light Overhead', 'Double Dropkick'],
      },
      movement: { run: 13, air: 8, jump: 13, gravity: 38 },
    },
  },
]

export const fighterById = (id: string) => fighters.find((fighter) => fighter.id === id)

/** Every kit on the roster, alternate forms included, for scales shared across fighters. */
export const kits: Kit[] = fighters.flatMap((fighter) => (fighter.alternateForm ? [fighter, fighter.alternateForm] : [fighter]))

/** Apex height of a full jump from the tuning values, ignoring air-float windows. */
export const jumpHeight = ({ jump, gravity }: Kit['movement']) => (jump * jump) / (2 * gravity)
