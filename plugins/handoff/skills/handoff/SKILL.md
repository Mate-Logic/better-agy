---
name: handoff
description: >-
  Write a handoff note (.agents/handoff.md) that captures the goal, what was
  done, the current state, next steps and gotchas of this session, or resume
  from an existing one. Use when the user types /handoff, wants to wrap up a
  session for later, or asks to continue from the last handoff (in any
  language, for example "seguí desde el handoff").
---

# Handoff

## Writing a handoff (`/handoff`)

1. Gather the facts: the conversation so far, `git status`, `git diff --stat`, and `git log -n 10 --oneline`.
2. Write `.agents/handoff.md` (create `.agents/` if needed; overwrite an older handoff after reading it, keeping anything from it that is still open):

```markdown
# Handoff · <YYYY-MM-DD HH:MM>

## Goal
<one or two sentences: what this work is for>

## Done
- <change> (`path/to/file`)

## State
- Works: <...>
- Broken or half-done: <...>
- Uncommitted changes: <yes/no, which files>

## Next
1. <the very next step, specific enough to start without asking>
2. <...>

## Gotchas
- <what was tried and failed, and why>
- <decisions already made and their reasons>
```

3. Be concrete: file paths, function names, commands, error messages. No filler. Keep it under about 60 lines.
4. Tell the user where the note is, and that saying "continue from the handoff" in a new session picks it up. If `.agents/handoff.md` is not ignored by git, mention it so they can decide whether to commit it.

## Resuming ("continue from the handoff", or the same in any language)

1. Read `.agents/handoff.md`. If it does not exist, say so and stop.
2. Check it against the repository: `git status`, `git log` since its date, and the files it names. Point out anything that changed since it was written.
3. Summarize the goal and the next step in two lines, then start on the first item under **Next** unless the user wants something else.
