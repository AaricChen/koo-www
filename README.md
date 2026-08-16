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

- Exclusive Experience uses interpolatable `fr` tracks and a 320px desktop row height so enter/exit can animate. Scroll-spy waits `EXPERIENCE_ANIM_LOCK_MS` (420ms) before accepting another index.
- Banner and Exclusive Experience videos play only when the section is on screen and `prefers-reduced-motion` is not `reduce`.
- Milestones desktop canvas is reserved at 1440×1480 and scaled by width. Wrapper height does not follow content `scrollHeight`.
- Poppins is self-hosted from `/fonts/poppins-*.woff2`.
- `index.html` sets `referrer` to `strict-origin-when-cross-origin`.

## Diagnostics

Media, render, window, and unhandled-rejection failures log as `[koo-www]` and are stored in an in-memory ring (50 events).

```ts
import { getDiagnosticCounts, getDiagnosticEvents } from "./src/lib/report"
```

Use the counts and latest events when a video or render fails in a session. There is no remote metrics backend.
