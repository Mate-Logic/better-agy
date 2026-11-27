#!/usr/bin/env node
import { readTokenStats, formatSummary } from './tokens.mjs'

let raw = ''
for await (const chunk of process.stdin) raw += chunk

let input = {}
try {
  input = raw.trim() ? JSON.parse(raw) : {}
} catch {
  process.stdout.write('{}')
  process.exit(0)
}

const stats = readTokenStats(input.transcriptPath)
if (!stats) {
  process.stdout.write('{}')
  process.exit(0)
}

process.stdout.write(JSON.stringify({
  injectSteps: [
    {
      systemMessage: {
        systemMessage: '',
        metadata: {
          user_markdown: formatSummary(stats)
        }
      }
    }
  ]
}))
