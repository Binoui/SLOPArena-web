import type { ImageMetadata } from 'astro'
import type { Lang } from '../i18n'
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

type Text = Record<Lang, string>
type List = Record<Lang, string[]>

/** The package's special slot ids. The key each one sits on is `ui[lang].specialKeys`. */
export type SpecialSlot = 'A' | 'E' | 'R' | 'F'

export interface Special {
  slot: SpecialSlot
  name: string
  cooldownSeconds: number
  /** Shown instead of the cooldown for specials limited by ammo rather than time. */
  limit?: Text
  text: Text
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
  pitch: Text
}

export interface Fighter extends Kit {
  id: 'fightguy' | 'manki' | 'wibou' | 'bonk' | 'bashie' | 'salamander' | 'nyx'
  name: string
  accent: string
  /** Mirrors the game's MenuRoster.IsWorkInProgress: kit and art still being built. */
  wip?: true
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
    shotAlt: {
      en: 'FightGuy’s flurry finisher sends his opponent flying across the Slop Pit.',
      fr: 'Le coup final de la rafale de FightGuy envoie son adversaire valser à travers le Slop Pit.',
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
        'Poke from range with Ki Shot. Hold Q to charge it bigger.',
        'Get in with Cyclone Kick (R): it carries them along and launches them at the end.',
        'Shields won’t save them: Title Match (F) grabs straight through a block, punches away, then kicks them off the stage.',
      ],
      fr: [
        'Harcelez à distance avec le Ki Shot. Maintenez A pour le charger.',
        'Entrez avec le Cyclone Kick (R) : il embarque l’adversaire et l’éjecte à la fin.',
        'Le bouclier ne les sauvera pas : Title Match (F) les attrape à travers leur garde, les roue de coups, puis les sort de l’arène d’un coup de pied.',
      ],
    },
    strengths: {
      en: ['Fast, simple normals', 'A projectile for every distance', 'Rising Dragon kills point blank and brings you home'],
      fr: ['Des coups normaux rapides et simples', 'Un projectile pour chaque distance', 'Rising Dragon tue à bout portant et vous ramène sur le terrain'],
    },
    weaknesses: {
      en: ['Has to get close to really hurt', 'A whiffed Cyclone Kick or Title Match leaves him wide open'],
      fr: ['Doit s’approcher pour faire vraiment mal', 'Un Cyclone Kick ou un Title Match dans le vide le laisse grand ouvert'],
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
          en: 'A rising uppercut and your ticket back to the stage. Land it point blank in the first frames and it launches straight up, hard enough to KO. A late catch only pops them up.',
          fr: 'Un uppercut ascendant, votre ticket de retour sur le terrain. Placé à bout portant dès les premières frames, il envoie droit vers le haut, assez fort pour éjecter. Trop tard, il ne fait que soulever l’adversaire.',
        },
      },
      {
        slot: 'R', name: 'Cyclone Kick', cooldownSeconds: 4,
        text: {
          en: 'Spin forward in a long kicking cyclone that drags whoever it catches along, then launches them at the end. Whiff it and you finish seeing stars.',
          fr: 'Avancez en tournoyant dans un long cyclone de coups de pied qui embarque tous ceux qu’il touche, puis les éjecte à la fin. Dans le vide, vous finissez en voyant des étoiles.',
        },
      },
      {
        slot: 'F', name: 'Title Match', cooldownSeconds: 12,
        text: {
          en: 'Lunge at your target and grab them, shield or not. Hold them through a punch flurry, then a heavy right-foot kick sends them flying. An air dodge slips it, and a miss leaves you hanging.',
          fr: 'Bondissez sur votre cible et attrapez-la, bouclier ou pas. Gardez-la pendant une rafale de coups de poing, puis un gros coup de pied droit l’envoie valser. Une esquive aérienne y échappe, et un raté vous laisse en plan.',
        },
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
    shotAlt: {
      en: 'Manki’s bazooka blast sends FightGuy flying off a neon rooftop dance floor.',
      fr: 'L’explosion du bazooka de Manki envoie FightGuy valser depuis la piste de danse d’un toit sous les néons.',
    },
    epithet: { en: 'The mad bomber monkey', fr: 'Le singe artificier' },
    pitch: {
      en: 'A pyromaniac monkey with a jetpack and no safety training. Manki takes off, drops bombs on your head, fires homing rockets and, when the moment is right, flies straight into you.',
      fr: 'Un singe pyromane avec un jetpack et zéro formation sécurité. Manki décolle, vous lâche des bombes sur la tête, tire des roquettes à tête chercheuse et, au bon moment, vous fonce droit dessus.',
    },
    tags: { en: ['Zoner', 'Flyer', 'Explosives'], fr: ['Zoneur', 'Volant', 'Explosifs'] },
    signature: 'E',
    gameplan: {
      en: [
        'Take off with Jetpack Flight (E): steer with the stick, tap jump for height and watch the fuel bar.',
        'Make a bombing run with Bombs Away (Q) and fire the Bazooka (R). Neither ends the flight.',
        'When they’re ripe, Kamikaze (F) locks on and flies you straight into them. Boom.',
      ],
      fr: [
        'Décollez avec Jetpack Flight (E) : dirigez au stick, appuyez sur saut pour prendre de la hauteur et surveillez la jauge de carburant.',
        'Bombardez avec Bombs Away (A) et tirez au Bazooka (R). Aucun des deux n’interrompt le vol.',
        'Quand ils sont à point, Kamikaze (F) verrouille la cible et vous projette droit dessus. Boum.',
      ],
    },
    strengths: {
      en: ['He flies: Jetpack Flight is a long, steerable recovery', 'Bombs and homing rockets, straight from the air', 'Kamikaze is a kill threat from anywhere'],
      fr: ['Il vole : Jetpack Flight est une longue remontée qui se dirige', 'Des bombes et des roquettes à tête chercheuse, directement depuis les airs', 'Kamikaze peut éjecter depuis n’importe où'],
    },
    weaknesses: {
      en: ['Any hit knocks him out of the sky', 'Fuel only refills on landing, and E recharges only once the flight ends', 'Stand too close to your own rocket and it hurts you too'],
      fr: ['Le moindre coup le fait tomber du ciel', 'Le carburant ne se recharge qu’à l’atterrissage, et E seulement une fois le vol terminé', 'Trop près de votre propre roquette, et elle vous fait mal aussi'],
    },
    specials: [
      {
        slot: 'A', name: 'Bombs Away', cooldownSeconds: 0.3,
        limit: { en: '3 bombs, one back every 6 s', fr: '3 bombes, une de plus toutes les 6 s' },
        text: {
          en: 'No aiming. In flight, a bomb drops straight down and blows up on the ground or on whoever is under it. On foot, Manki hops back and leaves a short-fuse bomb where he stood. Only opponents get hurt.',
          fr: 'Pas de visée. En vol, une bombe tombe à la verticale et explose au sol ou sur celui qui est dessous. À pied, Manki saute en arrière et laisse une bombe à mèche courte là où il était. Seuls les adversaires prennent des dégâts.',
        },
      },
      {
        slot: 'E', name: 'Jetpack Flight', cooldownSeconds: 3.5,
        text: {
          en: 'A short ignition, then real flight: the stick steers, jump gives a burst of height, E again cuts the engine. Fuel only refills on landing.',
          fr: 'Un court allumage, puis un vrai vol : le stick dirige, saut donne un coup de hauteur, E à nouveau coupe le moteur. Le carburant ne se recharge qu’à l’atterrissage.',
        },
      },
      {
        slot: 'R', name: 'Bazooka', cooldownSeconds: 4,
        text: {
          en: 'Press to fire a homing rocket at your target, even mid-flight. Dodge past it or get behind it to break the lock.',
          fr: 'Appuyez pour tirer une roquette à tête chercheuse vers votre cible, même en plein vol. Esquivez-la ou passez derrière pour casser le verrouillage.',
        },
      },
      {
        slot: 'F', name: 'Kamikaze', cooldownSeconds: 7,
        text: {
          en: 'Lock onto your target and rocket into them for a huge explosive finisher. From flight, it’s a dive-bomb. The blast throws Manki too, but only hurts them.',
          fr: 'Verrouillez votre cible et fusez sur elle pour un final explosif. En vol, c’est un bombardement en piqué. L’explosion projette aussi Manki, mais ne blesse que l’adversaire.',
        },
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
    shotAlt: {
      en: 'Wibou slashes down at FightGuy from above in a forest campsite at sunset.',
      fr: 'Wibou s’abat d’un coup d’épée sur FightGuy dans un camping en forêt, au coucher du soleil.',
    },
    epithet: { en: 'The sword duelist', fr: 'Le duelliste' },
    pitch: {
      en: 'Shades, katana and far too much anime. Wibou is a mall ninja with green hacker effects and the fastest run in the roster. Keep people at sword’s reach, cut through a gap and, when it’s time, cut everyone at once.',
      fr: 'Lunettes noires, katana et beaucoup trop d’anime. Wibou joue au ninja avec ses effets de hacker verts et la course la plus rapide du roster. Gardez l’adversaire à portée de lame, foncez dans une ouverture et, le moment venu, tranchez tout le monde d’un coup.',
    },
    tags: { en: ['Mid range', 'Fast', 'Sword'], fr: ['Mi-distance', 'Rapide', 'Épée'] },
    signature: 'F',
    gameplan: {
      en: [
        'Control mid-range with sword normals and Shuriken Toss (Q).',
        'Close the gap with Quick Draw (R). It always dashes the same distance, so space it: the tip cuts hardest.',
        'Cash out with Omae wa mou shindeiru (F): lock everyone in range, cut through each one, sheathe. Then they all pop.',
      ],
      fr: [
        'Contrôlez la mi-distance avec les coups d’épée et le Shuriken Toss (A).',
        'Réduisez l’écart avec le Quick Draw (R). Il fonce toujours sur la même distance, alors jaugez-la : c’est la pointe qui coupe le plus fort.',
        'Concluez avec Omae wa mou shindeiru (F) : verrouillez tout le monde à portée, tranchez-les un par un, rengainez. Et là, tout le monde décolle.',
      ],
    },
    strengths: {
      en: ['Fastest run in the roster', 'Sword normals outrange fists', 'Cheap specials: Rising Slash and Quick Draw recharge in 1.5 s'],
      fr: ['La course la plus rapide du roster', 'Des coups d’épée qui portent plus loin que des poings', 'Des spéciales bon marché : Rising Slash et Quick Draw se rechargent en 1,5 s'],
    },
    weaknesses: {
      en: ['Falls fast, so less time to make it back', 'Shields and walls stop Quick Draw short of the tip', 'Nobody in range for his F? He just stands there'],
      fr: ['Tombe vite : moins de temps pour revenir', 'Boucliers et murs arrêtent le Quick Draw avant la pointe', 'Personne à portée de son F ? Il reste planté là'],
    },
    specials: [
      {
        slot: 'A', name: 'Shuriken Toss', cooldownSeconds: 2,
        text: {
          en: 'Tap to throw three projectiles toward your current target after a short startup. They fly straight: no manual aiming or homing.',
          fr: 'Une pression lance trois projectiles vers votre cible après une courte préparation. Ils volent droit : sans visée manuelle ni tête chercheuse.',
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
        slot: 'R', name: 'Quick Draw', cooldownSeconds: 1.5,
        text: {
          en: 'Tap to dash a fixed distance toward your target and slash. Anyone you pass takes a light cut; whoever ends up on the tip takes the big one. A green bracket on their floor ring says the spacing is right.',
          fr: 'Une pression pour foncer sur une distance fixe vers votre cible en tranchant. Ceux que vous traversez prennent une petite entaille ; celui qui finit au bout de la lame prend le gros coup. Un crochet vert sur son cercle au sol indique la bonne distance.',
        },
      },
      {
        slot: 'F', name: 'Omae wa mou shindeiru', cooldownSeconds: 9,
        text: {
          en: 'A short stance locks up to three opponents nearby. Wibou cuts through each one and sheathes his sword. NANI?! They all pop at once. Runners can escape it; shields and air dodges get out.',
          fr: 'Une courte posture verrouille jusqu’à trois adversaires proches. Wibou les traverse un par un et rengaine. NANI ?! Ils décollent tous en même temps. Ceux qui courent peuvent y échapper ; boucliers et esquives aériennes s’en sortent.',
        },
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
    shotAlt: {
      en: 'Sir Bonk’s Targeted Jump Slam lands on Manki in the middle of a birthday cake. BONK!',
      fr: 'Le Targeted Jump Slam de Sir Bonk atterrit sur Manki, en plein milieu d’un gâteau d’anniversaire. BONK !',
    },
    epithet: { en: 'The self-made knight', fr: 'Le chevalier autoproclamé' },
    pitch: {
      en: 'He knighted himself. A big, good-natured brute in homemade armour: a bucket for a helm, a plank for a sword and pot lids on his shoulders. Sir Bonk protects anyone smaller than him (everyone) and can’t tell a windmill from a giant. Big hits, easy to play. BONK!',
      fr: 'Il s’est adoubé tout seul. Un bon gros costaud en armure maison : un seau pour heaume, une planche pour épée et des couvercles de casserole sur les épaules. Sir Bonk protège tous ceux qui sont plus petits que lui (tout le monde) et ne fait pas la différence entre un moulin et un géant. De gros coups, facile à jouer. BONK !',
    },
    tags: { en: ['Heavy hitter', 'Armor', 'Reach'], fr: ['Frappe lourde', 'Armure', 'Allonge'] },
    signature: 'R',
    gameplan: {
      en: [
        'Wall them out with the plank: Squire’s Cut is quick, Sunrise swats jumpers, The BONK ends stocks.',
        'Skim the Pot-Lid Throw (Q). It hits on the way out and again on the way back, pulling them toward you.',
        'Mount up for The Joust (R): gallop at them, armoured, steering with the stick. Off the stage? Targeted Jump Slam (E) picks your landing spot.',
      ],
      fr: [
        'Tenez-les à distance avec la planche : Squire’s Cut est rapide, Sunrise chasse les sauteurs, The BONK termine les vies.',
        'Lancez le Pot-Lid Throw (A). Il touche à l’aller, puis encore au retour, en ramenant l’adversaire vers vous.',
        'En selle pour The Joust (R) : chargez au galop, en armure, en dirigeant au stick. Hors du terrain ? Le Targeted Jump Slam (E) choisit votre point d’atterrissage.',
      ],
    },
    strengths: {
      en: ['Plank reach on every normal', 'An armoured gallop on The Joust', 'Biggest jump in the roster'],
      fr: ['L’allonge de la planche sur chaque coup normal', 'Un galop en armure sur The Joust', 'Le plus grand saut du roster'],
    },
    weaknesses: {
      en: ['Joint-slowest run and the least air control', 'The Joust rears before it charges, with no armour yet, and a miss skids to a stop', 'Blade Storm has the longest cooldown in the game'],
      fr: ['La course la plus lente (à égalité) et le moins de contrôle aérien', 'The Joust se cabre avant de charger, sans armure, et un raté finit en dérapage', 'Blade Storm a le plus long temps de recharge du jeu'],
    },
    specials: [
      {
        slot: 'A', name: 'Pot-Lid Throw', cooldownSeconds: 0,
        limit: { en: 'One lid: wait for it to come back', fr: 'Un seul couvercle : attendez son retour' },
        text: {
          en: 'Skim the pot lid off your shoulder like a frisbee. It hits on the way out and on the way back, knocking them toward you, and you catch it. Busy when it returns? It rings off your own bucket.',
          fr: 'Lancez le couvercle de votre épaule comme un frisbee. Il touche à l’aller et au retour, en ramenant l’adversaire vers vous, et vous le rattrapez. Occupé quand il revient ? Il sonne sur votre propre seau.',
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
        slot: 'R', name: 'The Joust', cooldownSeconds: 4,
        text: {
          en: 'Rear your hobby horse (neigh included), then gallop a long way with the plank couched as a lance, armoured and steered with the stick. The first fighter you meet is unhorsed. A miss skids to a stop. Off a ledge, you gallop on thin air, look down and drop.',
          fr: 'Cabrez votre cheval-bâton (hennissement compris), puis galopez loin, la planche en guise de lance, en armure et dirigé au stick. Le premier combattant croisé est désarçonné. Un raté finit en dérapage. Au-dessus du vide, vous galopez dans les airs, regardez en bas et tombez.',
        },
      },
      {
        slot: 'F', name: 'Blade Storm', cooldownSeconds: 15,
        text: {
          en: 'Three windmill turns with the plank flat: the first two hold whoever they catch, the third launches them. You can walk slowly while you spin. You end dizzy, and that’s your opponent’s chance.',
          fr: 'Trois tours de moulin, planche à plat : les deux premiers retiennent ceux qu’ils touchent, le troisième les éjecte. Vous pouvez avancer lentement en tournant. Vous finissez étourdi, et c’est la chance de l’adversaire.',
        },
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
    shotAlt: {
      en: 'Bashie blows her whistle on Splash Deck while FightGuy and Wibou fight behind her.',
      fr: 'Bashie siffle sur le Splash Deck pendant que FightGuy et Wibou se battent derrière elle.',
    },
    epithet: { en: 'The lifeguard turtle', fr: 'La tortue maître-nageuse' },
    pitch: {
      en: 'A pool lifeguard turtle who blows her whistle at everyone for breaking the pool rules, then breaks every one of them herself. Bashie throws her life ring, cannonballs onto you and surfs a wave in her shell. NO RUNNING! (She speed-walks.)',
      fr: 'Une tortue maître-nageuse qui siffle tout le monde pour non-respect du règlement de la piscine, puis enfreint chaque règle elle-même. Bashie lance sa bouée, vous tombe dessus en bombe et surfe une vague dans sa carapace. INTERDIT DE COURIR ! (Elle marche vite.)',
    },
    tags: { en: ['Close range', 'Shell', 'Pull-in'], fr: ['Corps à corps', 'Carapace', 'Attraction'] },
    signature: 'F',
    gameplan: {
      en: [
        'Reel them in with Rescue Ring (Q): whoever it catches lands at your feet, stuck just long enough for one normal.',
        'Cannonball (R) onto where they stand. The splash launches everyone around up into your normals.',
        'Blow the whistle for Wave Pool (F) and ride your wave toward the edge, carrying everyone it meets. Jump off to send them flying.',
      ],
      fr: [
        'Ramenez-les avec la Rescue Ring (A) : celui qu’elle attrape atterrit à vos pieds, coincé juste le temps d’un coup normal.',
        'Tombez en bombe avec le Cannonball (R) là où ils se tiennent. Les éclaboussures envoient tout le monde autour en l’air, droit dans vos coups normaux.',
        'Sifflez pour Wave Pool (F) et surfez votre vague vers le bord, en emportant tous ceux qu’elle croise. Sautez pour les envoyer valser.',
      ],
    },
    strengths: {
      en: ['Rescue Ring sets up a free normal', 'Every tucked landing splashes everyone around her', 'Wave Pool carries opponents toward the edge, shields and all'],
      fr: ['La Rescue Ring offre un coup normal gratuit', 'Chaque atterrissage en carapace éclabousse tout le monde autour', 'Wave Pool emporte les adversaires vers le bord, boucliers compris'],
    },
    weaknesses: {
      en: ['A missed Cannonball pops her up open to a punish', 'Hydro Jet has no armour, and its direction is locked once it starts', 'The whistle is the tell, and any hit ends the ride'],
      fr: ['Un Cannonball raté la fait ressortir, exposée', 'Le Hydro Jet n’a pas d’armure, et sa direction est figée au départ', 'Le sifflet la trahit, et le moindre coup arrête la vague'],
    },
    specials: [
      {
        slot: 'A', name: 'Rescue Ring', cooldownSeconds: 2.5,
        text: {
          en: 'Throw your life ring straight at your target. The first fighter it meets is reeled in to your feet, stuck just long enough for one normal. A miss, a wall or a shield means reeling the empty ring back.',
          fr: 'Lancez votre bouée droit sur votre cible. Le premier combattant touché est ramené à vos pieds, coincé juste le temps d’un coup normal. Un raté, un mur ou un bouclier, et vous rembobinez la bouée vide.',
        },
      },
      {
        slot: 'E', name: 'Hydro Jet', cooldownSeconds: 3.5,
        text: {
          en: 'Tuck and jet off where the stick points, with no wind-up (neutral goes straight up). The jet behind you shoves. Press R mid-jet to dive without untucking; landing tucked splashes.',
          fr: 'Rentrez dans votre carapace et filez là où pointe le stick, sans préparation (au neutre, droit vers le haut). Le jet derrière vous repousse. R en plein jet pour plonger sans sortir ; atterrir en carapace éclabousse.',
        },
      },
      {
        slot: 'R', name: 'Cannonball', cooldownSeconds: 2.5,
        text: {
          en: 'Hop up tucked and cannonball onto where your target stood. In the air it’s the Cannonball Dive, a steep dive at the ground ahead. Either landing splashes everyone around upward. If they moved, you pop up open to a punish.',
          fr: 'Sautez en carapace et retombez en bombe là où se tenait votre cible. En l’air, c’est le Cannonball Dive, un piqué vers le sol devant vous. Dans les deux cas, l’atterrissage éclabousse tout le monde vers le haut. S’ils ont bougé, vous ressortez exposée.',
        },
      },
      {
        slot: 'F', name: 'Wave Pool', cooldownSeconds: 9,
        text: {
          en: 'Blow your whistle: a wave rises behind you and you ride it in your shell toward your target, carrying everyone it meets toward the edge, shields and all. It breaks at the lip. Jump off to send them flying into your aerial.',
          fr: 'Un coup de sifflet : une vague se lève derrière vous et vous la surfez dans votre carapace vers votre cible, en emportant tous ceux qu’elle croise vers le bord, boucliers compris. Elle se brise au bord. Sautez pour les envoyer droit dans votre coup aérien.',
        },
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
    shotAlt: {
      en: 'Salamander’s finger guns hit FightGuy among the giant trees of Log Off.',
      fr: 'Les pistolets à doigts de Salamander touchent FightGuy entre les arbres géants de Log Off.',
    },
    epithet: { en: 'The gunslinger', fr: 'Le pistolero' },
    pitch: {
      en: 'The fastest fingers in the West. A lanky salamander in a poncho and sombrero, with a fake mustache and no actual gun. He fires finger guns, blows the smoke off and twirls them back into the holster.',
      fr: 'Les doigts les plus rapides de l’Ouest. Une grande salamandre en poncho et sombrero, avec une fausse moustache et aucune vraie arme. Il tire avec ses doigts, souffle la fumée et les fait tourner jusqu’à l’étui.',
    },
    tags: { en: ['Mid range', 'Projectiles', 'Mobility'], fr: ['Mi-distance', 'Projectiles', 'Mobilité'] },
    signature: 'A',
    gameplan: {
      en: [
        'Tap Q for Finger Guns: one shot per tap, six in the cylinder, then the reload. Count your shots.',
        'Roll past them with Tumbleweed (R) and pop out firing back the way you came.',
        'Hold F to charge Big Iron, then release a big, slow shot at your target.',
      ],
      fr: [
        'Appuyez sur A pour les Finger Guns : un tir par pression, six dans le barillet, puis le rechargement. Comptez vos balles.',
        'Roulez au-delà d’eux avec Tumbleweed (R) et ressortez en tirant dans la direction d’où vous venez.',
        'Maintenez F pour charger Big Iron, puis relâchez un gros tir lent vers votre cible.',
      ],
    },
    strengths: {
      en: ['Finger Guns have no cooldown, just a six-shot cylinder', 'Shooting in the air slows his fall and pushes him back', 'Sombrero Copter works with his jumps spent'],
      fr: ['Les Finger Guns n’ont pas de temps de recharge, juste un barillet de six', 'Tirer en l’air ralentit sa chute et le repousse', 'Le Sombrero Copter marche même sans saut restant'],
    },
    weaknesses: {
      en: ['Six shots, then a reload, and no refill over time', 'Tumbleweed’s shot only goes back the way he came'],
      fr: ['Six balles, puis un rechargement, sans recharge avec le temps', 'Le tir du Tumbleweed part seulement vers l’arrière'],
    },
    specials: [
      {
        slot: 'A', name: 'Finger Guns', cooldownSeconds: 0,
        limit: { en: '6 shots, then a reload', fr: '6 balles, puis rechargement' },
        text: {
          en: 'Tap to fire one shot where you face; the stick turns you first. Six shots, then you blow the smoke, twirl and holster: that’s the reload. No refill over time. In the air each shot slows your fall and pushes you back.',
          fr: 'Une pression tire une balle droit devant ; le stick vous tourne d’abord. Six balles, puis vous soufflez la fumée, faites tourner et rengainez : c’est le rechargement. Rien ne se recharge avec le temps. En l’air, chaque tir ralentit votre chute et vous repousse.',
        },
      },
      {
        slot: 'E', name: 'Sombrero Copter', cooldownSeconds: 3.5,
        text: {
          en: 'Grab the brim and spin the sombrero like a rotor: it lifts you high. Push the stick to trade height for reach and steer on the way up. Works with your jumps spent.',
          fr: 'Attrapez le bord et faites tourner le sombrero comme un rotor : il vous soulève haut. Poussez le stick pour échanger de la hauteur contre de la portée et dirigez en montant. Marche même sans saut restant.',
        },
      },
      {
        slot: 'R', name: 'Tumbleweed', cooldownSeconds: 4,
        text: {
          en: 'Tuck into a ball and roll forward like a tumbleweed, then pop out and fire one shot back over your shoulder, the way you came.',
          fr: 'Roulez-vous en boule et avancez comme un virevoltant, puis ressortez et tirez une balle par-dessus l’épaule, dans la direction d’où vous venez.',
        },
      },
      {
        slot: 'F', name: 'Big Iron', cooldownSeconds: 5,
        text: {
          en: 'Hold to charge a two-handed finger gun, release a big, slow shot toward your target. The recoil throws your arms up and half peels off the mustache.',
          fr: 'Maintenez pour charger un pistolet à deux mains, relâchez un gros tir lent vers votre cible. Le recul vous fait lever les bras et décolle à moitié la moustache.',
        },
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
    shotAlt: {
      en: 'In the Slop Pit, Nyx raises a shadow hand behind FightGuy: Grasp is about to drag him to her feet.',
      fr: 'Dans le Slop Pit, Nyx fait surgir une main d’ombre derrière FightGuy : Grasp va le traîner jusqu’à ses pieds.',
    },
    epithet: { en: 'The witch with another side', fr: 'La sorcière à double face' },
    pitch: {
      en: 'A goth witch with a second life as an influencer. Nyx barely moves while her shadows hit from range. Go live and she’s Nyxxie, who never stops moving and hits hard up close. The swap is the fun part.',
      fr: 'Une sorcière gothique qui mène une double vie d’influenceuse. Nyx bouge à peine pendant que ses ombres frappent à distance. Elle passe en live et devient Nyxxie, qui ne tient pas en place et frappe fort au contact. Le changement, c’est là que ça devient drôle.',
    },
    tags: { en: ['Two forms', 'Zoner', 'Combos'], fr: ['Deux formes', 'Zoneuse', 'Combos'] },
    signature: 'F',
    gameplan: {
      en: [
        'As Nyx, keep them busy from range: Hex Crow (Q) chases them, Grasp (R) drags them to your feet.',
        'Going Live (F) swaps you to Nyxxie, and the flash pulls everyone nearby in, right where the brawler wants them.',
        'Land a hit, then press F during its recovery to swap on the spot. A perched crow survives the swap: Nyxxie’s next hit pops it.',
      ],
      fr: [
        'En Nyx, occupez-les à distance : le Hex Crow (A) les poursuit, Grasp (R) les traîne jusqu’à vos pieds.',
        'Going Live (F) vous transforme en Nyxxie, et le flash attire tout le monde autour, pile là où la bagarreuse les veut.',
        'Placez un coup, puis appuyez sur F pendant sa récupération pour changer sur-le-champ. Un corbeau perché survit au changement : le prochain coup de Nyxxie le fait éclater.',
      ],
    },
    strengths: {
      en: ['Two kits in one fighter', 'Both swaps hit: Going Live pulls in, Logging Off pushes out', 'Floaty as Nyx, fast as Nyxxie'],
      fr: ['Deux kits en un seul combattant', 'Les deux changements frappent : Going Live attire, Logging Off repousse', 'Légère en Nyx, rapide en Nyxxie'],
    },
    weaknesses: {
      en: ['Nyx is slow on the ground', 'Nyxxie falls fast', 'Hex Crow is slow: outrun it, shield it or hit it away'],
      fr: ['Nyx est lente au sol', 'Nyxxie tombe vite', 'Le Hex Crow est lent : on peut le distancer, le bloquer ou le renvoyer'],
    },
    specials: [
      {
        slot: 'A', name: 'Hex Crow', cooldownSeconds: 2,
        text: {
          en: 'A slow crow flies at your target. They can outrun it, shield it or hit it away. If it arrives, it perches on their head, and Nyxxie’s next hit pops it for a bonus hit.',
          fr: 'Un corbeau lent vole vers votre cible. Elle peut le distancer, le bloquer ou le renvoyer. S’il arrive, il se perche sur sa tête, et le prochain coup de Nyxxie le fait éclater pour un coup bonus.',
        },
      },
      {
        slot: 'E', name: 'Bat Scatter', cooldownSeconds: 4,
        text: {
          en: 'Burst into bats, fly where the stick points and re-form.',
          fr: 'Éclatez en chauves-souris, volez là où pointe le stick et reformez-vous.',
        },
      },
      {
        slot: 'R', name: 'Grasp', cooldownSeconds: 4,
        text: {
          en: 'After a warning, a shadow hand rises under your target and drags them to your feet.',
          fr: 'Après un avertissement, une main d’ombre surgit sous votre cible et la traîne jusqu’à vos pieds.',
        },
      },
      {
        slot: 'F', name: 'Going Live', cooldownSeconds: 5,
        text: {
          en: 'A white and pink flash swaps you to Nyxxie and pulls nearby enemies in.',
          fr: 'Un flash blanc et rose vous transforme en Nyxxie et attire les ennemis proches.',
        },
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
      pitch: {
        en: 'The influencer. Phone, ring light and platform boots: she never stops moving and hits hard up close.',
        fr: 'L’influenceuse. Téléphone, ring light et chaussures compensées : elle ne tient pas en place et frappe fort au contact.',
      },
      specials: [
        {
          slot: 'A', name: 'Ring Light', cooldownSeconds: 2,
          text: {
            en: 'Snap toward your target and flash a short cone that dazzles everyone facing you. Back turned? Nothing.',
            fr: 'Foncez vers votre cible et lancez un flash court qui éblouit tous ceux qui vous font face. De dos ? Rien.',
          },
        },
        {
          slot: 'E', name: 'Ring Light Rise', cooldownSeconds: 4,
          text: {
            en: 'The ring light spins like a helicopter rotor and lifts you. Steer on the way up.',
            fr: 'La ring light tourne comme un rotor d’hélicoptère et vous soulève. Dirigez en montant.',
          },
        },
        {
          slot: 'R', name: 'Selfie Grab', cooldownSeconds: 4,
          text: {
            en: 'A short lunge into a command grab. Pose, and the selfie flash blasts them away.',
            fr: 'Un court bond qui finit en saisie. La pose, et le flash du selfie les envoie valser.',
          },
        },
        {
          slot: 'F', name: 'Logging Off', cooldownSeconds: 5,
          text: {
            en: 'A violet shard burst swaps you back to Nyx and pushes nearby enemies away.',
            fr: 'Une explosion d’éclats violets vous ramène en Nyx et repousse les ennemis proches.',
          },
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
