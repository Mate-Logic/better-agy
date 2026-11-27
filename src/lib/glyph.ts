// The Antigravity CLI welcome glyph, cell for cell as `agy` prints it.
// Each terminal cell is 1 unit wide and 2 tall; ▀ fills the top half, ▄ the bottom.
export const GLYPH = [
  "    ▄▀▀▄    ",
  "   ▀▀▀▀▀▀   ",
  "  ▀▀▀▀▀▀▀▀  ",
  " ▄▀▀    ▀▀▄ ",
  "▄▀▀      ▀▀▄"
]

export function glyphPath (): string {
  let d = ''
  GLYPH.forEach((row, r) => {
    ;[...row].forEach((g, c) => {
      if (g === '▀' || g === '█') d += `M${c} ${r * 2}h1v1h-1z`
      if (g === '▄' || g === '█') d += `M${c} ${r * 2 + 1}h1v1h-1z`
    })
  })
  return d
}
