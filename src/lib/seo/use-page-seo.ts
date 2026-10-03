import { useEffect } from "react"
import { buildPageSeo } from "./build-page-seo"
import { applyPageJsonLd, applyPageMetaTags } from "./document-meta"
import type { PageSeoDefinition } from "./types"

/**
 * Applies document title, meta tags, canonical, Open Graph / Twitter, and JSON-LD
 * for the current route. Call once at the top of each page component.
 */
export function usePageSeo(definition: PageSeoDefinition) {
  const {
    title,
    description,
    canonicalPath,
    ogImagePath,
    includeWebPageSchema,
    jsonLd,
  } = definition

  useEffect(() => {
    const resolved = buildPageSeo(definition)
    applyPageMetaTags(resolved)
    applyPageJsonLd(resolved.jsonLd)
  }, [
    title,
    description,
    canonicalPath,
    ogImagePath,
    includeWebPageSchema,
    jsonLd,
  ])
}
