// better-antigravity: the page's few moving parts.
const $ = <T extends Element = HTMLElement>(s: string, c: ParentNode = document) => c.querySelector<T>(s)!
const $$ = <T extends Element = HTMLElement>(s: string, c: ParentNode = document) => [...c.querySelectorAll<T>(s)]

import { ui, type Lang } from '../i18n/ui'

const lang = (document.documentElement.lang in ui ? document.documentElement.lang : 'en') as Lang
const t = ui[lang]

interface SiteData { repo: string, installScript: string, installScriptWin: string, plugins: { name: string, displayName: string }[] }
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

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

// ---------- the announcement bar ----------
$('#announce-x').addEventListener('click', () => {
  document.documentElement.classList.add('no-announce')
  try { sessionStorage.setItem('ba-announce', 'off') } catch {}
})

// ---------- the install prompt & quick CLI command ----------
let currentOs: 'unix' | 'win' = /Windows/i.test(navigator.userAgent) ? 'win' : 'unix'
const osTabs = $$<HTMLButtonElement>('.os-tab')
const buildPrompt = (names: string[]) => t.client.prompt(data.repo, names)
const buildCli = (names: string[]) => {
  if (currentOs === 'win') {
    return names.length === picks.length
      ? `irm ${data.installScriptWin} | iex`
      : `$env:PLUGINS="${names.join(' ')}"; irm ${data.installScriptWin} | iex`
  }
  return names.length === picks.length
    ? `curl -fsSL ${data.installScript} | bash`
    : `curl -fsSL ${data.installScript} | bash -s -- ${names.join(' ')}`
}

// The terminal types the command out, as if someone were at the keyboard.
let typing = 0
let typedOnce = false
function typeCmd (text: string) {
  cancelAnimationFrame(typing)
  if (reduced || !typedOnce) { cliCmdEl.textContent = text; return }
  const from = performance.now()
  const dur = Math.min(900, 18 * text.length)
  const step = (now: number) => {
    const k = Math.min(1, (now - from) / dur)
    cliCmdEl.textContent = text.slice(0, Math.round(text.length * k))
    if (k < 1) typing = requestAnimationFrame(step)
  }
  typing = requestAnimationFrame(step)
}

const ctaBtn = $<HTMLButtonElement>('#cta-copy')
const picks = $$<HTMLButtonElement>('.pick')
const countEl = $('#picks-count')
const allBtn = $<HTMLButtonElement>('#picks-all')
const copyBtn = $<HTMLButtonElement>('#copy-prompt')
const copyCliBtn = $<HTMLButtonElement>('#copy-cli')
const cliCmdEl = $('#cli-cmd')
const promptEl = $('#prompt')
const picked = () => picks.filter(b => b.getAttribute('aria-pressed') === 'true').map(b => b.dataset.plugin!)

function refresh () {
  const names = picked()
  countEl.textContent = `${names.length} ${t.of} ${picks.length}`
  allBtn.textContent = names.length === picks.length ? t.none : t.all
  copyBtn.disabled = names.length === 0
  copyCliBtn.disabled = names.length === 0
  promptEl.textContent = names.length ? buildPrompt(names) : t.pickOne
  typeCmd(names.length ? buildCli(names) : t.pickOne)
  ctaBtn.disabled = names.length === 0
  osTabs.forEach(tab => tab.setAttribute('aria-selected', String(tab.dataset.os === currentOs)))
}
osTabs.forEach(tab => tab.addEventListener('click', () => {
  currentOs = (tab.dataset.os === 'win' ? 'win' : 'unix')
  refresh()
}))
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
copyCliBtn.addEventListener('click', async () => {
  const names = picked()
  if (!names.length) return
  say(await copy(buildCli(names)) ? t.client.copiedCli(names.length) : t.client.copyFailed)
})
$$<HTMLButtonElement>('[data-install]').forEach(b => b.addEventListener('click', async () => {
  const name = b.dataset.install!
  say(await copy(buildPrompt([name])) ? t.client.copiedOne(name) : t.client.copyFailed)
}))
ctaBtn.addEventListener('click', async () => {
  const names = picked()
  if (!names.length) return
  say(await copy(buildCli(names)) ? t.client.copiedCli(names.length) : t.client.copyFailed)
})
refresh()
typedOnce = true
// Type it out once the terminal scrolls into view.
const consoleEl = $('.console')
new IntersectionObserver((entries, io) => {
  if (entries.some(e => e.isIntersecting)) { io.disconnect(); cliCmdEl.textContent = ''; refresh() }
}, { threshold: .5 }).observe(consoleEl)

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
  dispatchEvent(new CustomEvent('ba-burst'))
})

// ---------- the statement lights up as you read ----------
const statement = $('#statement')
const words = statement.textContent!.trim().split(/\s+/)
statement.replaceChildren(...words.flatMap((w, i) => {
  const s = document.createElement('span')
  s.className = 'w'
  s.textContent = w
  return i ? [document.createTextNode(' '), s] : [s]
}))
const wordEls = $$('.w', statement)
let lit = -1
function light () {
  const r = statement.getBoundingClientRect()
  const vh = innerHeight
  const k = reduced ? 1 : Math.min(1, Math.max(0, (vh * .86 - r.top) / (r.height + vh * .3)))
  const n = Math.round(k * wordEls.length)
  if (n === lit) return
  lit = n
  wordEls.forEach((w, i) => w.classList.toggle('on', i < n))
}
let lightQueued = false
addEventListener('scroll', () => {
  if (lightQueued) return
  lightQueued = true
  requestAnimationFrame(() => { lightQueued = false; light() })
}, { passive: true })
light()

// ---------- Sub Meter: the bar, live ----------
$$('[data-demo="sub-meter"]').forEach(demo => {
  const wins: { label: string, pct: number, reset: string }[] = JSON.parse(demo.dataset.windows || '[]')
  const sm = $('.smeter', demo)
  const label = $('.sm-label', demo)
  const fill = $('.sm-fill', demo)
  const empty = $('.sm-empty', demo)
  const pctEl = $('.sm-pct', demo)
  const reset = $('.sm-reset', demo)
  const range = $<HTMLInputElement>('#sm-range')
  const out = $<HTMLOutputElement>('#sm-out')
  let idx = 0
  let held = 0
  const draw = (pct: number) => {
    const cells = Math.round(pct / 10)
    fill.textContent = '━'.repeat(cells)
    empty.textContent = '─'.repeat(10 - cells)
    pctEl.textContent = `${Math.round(pct)}%`
    sm.dataset.level = pct >= 90 ? 'err' : pct >= 75 ? 'warn' : 'ok'
  }
  const show = (i: number, swap = true) => {
    idx = i
    const w = wins[i]
    label.textContent = w.label
    reset.textContent = ` · ${w.reset}`
    draw(w.pct)
    range.value = String(w.pct)
    out.value = `${w.pct}%`
    if (swap && !reduced) { sm.classList.remove('sm-swap'); void sm.offsetWidth; sm.classList.add('sm-swap') }
  }
  show(0, false)
  range.addEventListener('input', () => {
    const v = Number(range.value)
    wins[idx].pct = v
    out.value = `${v}%`
    draw(v)
    held = Date.now() + 8000
  })
  // Fill up once it scrolls into view, then take turns like the real one.
  new IntersectionObserver((entries, io) => {
    if (!entries.some(e => e.isIntersecting)) return
    io.disconnect()
    if (reduced) return
    const target = wins[0].pct
    const from = performance.now()
    const step = (now: number) => {
      const k = Math.min(1, (now - from) / 1400)
      draw(target * (1 - Math.pow(1 - k, 4)))
      if (k < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
    setInterval(() => { if (Date.now() > held && !document.hidden) show((idx + 1) % wins.length) }, 5000)
  }, { threshold: .4 }).observe(demo)
})

// ---------- the particle field ----------
// Short dashes in Google's colours, in a slow ring that leans toward the pointer and moves out of its way.
const STOPS: [number, number[]][] = [[0, [66, 133, 244]], [70, [80, 105, 240]], [130, [123, 97, 255]], [185, [161, 66, 244]], [218, [234, 67, 53]], [250, [250, 123, 23]], [285, [251, 188, 4]], [322, [52, 168, 83]], [360, [66, 133, 244]]]
function hueAt (deg: number) {
  deg = ((deg % 360) + 360) % 360
  for (let i = 1; i < STOPS.length; i++) {
    const [d1, c1] = STOPS[i]
    const [d0, c0] = STOPS[i - 1]
    if (deg <= d1) {
      const k = (deg - d0) / (d1 - d0)
      return c0.map((v, j) => Math.round(v + (c1[j] - v) * k))
    }
  }
  return STOPS[0][1]
}
interface Dot { a: number, r: number, w: number, len: number, wid: number, alpha: number, col: string, phase: number, ox: number, oy: number, grey: boolean, sx: number, sy: number }
const FIELDS: Record<string, { cx: number, cy: number, rx: number, ry: number, density: number }> = {
  hero: { cx: .5, cy: .47, rx: .5, ry: .46, density: 1 },
  feature: { cx: .8, cy: .52, rx: .34, ry: .5, density: .6 },
  cta: { cx: .86, cy: .5, rx: .3, ry: .62, density: .55 },
}
function field (canvas: HTMLCanvasElement) {
  const cfg = FIELDS[canvas.dataset.field || 'hero']
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  let w = 0, h = 0, dpr = 1, dots: Dot[] = []
  let mx = -9999, my = -9999, cx = 0, cy = 0, visible = false, raf = 0, last = 0
  // The ring opens out from the middle when it first shows, and again on a burst.
  let born = 0, burst = -1e9
  const build = () => {
    dpr = Math.min(2, devicePixelRatio || 1)
    w = canvas.clientWidth; h = canvas.clientHeight
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr)
    const n = Math.round(Math.min(1100, Math.max(260, (w * h) / 1300)) * cfg.density)
    cx = w * cfg.cx; cy = h * cfg.cy
    dots = Array.from({ length: n }, () => {
      const grey = Math.random() < .16
      const a = Math.random() * Math.PI * 2
      const r = grey ? .15 + Math.random() * 1.4 : .66 + .48 * Math.pow(Math.random(), .85)
      const [R, G, B] = hueAt((a * 180) / Math.PI)
      return {
        a, r, grey,
        w: (Math.random() * .6 + .4) * (Math.random() < .5 ? 1 : -1) * .00004 + .00005,
        len: grey ? 1.2 : 2.6 + Math.random() * 4.2,
        wid: grey ? 1.2 : 1.5 + Math.random() * .9,
        alpha: grey ? .35 : .45 + Math.random() * .55,
        col: grey ? '154,160,166' : `${R},${G},${B}`,
        phase: Math.random() * Math.PI * 2,
        ox: 0, oy: 0, sx: 0, sy: 0,
      }
    })
  }
  const frame = (now: number) => {
    const dt = Math.min(48, now - (last || now)); last = now
    // The ring leans toward the pointer, a little.
    const tx = w * cfg.cx + (mx > -999 ? (mx - w * cfg.cx) * .06 : 0)
    const ty = h * cfg.cy + (my > -999 ? (my - h * cfg.cy) * .06 : 0)
    cx += (tx - cx) * .05; cy += (ty - cy) * .05
    const rx = Math.max(w * cfg.rx, 260), ry = Math.max(h * cfg.ry, 220)
    if (!born) born = now
    const open = reduced ? 1 : 1 - Math.pow(1 - Math.min(1, (now - born) / 1800), 4)
    const kick = reduced ? 0 : Math.max(0, 1 - (now - burst) / 1100)
    const swell = open * (1 + .22 * Math.sin(Math.PI * Math.min(1, (now - burst) / 1100)) * (kick > 0 ? 1 : 0))
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)
    ctx.lineCap = 'round'
    for (const d of dots) {
      d.a += d.w * dt
      const breathe = 1 + .025 * Math.sin(now * .0007 + d.phase)
      const ca = Math.cos(d.a), sa = Math.sin(d.a)
      let x = cx + ca * rx * d.r * breathe * swell
      let y = cy + sa * ry * d.r * breathe * swell
      // Out of the pointer's way.
      const dx = x - mx, dy = y - my
      const dist = Math.hypot(dx, dy)
      let px = 0, py = 0
      if (dist < 150 && dist > .01) {
        const f = Math.pow(1 - dist / 150, 2) * 46
        px = (dx / dist) * f; py = (dy / dist) * f
      }
      d.ox += (px - d.ox) * .1; d.oy += (py - d.oy) * .1
      x += d.ox; y += d.oy
      ctx.strokeStyle = `rgba(${d.col},${d.alpha})`
      ctx.lineWidth = d.wid
      ctx.beginPath()
      ctx.moveTo(x - ca * d.len * .5, y - sa * d.len * .5)
      ctx.lineTo(x + ca * d.len * .5, y + sa * d.len * .5)
      ctx.stroke()
    }
    if (visible && !reduced) raf = requestAnimationFrame(frame)
  }
  const start = () => { cancelAnimationFrame(raf); last = 0; raf = requestAnimationFrame(frame) }
  build()
  frame(performance.now())
  new ResizeObserver(() => { build(); frame(performance.now()) }).observe(canvas)
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !reduced) start() }).observe(canvas)
  addEventListener('pointermove', e => {
    const r = canvas.getBoundingClientRect()
    mx = e.clientX - r.left; my = e.clientY - r.top
  }, { passive: true })
  document.addEventListener('pointerleave', () => { mx = my = -9999 })
  if (canvas.dataset.field === 'hero') addEventListener('ba-burst', () => { burst = performance.now(); if (visible && !reduced) start() })
}
$$<HTMLCanvasElement>('canvas[data-field]').forEach(field)

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
