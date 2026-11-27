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
if ((input.invocationNum && input.invocationNum > 1) || !/^\+(?:\s|$)/.test(prompt)) {
  process.stdout.write('{}')
  process.exit(0)
}

process.stdout.write(JSON.stringify({
  injectSteps: [
    {
      systemMessage: {
        systemMessage: '[Think Hard Mode] The user prefixed this prompt with "+". Treat the leading "+" as a mode switch, not literal text. Spend maximum analytical rigor on this turn: analyze edge cases, verify assumptions against actual code/output, consider alternative approaches, and double-check your final answer before responding.',
        metadata: {
          user_markdown: '🧠 **Think Hard** activo para este turno'
        }
      }
    }
  ]
}))
