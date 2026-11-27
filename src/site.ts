// Everything about where this site and its plugins live, in one place.
export const REPO = 'https://github.com/Mate-Logic/better-agy'
export const BRANCH = 'main'
export const SITE_URL = 'https://mate-logic.github.io/better-agy'
export const AUTHOR = { name: 'MateLogic', handle: 'Mate-Logic', url: 'https://github.com/Mate-Logic', site: 'https://mate-logic.tech/' }

// The original idea and design: better-claude, by midudev.
export const CREDIT = {
  project: 'better-claude',
  site: 'https://betterclaude.dev/',
  repo: 'https://github.com/midudev/better-claude',
  author: 'midudev',
  authorName: 'Miguel Ángel Durán',
  authorUrl: 'https://github.com/midudev',
}

// The order plugins appear in; plugins not listed here follow, alphabetically.
export const ORDER = [
  'sub-meter',
  'commit',
  'review',
  'handoff',
  'time-machine',
  'after',
  'think-hard',
  'fast-turn',
  'context-meter',
  'token-meter',
  'narrator',
  'quick-peek',
  'image-preview',
]

export const INSTALL_SCRIPT = `https://raw.githubusercontent.com/Mate-Logic/better-agy/${BRANCH}/install.sh`
export const INSTALL_SCRIPT_WIN = `https://raw.githubusercontent.com/Mate-Logic/better-agy/${BRANCH}/install.ps1`

// What you type to use each plugin.
export const COMMANDS: Record<string, string> = {
  'sub-meter': '/sub-meter',
  commit: '/commit',
  review: '/review',
  handoff: '/handoff',
  'time-machine': '/timeline',
  after: '/after',
  'think-hard': '+',
  'fast-turn': '_',
  'context-meter': '/context',
  'token-meter': '/tokens',
  narrator: '/narrator',
  'quick-peek': '/peek',
  'image-preview': '/preview',
}

// The plugin the page announces, and the ones that get a terminal demo.
export const FEATURED = 'sub-meter'
export const SHOWCASE = ['commit', 'review', 'handoff', 'context-meter']

// The model name the demos show in the status line.
export const DEMO_MODEL = 'Gemini 4 Neon (Medium)'
