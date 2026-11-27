// Line icons, 24×24, drawn for this site: one per plugin, plus a few for the interface.
// Stroke only, 1.5 wide, round ends; colour comes from currentColor.
export const ICONS: Record<string, string> = {
  'sub-meter': '<path d="M3.5 16.5a8.5 8.5 0 0 1 17 0"/><path d="M12 16.5l3.6-4.6"/><circle cx="12" cy="16.5" r="1.3"/><path d="M4 20.5h16"/>',
  commit: '<circle cx="12" cy="12" r="3.6"/><path d="M2.5 12h5.9M15.6 12h5.9"/>',
  review: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.3 15.3L21 21"/><path d="M7.8 10.6l1.9 1.9 3.3-3.7"/>',
  handoff: '<path d="M4 8h12M13 4.8L16.2 8 13 11.2"/><path d="M20 16H8M11 12.8L7.8 16l3.2 3.2"/>',
  'time-machine': '<path d="M3.8 12a8.2 8.2 0 1 0 2.4-5.8"/><path d="M3.6 3.8v3.9h3.9"/><path d="M12 7.6V12l3 2"/>',
  after: '<path d="M4 6h12M4 11h12M4 16h6"/><path d="M17.5 13.5v7M14.5 17.5l3 3 3-3"/>',
  'think-hard': '<path d="M11 6v12M5 12h12"/><path d="M19 2.8l.7 1.6 1.6.7-1.6.7-.7 1.6-.7-1.6-1.6-.7 1.6-.7z"/>',
  'fast-turn': '<path d="M13.2 2.5L5 13.6h6.2L10.6 21.5 19 10.2h-6.3z"/>',
  'context-meter': '<rect x="2.5" y="8" width="19" height="8" rx="4"/><path d="M6.5 12h7" stroke-width="3"/>',
  'token-meter': '<ellipse cx="12" cy="6" rx="7" ry="2.6"/><path d="M5 6v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6"/><path d="M5 12v6c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-6"/>',
  narrator: '<path d="M4 9.5v5h3.4l4.6 4V5.5l-4.6 4z"/><path d="M15.5 9.2a4 4 0 0 1 0 5.6M18.2 6.6a7.6 7.6 0 0 1 0 10.8"/>',
  'quick-peek': '<path d="M2.5 12S6 5.6 12 5.6 21.5 12 21.5 12 18 18.4 12 18.4 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
  'image-preview': '<rect x="3" y="4.5" width="18" height="15" rx="3"/><circle cx="9" cy="10" r="1.7"/><path d="M21 15.5l-4.8-4.8-9 8.8"/>',
  download: '<path d="M12 4v11M7.5 10.5L12 15l4.5-4.5"/><path d="M5 19.5h14"/>',
  arrow: '<path d="M5 12h14M13.5 6.5L19 12l-5.5 5.5"/>',
  external: '<path d="M8 6h10v10M18 6L6 18"/>',
  copy: '<rect x="8.5" y="8.5" width="11" height="11" rx="2.5"/><path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  spark: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  doc: '<path d="M7 3.5h7l4 4v13H7z"/><path d="M13.5 3.5v4.5H18M9.8 12.5h5.4M9.8 16h5.4"/>',
  code: '<path d="M8.5 7L3.5 12l5 5M15.5 7l5 5-5 5"/>',
}
export const icon = (name: string, cls = 'i') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] ?? ''}</svg>`
