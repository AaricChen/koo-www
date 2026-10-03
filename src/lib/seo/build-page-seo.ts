import type { PageMetaTags } from "./document-meta"
import { buildSiteGraphJsonLd, buildWebPageJsonLd } from "./json-ld"
import { absoluteUrl, DEFAULT_OG_IMAGE_PATH, SITE_NAME } from "./site"
import type { PageSeoDefinition, ResolvedPageSeo } from "./types"

function resolveJsonLd(
  definition: PageSeoDefinition,
  canonicalUrl: string,
): ResolvedPageSeo["jsonLd"] {
  if (definition.jsonLd !== undefined) {
    return definition.jsonLd
  }

  const includeWebPage = definition.includeWebPageSchema ?? true
  if (!includeWebPage) {
    return null
  }

  return buildWebPageJsonLd({
    url: canonicalUrl,
    name: definition.title,
    description: definition.description,
  })
}

export function buildPageSeo(definition: PageSeoDefinition): ResolvedPageSeo {
  const canonicalUrl = absoluteUrl(definition.canonicalPath)
  const ogImagePath = definition.ogImagePath ?? DEFAULT_OG_IMAGE_PATH
  const openGraph: PageMetaTags["openGraph"] = {
    type: "website",
    url: canonicalUrl,
    title: definition.title,
    description: definition.description,
    image: absoluteUrl(ogImagePath),
    siteName: SITE_NAME,
  }

  return {
    title: definition.title,
    description: definition.description,
    canonicalUrl,
    openGraph,
    jsonLd: resolveJsonLd(definition, canonicalUrl),
  }
}

export function buildHomePageJsonLd(description: string) {
  return buildSiteGraphJsonLd(description)
}
