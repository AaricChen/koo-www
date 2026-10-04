import { describe, expect, it } from "vitest"
import { FAQ_TOPIC_SLUGS } from "../faq/topics"
import { getPrerenderPageTargets, getPrerenderPages } from "./prerender-pages"

describe("prerender pages registry", () => {
  it("includes home, FAQ index, and every FAQ slug", () => {
    const pages = getPrerenderPages()
    expect(pages[0]?.outFile).toBe("index.html")
    expect(pages[1]?.outFile).toBe("faq/index.html")
    expect(pages.length).toBe(2 + FAQ_TOPIC_SLUGS.length)
  })

  it("resolves unique canonical URLs per FAQ topic out file", () => {
    const targets = getPrerenderPageTargets()
    const faqTopicTargets = targets.filter(
      (t) => t.outFile.startsWith("faq/") && t.outFile !== "faq/index.html",
    )
    const urls = new Set(faqTopicTargets.map((t) => t.resolved.canonicalUrl))
    expect(urls.size).toBe(FAQ_TOPIC_SLUGS.length)
  })

  it("embeds full body markup for home and FAQ routes", () => {
    const targets = getPrerenderPageTargets()
    const home = targets.find((t) => t.outFile === "index.html")
    const faqIndex = targets.find((t) => t.outFile === "faq/index.html")
    const whatIsKoo = targets.find((t) => t.outFile === "faq/what-is-koo/index.html")

    expect(home?.staticRootHtml).toContain("Portable Accounts")
    expect(faqIndex?.staticRootHtml).toContain("Is Koo a centralized exchange?")
    expect(whatIsKoo?.staticRootHtml).toContain("Four core capabilities")
  })
})
