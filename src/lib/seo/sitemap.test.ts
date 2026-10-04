import { describe, expect, it } from "vitest"
import { FAQ_TOPIC_SLUGS, faqTopicPath } from "../faq/topics"
import { SITE_ORIGIN } from "./site"
import { getSitemapCanonicalPaths, renderSitemapXml } from "./sitemap"

describe("sitemap", () => {
  it("lists home and every FAQ topic path once", () => {
    const paths = getSitemapCanonicalPaths()
    expect(paths).toHaveLength(1 + FAQ_TOPIC_SLUGS.length)
    expect(paths[0]).toBe("/")
    expect(paths).not.toContain("/faq")
    for (const slug of FAQ_TOPIC_SLUGS) {
      expect(paths).toContain(faqTopicPath(slug))
    }
  })

  it("renders a urlset with absolute loc entries", () => {
    const xml = renderSitemapXml()
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(xml).toContain(
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    )
    expect(xml).toContain(`<loc>${SITE_ORIGIN}/</loc>`)
    expect(xml).not.toMatch(
      new RegExp(`<loc>${SITE_ORIGIN}/faq</loc>(?!/)`),
    )

    const locCount = (xml.match(/<loc>/g) ?? []).length
    expect(locCount).toBe(1 + FAQ_TOPIC_SLUGS.length)

    for (const slug of FAQ_TOPIC_SLUGS) {
      expect(xml).toContain(`<loc>${SITE_ORIGIN}/faq/${slug}</loc>`)
    }
  })
})
