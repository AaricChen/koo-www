import { describe, expect, it } from "vitest"
import { FAQ_TOPIC_SLUGS } from "../faq/topics"
import { getPrerenderPageTargets, getPrerenderPages } from "./prerender-pages"

describe("prerender pages registry", () => {
  it("includes home and every FAQ slug", () => {
    const pages = getPrerenderPages()
    expect(pages[0]?.outFile).toBe("index.html")
    expect(pages.length).toBe(1 + FAQ_TOPIC_SLUGS.length)
  })

  it("resolves unique canonical URLs per FAQ out file", () => {
    const targets = getPrerenderPageTargets()
    const faqTargets = targets.filter((t) => t.outFile.startsWith("faq/"))
    const urls = new Set(faqTargets.map((t) => t.resolved.canonicalUrl))
    expect(urls.size).toBe(FAQ_TOPIC_SLUGS.length)
  })
})
