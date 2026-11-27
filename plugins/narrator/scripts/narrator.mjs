#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { pathToFileURL } from 'node:url'
import { spawn, spawnSync } from 'node:child_process'
import { guessLanguage } from './text.mjs'

export const DATA_DIR = process.env.PLUGIN_DATA || path.join(os.homedir(), '.gemini', 'antigravity-cli', 'plugin_data', 'narrator')
const CONFIG_FILE = path.join(DATA_DIR, 'config.json')
const LAST_FILE = path.join(DATA_DIR, 'last.json')
const PID_FILE = path.join(DATA_DIR, 'speaking.pid')
const IS_WIN = process.platform === 'win32'
const IS_MAC = process.platform === 'darwin'

const DEFAULT_CONFIG = {
  enabled: false,
  voice: '',
  lang: '',
  speed: 1.3,
  speakCommand: '',
  maxChars: 360
}

export function loadConfig () {
  try {
    return { ...DEFAULT_CONFIG, ...JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')) }
  } catch {
    return { ...DEFAULT_CONFIG }
  }
}

export function saveConfig (cfg) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(cfg, null, 2))
}

export function loadLast () {
  try {
    return JSON.parse(fs.readFileSync(LAST_FILE, 'utf8'))
  } catch {
    return null
  }
}

export function saveLast (data) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.writeFileSync(LAST_FILE, JSON.stringify(data, null, 2))
}

const clamp = (v, min, max) => Math.min(Math.max(v, min), max)
const dispatcherRate = (speed) => Math.round(clamp(((speed - 1) * 170 * 100) / (speed >= 1 ? 279 : 90), -100, 100))
const espeakWords = (speed) => Math.round(clamp(175 * speed, 80, 450))
const macRate = (speed) => Math.round(clamp(180 * speed, 90, 400))
const winRate = (speed) => Math.round(clamp((speed - 1) * 5, -10, 10))

function hasCmd (name) {
  if (IS_WIN) {
    return spawnSync('where', [name], { stdio: 'ignore', windowsHide: true }).status === 0
  }
  return spawnSync('sh', ['-c', `command -v ${name}`], { stdio: 'ignore' }).status === 0
}

export function stopSpeaking () {
  try {
    const pid = Number(fs.readFileSync(PID_FILE, 'utf8').trim())
    if (Number.isInteger(pid) && pid > 1) {
      if (IS_WIN) {
        spawnSync('taskkill', ['/PID', String(pid), '/T', '/F'], { stdio: 'ignore', windowsHide: true })
      } else {
        try { process.kill(-pid, 'SIGTERM') } catch {}
        try { process.kill(pid, 'SIGTERM') } catch {}
      }
    }
  } catch {}
  try { fs.unlinkSync(PID_FILE) } catch {}
  if (!IS_WIN && !IS_MAC && hasCmd('spd-say')) {
    spawnSync('spd-say', ['-C'], { stdio: 'ignore', timeout: 2000 })
  }
}

export function speakDetached (text, opts = {}) {
  const clean = String(text || '').trim()
  if (!clean) return false

  stopSpeaking()
  const cfg = loadConfig()
  const lang = (opts.lang || cfg.lang || guessLanguage(clean) || 'en').split('-')[0].toLowerCase()
  const voice = opts.voice !== undefined ? opts.voice : cfg.voice
  const speed = Number(opts.speed || cfg.speed) || 1.3
  const speakCommand = cfg.speakCommand

  let cmd
  let args
  const env = {
    ...process.env,
    NARRATOR_TEXT: clean,
    NARRATOR_LANG: lang,
    NARRATOR_VOICE: voice || '',
    NARRATOR_SPEED: String(speed)
  }

  if (speakCommand) {
    if (IS_WIN) {
      cmd = 'cmd'
      args = ['/c', `${speakCommand} "%NARRATOR_TEXT%"`]
    } else {
      cmd = 'sh'
      args = ['-c', `${speakCommand} "$NARRATOR_TEXT"`]
    }
  } else if (IS_WIN) {
    cmd = 'powershell'
    const rate = winRate(speed)
    const ps = [
      'Add-Type -AssemblyName System.Speech;',
      '$s = New-Object System.Speech.Synthesis.SpeechSynthesizer;',
      `$s.Rate = ${rate};`,
      'if ($env:NARRATOR_VOICE) { try { $s.SelectVoice($env:NARRATOR_VOICE) } catch {} }',
      'elseif ($env:NARRATOR_LANG) { $v = $s.GetInstalledVoices() | Where-Object { $_.Enabled -and $_.VoiceInfo.Culture.TwoLetterISOLanguageName -eq $env:NARRATOR_LANG } | Select-Object -First 1; if ($v) { $s.SelectVoice($v.VoiceInfo.Name) } };',
      '$s.Speak($env:NARRATOR_TEXT);'
    ].join(' ')
    args = ['-NoProfile', '-NonInteractive', '-Command', ps]
  } else if (IS_MAC && hasCmd('say')) {
    cmd = 'say'
    args = ['-r', String(macRate(speed))]
    if (voice) args.push('-v', voice)
    args.push(clean)
  } else if (hasCmd('spd-say')) {
    cmd = 'spd-say'
    args = ['-w', '-r', String(dispatcherRate(speed))]
    if (lang) args.push('-l', lang)
    if (voice) args.push('-y', voice)
    args.push('--', clean)
  } else if (hasCmd('espeak-ng')) {
    cmd = 'espeak-ng'
    args = ['-s', String(espeakWords(speed))]
    if (voice) args.push('-v', voice)
    else if (lang) args.push('-v', lang)
    args.push('--', clean)
  } else if (hasCmd('espeak')) {
    cmd = 'espeak'
    args = ['-s', String(espeakWords(speed))]
    if (voice) args.push('-v', voice)
    else if (lang) args.push('-v', lang)
    args.push('--', clean)
  } else {
    return false
  }

  fs.mkdirSync(DATA_DIR, { recursive: true })
  const child = spawn(cmd, args, {
    detached: true,
    stdio: 'ignore',
    windowsHide: true,
    env
  })
  if (child.pid) {
    fs.writeFileSync(PID_FILE, String(child.pid))
  }
  child.unref()
  return true
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const [, , cmd = 'toggle', ...rest] = process.argv
  const cfg = loadConfig()

  if (cmd === 'toggle') {
    cfg.enabled = !cfg.enabled
    saveConfig(cfg)
    if (!cfg.enabled) stopSpeaking()
    console.log(`Narrator is now ${cfg.enabled ? 'ON' : 'OFF'}.`)
  } else if (cmd === 'on') {
    cfg.enabled = true
    saveConfig(cfg)
    console.log('Narrator is now ON.')
  } else if (cmd === 'off') {
    cfg.enabled = false
    saveConfig(cfg)
    stopSpeaking()
    console.log('Narrator is now OFF.')
  } else if (cmd === 'stop') {
    stopSpeaking()
    console.log('Stopped current narration (narrator stays ' + (cfg.enabled ? 'ON' : 'OFF') + ').')
  } else if (cmd === 'status') {
    console.log(JSON.stringify(cfg, null, 2))
  } else if (cmd === 'again') {
    const last = loadLast()
    if (!last?.text) {
      console.log('No previous narration to repeat.')
    } else {
      speakDetached(last.text, { lang: last.lang })
      console.log(`Repeating: ${last.text}`)
    }
  } else if (cmd === 'read') {
    const last = loadLast()
    if (!last?.fullText) {
      console.log('No previous answer to read.')
    } else {
      speakDetached(last.fullText, { lang: last.lang })
      console.log('Reading last answer in full.')
    }
  } else if (cmd === 'voices') {
    if (IS_WIN) {
      const r = spawnSync('powershell', [
        '-NoProfile', '-NonInteractive', '-Command',
        'Add-Type -AssemblyName System.Speech; (New-Object System.Speech.Synthesis.SpeechSynthesizer).GetInstalledVoices() | ForEach-Object { "$($_.VoiceInfo.Culture.Name)  $($_.VoiceInfo.Name)" }'
      ], { encoding: 'utf8', windowsHide: true })
      console.log((r.stdout || '').trim() || 'No Windows SAPI voices found.')
    } else if (IS_MAC && hasCmd('say')) {
      const r = spawnSync('say', ['-v', '?'], { encoding: 'utf8' })
      console.log((r.stdout || '').trim())
    } else if (hasCmd('spd-say')) {
      const r = spawnSync('spd-say', ['-L'], { encoding: 'utf8' })
      console.log((r.stdout || '').trim() || 'No voices reported by spd-say.')
    } else if (hasCmd('espeak-ng')) {
      const r = spawnSync('espeak-ng', ['--voices'], { encoding: 'utf8' })
      console.log((r.stdout || '').trim())
    } else {
      console.log('No TTS synthesizer found (install speech-dispatcher or espeak-ng on Linux).')
    }
  } else if (cmd === 'test') {
    const voice = rest.join(' ').trim()
    const sample = cfg.lang === 'es'
      ? 'Hola, esta es una prueba del narrador.'
      : 'Hello, this is a narrator voice test.'
    const ok = speakDetached(sample, { voice: voice || cfg.voice })
    console.log(ok ? `Speaking test sample${voice ? ` with voice "${voice}"` : ''}.` : 'No TTS engine available.')
  } else if (cmd === 'set') {
    const [key, ...valParts] = rest
    const val = valParts.join(' ')
    if (!['voice', 'lang', 'speed', 'speakCommand', 'maxChars'].includes(key)) {
      console.error('Allowed settings: voice, lang, speed, speakCommand, maxChars')
      process.exit(1)
    }
    cfg[key] = (key === 'speed' || key === 'maxChars') ? Number(val) : val
    saveConfig(cfg)
    console.log(`Updated ${key} = ${JSON.stringify(cfg[key])}`)
  } else {
    console.error(`Unknown command: ${cmd}`)
    process.exit(1)
  }
}
