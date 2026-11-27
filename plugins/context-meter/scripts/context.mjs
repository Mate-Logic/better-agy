#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

export function modelLimit (model = '') {
  const m = String(model).toLowerCase()
  if (m.includes('gemini')) return 1_000_000
  if (m.includes('claude')) return 200_000
  if (m.includes('gpt-4') || m.includes('o1') || m.includes('o3')) return 200_000
  return 1_000_000
}

export function formatK (n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return String(n)
}

export function readContextStats (transcriptPath) {
  if (!transcriptPath || !fs.existsSync(transcriptPath)) return null
  const lines = fs.readFileSync(transcriptPath, 'utf8').trim().split('\n')
  for (let i = lines.length - 1; i >= 0; i--) {
    try {
      const step = JSON.parse(lines[i])
      if (step.type === 'PLANNER_RESPONSE' && (step.input_tokens || step.cache_read_tokens)) {
        const used = (step.input_tokens || 0) + (step.cache_read_tokens || 0)
        const limit = modelLimit(step.model)
        const pct = Math.min(100, Math.round((used / limit) * 1000) / 10)
        return { model: step.model || 'unknown', used, limit, pct }
      }
    } catch {}
  }
  return null
}

export function renderBar (pct, width = 12) {
  const filled = Math.round((Math.min(100, pct) / 100) * width)
  return '█'.repeat(filled) + '░'.repeat(Math.max(0, width - filled))
}

export function formatLine (stats) {
  const icon = stats.pct >= 85 ? '🔴' : stats.pct >= 65 ? '🟡' : '🟢'
  const hint = stats.pct >= 85
    ? ' — conviene abrir una sesión nueva'
    : stats.pct >= 65
      ? ' — buen momento para `/compact`'
      : ''
  return `${icon} **Context**: \`${renderBar(stats.pct)}\` **${stats.pct}%** (${formatK(stats.used)} / ${formatK(stats.limit)} · \`${stats.model}\`)${hint}`
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const transcript = process.argv[2]
  const stats = readContextStats(transcript)
  if (!stats) {
    console.log('No context data found in transcript.')
    process.exit(0)
  }
  console.log(formatLine(stats))
}
