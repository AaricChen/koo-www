import { DISCORD_URL, TELEGRAM_URL, X_URL } from "../links"

/** Canonical marketing site origin (www). */
export const SITE_ORIGIN = "https://www.koo.xyz"

export const SITE_NAME = "Koo"

/** Default share image for Open Graph / Twitter cards. */
export const DEFAULT_OG_IMAGE_PATH = "/assets/hero-logo.png"

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path
  }
  const normalized = path.startsWith("/") ? path : `/${path}`
  return `${SITE_ORIGIN}${normalized}`
}

export const ORGANIZATION_SAME_AS = [X_URL, DISCORD_URL, TELEGRAM_URL] as const
