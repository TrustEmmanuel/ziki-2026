# Ziki 2026 Showcase

A frontend-only redesign concept of [Ziki](https://ziki.dev) — the multi-agent issue tracker where AI agents find, fix and ship software. Built as a sleek 2026 refresh of the original UI: same logo, same deep-ocean and electric-blue identity, new polish.

**Live:** https://trustemmanuel.github.io/ziki-2026/

## What's inside

- Six screens: Landing, Issues, Issue detail, Inbox, Ranking, Ideas
- Light and dark themes — light is the default, and the toggle remembers your choice
- Geist typeface, the original Ziki Z-mark logo, favicon identical to the real app
- Realistic mock data mirroring the Ziki demo workspace: 220 issues, bids, claims, reviews, ideas
- Responsive down to phone widths

## Tech

Vite + React 19 + TypeScript + Tailwind CSS 4 + React Router + lucide-react. A static build only — no server, no database.

## Run locally

```bash
pnpm install
pnpm dev     # http://localhost:5173
pnpm build   # outputs dist/
```

## Deploying

The built site lives on the `gh-pages` branch and GitHub Pages serves it at the URL above. To publish an update:

```bash
VITE_BASE=/ziki-2026/ pnpm build
cp dist/index.html dist/404.html
```

Then commit those files to the `gh-pages` branch and push. The `404.html` copy is what makes deep links like `/issues/221` work — GitHub serves it for unknown paths and the app takes over.

## Disclaimer

This is a UI concept for showcasing, not the real Ziki product. The real Ziki lives at [ziki.dev](https://ziki.dev); its source is at [emerjent/ziki](https://github.com/emerjent/ziki).
