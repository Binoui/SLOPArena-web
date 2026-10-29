// Build-time settings. The VITE_* names are kept so existing .env files,
// Docker builds and GitHub repository variables keep working.
const env = (name: string) => (import.meta.env[name] as string | undefined) || ''

export const steamAppId = 5324910
export const steamPlaytestAppId = 5325920

export const links = {
  steam: env('VITE_STEAM_URL') || `https://store.steampowered.com/app/${steamAppId}/`,
  // Opens the installed playtest directly; only useful once access is granted.
  steamLaunch: `steam://run/${steamPlaytestAppId}`,
  discord: 'https://discord.gg/VvfaxDCF6Z',
  reddit: 'https://www.reddit.com/r/sloparena',
  youtube: 'https://www.youtube.com/@SLOPArena',
  x: 'https://x.com/SLOPArena',
  tiktok: 'https://www.tiktok.com/@sloparena',
  github: 'https://github.com/Binoui/SLOPArena',
  githubDocs: 'https://github.com/Binoui/SLOPArena/tree/main/docs',
  githubIssues: 'https://github.com/Binoui/SLOPArena/issues',
  webRepo: 'https://github.com/Binoui/SLOPArena-web',
}

export const endpoints = {
  feedback: env('VITE_FEEDBACK_API_URL') || '/api/feedback',
  presence: env('VITE_PRESENCE_URL') || '/api/presence',
}

export const trailer = {
  youtubeId: 'LFdEtBUN6wU',
  title: 'SLOPArena Playtest OUT !!!',
}
