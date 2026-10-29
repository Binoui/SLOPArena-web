import type { ImageMetadata } from 'astro'
import type { Lang } from '../i18n'
import fightguyPortrait from '../assets/fighters/fightguy-portrait.png'
import mankiPortrait from '../assets/fighters/manki-portrait.png'
import wibouPortrait from '../assets/fighters/wibou-portrait.png'
import bonkPortrait from '../assets/fighters/bonk-portrait.png'
import fightguyShot from '../assets/screens/fightguy-fist-of-fury.jpg'
import mankiShot from '../assets/screens/manki-bazooka-rooftop.jpg'
import wibouShot from '../assets/screens/wibou-skyfall.jpg'
import bonkShot from '../assets/screens/bonk-cake-slam.jpg'

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
// in the game repository (snapshot of 21 October 2026). Playtest values move.
export const tuningSnapshot = '2026-10-21'

export const fighters: Fighter[] = [
  {
    id: 'fightguy',
    name: 'FightGuy',
    accent: '#3a8dde',
    portrait: fightguyPortrait,
    shot: fightguyShot,
    shotAlt: {
      en: 'FightGuy’s Fist of Fury finisher launches Bonk across the Slop Pit.',
      fr: 'Le coup final du Fist of Fury de FightGuy envoie Bonk valser à travers le Slop Pit.',
    },
    epithet: { en: 'The all-rounder', fr: 'Le polyvalent' },
    pitch: {
      en: 'The underground champion, and very pleased about it. FightGuy backs up the grin with quick punches, flying kicks and blue ki. A straightforward all-rounder with a show-off streak.',
      fr: 'Le champion des combats clandestins, et il en est très fier. FightGuy accompagne son grand sourire de coups de poing rapides, de pieds voltigeurs et de ki bleu. Un polyvalent facile à prendre en main, qui adore frimer.',
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
      en: ['Has to get close to really hurt', 'Cyclone Kick leaves a punish window at the end'],
      fr: ['Doit s’approcher pour faire vraiment mal', 'La fin du Cyclone Kick vous laisse exposé'],
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
          en: 'A rapid punch flurry pulls the opponent in, then a heavy right-foot finisher sends them flying.',
          fr: 'Une rafale de coups de poing attire l’adversaire, puis un gros coup de pied droit l’envoie valser.',
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
      en: 'Manki’s bazooka blast sends FightGuy flying off a neon rooftop dance floor.',
      fr: 'L’explosion du bazooka de Manki envoie FightGuy valser depuis la piste de danse d’un toit sous les néons.',
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
        'Hold Aerosol Inferno (F) to build up a bigger flame, release to fire, then Jetpack Boost (E) out.',
      ],
      fr: [
        'Maintenez A pour viser au sol avec la Round Bomb, relâchez pour la lancer. Forcez-les à la contourner.',
        'Harcelez au Bazooka (R), d’où que vous flottiez.',
        'Maintenez Aerosol Inferno (F) pour préparer une plus grosse flamme, relâchez pour tirer, puis décollez au Jetpack Boost (E).',
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
          en: 'Hold to aim with the camera, release to fire a rocket. It arcs and explodes on impact.',
          fr: 'Maintenez pour viser avec la caméra, relâchez pour tirer une roquette. Elle suit une courbe et explose à l’impact.',
        },
      },
      {
        slot: 'F', name: 'Aerosol Inferno', cooldownSeconds: 10,
        text: {
          en: 'Hold to shake the can and aim, release to fire. Charging adds damage and reach to the flame, but leaves you sitting still.',
          fr: 'Maintenez pour secouer la bombe et viser, relâchez pour cracher du feu. La charge augmente les dégâts et la portée, mais vous restez immobile.',
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
      en: 'Wibou’s Skyfall slashes down at FightGuy in a forest campsite at sunset.',
      fr: 'Le Skyfall de Wibou s’abat sur FightGuy dans un camping en forêt, au coucher du soleil.',
    },
    epithet: { en: 'The sword duelist', fr: 'Le duelliste' },
    pitch: {
      en: 'Shades, katana and far too much anime. Wibou is a mall ninja with green hacker effects and the fastest run in the roster. Keep people at sword’s reach, cut through a gap, then send them up and straight back down.',
      fr: 'Lunettes noires, katana et beaucoup trop d’anime. Wibou joue au ninja avec ses effets de hacker verts et la course la plus rapide du roster. Gardez l’adversaire à portée de lame, foncez dans une ouverture, puis envoyez-le en l’air et droit au sol.',
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
          en: 'Tap to throw three projectiles toward your current target after a short startup. The kunai fly straight: no manual aiming or homing.',
          fr: 'Une pression lance trois projectiles vers votre cible après une courte préparation. Les kunais volent droit : sans visée manuelle ni tête chercheuse.',
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
          en: 'Hold to aim and charge, release to dash in that direction and slash at the end. More charge adds distance and damage. Shields and terrain stop you; the recovery leaves you open even if you miss.',
          fr: 'Maintenez pour viser et charger, relâchez pour foncer dans cette direction et trancher à l’arrivée. La charge augmente la distance et les dégâts. Boucliers et terrain vous arrêtent ; la récupération vous expose même si vous ratez.',
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
      en: 'Bonk’s jump slam lands on a birthday cake and sends Manki flying toward a bunk bed.',
      fr: 'Le saut écrasant de Bonk atterrit sur un gâteau d’anniversaire et envoie Manki valser vers des lits superposés.',
    },
    epithet: { en: 'The big hitter', fr: 'Le colosse' },
    pitch: {
      en: 'A good-natured brute with a bucket helmet and a very big swing. Bonk wants to be a hero, protects anyone smaller than him and occasionally rings his own head. Slow feet, huge jumps, simple plans: BONK!',
      fr: 'Un bon gros costaud avec un seau sur la tête et des coups énormes. Bonk veut être un héros, protège tous ceux qui sont plus petits que lui et se sonne parfois tout seul. Des pas lents, de grands sauts, un plan simple : BONK !',
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
          en: 'Armor covers the opening lunge and first slash, which holds them in place. The stronger second swing sends them flying, but leaves Bonk exposed.',
          fr: 'L’armure couvre la charge et le premier coup, qui maintient l’adversaire sur place. Le second coup l’envoie valser, mais laisse Bonk exposé.',
        },
      },
      {
        slot: 'F', name: 'Blade Storm', cooldownSeconds: 15,
        text: {
          en: 'Spin low through two hits that pull the opponent in, then a heavy finisher. The dizzy recovery is your opponent’s chance to hit back.',
          fr: 'Tournez au ras du sol : deux coups attirent l’adversaire, puis un gros coup final l’éjecte. La récupération étourdie laisse à l’adversaire le temps de riposter.',
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
