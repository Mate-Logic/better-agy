#!/usr/bin/env node
import { run } from '../src/runner.js'
import { locate, treeOf, keep, changes, move, prune, MoveBlocked, REF_ROOT } from '../src/git.js'
import { lineOf, nextId } from '../src/states.js'
import { ago, digestText, ICON, summary } from '../src/format.js'
import { loadSession, saveSession, listSessionsForRepo, MAX_AGE_DAYS } from '../src/store.js'

const argv = process.argv.slice(2)
let sessionId = process.env.AGY_CONVERSATION_ID || ''
let cwd = process.cwd()
const args = []

for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '--session' && argv[i + 1]) {
    sessionId = argv[++i]
  } else if (argv[i] === '--cwd' && argv[i + 1]) {
    cwd = argv[++i]
  } else {
    args.push(argv[i])
  }
}

const cmd = args[0] || 'list'

async function resolveContext () {
  const probe = await locate(run, cwd, 'probe')
  if (!probe) {
    console.error('Time Machine requires a git repository.')
    process.exit(1)
  }
  if (!sessionId) {
    const sessions = listSessionsForRepo(probe.top)
    sessionId = sessions[0]?.sessionId || 'default'
  }
  const safeSession = sessionId.replace(/[^a-zA-Z0-9._-]/g, '_')
  const repo = await locate(run, cwd, safeSession)
  const session = loadSession(sessionId)
  session.repoTop = repo.top
  return { repo, session, safeSession }
}

async function jumpTo (repo, session, safeSession, targetId) {
  const target = session.states.find(s => s.id === targetId)
  if (!target) {
    console.error(`State #${targetId} not found.`)
    process.exit(1)
  }

  const nowTree = await treeOf(run, repo)
  // Save current unsaved working tree if no state holds it yet
  let currentState = session.states.find(s => s.tree === nowTree.tree)
  if (!currentState) {
    const id = nextId(session.states)
    const label = 'your changes, kept before a jump'
    const ref = `${REF_ROOT}/${safeSession}/${id}`
    const commit = await keep(run, repo, nowTree, ref, label)
    currentState = {
      id,
      parent: session.cursor,
      tree: nowTree.tree,
      head: nowTree.head,
      commit,
      ref,
      label,
      prompt: label,
      files: [],
      at: Date.now()
    }
    session.states.push(currentState)
  }

  if (nowTree.tree === target.tree) {
    session.cursor = target.id
    saveSession(sessionId, session)
    console.log(`Already at state #${target.id}: ${target.label}`)
    return
  }

  try {
    const moved = await move(run, repo, nowTree.tree, target.tree)
    session.jumpedFrom = currentState.id
    session.cursor = target.id
    session.jumpedSinceLastTurn = true
    saveSession(sessionId, session)

    console.log(`Jumped to #${target.id} (${target.label})`)
    console.log(`Changed: ${digestText(moved)} (${summary(moved)})`)
    if (target.head && nowTree.head && target.head !== nowTree.head) {
      console.log('Note: HEAD moved since this snapshot. Files were restored on top of your current HEAD/branch.')
    }
  } catch (err) {
    if (err instanceof MoveBlocked) {
      console.error(`Jump blocked: ${err.message}`)
      process.exit(1)
    }
    throw err
  }
}

async function main () {
  const { repo, session, safeSession } = await resolveContext()

  if (cmd === 'list' || cmd === 'status') {
    if (session.states.length === 0) {
      console.log('No Time Machine snapshots yet in this session.')
      return
    }
    const now = Date.now()
    const onLine = lineOf(session.states, session.cursor)
    console.log(`Time Machine (${session.states.length} states, session ${sessionId.slice(0, 8)}):`)
    for (const s of [...session.states].reverse()) {
      const marker = s.id === session.cursor ? '◉' : onLine.has(s.id) ? '●' : '○'
      const age = ago(now - s.at)
      const files = s.files?.length ? digestText(s.files) : 'no files'
      console.log(`${marker} #${s.id}  ${s.label}  (${age})`)
      console.log(`    ${files}`)
    }
    return
  }

  if (cmd === 'undo') {
    const current = session.states.find(s => s.id === session.cursor)
    if (!current || current.parent === null) {
      console.log('Nothing to undo.')
      return
    }
    await jumpTo(repo, session, safeSession, current.parent)
    return
  }

  if (cmd === 'redo') {
    const children = session.states.filter(s => s.parent === session.cursor)
    if (children.length === 0) {
      console.log('Nothing to redo.')
      return
    }
    const newest = children.sort((a, b) => b.at - a.at)[0]
    await jumpTo(repo, session, safeSession, newest.id)
    return
  }

  if (cmd === 'diff') {
    const targetId = Number(String(args[1] || '').replace(/^#/, ''))
    const target = session.states.find(s => s.id === targetId)
    if (!target) {
      console.error(`State #${args[1]} not found.`)
      process.exit(1)
    }
    const nowTree = await treeOf(run, repo)
    const diff = await changes(run, repo, nowTree.tree, target.tree)
    if (diff.length === 0) {
      console.log(`Working tree already matches #${target.id}.`)
    } else {
      console.log(`Jumping to #${target.id} (${target.label}) would change ${summary(diff)}:`)
      for (const f of diff) {
        const stats = f.added === null ? 'binary' : `+${f.added} -${f.removed}`
        console.log(`  ${ICON[f.status] ?? '~'} ${f.path} (${stats})`)
      }
    }
    return
  }

  if (cmd === 'prune') {
    const days = Number(args[1]) || MAX_AGE_DAYS
    const dropped = await prune(run, repo, Date.now(), days * 24 * 60 * 60 * 1000)
    console.log(`Pruned ${dropped} snapshot(s) older than ${days} day(s).`)
    return
  }

  if (cmd === 'go' || /^#?\d+$/.test(cmd)) {
    const rawId = cmd === 'go' ? args[1] : cmd
    const targetId = Number(String(rawId || '').replace(/^#/, ''))
    if (!Number.isInteger(targetId)) {
      console.error('Usage: timeline.mjs [list | <n> | go <n> | undo | redo | diff <n> | prune [days]]')
      process.exit(1)
    }
    await jumpTo(repo, session, safeSession, targetId)
    return
  }

  console.error(`Unknown command: ${cmd}`)
  process.exit(1)
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
