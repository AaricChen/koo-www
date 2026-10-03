import type { PageMetaTags } from "./document-meta"

/** Site-relative path, including leading slash (e.g. `/`, `/faq/what-is-koo`). */
export type CanonicalPath = `/${string}`

/**
 * Declarative SEO for one routable page. Pass to `usePageSeo` or `buildPageSeo`.
 * Keep one definition object per URL in `src/lib/seo/pages/*`.
 */
export type PageSeoDefinition = {
  title: string
  description: string
  canonicalPath: CanonicalPath
  /** Site-relative Open Graph image; defaults to {@link DEFAULT_OG_IMAGE_PATH}. */
  ogImagePath?: string
  /**
   * Structured data for the page. When omitted, non-home pages get a default WebPage node.
   * Home passes Organization + WebSite via {@link buildSiteGraphJsonLd}.
   */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
  /** When false, skip auto WebPage JSON-LD (home uses a custom graph). Default: true. */
  includeWebPageSchema?: boolean
}

export type ResolvedPageSeo = PageMetaTags & {
  jsonLd: Record<string, unknown> | Record<string, unknown>[] | null
}
