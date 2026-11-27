#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { pathToFileURL } from 'node:url'

const DATA_DIR = process.env.PLUGIN_DATA || path.join(os.homedir(), '.gemini', 'antigravity-cli', 'plugin_data', 'after')

function queueFile (sessionId) {
  const safe = (sessionId || 'default').replace(/[^a-zA-Z0-9._-]/g, '_')
  return path.join(DATA_DIR, `queue-${safe}.json`)
}

export function loadQueue (sessionId) {
  const file = queueFile(sessionId)
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'))
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export function saveQueue (sessionId, items) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.writeFileSync(queueFile(sessionId), JSON.stringify(items, null, 2))
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const [, , cmd, ...rest] = process.argv
  const sessionIdx = rest.indexOf('--session')
  let sessionId = process.env.AGY_CONVERSATION_ID || 'default'
  const args = [...rest]
  if (sessionIdx !== -1 && args[sessionIdx + 1]) {
    sessionId = args[sessionIdx + 1]
    args.splice(sessionIdx, 2)
  }

  const items = loadQueue(sessionId)

  if (!cmd || cmd === 'list') {
    if (items.length === 0) {
      console.log('Queue is empty.')
    } else {
      items.forEach((item, i) => console.log(`${i + 1}. ${item.text}`))
    }
  } else if (cmd === 'add') {
    const text = args.join(' ').trim()
    if (!text) {
      console.error('Usage: after.mjs add <task> [--session <id>]')
      process.exit(1)
    }
    items.push({ text, addedAt: Date.now() })
    saveQueue(sessionId, items)
    console.log(`Queued (#${items.length}): ${text}`)
  } else if (cmd === 'remove' || cmd === 'rm') {
    const idx = Number(args[0]) - 1
    if (!Number.isInteger(idx) || idx < 0 || idx >= items.length) {
      console.error(`Invalid item number: ${args[0]}`)
      process.exit(1)
    }
    const [removed] = items.splice(idx, 1)
    saveQueue(sessionId, items)
    console.log(`Removed: ${removed.text}`)
  } else if (cmd === 'clear') {
    saveQueue(sessionId, [])
    console.log('Queue cleared.')
  } else if (cmd === 'pop') {
    const next = items.shift()
    saveQueue(sessionId, items)
    if (next) console.log(next.text)
  } else {
    console.error(`Unknown command: ${cmd}`)
    process.exit(1)
  }
}
