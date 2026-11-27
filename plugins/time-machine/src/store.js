import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'

export const DATA_DIR = process.env.PLUGIN_DATA || path.join(os.homedir(), '.gemini', 'antigravity-cli', 'plugin_data', 'time-machine')
export const MAX_AGE_DAYS = 7

function safeId (id) {
  return (id || 'default').replace(/[^a-zA-Z0-9._-]/g, '_')
}

export function stateFile (sessionId) {
  return path.join(DATA_DIR, `session-${safeId(sessionId)}.json`)
}

export function loadSession (sessionId) {
  try {
    return JSON.parse(fs.readFileSync(stateFile(sessionId), 'utf8'))
  } catch {
    return {
      sessionId,
      repoTop: null,
      states: [],
      cursor: null,
      jumpedFrom: null,
      turnBefore: null,
      lastAgentTree: null,
      jumpedSinceLastTurn: false,
      prunedAt: 0
    }
  }
}

export function saveSession (sessionId, data) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.writeFileSync(stateFile(sessionId), JSON.stringify(data, null, 2))
}

export function listSessionsForRepo (repoTop) {
  try {
    const files = fs.readdirSync(DATA_DIR).filter(f => f.startsWith('session-') && f.endsWith('.json'))
    const sessions = []
    for (const f of files) {
      try {
        const s = JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), 'utf8'))
        if (!repoTop || s.repoTop === repoTop) sessions.push(s)
      } catch {}
    }
    return sessions.sort((a, b) => {
      const aLast = a.states?.at(-1)?.at ?? 0
      const bLast = b.states?.at(-1)?.at ?? 0
      return bLast - aLast
    })
  } catch {
    return []
  }
}
