#!/usr/bin/env node
let raw = ''
for await (const chunk of process.stdin) raw += chunk

let input = {}
try {
  input = raw.trim() ? JSON.parse(raw) : {}
} catch {
  process.stdout.write('{}')
  process.exit(0)
}

const prompt = String(input.lastUserInput || '').trimStart()
if ((input.invocationNum && input.invocationNum > 1) || !/^_(?:\s|$)/.test(prompt)) {
  process.stdout.write('{}')
  process.exit(0)
}

process.stdout.write(JSON.stringify({
  injectSteps: [
    {
      systemMessage: {
        systemMessage: '[Fast Turn Mode] The user prefixed this prompt with "_". Treat the leading "_" as a mode switch, not literal text. Keep this turn ultra-fast and concise: answer directly, skip unnecessary exploration, avoid verbose formatting, and use minimal tool calls.',
        metadata: {
          user_markdown: '⚡ **Fast Turn (`_`)** activo para este turno'
        }
      }
    }
  ]
}))
