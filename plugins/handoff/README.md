# Handoff

Long sessions end: the context fills up, the day ends, a teammate takes over. Type `/handoff` and the agent writes down where things stand in `.agents/handoff.md`:

- **Goal**: what this work is for.
- **Done**: what changed, with the files.
- **State**: what works, what is broken, what is half-done.
- **Next**: the next steps, in order.
- **Gotchas**: what was tried and did not work, and decisions already made.

In a new session, say `continue from the handoff` and the agent reads the note, checks it against the repository and carries on.

## Install

```bash
git clone --depth 1 https://github.com/Mate-Logic/betterantigravity /tmp/betterantigravity
agy plugin install /tmp/betterantigravity/plugins/handoff
```

## Use

```text
/handoff
continue from the handoff
```
