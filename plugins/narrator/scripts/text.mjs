// Adapted from midudev/better-claude/plugins/narrator/hooks/text.ts (MIT)

const WORDS = {
  en: new Set(['the', 'and', 'is', 'to', 'of', 'it', 'you', 'that', 'with', 'for', 'this', 'are']),
  es: new Set(['el', 'la', 'que', 'de', 'y', 'en', 'los', 'las', 'es', 'para', 'por', 'una', 'del', 'he']),
  pt: new Set(['o', 'que', 'não', 'em', 'um', 'uma', 'os', 'você', 'está', 'do', 'da', 'foi']),
  fr: new Set(['le', 'la', 'les', 'et', 'est', 'des', 'une', 'pour', 'que', 'dans', 'vous', 'pas']),
  de: new Set(['der', 'die', 'das', 'und', 'ist', 'nicht', 'ich', 'mit', 'für', 'sie', 'den', 'ein']),
  it: new Set(['il', 'che', 'di', 'è', 'per', 'una', 'con', 'non', 'sono', 'gli', 'della', 'ho'])
}

const HASH = /\b(?=[0-9a-f]*\d)(?=[0-9a-f]*[a-f])[0-9a-f]{7,40}\b/g
const EXTENSION = /(.)(?:\.[a-z][a-z0-9]{0,4})+$/i

const fileName = (p) => (p.split(/[\\/]/).filter(Boolean).pop() ?? '').replace(EXTENSION, '$1')

const isPath = (word) =>
  /[a-z]/i.test(fileName(word)) && (/^(?:~|\.{1,2})?\//.test(word) || EXTENSION.test(word) || word.split('/').length > 2)

export function cut (text, size) {
  if (text.length <= size) return text
  const head = text.slice(0, size)
  const end = Math.max(head.lastIndexOf('. '), head.lastIndexOf('! '), head.lastIndexOf('? '))
  return end > size / 2 ? head.slice(0, end + 1) : `${head.trimEnd()}…`
}

export function plain (markdown) {
  return String(markdown || '')
    .replace(/```[\s\S]*?(```|$)/g, ' ')
    .replace(/`([^`]*)`/g, (_code, inside) => (/^[^\s/\\]*([/\\][^\s/\\]*)+$|^[\w-]+\.[a-z][a-z0-9]{0,4}$/i.test(inside) ? fileName(inside) : inside))
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/(?:https?|file):\/\/\S+/g, ' ')
    .replace(/^\s{0,3}(#{1,6}|[-*+•]|\d+[.)]|>)\s+/gm, '')
    .replace(/[\w.@~-]*\/[\w.@~/-]*[\w@~/-]/g, word => (isPath(word) ? fileName(word) : word))
    .replace(HASH, ' ')
    .replace(/\(\s*\)/g, ' ')
    .replace(/[*_~|#>]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/ ([.,;:!?？؟])/g, '$1')
    .replace(/^[\s-]+/, '')
    .trim()
}

export function guessLanguage (text) {
  const words = String(text || '').toLowerCase().match(/\p{L}+/gu) ?? []
  let best = ''
  let most = 2
  for (const [language, common] of Object.entries(WORDS)) {
    let count = 0
    for (const word of words) if (common.has(word)) count++
    if (count > most) [best, most] = [language, count]
  }
  return best
}

const sentences = (text) => text.split(/(?<=[.!?…؟])\s+|(?<=[。！？])\s*/).filter(Boolean)
const isQuestion = (sentence) => /[?？؟]$/.test(sentence)

export function finalQuestion (answer) {
  const last = plain(String(answer || '').trim().split('\n').filter(line => line.trim()).pop() ?? '')
  const asked = []
  for (const sentence of sentences(last).reverse()) {
    if (!isQuestion(sentence)) break
    asked.unshift(sentence)
  }
  const question = asked.join(' ')
  return question.length <= 200 ? question : ''
}

export function summarizeForSpeech (markdown, maxChars = 360) {
  const full = plain(markdown)
  if (!full) return ''
  if (full.length <= maxChars) return full
  const head = cut(full, maxChars)
  const q = finalQuestion(markdown)
  if (q && !head.includes(q)) return `${head} ${q}`
  return head
}
