#!/usr/bin/env node
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawn, spawnSync } from 'node:child_process'

const args = process.argv.slice(2)
const openMode = args.includes('--open') || args.includes('-o')
const targetArg = args.find(a => !a.startsWith('-'))

if (!targetArg) {
  console.error('Usage: preview.mjs <image-path> [--open]')
  process.exit(1)
}

const resolved = path.resolve(targetArg.replace(/^~(?=$|[\\/])/, os.homedir()))
if (!fs.existsSync(resolved)) {
  console.error(`Image not found: ${resolved}`)
  process.exit(1)
}

const stat = fs.statSync(resolved)
const ext = path.extname(resolved).toLowerCase()

function fmtSize (bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${bytes} B`
}

// Parse PNG dimensions directly if PNG
let dims = ''
const buf = fs.readFileSync(resolved)
if (ext === '.png' && buf.length >= 24 && buf.toString('ascii', 1, 4) === 'PNG') {
  const w = buf.readUInt32BE(16)
  const h = buf.readUInt32BE(20)
  dims = ` · ${w}×${h}`
}

console.log(`🖼️ ${path.basename(resolved)} (${fmtSize(stat.size)}${dims}) — ${resolved}`)

if (openMode) {
  let child
  if (process.platform === 'win32') {
    child = spawn('cmd', ['/c', 'start', '', resolved], { detached: true, stdio: 'ignore', windowsHide: true })
  } else if (process.platform === 'darwin') {
    child = spawn('open', [resolved], { detached: true, stdio: 'ignore' })
  } else {
    child = spawn('xdg-open', [resolved], { detached: true, stdio: 'ignore' })
  }
  child.unref()
  console.log('Opened in system image viewer.')
  process.exit(0)
}

// Render inline via Kitty Graphics Protocol (supported by Ghostty & Kitty) when stdout is a TTY
if (process.stdout.isTTY && ext === '.png') {
  const b64 = buf.toString('base64')
  const chunkSize = 4096
  for (let i = 0; i < b64.length; i += chunkSize) {
    const chunk = b64.slice(i, i + chunkSize)
    const more = i + chunkSize < b64.length ? 1 : 0
    const header = i === 0 ? `a=T,f=100,c=40,m=${more}` : `m=${more}`
    process.stdout.write(`\x1b_G${header};${chunk}\x1b\\`)
  }
  process.stdout.write('\n')
} else if (process.stdout.isTTY) {
  // Try chafa if installed
  const hasChafa = process.platform === 'win32'
    ? spawnSync('where', ['chafa'], { stdio: 'ignore', windowsHide: true }).status === 0
    : spawnSync('sh', ['-c', 'command -v chafa'], { stdio: 'ignore' }).status === 0
  if (hasChafa) {
    spawnSync('chafa', ['--size=60x24', resolved], { stdio: 'inherit' })
  } else {
    console.log('Tip: pass --open to open in your image viewer, or use PNG in Ghostty/Kitty for native inline rendering.')
  }
}
