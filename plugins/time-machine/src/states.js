export function lineOf (states, cursor) {
  const line = new Set()
  if (cursor === null) return line
  const parentOf = new Map()
  for (const state of states) parentOf.set(state.id, state.parent)
  let id = cursor
  while (id !== null && !line.has(id)) {
    line.add(id)
    id = parentOf.get(id) ?? null
  }
  return line
}

export const nextId = states => states.reduce((max, state) => Math.max(max, state.id), 0) + 1

export function merge (saved, live) {
  const byCommit = new Map()
  for (const state of [...saved, ...live]) byCommit.set(state.commit, state)
  const merged = [...byCommit.values()].sort((a, b) => a.at - b.at || a.id - b.id)

  let max = nextId(merged) - 1
  const firstById = new Map()
  const repaired = []
  const states = merged.map(state => {
    const first = firstById.get(state.id)
    if (!first) {
      firstById.set(state.id, state)
      return state
    }
    const moved = { ...state, id: ++max }
    repaired.push(moved, first)
    return moved
  })
  return { states, repaired }
}
