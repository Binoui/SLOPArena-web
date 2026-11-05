export const ui = {
  skip: 'Skip to content',
  home: 'SLOPArena home',
  nav: { label: 'Main navigation', play: 'How to play', fighters: 'Fighters', docs: 'Docs', feedback: 'Feedback', what: 'What is SLOPArena?', who: 'Who made this' },
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
    tagline: 'A free, open-source fighting game, made by one person with AI, in public.',
    play: 'Play',
    community: 'Community',
    build: 'Build',
    gameSource: 'Game source',
    siteSource: 'Website source',
    status: 'SLOPArena · Early playtest',
    license: 'MIT license',
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
