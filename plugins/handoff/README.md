# Handoff

Long sessions end: the context fills up, the day ends, a teammate takes over. Type `/handoff` and the agent writes down where things stand in `.agents/handoff.md`:

- **Goal**: what this work is for.
- **Done**: what changed, with the files.
- **State**: what works, what is broken, what is half-done.
- **Next**: the next steps, in order.
- **Gotchas**: what was tried and did not work, and decisions already made.

In a new session, say `continue from the handoff` and the agent reads the note, checks it against the repository and carries on.

## Quick install

**Linux / macOS:**

```bash
curl -fsSL https://raw.githubusercontent.com/Mate-Logic/betterantigravity/main/install.sh | bash -s -- handoff
```

**Windows (PowerShell):**

```powershell
$env:PLUGINS="handoff"; irm https://raw.githubusercontent.com/Mate-Logic/betterantigravity/main/install.ps1 | iex
```
## Use

```text
/handoff
continue from the handoff
```
