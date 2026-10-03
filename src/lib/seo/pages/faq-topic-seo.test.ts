import { describe, expect, it } from "vitest"
import { FAQ_TOPIC_SLUGS } from "../../faq/topics"
import { buildPageSeo } from "../build-page-seo"
import {
  FAQ_TOPIC_PAGE_SEO,
  FAQ_TOPIC_SEO_COPY,
  getFaqTopicPageSeo,
} from "./faq-topic-seo"

describe("FAQ topic page SEO registry", () => {
  it("defines SEO for every FAQ slug", () => {
    for (const slug of FAQ_TOPIC_SLUGS) {
      expect(FAQ_TOPIC_PAGE_SEO[slug].canonicalPath).toBe(`/faq/${slug}`)
      expect(FAQ_TOPIC_PAGE_SEO[slug].title).toBe(FAQ_TOPIC_SEO_COPY[slug].title)
      expect(FAQ_TOPIC_PAGE_SEO[slug].description).toBe(
        FAQ_TOPIC_SEO_COPY[slug].description,
      )
    }
  })

  it("builds WebPage JSON-LD for FAQ routes", () => {
    const resolved = buildPageSeo(getFaqTopicPageSeo("trading-fees"))
    expect(resolved.jsonLd).toMatchObject({
      "@type": "WebPage",
      url: "https://www.koo.xyz/faq/trading-fees",
      description: FAQ_TOPIC_SEO_COPY["trading-fees"].description,
    })
  })
})
