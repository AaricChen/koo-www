const META_DESCRIPTION_MAX = 160

/** Trim copy for meta description without breaking mid-word when possible. */
export function truncateMetaDescription(text: string, max = META_DESCRIPTION_MAX): string {
  const normalized = text.replace(/\s+/g, " ").trim()
  if (normalized.length <= max) {
    return normalized
  }
  const slice = normalized.slice(0, max - 1)
  const lastSpace = slice.lastIndexOf(" ")
  if (lastSpace > max * 0.6) {
    return `${slice.slice(0, lastSpace).trim()}…`
  }
  return `${slice.trim()}…`
}
