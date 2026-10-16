import type { ImageMetadata } from 'astro'
import type { Lang } from '../i18n'
import fightguyPortrait from '../assets/fighters/fightguy-portrait.png'
import mankiPortrait from '../assets/fighters/manki-portrait.png'
import wibouPortrait from '../assets/fighters/wibou-portrait.png'
import bonkPortrait from '../assets/fighters/bonk-portrait.png'
import fightguyShot from '../assets/screens/fightguy-vs-manki-pool.jpg'
import mankiShot from '../assets/screens/manki-vs-wibou.jpg'
import wibouShot from '../assets/screens/wibou-vs-bonk.jpg'
import bonkShot from '../assets/screens/bonk-vs-fightguy.jpg'

type Text = Record<Lang, string>
type List = Record<Lang, string[]>

export type SpecialSlot = 'A' | 'E' | 'R' | 'F'

export interface Special {
  slot: SpecialSlot
  name: string
  cooldownSeconds: number
  text: Text
}

export interface Fighter {
  id: 'fightguy' | 'manki' | 'wibou' | 'bonk'
  name: string
  accent: string
  portrait: ImageMetadata
  shot: ImageMetadata
  shotAlt: Text
  epithet: Text
  pitch: Text
  tags: List
  signature: SpecialSlot
  gameplan: List
  strengths: List
  weaknesses: List
  specials: Special[]
  normals: { ground: string[]; air: string[] }
  /** Character-package tuning: m/s for speeds, m/s² for gravity. */
  movement: { run: number; air: number; jump: number; gravity: number }
}

// Move names, cooldowns and movement come from each package's character.json
// in the game repository (snapshot of 16 October 2026). Playtest values move.
export const tuningSnapshot = '2026-10-16'

export const fighters: Fighter[] = [
  {
    id: 'fightguy',
    name: 'FightGuy',
    accent: '#3a8dde',
    portrait: fightguyPortrait,
    shot: fightguyShot,
    shotAlt: {
      en: 'FightGuy lands a flying kick on Manki on a teal pool deck.',
      fr: 'FightGuy place un coup de pied sauté sur Manki au bord d’un bassin turquoise.',
    },
    epithet: { en: 'The all-rounder', fr: 'Le polyvalent' },
    pitch: {
      en: 'Fists, feet and ki. FightGuy is the reference fighter: quick normals up close, a chargeable Ki Shot from range, and a punch flurry for anyone who gets comfortable.',
      fr: 'Poings, pieds et ki. FightGuy est le combattant de référence : des coups rapides au corps à corps, un Ki Shot chargeable à distance et une rafale de coups de poing pour ceux qui se sentent trop à l’aise.',
    },
    tags: { en: ['Close range', 'All-rounder', 'Projectile'], fr: ['Corps à corps', 'Polyvalent', 'Projectile'] },
    signature: 'F',
    gameplan: {
      en: [
        'Poke from range with Ki Shot. Hold A to charge it bigger.',
        'Get in with Cyclone Kick (R) and keep the pressure on with fast normals.',
        'When they’re stuck, Fist of Fury (F) drags them in for a heavy kick finisher.',
      ],
      fr: [
        'Harcelez à distance avec le Ki Shot. Maintenez A pour le charger.',
        'Entrez avec le Cyclone Kick (R) et gardez la pression avec vos coups rapides.',
        'Quand l’adversaire est coincé, Fist of Fury (F) l’aspire avant un gros coup de pied final.',
      ],
    },
    strengths: {
      en: ['Fast, simple normals', 'A projectile for every distance', 'Rising Dragon brings you home'],
      fr: ['Des coups normaux rapides et simples', 'Un projectile pour chaque distance', 'Rising Dragon pour revenir sur le terrain'],
    },
    weaknesses: {
      en: ['Has to get close to really hurt', 'Cyclone Kick commits you for over a second'],
      fr: ['Doit s’approcher pour faire vraiment mal', 'Le Cyclone Kick vous engage plus d’une seconde'],
    },
    specials: [
      {
        slot: 'A', name: 'Ki Shot', cooldownSeconds: 2,
        text: {
          en: 'Hold to charge through three tiers, release to fire a ki ball at your target. More charge means a bigger ball, not more damage.',
          fr: 'Maintenez pour charger sur trois niveaux, relâchez pour tirer une boule de ki vers votre cible. Plus de charge, c’est une boule plus grosse, pas plus de dégâts.',
        },
      },
      {
        slot: 'E', name: 'Rising Dragon', cooldownSeconds: 4,
        text: {
          en: 'A rising uppercut. Your ticket back to the stage.',
          fr: 'Un uppercut ascendant. Votre ticket de retour sur le terrain.',
        },
      },
      {
        slot: 'R', name: 'Cyclone Kick', cooldownSeconds: 4,
        text: {
          en: 'Spin forward in a long kicking cyclone that hits each opponent once. Great for crossing the stage, bad for changing your mind.',
          fr: 'Avancez en tournoyant dans un long cyclone de coups de pied qui touche chaque adversaire une fois. Idéal pour traverser l’arène, nul pour changer d’avis.',
        },
      },
      {
        slot: 'F', name: 'Fist of Fury', cooldownSeconds: 12,
        text: {
          en: 'Seven punches that drag the victim in, then a heavy right-foot finisher sends them flying.',
          fr: 'Sept coups de poing qui aspirent la victime, puis un gros coup de pied droit qui l’envoie valser.',
        },
      },
    ],
    normals: {
      ground: ['Low Kick', 'Straight Punch', 'High Kick', 'Double Kick'],
      air: ['Double Punch', 'Floating Kick', 'High Kick', 'Air Smash'],
    },
    movement: { run: 12, air: 7, jump: 10.8, gravity: 28 },
  },
  {
    id: 'manki',
    name: 'Manki',
    accent: '#f07a1e',
    portrait: mankiPortrait,
    shot: mankiShot,
    shotAlt: {
      en: 'Manki sets off an explosion next to Wibou in a dark warehouse arena.',
      fr: 'Manki déclenche une explosion à côté de Wibou dans un entrepôt sombre.',
    },
    epithet: { en: 'The mad bomber monkey', fr: 'Le singe artificier' },
    pitch: {
      en: 'A pyromaniac monkey with a jetpack and no safety training. Manki lobs bombs, fires a bazooka, sets the air on fire and floats out of trouble.',
      fr: 'Un singe pyromane avec un jetpack et zéro formation sécurité. Manki lance des bombes, tire au bazooka, met le feu à l’air ambiant et s’envole quand ça chauffe.',
    },
    tags: { en: ['Zoner', 'Floaty', 'Explosives'], fr: ['Zoneur', 'Aérien', 'Explosifs'] },
    signature: 'R',
    gameplan: {
      en: [
        'Hold A to aim a Round Bomb on the ground, release to lob it. Make them walk around it.',
        'Poke with the Bazooka (R) from wherever you happen to be floating.',
        'When they rush you, commit to Aerosol Inferno (F), then Jetpack Boost (E) out.',
      ],
      fr: [
        'Maintenez A pour viser au sol avec la Round Bomb, relâchez pour la lancer. Forcez-les à la contourner.',
        'Harcelez au Bazooka (R), d’où que vous flottiez.',
        'Quand ils foncent sur vous, engagez Aerosol Inferno (F), puis décollez au Jetpack Boost (E).',
      ],
    },
    strengths: {
      en: ['Best air control in the roster', 'Explosives for every distance', 'Jetpack Boost is a huge vertical recovery'],
      fr: ['Le meilleur contrôle aérien du roster', 'Des explosifs pour chaque distance', 'Le Jetpack Boost, une énorme remontée verticale'],
    },
    weaknesses: {
      en: ['Jetpack Boost has a vulnerable wind-up and can’t be steered', 'The big stuff sits on long cooldowns'],
      fr: ['Le Jetpack Boost a un temps de chauffe vulnérable et ne se dirige pas', 'Les gros coups ont de longs temps de recharge'],
    },
    specials: [
      {
        slot: 'A', name: 'Round Bomb', cooldownSeconds: 4,
        text: {
          en: 'Hold to aim a cursor on the ground, release to lob an explosive bomb onto it.',
          fr: 'Maintenez pour placer un viseur au sol, relâchez pour y lober une bombe explosive.',
        },
      },
      {
        slot: 'E', name: 'Jetpack Boost', cooldownSeconds: 3.5,
        text: {
          en: 'Crouch, ignite, blast upward. Steering comes back at the top of the arc.',
          fr: 'Accroupi, allumage, décollage. Vous retrouvez le contrôle au sommet de la trajectoire.',
        },
      },
      {
        slot: 'R', name: 'Bazooka', cooldownSeconds: 4,
        text: {
          en: 'Fire a rocket where the camera points. It arcs and explodes on impact.',
          fr: 'Tirez une roquette là où pointe la caméra. Elle suit une courbe et explose à l’impact.',
        },
      },
      {
        slot: 'F', name: 'Aerosol Inferno', cooldownSeconds: 10,
        text: {
          en: 'Shake the can, flick the lighter, project a column of fire forward. Catches anyone in front of or above you.',
          fr: 'Secouez la bombe, allumez le briquet : une colonne de feu jaillit vers l’avant et attrape tout ce qui est devant ou au-dessus de vous.',
        },
      },
    ],
    normals: {
      ground: ['Monkey Punch', 'Straight Punch', 'Sweeping Kick', 'Head Slam'],
      air: ['Air Kick', 'Air Swing', 'Double Fist Slam', 'Air Smash'],
    },
    movement: { run: 11.5, air: 9, jump: 10.4, gravity: 24 },
  },
  {
    id: 'wibou',
    name: 'Wibou',
    accent: '#5fd84a',
    portrait: wibouPortrait,
    shot: wibouShot,
    shotAlt: {
      en: 'Wibou leaps with a green sword slash toward Bonk on a wooden deck.',
      fr: 'Wibou bondit avec un coup d’épée vert vers Bonk sur un pont en bois.',
    },
    epithet: { en: 'The sword duelist', fr: 'Le duelliste' },
    pitch: {
      en: 'Shades on, blade out. The fastest fighter on foot, with a sword that owns the space in front of it. Wibou throws shuriken, dashes through gaps and sends people up, then straight back down.',
      fr: 'Lunettes noires, lame au clair. Le combattant le plus rapide au sol, avec une épée qui contrôle tout l’espace devant elle. Wibou lance des shurikens, fonce dans les ouvertures et envoie ses adversaires en l’air, puis droit au sol.',
    },
    tags: { en: ['Mid range', 'Fast', 'Sword'], fr: ['Mi-distance', 'Rapide', 'Épée'] },
    signature: 'F',
    gameplan: {
      en: [
        'Control mid-range with sword normals and Shuriken Toss (A).',
        'Close the gap with Dash Slash (R): aim it, then go.',
        'Cash out with Skyfall (F): launch them up, follow, spike them down.',
      ],
      fr: [
        'Contrôlez la mi-distance avec les coups d’épée et le Shuriken Toss (A).',
        'Réduisez l’écart avec le Dash Slash (R) : visez, puis foncez.',
        'Concluez avec Skyfall (F) : envoyez-les en l’air, suivez, écrasez-les au sol.',
      ],
    },
    strengths: {
      en: ['Fastest run in the roster', 'Sword normals outrange fists', 'Cheap specials: Rising Slash and Dash Slash recharge in 1.5 s'],
      fr: ['La course la plus rapide du roster', 'Des coups d’épée qui portent plus loin que des poings', 'Des spéciales bon marché : Rising Slash et Dash Slash se rechargent en 1,5 s'],
    },
    weaknesses: {
      en: ['Falls fast, so less time to make it back', 'Dash Slash ends in a committed recovery, even on a whiff'],
      fr: ['Tombe vite : moins de temps pour revenir', 'Le Dash Slash se termine par une récupération engagée, même dans le vide'],
    },
    specials: [
      {
        slot: 'A', name: 'Shuriken Toss', cooldownSeconds: 2,
        text: {
          en: 'After a short startup, throw three shuriken at your target.',
          fr: 'Après une courte préparation, lancez trois shurikens vers votre cible.',
        },
      },
      {
        slot: 'E', name: 'Rising Slash', cooldownSeconds: 1.5,
        text: {
          en: 'An upward slash that carries you into the air. Recovery with an edge.',
          fr: 'Un coup d’épée ascendant qui vous emporte dans les airs. Une remontée qui coupe.',
        },
      },
      {
        slot: 'R', name: 'Dash Slash', cooldownSeconds: 1.5,
        text: {
          en: 'Hold to aim and charge, release to dash and slash. Longer charge, longer dash.',
          fr: 'Maintenez pour viser et charger, relâchez pour foncer et trancher. Plus de charge, plus de distance.',
        },
      },
      {
        slot: 'F', name: 'Skyfall', cooldownSeconds: 9,
        text: {
          en: 'Launch the opponent upward, follow them into the air, then spike them straight down.',
          fr: 'Projetez l’adversaire vers le haut, suivez-le dans les airs, puis écrasez-le droit au sol.',
        },
      },
    ],
    normals: {
      ground: ['Quick Slash', 'Double Slash', 'Up Slash', 'Heavy Down Slash'],
      air: ['Air Slash', 'Reverse Slash', 'Air Up Slash', 'Air Heavy Down Slash'],
    },
    movement: { run: 14, air: 7, jump: 12, gravity: 32 },
  },
  {
    id: 'bonk',
    name: 'Bonk',
    accent: '#d2402f',
    portrait: bonkPortrait,
    shot: bonkShot,
    shotAlt: {
      en: 'Bonk swings a huge greatsword across a dark warehouse floor while FightGuy stays out of reach.',
      fr: 'Bonk balaie le sol d’un entrepôt avec son énorme épée pendant que FightGuy garde ses distances.',
    },
    epithet: { en: 'The greatsword', fr: 'Le colosse' },
    pitch: {
      en: 'Big sword. Bigger bonk. Slow on the ground, huge jumps, and armor on the moves that matter. Every swing is a commitment. So is getting hit by one.',
      fr: 'Grosse épée. Gros bonk. Lent au sol, de grands sauts et de l’armure sur les coups qui comptent. Chaque coup est un engagement. Se le prendre aussi.',
    },
    tags: { en: ['Heavy hitter', 'Armor', 'Reach'], fr: ['Frappe lourde', 'Armure', 'Allonge'] },
    signature: 'R',
    gameplan: {
      en: [
        'Wall them out with the sword: Reverse Slash to check, Greatsword Swing to space.',
        'Push through attacks with Shoulder Bash (A) or Charging Double Slash (R). Armor means you still take the damage, just not the launch.',
        'Go for the kill with Heavy Double Slice. Off the stage? Targeted Jump Slam (E) picks your landing spot.',
      ],
      fr: [
        'Tenez-les à distance avec l’épée : Reverse Slash pour contrôler, Greatsword Swing pour espacer.',
        'Traversez les attaques avec Shoulder Bash (A) ou Charging Double Slash (R) : l’armure vous fait encaisser les dégâts, pas l’éjection.',
        'Finissez avec Heavy Double Slice. Hors du terrain ? Le Targeted Jump Slam (E) choisit votre point d’atterrissage.',
      ],
    },
    strengths: {
      en: ['Greatsword reach on every normal', 'Armor on Shoulder Bash and Charging Double Slash', 'Biggest jump in the roster'],
      fr: ['L’allonge de l’épée sur chaque coup normal', 'De l’armure sur Shoulder Bash et Charging Double Slash', 'Le plus grand saut du roster'],
    },
    weaknesses: {
      en: ['Slowest run and the least air control', 'Heavy swings have long recovery: whiff and you’ll feel it', 'Blade Storm has the longest cooldown in the game'],
      fr: ['La course la plus lente et le moins de contrôle aérien', 'Les gros coups ont une longue récupération : ratez, et vous le sentirez', 'Blade Storm a le plus long temps de recharge du jeu'],
    },
    specials: [
      {
        slot: 'A', name: 'Shoulder Bash', cooldownSeconds: 2,
        text: {
          en: 'Drive forward shoulder-first, then slam them with your head. Armored on the way in.',
          fr: 'Foncez épaule en avant, puis finissez d’un coup de tête. Avec armure à l’approche.',
        },
      },
      {
        slot: 'E', name: 'Targeted Jump Slam', cooldownSeconds: 4,
        text: {
          en: 'Hold to place a ring on the ground, release to leap onto it and slam on landing.',
          fr: 'Maintenez pour placer un cercle au sol, relâchez pour bondir dessus et frapper à l’atterrissage.',
        },
      },
      {
        slot: 'R', name: 'Charging Double Slash', cooldownSeconds: 4,
        text: {
          en: 'An armored lunge. The first slash holds them in place; the second, stronger swing sends them.',
          fr: 'Une charge avec armure. Le premier coup les immobilise, le second, plus fort, les envoie valser.',
        },
      },
      {
        slot: 'F', name: 'Blade Storm', cooldownSeconds: 15,
        text: {
          en: 'Hilt-to-tip greatsword slashes, over and over, ending in a heavy finisher.',
          fr: 'Des coups d’épée de la garde à la pointe, encore et encore, jusqu’au coup final.',
        },
      },
    ],
    normals: {
      ground: ['Reverse Slash', 'Greatsword Swing', 'Reverse Rising Slash', 'Heavy Double Slice'],
      air: ['Reverse Air Slash', 'Air Cleave', 'Downward Sweep', 'Acrobatic Double Slice'],
    },
    movement: { run: 10, air: 6, jump: 13, gravity: 26 },
  },
]

export const fighterById = (id: string) => fighters.find((fighter) => fighter.id === id)

/** Apex height of a full jump from the tuning values, ignoring air-float windows. */
export const jumpHeight = ({ jump, gravity }: Fighter['movement']) => (jump * jump) / (2 * gravity)
