import type { PageSeoDefinition } from "./types"

function assertNonEmpty(value: string, field: string) {
  if (!value.trim()) {
    throw new Error(`[koo-www] Page SEO ${field} must be non-empty`)
  }
}

/** Validates and freezes a page SEO definition for use in registries. */
export function definePageSeo(definition: PageSeoDefinition): PageSeoDefinition {
  assertNonEmpty(definition.title, "title")
  assertNonEmpty(definition.description, "description")
  if (!definition.canonicalPath.startsWith("/")) {
    throw new Error(
      `[koo-www] Page SEO canonicalPath must start with "/": ${definition.canonicalPath}`,
    )
  }
  return Object.freeze({ ...definition })
}
