#!/usr/bin/env node
import fs from 'node:fs'
import { loadConfig, saveLast, speakDetached, stopSpeaking } from './narrator.mjs'
import { plain, summarizeForSpeech, guessLanguage } from './text.mjs'

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

if (event === 'PreInvocation') {
  stopSpeaking()
  process.stdout.write('{}')
  process.exit(0)
}

if (event === 'Stop') {
  const cfg = loadConfig()
  if (input.terminationReason && input.terminationReason !== 'NO_TOOL_CALL') {
    process.stdout.write('{}')
    process.exit(0)
  }

  const transcriptPath = input.transcriptPath
  let lastAnswer = ''

  if (transcriptPath && fs.existsSync(transcriptPath)) {
    try {
      const lines = fs.readFileSync(transcriptPath, 'utf8').trim().split('\n')
      for (let i = lines.length - 1; i >= 0; i--) {
        const step = JSON.parse(lines[i])
        if (step.type === 'PLANNER_RESPONSE') {
          const text = step.response || step.modified_response || step.content || step.text || ''
          if (typeof text === 'string' && text.trim()) {
            lastAnswer = text.trim()
            break
          }
        }
      }
    } catch {}
  }

  if (lastAnswer) {
    const fullText = plain(lastAnswer)
    const spoken = summarizeForSpeech(lastAnswer, cfg.maxChars || 360)
    const lang = cfg.lang || guessLanguage(spoken) || guessLanguage(input.lastUserInput || '') || 'en'
    saveLast({ text: spoken, fullText, lang, at: Date.now() })
    if (cfg.enabled && spoken) {
      speakDetached(spoken, { lang })
    }
  }
}

process.stdout.write('{}')
