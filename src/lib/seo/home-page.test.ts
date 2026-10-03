import { describe, expect, it } from "vitest"
import { buildPageSeo } from "./build-page-seo"
import { homePageSeo, HOME_PAGE_DESCRIPTION, HOME_PAGE_TITLE } from "./pages/home"

describe("home page SEO", () => {
  it("matches Growth P01 title and description", () => {
    expect(HOME_PAGE_TITLE).toBe(
      "Koo | NFT Account-Based Derivatives on Arbitrum",
    )
    expect(HOME_PAGE_DESCRIPTION).toBe(
      "Explore Koo, an Arbitrum-based hybrid derivatives platform for crypto, TradFi and event contracts, built around NFT trading accounts.",
    )
  })

  it("includes Organization and WebSite JSON-LD graph nodes", () => {
    const resolved = buildPageSeo(homePageSeo)
    const graph = (resolved.jsonLd as { "@graph": Array<{ "@type": string }> })[
      "@graph"
    ]
    expect(graph.map((node) => node["@type"]).sort()).toEqual([
      "Organization",
      "WebSite",
    ])
  })
})
