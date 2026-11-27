#!/usr/bin/env node
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawn } from 'node:child_process'

const args = process.argv.slice(2)
const openMode = args.includes('--open') || args.includes('-o')
const targetArg = args.find(a => !a.startsWith('-'))

if (!targetArg) {
  console.error('Usage: peek.mjs <path> [--open]')
  process.exit(1)
}

const resolved = path.resolve(targetArg.replace(/^~(?=$|[\\/])/, os.homedir()))
if (!fs.existsSync(resolved)) {
  console.error(`Path not found: ${resolved}`)
  process.exit(1)
}

const stat = fs.statSync(resolved)

if (openMode) {
  const dir = stat.isDirectory() ? resolved : path.dirname(resolved)
  let child
  if (process.platform === 'win32') {
    child = stat.isDirectory()
      ? spawn('explorer', [dir], { detached: true, stdio: 'ignore', windowsHide: true })
      : spawn('explorer', [`/select,${resolved}`], { detached: true, stdio: 'ignore', windowsHide: true })
  } else if (process.platform === 'darwin') {
    child = stat.isDirectory()
      ? spawn('open', [dir], { detached: true, stdio: 'ignore' })
      : spawn('open', ['-R', resolved], { detached: true, stdio: 'ignore' })
  } else {
    child = spawn('xdg-open', [dir], { detached: true, stdio: 'ignore' })
  }
  child.unref()
  console.log(`Opened in file manager: ${dir}`)
  process.exit(0)
}

function fmtSize (bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${bytes} B`
}

if (stat.isDirectory()) {
  const entries = fs.readdirSync(resolved, { withFileTypes: true }).sort((a, b) => {
    if (a.isDirectory() !== b.isDirectory()) return a.isDirectory() ? -1 : 1
    return a.name.localeCompare(b.name)
  })
  console.log(`📁 ${resolved} (${entries.length} items)`)
  for (const e of entries.slice(0, 40)) {
    console.log(`  ${e.isDirectory() ? '📂' : '📄'} ${e.name}${e.isDirectory() ? '/' : ''}`)
  }
  if (entries.length > 40) console.log(`  ... and ${entries.length - 40} more`)
  process.exit(0)
}

const ext = path.extname(resolved).toLowerCase()
const isImage = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp', '.svg'].includes(ext)
console.log(`📄 ${resolved} (${fmtSize(stat.size)}, modified ${stat.mtime.toISOString().slice(0, 16).replace('T', ' ')})`)

if (isImage) {
  console.log(`Image file (${ext.slice(1).toUpperCase()}). Run with --open to open in viewer or use /preview for inline Ghostty rendering.`)
  process.exit(0)
}

const buf = fs.readFileSync(resolved)
const isBinary = buf.subarray(0, 4096).includes(0)
if (isBinary) {
  console.log('Binary file (preview skipped). Use --open to reveal in file manager.')
  process.exit(0)
}

const lines = buf.toString('utf8').split('\n')
const maxLines = 40
lines.slice(0, maxLines).forEach((line, i) => {
  console.log(`${String(i + 1).padStart(4, ' ')} │ ${line}`)
})
if (lines.length > maxLines) {
  console.log(`     … (${lines.length - maxLines} more lines)`)
}
