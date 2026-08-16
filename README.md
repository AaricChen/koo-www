# koo-www

Koo product marketing website (PC + mobile homepage).

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS

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

## Runtime notes

- Banner and Exclusive Experience videos play only when the section is on screen and `prefers-reduced-motion` is not `reduce`.
- Media and render failures log as `[koo-www]` on the console.
- Poppins is self-hosted from `/fonts/poppins-*.woff2`.
