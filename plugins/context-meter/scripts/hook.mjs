#!/usr/bin/env node
import { readContextStats, formatLine } from './context.mjs'

let raw = ''
for await (const chunk of process.stdin) raw += chunk

let input = {}
try {
  input = raw.trim() ? JSON.parse(raw) : {}
} catch {
  process.stdout.write('{}')
  process.exit(0)
}

const stats = readContextStats(input.transcriptPath)
if (!stats || stats.pct < 50) {
  process.stdout.write('{}')
  process.exit(0)
}

process.stdout.write(JSON.stringify({
  injectSteps: [
    {
      systemMessage: {
        systemMessage: '',
        metadata: {
          user_markdown: formatLine(stats)
        }
      }
    }
  ]
}))
