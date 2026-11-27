// Everything about where this site and its plugins live, in one place.
export const REPO = 'https://github.com/Mate-Logic/betterantigravity'
export const BRANCH = 'main'
export const SITE_URL = 'https://betterantigravity.dev'
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

export const INSTALL_SCRIPT = `https://raw.githubusercontent.com/Mate-Logic/betterantigravity/${BRANCH}/install.sh`
export const INSTALL_SCRIPT_WIN = `https://raw.githubusercontent.com/Mate-Logic/betterantigravity/${BRANCH}/install.ps1`

// The model name the demos show in the status line.
export const DEMO_MODEL = 'Gemini 3.8 Flash (Medium)'
