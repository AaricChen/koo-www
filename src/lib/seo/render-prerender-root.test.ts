import { describe, expect, it } from "vitest"
import { HOME_FAQ_ITEMS } from "../faq/home-faq"
import { DOCS_URL } from "../links"
import {
  renderFaqTopicStaticRoot,
  renderHomeStaticRoot,
} from "./render-prerender-root"

describe("render-prerender-root", () => {
  it("includes homepage hero, FAQ Q&A, and topic detail links", () => {
    const html = renderHomeStaticRoot()
    const firstFaq = HOME_FAQ_ITEMS[0]

    expect(html).toContain('data-koo-prerender="home"')
    expect(html).toContain("Portable Accounts")
    expect(html).toContain(firstFaq.question)
    expect(html).toContain(firstFaq.answer)
    expect(html).toContain('href="/faq/what-is-koo"')
  })

  it("includes FAQ topic sections, accordion answers, and footer links", () => {
    const html = renderFaqTopicStaticRoot("what-is-koo")

    expect(html).toContain('data-koo-prerender="faq"')
    expect(html).toContain("Four core capabilities")
    expect(html).toContain("Is Koo a centralized exchange?")
    expect(html).toContain(
      "No. It uses a hybrid architecture with onchain custody and final settlement plus offchain matching and real-time risk.",
    )
    expect(html).toContain("About Koo")
    expect(html).toContain(DOCS_URL)
    expect(html).toContain("Core Technical Architecture")
  })
})
