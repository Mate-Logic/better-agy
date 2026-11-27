#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

export function fmt (n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return String(n)
}

export function readTokenStats (transcriptPath) {
  if (!transcriptPath || !fs.existsSync(transcriptPath)) return null
  const lines = fs.readFileSync(transcriptPath, 'utf8').trim().split('\n')

  let totalIn = 0
  let totalOut = 0
  let totalCache = 0
  let calls = 0
  let last = null

  for (const line of lines) {
    try {
      const step = JSON.parse(line)
      if (step.type === 'PLANNER_RESPONSE') {
        const inp = step.input_tokens || 0
        const out = step.output_tokens || 0
        const cache = step.cache_read_tokens || 0
        totalIn += inp
        totalOut += out
        totalCache += cache
        calls++
        last = { inp, out, cache, model: step.model || 'unknown' }
      }
    } catch {}
  }

  if (!last) return null
  return { last, totalIn, totalOut, totalCache, calls }
}

export function formatSummary (s) {
  return `📊 **Tokens** · turno: \`${fmt(s.last.inp)} in\` / \`${fmt(s.last.out)} out\` / \`${fmt(s.last.cache)} cache\` · sesión (${s.calls}): \`${fmt(s.totalIn)} in\` / \`${fmt(s.totalOut)} out\` / \`${fmt(s.totalCache)} cache\``
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const stats = readTokenStats(process.argv[2])
  if (!stats) {
    console.log('No token data found in transcript.')
    process.exit(0)
  }
  console.log(formatSummary(stats))
}
