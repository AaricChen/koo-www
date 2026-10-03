import { afterEach, describe, expect, it } from "vitest"
import { buildPageSeo } from "./build-page-seo"
import {
  applyPageJsonLd,
  applyPageMetaTags,
  PAGE_JSON_LD_SCRIPT_ID,
} from "./document-meta"
import { homePageSeo } from "./pages/home"
import { getFaqTopicPageSeo } from "./pages/faq-topic-seo"

afterEach(() => {
  document.head.innerHTML = ""
})

describe("applyPageMetaTags", () => {
  it("sets homepage title, description, canonical, and social tags", () => {
    const resolved = buildPageSeo(homePageSeo)
    applyPageMetaTags(resolved)

    expect(document.title).toBe(homePageSeo.title)
    expect(
      document.head.querySelector('meta[name="description"]')?.getAttribute(
        "content",
      ),
    ).toBe(homePageSeo.description)
    expect(
      document.head.querySelector('link[rel="canonical"]')?.getAttribute("href"),
    ).toBe("https://www.koo.xyz/")
    expect(
      document.head.querySelector('meta[property="og:title"]')?.getAttribute(
        "content",
      ),
    ).toBe(homePageSeo.title)
    expect(
      document.head
        .querySelector('meta[name="twitter:image"]')
        ?.getAttribute("content"),
    ).toBe("https://www.koo.xyz/assets/hero-logo.png")
  })

  it("sets FAQ canonical and title from the page registry", () => {
    const definition = getFaqTopicPageSeo("what-is-koo")
    applyPageMetaTags(buildPageSeo(definition))

    expect(document.title).toBe(definition.title)
    expect(
      document.head.querySelector('link[rel="canonical"]')?.getAttribute("href"),
    ).toBe("https://www.koo.xyz/faq/what-is-koo")
  })
})

describe("applyPageJsonLd", () => {
  it("upserts a single JSON-LD script tag", () => {
    applyPageJsonLd({ "@type": "WebPage", name: "Test" })
    applyPageJsonLd({ "@type": "WebPage", name: "Updated" })

    const scripts = document.head.querySelectorAll(
      `script#${PAGE_JSON_LD_SCRIPT_ID}`,
    )
    expect(scripts.length).toBe(1)
    expect(scripts[0]?.textContent).toContain("Updated")
  })
})
