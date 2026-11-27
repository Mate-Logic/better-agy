#!/usr/bin/env node
import { run } from '../src/runner.js'
import { locate, treeOf, keep, changes, prune, REF_ROOT } from '../src/git.js'
import { nextId } from '../src/states.js'
import { shorten, digestText } from '../src/format.js'
import { loadSession, saveSession, MAX_AGE_DAYS } from '../src/store.js'

let raw = ''
for await (const chunk of process.stdin) raw += chunk

let input = {}
try {
  input = raw.trim() ? JSON.parse(raw) : {}
} catch {
  process.stdout.write('{}')
  process.exit(0)
}

const event = input.hookEventName
const sessionId = input.conversationId || 'default'
const cwd = input.cwd || (Array.isArray(input.workspacePaths) ? input.workspacePaths[0] : process.cwd())

async function main () {
  if (!cwd) return {}
  const repo = await locate(run, cwd, sessionId.replace(/[^a-zA-Z0-9._-]/g, '_'))
  if (!repo) return {}

  const session = loadSession(sessionId)
  session.repoTop = repo.top

  if (event === 'PreInvocation') {
    // Only snapshot at the start of a new user turn (invocationNum === 1) or if not yet captured
    if (input.invocationNum && input.invocationNum > 1 && session.turnBefore) {
      return {}
    }

    // Prune snapshots older than MAX_AGE_DAYS once per day
    const now = Date.now()
    if (now - (session.prunedAt || 0) > 24 * 60 * 60 * 1000) {
      await prune(run, repo, now, MAX_AGE_DAYS * 24 * 60 * 60 * 1000).catch(() => {})
      session.prunedAt = now
    }

    const before = await treeOf(run, repo)
    session.turnBefore = {
      tree: before.tree,
      head: before.head,
      prompt: input.lastUserInput || '',
      at: now
    }

    let injectSteps
    if (session.jumpedSinceLastTurn && session.lastAgentTree && session.lastAgentTree !== before.tree) {
      const diff = await changes(run, repo, session.lastAgentTree, before.tree).catch(() => [])
      session.jumpedSinceLastTurn = false
      if (diff.length > 0) {
        injectSteps = [
          {
            systemMessage: {
              systemMessage: `[Time Machine] Files changed since your last turn (via /timeline jump): ${digestText(diff)}`
            }
          }
        ]
      }
    } else if (session.jumpedSinceLastTurn) {
      session.jumpedSinceLastTurn = false
    }

    saveSession(sessionId, session)
    return injectSteps ? { injectSteps } : {}
  }

  if (event === 'Stop') {
    if (!session.turnBefore) return {}
    const before = session.turnBefore
    session.turnBefore = null

    const after = await treeOf(run, repo)
    if (after.tree === before.tree) {
      saveSession(sessionId, session)
      return {}
    }

    const now = Date.now()
    const safeSession = sessionId.replace(/[^a-zA-Z0-9._-]/g, '_')

    // Ensure the "before" tree is saved as a state if no existing state holds it
    let parentState = session.states.find(s => s.tree === before.tree)
    if (!parentState) {
      const id = nextId(session.states)
      const label = session.states.length === 0 ? 'start of the session' : 'changes outside agent'
      const ref = `${REF_ROOT}/${safeSession}/${id}`
      const commit = await keep(run, repo, { tree: before.tree, head: before.head }, ref, label)
      parentState = {
        id,
        parent: session.cursor,
        tree: before.tree,
        head: before.head,
        commit,
        ref,
        label,
        prompt: label,
        files: [],
        at: before.at || now
      }
      session.states.push(parentState)
    }

    // Save the "after" tree as the new turn state
    const id = nextId(session.states)
    const prompt = before.prompt || input.lastUserInput || 'turn changes'
    const label = shorten(prompt)
    const ref = `${REF_ROOT}/${safeSession}/${id}`
    const commit = await keep(run, repo, after, ref, label)
    const files = await changes(run, repo, before.tree, after.tree)

    const newState = {
      id,
      parent: parentState.id,
      tree: after.tree,
      head: after.head,
      commit,
      ref,
      label,
      prompt,
      files,
      at: now
    }
    session.states.push(newState)
    session.cursor = newState.id
    session.lastAgentTree = after.tree
    saveSession(sessionId, session)
    return {}
  }

  return {}
}

main()
  .then(out => process.stdout.write(JSON.stringify(out || {})))
  .catch(() => process.stdout.write('{}'))
