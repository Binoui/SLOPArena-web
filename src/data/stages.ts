import type { ImageMetadata } from 'astro'
import type { Lang } from '../i18n'
import tableManners from '../assets/stages/table-manners.png'
import splashDeck from '../assets/stages/splash-deck.png'
import slopPit from '../assets/stages/slop-pit.png'
import afterHours from '../assets/stages/after-hours.png'
import lastStop from '../assets/stages/last-stop.png'
import logOff from '../assets/stages/log-off.png'
import hamsterHabitat from '../assets/stages/hamster-habitat.png'

export interface Stage {
  id: string
  name: string
  image: ImageMetadata
  blurb: Record<Lang, string>
}

// The PvP stage picker in the game (client/Unity/Assets/Resources/Stages/roster.json).
export const stages: Stage[] = [
  {
    id: 'slop-pit', name: 'Slop Pit', image: slopPit,
    blurb: { en: 'The original fight pit. Crowd included.', fr: 'L’arène d’origine. Public fourni.' },
  },
  {
    id: 'after-hours', name: 'After Hours', image: afterHours,
    blurb: { en: 'A neon rooftop. SLOPArena tonight.', fr: 'Un toit sous les néons. SLOPArena ce soir.' },
  },
  {
    id: 'splash-deck', name: 'Splash Deck', image: splashDeck,
    blurb: { en: 'A boat off the coast. Mind the edge.', fr: 'Un bateau au large. Attention au bord.' },
  },
  {
    id: 'table-manners', name: 'Table Manners', image: tableManners,
    blurb: { en: 'A birthday cake in a kid’s bedroom. Don’t ask.', fr: 'Un gâteau d’anniversaire dans une chambre d’enfant. Ne demandez pas.' },
  },
  {
    id: 'last-stop', name: 'Last Stop', image: lastStop,
    blurb: { en: 'A station roof. Missed your train anyway.', fr: 'Le toit d’une gare. De toute façon, vous avez raté le train.' },
  },
  {
    id: 'log-off', name: 'Log Off', image: logOff,
    blurb: { en: 'A tree stump at a campsite. No Wi-Fi, just logs.', fr: 'Une souche dans un camping. Pas de Wi-Fi, que du bois.' },
  },
  {
    id: 'hamster-habitat', name: 'Hamster Habitat', image: hamsterHabitat,
    blurb: { en: 'Two cages and a tube. The landlord is watching.', fr: 'Deux cages et un tube. Le proprio vous regarde.' },
  },
]
