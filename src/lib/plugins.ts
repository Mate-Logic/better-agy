import { marked } from 'marked'
import { execSync } from 'node:child_process'
import { REPO, BRANCH, ORDER } from '../site'

// Every file under /plugins, as text, at build time.
const raw = import.meta.glob('/plugins/**/*', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

export interface PluginFile { path: string, content: string }
export interface Plugin {
  name: string
  displayName: string
  description: string
  version: string
  suggestedPrompts: string[]
  readmeHtml: Record<'en' | 'es', string>
  files: PluginFile[]
  counts: { skills: number, agents: number, rules: number, mcp: number, hooks: number, statusline: number }
  sourceUrl: string
  docsUrl: string
  docsUrlEs: string
}

const byPlugin = new Map<string, PluginFile[]>()
for (const [full, content] of Object.entries(raw)) {
  const m = full.match(/^\/plugins\/([^/]+)\/(.+)$/)
  if (!m) continue
  const [, name, path] = m
  if (!byPlugin.has(name)) byPlugin.set(name, [])
  byPlugin.get(name)!.push({ path, content })
}

// plugin.json first, then README, then the rest in path order.
const rank = (p: string) => (p === 'plugin.json' || p === '.antigravity-plugin/plugin.json') ? 0 : p === 'README.md' ? 1 : p === 'README.es.md' ? 2 : 3
const order = (n: string) => { const i = ORDER.indexOf(n); return i === -1 ? ORDER.length : i }

export const plugins: Plugin[] = [...byPlugin.entries()]
  .flatMap(([name, files]) => {
    const manifest = files.find(f => f.path === '.antigravity-plugin/plugin.json') ?? files.find(f => f.path === 'plugin.json')
    if (!manifest) return []
    const meta = JSON.parse(manifest.content)
    const readme = files.find(f => f.path === 'README.md')?.content ?? ''
    const readmeEs = files.find(f => f.path === 'README.es.md')?.content ?? readme
    // The README's top heading is the panel's title already.
    const md = (s: string) => marked.parse(s.replace(/^# .*\n+/, ''), { async: false }) as string
    files.sort((a, b) => rank(a.path) - rank(b.path) || a.path.localeCompare(b.path))
    const skills = new Set(files.filter(f => /^skills\/[^/]+\/SKILL\.md$/.test(f.path)).map(f => f.path))
    return [{
      name: meta.name ?? name,
      displayName: meta.displayName ?? name,
      description: meta.description ?? '',
      version: meta.version ?? '0.0.0',
      suggestedPrompts: meta.suggestedPrompts ?? [],
      readmeHtml: { en: md(readme), es: md(readmeEs) },
      files,
      counts: {
        skills: skills.size,
        agents: files.filter(f => /^agents\/[^/]+\.md$/.test(f.path)).length,
        rules: files.filter(f => /^rules\/[^/]+\.md$/.test(f.path)).length,
        mcp: files.some(f => f.path === 'mcp_config.json') ? Object.keys(JSON.parse(files.find(f => f.path === 'mcp_config.json')!.content).mcpServers ?? {}).length : 0,
        hooks: files.some(f => f.path === 'hooks.json') ? 1 : 0,
        statusline: files.some(f => f.path === 'scripts/statusline.py') ? 1 : 0,
      },
      sourceUrl: `${REPO}/tree/${BRANCH}/plugins/${name}`,
      docsUrl: `${REPO}/blob/${BRANCH}/plugins/${name}/README.md`,
      docsUrlEs: `${REPO}/blob/${BRANCH}/plugins/${name}/${files.some(f => f.path === 'README.es.md') ? 'README.es.md' : 'README.md'}`,
    }]
  })
  .sort((a, b) => order(a.name) - order(b.name) || a.name.localeCompare(b.name))

// When the plugins last changed, from git; the build time when git has nothing to say.
export function pluginsUpdated (): string {
  try {
    const iso = execSync('git log -1 --format=%cI -- plugins', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
    if (iso) return iso
  } catch {}
  return new Date().toISOString()
}
