import type { Lang } from './index'

const en = {
  skip: 'Skip to content',
  home: 'SLOPArena home',
  nav: { label: 'Main navigation', play: 'How to play', fighters: 'Fighters', docs: 'Docs', feedback: 'Feedback' },
  language: 'Language',
  steam: {
    headerCta: 'Steam',
    headerAria: 'SLOPArena on Steam (opens in a new tab)',
    cta: 'Request access on Steam',
    ctaNote: 'Free playtest · Windows',
    ctaAria: 'Request playtest access on the SLOPArena Steam page (opens in a new tab)',
    howItWorks: 'Access is by request: Steam emails you when your spot opens.',
    launch: 'Already in? Launch the playtest',
  },
  presence: {
    checking: 'Checking who’s around…',
    one: '{n} slopper online',
    many: '{n} sloppers online',
    matchOne: '{n} match live',
    matchMany: '{n} matches live',
    empty: 'Nobody online right now. Bring a friend.',
    unavailable: 'Can’t check who’s online right now.',
    discord: 'Find players on Discord',
  },
  footer: {
    tagline: 'A free 3D platform fighter for friends. Early playtest. Balance not included.',
    play: 'Play',
    community: 'Community',
    build: 'Build',
    gameSource: 'Game source',
    siteSource: 'Website source',
    status: 'SLOPArena · Early playtest',
    joke: 'Made with questionable decisions',
  },
  common: {
    cooldown: 'cooldown',
    ground: 'Ground',
    air: 'Air',
    mustTry: 'Must try',
    newTab: '(opens in a new tab)',
    wip: 'WIP',
    wipTitle: 'Work in progress: kit and art still being built',
  },
  // Slot roles from the game's glossary (CONTEXT.md → Slot).
  slots: { A: 'Signature', E: 'Recovery', R: 'Playmaker', F: 'Power' },
  // The game binds specials by physical key (ADR-0042): slot A is the key in the
  // QWERTY Q position, which AZERTY keyboards label A.
  specialKeys: { A: 'Q', E: 'E', R: 'R', F: 'F' },
}

export type UiStrings = typeof en

const fr: UiStrings = {
  skip: 'Aller au contenu',
  home: 'Accueil SLOPArena',
  nav: { label: 'Navigation principale', play: 'Jouer', fighters: 'Combattants', docs: 'Docs', feedback: 'Avis' },
  language: 'Langue',
  steam: {
    headerCta: 'Steam',
    headerAria: 'SLOPArena sur Steam (s’ouvre dans un nouvel onglet)',
    cta: 'Demander l’accès sur Steam',
    ctaNote: 'Playtest gratuit · Windows',
    ctaAria: 'Demander l’accès au playtest sur la page Steam de SLOPArena (s’ouvre dans un nouvel onglet)',
    howItWorks: 'L’accès se fait sur demande : Steam vous envoie un e-mail quand votre place est prête.',
    launch: 'Déjà dedans ? Lancer le playtest',
  },
  presence: {
    checking: 'On regarde qui est là…',
    one: '{n} joueur en ligne',
    many: '{n} joueurs en ligne',
    matchOne: '{n} match en cours',
    matchMany: '{n} matchs en cours',
    empty: 'Personne en ligne pour l’instant. Venez avec un ami.',
    unavailable: 'Impossible de voir qui est en ligne pour l’instant.',
    discord: 'Trouver des joueurs sur Discord',
  },
  footer: {
    tagline: 'Un jeu de combat de plateforme 3D gratuit, entre amis. Playtest précoce. Équilibrage non inclus.',
    play: 'Jouer',
    community: 'Communauté',
    build: 'Coulisses',
    gameSource: 'Code du jeu',
    siteSource: 'Code du site',
    status: 'SLOPArena · Playtest précoce',
    joke: 'Fait avec des décisions discutables',
  },
  common: {
    cooldown: 'de recharge',
    ground: 'Au sol',
    air: 'En l’air',
    mustTry: 'À essayer',
    newTab: '(nouvel onglet)',
    wip: 'En chantier',
    wipTitle: 'En chantier : kit et graphismes encore en construction',
  },
  slots: { A: 'Signature', E: 'Remontée', R: 'Tactique', F: 'Puissance' },
  specialKeys: { A: 'A', E: 'E', R: 'R', F: 'F' },
}

export const ui: Record<Lang, UiStrings> = { en, fr }
