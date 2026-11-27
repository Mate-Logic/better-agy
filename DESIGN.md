---
name: better-agy
description: A sibling of antigravity.google for a free plugin collection for Antigravity CLI. Light and dark follow the system.
colors:
  surface: "#ffffff"
  ink: "#121317"
  ink-secondary: "#45474d"
  ink-tertiary: "#62656d"
  ink-unread: "#8e939b"
  container-low: "#f8f9fc"
  container: "#eff2f7"
  container-high: "#e6eaf0"
  tonal: "#f1f3f7"
  tonal-hover: "#e6eaf0"
  primary: "#121317"
  on-primary: "#ffffff"
  primary-hover: "#2f3034"
  panel: "#121317"
  focus-blue: "#3279f9"
  link-blue: "#1a5fd6"
  line: "rgba(33, 34, 38, .12)"
  line-faint: "rgba(33, 34, 38, .07)"
  surface-dark: "#121317"
  ink-dark: "#f8f9fc"
  ink-secondary-dark: "#b2bbc5"
  ink-tertiary-dark: "#959ba6"
  container-low-dark: "#18191d"
  container-dark: "#212226"
  container-high-dark: "#2f3034"
  panel-dark: "#050506"
  focus-blue-dark: "#7cacf8"
  link-blue-dark: "#8ab4f8"
  terminal-bg: "#17181c"
  terminal-bar: "#202126"
  terminal-fg: "#e6e8ee"
  terminal-fg-secondary: "#b4b8c4"
  terminal-dim: "#868b98"
  terminal-accent: "#7cacf8"
  terminal-ok: "#5bd17f"
  terminal-warn: "#fbbc04"
  terminal-err: "#f28b82"
  terminal-model: "#5fafff"
  google-blue: "#4285f4"
  google-green: "#34a853"
  google-yellow: "#fbbc04"
  google-red: "#ea4335"
typography:
  display:
    fontFamily: "Google Sans Flex Variable, Google Sans, system-ui, sans-serif"
    fontSize: "clamp(42px, 7.2vw, 104px)"
    fontWeight: 420
    lineHeight: 1
    letterSpacing: "-0.035em"
  wordmark:
    fontFamily: "Google Sans Flex Variable, Google Sans, system-ui, sans-serif"
    fontSize: "clamp(40px, 12.8vw, 186px)"
    fontWeight: 450
    lineHeight: 0.9
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Google Sans Flex Variable, Google Sans, system-ui, sans-serif"
    fontSize: "clamp(34px, 3.6vw, 54px)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.025em"
  statement:
    fontFamily: "Google Sans Flex Variable, Google Sans, system-ui, sans-serif"
    fontSize: "clamp(28px, 3.3vw, 46px)"
    fontWeight: 420
    lineHeight: 1.14
    letterSpacing: "-0.022em"
  title:
    fontFamily: "Google Sans Flex Variable, Google Sans, system-ui, sans-serif"
    fontSize: "21px"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Google Sans Flex Variable, Google Sans, system-ui, sans-serif"
    fontSize: "17.5px"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "0.01em"
  body-small:
    fontFamily: "Google Sans Flex Variable, Google Sans, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Google Sans Flex Variable, Google Sans, system-ui, sans-serif"
    fontSize: "15.5px"
    fontWeight: 500
    letterSpacing: "0.01em"
  meta:
    fontFamily: "Google Sans Flex Variable, Google Sans, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
  terminal:
    fontFamily: "Google Sans Code Variable, ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "13.5px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0"
rounded:
  code: "6px"
  focus: "8px"
  terminal: "16px"
  stage-mobile: "22px"
  panel-mobile: "24px"
  stage: "28px"
  panel: "32px"
  pill: "999px"
spacing:
  gutter: "clamp(20px, 5vw, 72px)"
  wrap: "1296px"
  panel-pad: "clamp(32px, 6vw, 80px)"
  grid-row: "64px"
  grid-col: "clamp(28px, 4vw, 56px)"
  section-gap: "clamp(112px, 13vw, 184px)"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "40px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-primary-lg:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "48px"
  button-tonal:
    backgroundColor: "{colors.tonal}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "40px"
  button-tonal-hover:
    backgroundColor: "{colors.tonal-hover}"
  button-outline:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "40px"
  button-light-on-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "40px"
  chip-pick:
    textColor: "{colors.ink-tertiary}"
    rounded: "{rounded.pill}"
    padding: "0 14px"
    height: "36px"
  chip-pick-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
  tag-new:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
    height: "22px"
    padding: "0 10px 0 8px"
  feature-panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.panel}"
    padding: "{spacing.panel-pad}"
  show-stage:
    backgroundColor: "{colors.container-low}"
    rounded: "{rounded.stage}"
  terminal:
    backgroundColor: "{colors.terminal-bg}"
    textColor: "{colors.terminal-fg}"
    rounded: "{rounded.terminal}"
    typography: "{typography.terminal}"
  nav:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-secondary}"
    height: "56px"
---

# Design System: better-agy

## Overview

**Creative North Star: "The Sibling Launch Site"**

The page is a sibling of antigravity.google, not a fan tribute or a dark hacker console. A white ground (near-black when the system is dark), huge tightly tracked Google Sans Flex headlines, black pills, quiet tonal containers, and a slow orbit of short dashes in Google's four colours that leans toward the pointer. Everything institutional is calm and monochrome; colour arrives only as light, in the particle field, the gradient glyph and the terminal output.

The proof is the terminal. Real agy sessions sit inside dark terminal panels that stay dark in both themes, framed by soft tonal stages, so the page reads as a product site whose screenshots happen to be alive: the Sub Meter bar moves with a slider, the install command types itself, choices in the demos respond. Density is generous: wide gutters, 64px grid rows, sections separated by up to 184px of air.

The world refuses the dark-terminal-as-page look the site used to have, and refuses glass: no backdrop blur, no frosted cards. Depth comes from tone and hairline inset rings, never from translucency.

**Key Characteristics:**
- White or near-black ground following `prefers-color-scheme`; no theme toggle.
- Monochrome UI; Google colours appear only in the dash field, the glyph gradient and terminal semantics.
- Pills for every action; large radii (28 to 32px) for panels and stages.
- Black feature panels carrying their own particle field.
- Dark terminal panels in both themes, set in Google Sans Code.
- Authored 24px line icons, 1.5 stroke, round caps, `currentColor`.
- A giant two-tone wordmark closes the footer.

## Colors

A near-monochrome Google surface system with one blue for focus and links, and Google's four hues held back for light and motion.

### Primary
- **Antigravity Ink** (`primary`, `ink`): primary pills, the NEW tag, selected plugin chips, the toast and all headline text. In dark mode the roles invert: primary becomes the near-white ink and on-primary the near-black surface.
- **Focus Blue** (`focus-blue`, dark `focus-blue-dark`): the 2px focus outline only, plus the selection tint and the stage glow (`rgba(50,121,249,.2)`, `.28` dark).
- **Link Blue** (`link-blue`, dark `link-blue-dark`): links inside rendered plugin READMEs in the reader panel. Page links stay ink with a faint underline.

### Secondary
- **Google Spectrum** (`google-blue`, `google-green`, `google-yellow`, `google-red`): the brand-glyph gradient (blue, green, yellow, red stops) and the particle field, whose hue walks around the ring through blue, indigo, violet, purple, red, orange, yellow and green. Google Green also marks the live "updated" dot.

### Tertiary (terminal semantics)
- **Terminal Accent** (`terminal-accent`): prompts, selected choices, the `✦` title marker, low-severity findings.
- **Terminal OK / Warn / Err** (`terminal-ok`, `terminal-warn`, `terminal-err`): checkmarks and the shell prompt; Sub Meter thresholds (model blue below 75%, yellow from 75%, red from 90%); review severities.
- **Model Blue** (`terminal-model`): the Sub Meter fill at rest.

### Neutral
- **Surface** (`surface` / `surface-dark`): the page ground, sticky nav and reader panel.
- **Container ladder** (`container-low`, `container`, `container-high` and their dark twins): announcement bar and stages (low), hover fills and inline code (mid), icon-bubble and dismiss hovers (high).
- **Secondary and Tertiary Ink** (`ink-secondary`, `ink-tertiary`): body copy and descriptions, then meta, counts, footer notes.
- **Unread Ink** (`ink-unread`, dark `#686c75`): statement words not yet read; they turn to ink as the reader scrolls.
- **Hairlines** (`line`, `line-faint`): 12% and 7% ink, used as inset rings and 1px dividers.
- **Panel Black** (`panel` / `panel-dark`): feature and closing panels; in dark mode they drop to `#050506` and gain an 8% inset hairline so they still separate from the ground.
- **Terminal ground** (`terminal-bg`, `terminal-bar`): identical in both themes; the install terminal deepens to pure black with a `#0e0f12` bar.

### Named Rules
**The Colour Is Light Rule.** Google's hues never fill a button, card or heading. They appear as emitted light: the dash field, the glyph gradient, terminal output.

**The Terminal Stays Dark Rule.** Terminal panels use the `terminal-*` palette in both themes; they do not invert with the page.

## Typography

**Display Font:** Google Sans Flex Variable (with Google Sans, system-ui)
**Body Font:** Google Sans Flex Variable
**Label/Mono Font:** Google Sans Code Variable (with ui-monospace, SF Mono, Menlo, Consolas)

**Character:** One variable humanist sans does all the talking, from 186px down to 11.5px, using intermediate weights (420, 450) the variable axis allows. Code and terminal output switch to its sibling, Google Sans Code, with ligatures off.

### Hierarchy
- **Display** (420, `clamp(42px, 7.2vw, 104px)`, 1): the two-line hero headline only, tracked -0.035em, rising in word groups with a blur.
- **Wordmark** (450, up to 290px, 0.9): the footer "betteragy", first word in tertiary ink.
- **Feature Headline** (400, `clamp(40px, 5vw, 72px)`, 1): the Sub Meter panel title; the closing panel uses `clamp(36px, 4.4vw, 60px)`.
- **Headline** (400, `clamp(34px, 3.6vw, 54px)`, 1.04): section titles ("Explore the plugins", "Get started").
- **Statement** (420, `clamp(28px, 3.3vw, 46px)`, 1.14): the manifesto paragraph, max 23em.
- **Title** (500, 19 to 21px, 1.25): plugin names, step titles, reader headings.
- **Body** (400, 17.5px, 1.45, +0.01em): default copy; hero sub at `clamp(17px, 1.6vw, 20px)`, max 44ch; descriptions at 16px/1.5, max 52 to 56ch.
- **Label** (500, 15 to 15.5px): pills, nav links, picks header.
- **Meta** (400, 13 to 14.5px): hero meta, versions, notes, footer notes.
- **Tag** (600, 11.5px, +0.08em, uppercase): the NEW announcement tag only.
- **Terminal** (400, 13.5px/1.7; 15px in the install terminal; 12.5px on mobile).

### Named Rules
**The Tight Big Type Rule.** Tracking tightens as size grows: -0.035em at display, -0.03em on panel headlines, -0.025em on section titles, -0.01em on titles, +0.01em on body.

**The Command Badge Rule.** Slash commands (`/commit`, `/peek`) appear in mono at 0.8em in a container-tinted 7px-radius badge next to the plugin name.

## Layout

A centred content column of 1296px plus fluid gutters (`clamp(20px, 5vw, 72px)`). The hero is full-bleed and centred, at least the viewport minus the header (capped at 920px), with the particle field behind it; below it an arc of icon bubbles turns slowly (one rotation per 220s), masked to fade at both edges. Everything after the hero is left-aligned within the column.

Rhythm: sections open with `clamp(96px, 12vw, 168px)` to `clamp(112px, 13vw, 184px)` of top padding. The showcase is a two-column grid (64px rows, 32px columns) of stage plus copy; the remaining plugins sit in a three-column grid of icon, title, description and links. Install steps reuse the three-column grid.

Breakpoints: at 1080px nav links hide, the feature panel and showcase go single-column, and the plugin grid drops to two. At 720px every grid is single-column, the GitHub pill and announcement CTA hide, panel radii drop to 24px and stage radii to 22px, and hero meta stacks. At 480px the install terminal loses its window dots. `prefers-reduced-motion` stops every animation and loop; the statement renders fully lit and the command appears without typing.

## Elevation & Depth

Flat and tonal. Surfaces separate by container tone and a 1px inset hairline ring (`box-shadow: inset 0 0 0 1px`), not borders or drop shadows. Real cast shadows are reserved for things that sit above the page: terminals, the reader drawer and the toast.

### Shadow Vocabulary
- **Hairline ring** (`inset 0 0 0 1px var(--line-2)`): stages, tonal pills, previews, file cards.
- **Terminal lift** (`0 30px 60px -24px rgba(0,0,0,.5)`): every terminal; on showcase hover it deepens to `0 44px 70px -28px rgba(0,0,0,.55)` as the terminal rises 6px.
- **Drawer** (`-1px 0 0 var(--line), -40px 0 80px rgba(0,0,0,.18)`): the docs and source reader.
- **Toast** (`0 12px 30px -10px rgba(0,0,0,.35)`).
- **Stage glow**: a radial `var(--glow)` blue wash from the bottom-right corner of each showcase stage.

### Named Rules
**The No Glass Rule.** No backdrop-filter, no translucent cards over content. The user pinned "not glass".

## Shapes

Round and soft. Every interactive control is a full pill (999px), including nav links on hover, chips, OS tabs, the toast and the Sub Meter slider row (20px when it wraps on mobile). Containers scale their radius with size: 6 to 7px for inline code and command badges, 14px for file cards, 16px for terminals and previews, 28px for stages and the closing panel, 32px for the feature panel. Icon buttons and icon bubbles are circles. Disclosure chevrons are drawn with two 1.5px borders rotated, matching the icon stroke.

## Components

### Buttons
Calm, black and white, tactile on press.
- **Shape:** full pill (999px); 40px tall, 48px large, 36px in the nav.
- **Primary (dark):** ink fill, on-primary text, 500 weight; hover lightens to `primary-hover`. Carries a trailing line icon when it acts (download, copy).
- **Tonal:** `tonal` fill with a faint inset ring; the hero's "See plugins" and the secondary copy action.
- **Outline:** transparent with a 12% inset ring; nav GitHub.
- **On black panels:** `light` (white fill, ink text) as the primary action, `ghost` (white 22% ring) as secondary.
- **States:** colour transitions 0.2s; `:active` scales to 0.97; disabled at 40% opacity. Focus is a 2px focus-blue outline offset 3px.
- **Text button:** tertiary ink, faint underline, ink on hover ("None" / "All").

### Chips
- **Plugin picks:** 36px pills, tertiary ink with a 12% ring. Selected: ink fill, on-primary text, no ring, and a check icon that grows in from 0 width.
- **NEW tag:** 22px ink pill, uppercase 11.5px, spark icon; announcement bar only.

### Cards / Containers
- **Showcase stage:** container-low with the bottom-right blue glow, hairline ring, 28px radius, min 440px tall, holding a terminal demo and a small "Example session" note.
- **Plugin cell:** no container at all; a 34px line icon, title with command badge, description, version meta and text links.
- **Feature and closing panels:** panel black, 32px and 28px radius, `clamp(32px, 6vw, 80px)` padding, own particle field biased to the right side, light text (`#f8f9fc`, body `#c3cad3`).

### Inputs / Fields
- **Range (Sub Meter "try it"):** a pill row on the black panel (white 6% fill, 8% ring) with label, native range tinted `#7cacf8`, and a tabular mono readout.

### Navigation
Sticky, solid surface (no blur), 56px, faint bottom hairline. Gradient glyph plus 18.5px wordmark, then pill-hover links in secondary ink, then outline GitHub, dark Install and a compact language switch (`EN / ES`). Below it, a dismissible 40px announcement bar on container-low, remembered per session.

### Terminal (signature)
Dark panel, 16px radius, 38px title bar with three window dots and a centred dim title, Google Sans Code 13.5/1.7. Lines follow agy's own output: accent prompt `>`, italic title lines led by `✦`, `│` quote rails, a status line with a top hairline. The Sub Meter status bar renders block characters in a dedicated mono stack and swaps colour by threshold. The install terminal is pure black, 15px, with an OS tab switch in the bar and a blinking block caret; the command types itself once when half in view.

### Particle Field (signature)
A canvas of 260 to 1100 short round-capped dashes (2.6 to 6.8px long, 1.5 to 2.4px wide) orbiting an ellipse, coloured by angle through the Google spectrum, with about 16% grey specks. The ring breathes, drifts toward the pointer by 6% and pushes dashes out of a 150px radius around it. Runs only while visible and never under reduced motion.

### Statement Reveal
The manifesto paragraph is split into words that go from unread ink to ink in reading order as it scrolls through the viewport (0.5s colour ease).

### Icons
Authored line icons on a 24px grid: stroke only, 1.5 wide, round caps and joins, `currentColor`. Sizes 14, 18, 20, 22 (in bubbles) and 34px (plugin cells). One icon per plugin plus a small interface set.

### Antigravity Mark

The official Antigravity "A" (`public/brand/antigravity-mark.svg`, the full-colour icon from https://antigravity.google/press/, unmodified; a trademark of Google LLC) appears only as a "Made for Google Antigravity" reference, never as this project's own logo: large in the hero (124px, floating over its own ellipse shadow, lifting off on click while the particle ring swells), and small inside the "Made for" pill in the hero and the footer. The project's own mark stays the pixel glyph in the nav. Every page that shows it carries the trademark and non-affiliation notice in the footer.

### Reader Drawer
A right-side sheet up to 680px wide, sliding in over 0.5s on the house ease, with Docs and Source tabs underlined in ink, rendered README (links in link blue) and collapsible file cards.

## Do's and Don'ts

### Do:
- **Do** keep the ground white (`#ffffff`) or near-black (`#121317`) and let the system decide; ship every new colour with its dark twin.
- **Do** make every action a pill; ink fill for the primary action, tonal or outline for the secondary.
- **Do** show capability with a real terminal panel in the terminal palette, never with an illustration or an adjective.
- **Do** separate surfaces with the container ladder and a 1px inset hairline ring.
- **Do** use the house ease `cubic-bezier(.16, 1, .3, 1)` for movement, 0.2s for colour changes, and honour `prefers-reduced-motion`.
- **Do** draw new icons on the 24px, 1.5-stroke, round-cap grid in `currentColor`.
- **Do** track large type tighter as it grows (-0.035em at display).

### Don't:
- **Don't** use glass: no backdrop blur and no translucent cards.
- **Don't** turn the page itself into a dark terminal; the terminal is a panel on the page.
- **Don't** fill buttons, headings or cards with Google's hues; they are reserved for the dash field, the glyph and terminal output.
- **Don't** use drop shadows on flat page surfaces; cast shadows belong to terminals, the drawer and the toast.
- **Don't** use square or small-radius buttons.
