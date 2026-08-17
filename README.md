# koo-www

Koo product marketing website (PC + mobile homepage).

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- Vitest + Testing Library

## Public URLs

| Constant | Value | Used by |
| --- | --- | --- |
| `APP_URL` | `https://app.koo.xyz/` | Launch App, Start Trading |
| `DOCS_URL` | `https://docs.koo.xyz/` | Header / footer Docs |

Terms, Privacy, Support, Community, and social destinations are omitted until product supplies live URLs. Do not ship `href="#"`.

## Scripts

```bash
pnpm install
pnpm dev
pnpm test
pnpm lint
pnpm build
pnpm preview
```

## Homepage contracts

- Exclusive Experience uses interpolatable `fr` tracks and a 320px desktop row height so enter/exit can animate. Scroll-spy waits `EXPERIENCE_ANIM_LOCK_MS` (420ms) before accepting another index, and is disabled below `lg` (1024px) where cards stack at full opacity.
- Hero banner video plays at `lg+` when on screen and `prefers-reduced-motion` is not `reduce` (poster-only below `lg`). Enter Koo plays the glow clip on all widths and has no poster (the old `section-bg.png` was a full-comp export with live copy). Exclusive Experience clips mount on all widths. Below `lg`, a clip plays only while its own card intersects (threshold 0.35). At `lg+`, only the active row plays when the section is on screen.
- Milestones mount either the mobile accordion or the desktop 1440×1480 canvas via `matchMedia(min-width: 1024px)`, not both. Desktop wrapper height does not follow content `scrollHeight`.
- Chrome must fit `body` `min-width: 320px`: mobile header is a 50px bar (menu + mark + compact Launch App) with a 300px left drawer; Start Trading uses `w-full max-w-[300px]`. Primary nav is `md+`. Community expands to X / Twitter, Discord, and Telegram rows (icons + labels + chevrons; no links until product supplies live URLs).
- Poppins is self-hosted from `/fonts/poppins-*.woff2`.
- `index.html` sets `referrer` to `strict-origin-when-cross-origin`.

## Diagnostics

Media, render, window, and unhandled-rejection failures log as `[koo-www]` and are stored in an in-memory ring (50 events).

```ts
import { getDiagnosticCounts, getDiagnosticEvents } from "./src/lib/report"
```

Use the counts and latest events when a video or render fails in a session. There is no remote metrics backend.
