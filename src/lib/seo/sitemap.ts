import { FAQ_TOPIC_SLUGS, faqTopicPath } from "../faq/topics"
import { absoluteUrl } from "./site"
import type { CanonicalPath } from "./types"

/** Indexable content URLs: home + every FAQ topic (not bare `/faq`). */
export function getSitemapCanonicalPaths(): CanonicalPath[] {
  return ["/", ...FAQ_TOPIC_SLUGS.map((slug) => faqTopicPath(slug))]
}

export function renderSitemapXml(): string {
  const urls = getSitemapCanonicalPaths()
    .map(
      (path) =>
        `  <url>\n    <loc>${absoluteUrl(path)}</loc>\n  </url>`,
    )
    .join("\n")

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    urls,
    `</urlset>`,
    ``,
  ].join("\n")
}
