/**
 * FAQ colors map to `@theme` tokens in `src/index.css`.
 * Prefer Tailwind utilities (`text-secondary`, `bg-faq-main-surface`, …) in components.
 */
export const FAQ_COLOR_TOKENS = {
  foreground: "foreground",
  mutedForeground: "muted-foreground",
  primary: "primary",
  secondary: "secondary",
  faqMainSurface: "faq-main-surface",
  faqTopicSurface: "faq-topic-surface",
  faqTopicSurfaceOpen: "faq-topic-surface-open",
  faqLine: "faq-line",
  faqChromeLine: "faq-chrome-line",
  faqMenuSurface: "faq-menu-surface",
  faqMenuBorder: "faq-menu-border",
} as const
