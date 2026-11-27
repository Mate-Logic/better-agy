# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Developers who already use Antigravity CLI (`agy`) in their terminal and want it to do more. They arrive from GitHub, a post or a recommendation, skim what each plugin does, pick the ones they want and copy one command or one prompt to install them.

## Product Purpose

better-agy is a free, open-source (MIT) collection of plugins for Antigravity CLI, plus the site that shows them and installs them. The site has to show that agy gets visibly better and more modern with these plugins installed. Success is a visitor who installs at least one plugin.

## Positioning

The better-claude idea (small plugins, one-prompt install) brought to Antigravity CLI and adapted to it, working on Linux, macOS and Windows. The highlight is Sub Meter: plan usage (5-hour and weekly windows) always visible in agy's status line.

## Operating Context

Visitors read on desktop next to a terminal, or on a phone after seeing a link. They copy a `curl | bash` / `irm | iex` command or an install prompt to paste into agy. Plugins need git, Node.js 18+ for hook plugins, and Python 3 for Sub Meter.

## Capabilities and Constraints

- 13 plugins under `plugins/`: sub-meter, commit, review, handoff, time-machine, after, think-hard, fast-turn, context-meter, token-meter, narrator, quick-peek, image-preview. The site reads them at build time.
- Static Astro site on GitHub Pages at https://better-agy.mate-logic.tech, English at `/` and Spanish at `/es/` (voseo). Every new string needs both.
- Pick-what-to-install, OS selector, copy prompt and copy command must keep working.

## Brand Commitments

- Author: MateLogic (https://mate-logic.tech/), repo in the Mate-Logic org.
- Credit better-claude and Miguel Ángel Durán (@midudev) visibly; the idea and the one-prompt install come from his work.
- Not affiliated with Google: keep the legal notice. The pixel glyph comes from agy's welcome screen.
- The user pinned the look: the antigravity.google site itself (not glass), light and dark following the system.

## Evidence on Hand

Real plugin READMEs and sources in `plugins/`; terminal demos in `src/components/demos/`. No users, stars, download counts or testimonials exist: never invent them.

## Product Principles

- Show the CLI getting better, with real terminal output, not adjectives.
- Installing is one copy away from anywhere on the page.
- Honest credit and honest claims.
