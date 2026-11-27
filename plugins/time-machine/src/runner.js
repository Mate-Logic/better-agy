import { spawn } from 'node:child_process'

const MAX_STDOUT = 4 * 1024 * 1024

/**
 * Matches the `run(argv, init)` contract expected by better-claude's `src/git.js`.
 */
export function run (argv, init = {}) {
  return new Promise((resolve) => {
    const [cmd, ...args] = argv
    const child = spawn(cmd, args, {
      cwd: init.cwd,
      env: init.env ? { ...process.env, ...init.env } : process.env,
      stdio: ['pipe', 'pipe', 'pipe']
    })

    const outChunks = []
    let outLen = 0
    let isStdoutTruncated = false
    const errChunks = []

    child.stdout.on('data', (chunk) => {
      if (outLen < MAX_STDOUT) {
        const remaining = MAX_STDOUT - outLen
        if (chunk.length <= remaining) {
          outChunks.push(chunk)
          outLen += chunk.length
        } else {
          outChunks.push(chunk.subarray(0, remaining))
          outLen = MAX_STDOUT
          isStdoutTruncated = true
        }
      } else {
        isStdoutTruncated = true
      }
    })

    child.stderr.on('data', (chunk) => {
      if (errChunks.length < 64) errChunks.push(chunk)
    })

    let timer = null
    if (init.timeoutMs) {
      timer = setTimeout(() => {
        try { child.kill('SIGKILL') } catch {}
      }, init.timeoutMs)
    }

    child.on('error', (err) => {
      if (timer) clearTimeout(timer)
      resolve({ exitCode: 127, stdout: '', stderr: err.message, isStdoutTruncated: false })
    })

    child.on('close', (code) => {
      if (timer) clearTimeout(timer)
      resolve({
        exitCode: code ?? 1,
        stdout: Buffer.concat(outChunks).toString('utf8'),
        stderr: Buffer.concat(errChunks).toString('utf8'),
        isStdoutTruncated
      })
    })

    if (init.stdin !== undefined) {
      child.stdin.end(init.stdin)
    } else {
      child.stdin.end()
    }
  })
}
