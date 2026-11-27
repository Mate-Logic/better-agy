#!/usr/bin/env node
import { loadQueue, saveQueue } from './after.mjs'

let raw = ''
for await (const chunk of process.stdin) raw += chunk

let input = {}
try {
  input = raw.trim() ? JSON.parse(raw) : {}
} catch {
  process.stdout.write('{}')
  process.exit(0)
}

if (input.terminationReason && input.terminationReason !== 'NO_TOOL_CALL') {
  process.stdout.write('{}')
  process.exit(0)
}

const sessionId = input.conversationId || 'default'
const items = loadQueue(sessionId)

if (items.length === 0) {
  process.stdout.write('{}')
  process.exit(0)
}

const next = items.shift()
saveQueue(sessionId, items)

const remaining = items.length > 0 ? ` (${items.length} more queued after this)` : ''
process.stdout.write(JSON.stringify({
  decision: 'continue',
  reason: `Execute the next queued /after task${remaining}: ${next.text}`
}))
