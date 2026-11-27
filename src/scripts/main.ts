// better-antigravity: the page's few moving parts.
const $ = <T extends Element = HTMLElement>(s: string, c: ParentNode = document) => c.querySelector<T>(s)!
const $$ = <T extends Element = HTMLElement>(s: string, c: ParentNode = document) => [...c.querySelectorAll<T>(s)]

import { ui, type Lang } from '../i18n/ui'

const lang = (document.documentElement.lang in ui ? document.documentElement.lang : 'en') as Lang
const t = ui[lang]

interface SiteData { repo: string, plugins: { name: string, displayName: string }[] }
const data: SiteData = JSON.parse($('#site-data').textContent || '{}')

// ---------- toast ----------
const toast = $('#toast')
let toastTimer = 0
function say (msg: string) {
  toast.textContent = msg
  toast.classList.add('show')
  clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2200)
}

async function copy (text: string): Promise<boolean> {
  try { await navigator.clipboard.writeText(text); return true } catch {}
  // Without the async clipboard (plain http, old browsers): a hidden textarea.
  const ta = document.createElement('textarea')
  ta.value = text
  ta.setAttribute('readonly', '')
  ta.style.cssText = 'position:fixed;opacity:0'
  document.body.append(ta)
  ta.select()
  let ok = false
  try { ok = document.execCommand('copy') } catch {}
  ta.remove()
  return ok
}

// ---------- the install prompt ----------
const buildPrompt = (names: string[]) => t.client.prompt(data.repo, names)

const picks = $$<HTMLButtonElement>('.pick')
const countEl = $('#picks-count')
const allBtn = $<HTMLButtonElement>('#picks-all')
const copyBtn = $<HTMLButtonElement>('#copy-prompt')
const promptEl = $('#prompt')
const picked = () => picks.filter(b => b.getAttribute('aria-pressed') === 'true').map(b => b.dataset.plugin!)

function refresh () {
  const names = picked()
  countEl.textContent = `${names.length} ${t.of} ${picks.length}`
  allBtn.textContent = names.length === picks.length ? t.none : t.all
  copyBtn.disabled = names.length === 0
  promptEl.textContent = names.length ? buildPrompt(names) : t.pickOne
}
picks.forEach(b => b.addEventListener('click', () => {
  b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'))
  refresh()
}))
allBtn.addEventListener('click', () => {
  const on = picked().length !== picks.length
  picks.forEach(b => b.setAttribute('aria-pressed', String(on)))
  refresh()
})
copyBtn.addEventListener('click', async () => {
  const names = picked()
  if (!names.length) return
  say(await copy(buildPrompt(names)) ? t.client.copied(names.length) : t.client.copyFailed)
})
$$<HTMLButtonElement>('[data-install]').forEach(b => b.addEventListener('click', async () => {
  const name = b.dataset.install!
  say(await copy(buildPrompt([name])) ? t.client.copiedOne(name) : t.client.copyFailed)
}))
refresh()

// ---------- "plugins updated 3 days ago" ----------
const time = $<HTMLTimeElement>('#updated')
const when = new Date(time.dateTime)
if (!isNaN(+when)) {
  const s = (Date.now() - +when) / 1000
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' })
  const steps: [number, Intl.RelativeTimeFormatUnit][] = [[60, 'second'], [3600, 'minute'], [86400, 'hour'], [604800, 'day'], [2629800, 'week'], [31557600, 'month'], [Infinity, 'year']]
  const divs = [1, 60, 3600, 86400, 604800, 2629800, 31557600]
  const i = steps.findIndex(([lim]) => s < lim)
  time.textContent = rtf.format(-Math.max(0, Math.round(s / divs[i])), steps[i][1])
  time.title = when.toLocaleString(lang)
}

// ---------- the glyph lifts off ----------
const glyph = $('#glyph')
glyph.addEventListener('click', () => {
  glyph.classList.remove('lift')
  void glyph.offsetWidth // restart the animation
  glyph.classList.add('lift')
})

// ---------- demos ----------
$$('[data-demo="commit"]').forEach(demo => {
  const choices = $$<HTMLButtonElement>('.choice', demo)
  const result = $('[data-commit-result]', demo)
  const pick = (c: HTMLButtonElement, focus = false) => {
    choices.forEach(x => { x.setAttribute('aria-checked', String(x === c)); x.tabIndex = x === c ? 0 : -1 })
    result.textContent = c.dataset.result!
    if (focus) c.focus()
  }
  choices.forEach((c, i) => {
    c.tabIndex = c.getAttribute('aria-checked') === 'true' ? 0 : -1
    c.addEventListener('click', () => pick(c))
    c.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        pick(choices[(i + (e.key === 'ArrowDown' ? 1 : -1) + choices.length) % choices.length], true)
      }
    })
  })
})

$$('[data-demo="review"] .finding-head').forEach(h => h.addEventListener('click', () => {
  const open = h.getAttribute('aria-expanded') !== 'true'
  h.setAttribute('aria-expanded', String(open))
  ;(h.nextElementSibling as HTMLElement).hidden = !open
}))

$$('[data-demo="handoff"]').forEach(demo => {
  const btn = $<HTMLButtonElement>('.session', demo)
  btn.addEventListener('click', () => {
    const resume = btn.getAttribute('aria-pressed') !== 'true'
    btn.setAttribute('aria-pressed', String(resume))
    btn.textContent = resume ? t.client.backToHandoff : t.client.newSession
    $<HTMLElement>('[data-view-pane="write"]', demo).hidden = resume
    $<HTMLElement>('[data-view-pane="resume"]', demo).hidden = !resume
  })
})

// ---------- the reader panel ----------
const reader = $('#reader')
const readerBody = $('#reader-body')
const readerName = $('#reader-name')
const readerPath = $('#reader-path')
const readerOut = $<HTMLAnchorElement>('#reader-out')
const tabs = $$<HTMLButtonElement>('.reader-tabs [role="tab"]')
let current: { name: string, tab: string } | null = null
let opener: HTMLElement | null = null

function show (name: string, tab: string) {
  const tpl = document.getElementById(`${tab}-${name}`) as HTMLTemplateElement | null
  if (!tpl) return false
  const p = data.plugins.find(x => x.name === name)
  current = { name, tab }
  readerName.textContent = p?.displayName ?? name
  readerPath.textContent = tpl.dataset.path ?? ''
  readerOut.href = (document.querySelector<HTMLAnchorElement>(`a[data-panel="${tab}"][data-plugin="${name}"]`))?.href ?? data.repo
  readerBody.replaceChildren(tpl.content.cloneNode(true))
  readerBody.scrollTop = 0
  tabs.forEach(t => { const on = t.dataset.tab === tab; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1 })
  return true
}
function open (name: string, tab: string, from?: HTMLElement) {
  if (!show(name, tab)) return
  opener = from ?? null
  reader.inert = false
  reader.classList.add('open')
  $('#reader-title').focus({ preventScroll: true })
}
function close () {
  reader.classList.remove('open')
  reader.inert = true
  current = null
  opener?.focus({ preventScroll: true })
}
$$<HTMLAnchorElement>('a[data-panel]').forEach(a => a.addEventListener('click', e => {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return // let new-tab clicks through
  e.preventDefault()
  open(a.dataset.plugin!, a.dataset.panel!, a)
}))
tabs.forEach((t, i) => {
  t.addEventListener('click', () => current && show(current.name, t.dataset.tab!))
  t.addEventListener('keydown', e => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    const next = tabs[(i + 1) % tabs.length]
    if (current) show(current.name, next.dataset.tab!)
    next.focus()
  })
})
$('#reader-close').addEventListener('click', close)
document.addEventListener('keydown', e => { if (e.key === 'Escape' && current) close() })
document.addEventListener('click', e => {
  if (current && !reader.contains(e.target as Node) && !(e.target as HTMLElement).closest('a[data-panel]')) close()
})
