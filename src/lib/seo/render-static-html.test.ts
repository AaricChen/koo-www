import { describe, expect, it } from "vitest"
import { buildPageSeo } from "./build-page-seo"
import { getFaqTopicPageSeo } from "./pages/faq-topic-seo"
import {
  HOME_PAGE_DESCRIPTION,
  HOME_PAGE_TITLE,
  homePageSeo,
} from "./pages/home"
import { renderHomeStaticRoot } from "./render-prerender-root"
import {
  applySeoToBuiltIndexHtml,
  renderSeoHeadTags,
} from "./render-static-html"

/** Mirrors multiline SEO tags from the source index.html template. */
const multilineHomeIndex = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="referrer" content="strict-origin-when-cross-origin" />
    <title>Koo | NFT Account-Based Derivatives on Arbitrum</title>
    <meta
      name="description"
      content="Explore Koo, an Arbitrum-based hybrid derivatives platform for crypto, TradFi and event contracts, built around NFT trading accounts."
    />
    <link rel="canonical" href="https://www.koo.xyz/" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Koo" />
    <meta property="og:url" content="https://www.koo.xyz/" />
    <meta
      property="og:title"
      content="Koo | NFT Account-Based Derivatives on Arbitrum"
    />
    <meta
      property="og:description"
      content="Explore Koo, an Arbitrum-based hybrid derivatives platform for crypto, TradFi and event contracts, built around NFT trading accounts."
    />
    <meta
      property="og:image"
      content="https://www.koo.xyz/assets/hero-logo.png"
    />
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:title"
      content="Koo | NFT Account-Based Derivatives on Arbitrum"
    />
    <meta
      name="twitter:description"
      content="Explore Koo, an Arbitrum-based hybrid derivatives platform for crypto, TradFi and event contracts, built around NFT trading accounts."
    />
    <meta
      name="twitter:image"
      content="https://www.koo.xyz/assets/hero-logo.png"
    />
    <script id="koo-page-jsonld" type="application/ld+json">
      {"@context":"https://schema.org","@type":"WebSite"}
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`

function countMatches(html: string, pattern: RegExp): number {
  return (html.match(pattern) ?? []).length
}

describe("render-static-html", () => {
  it("renders FAQ title and canonical in head tags", () => {
    const resolved = buildPageSeo(getFaqTopicPageSeo("trading-fees"))
    const head = renderSeoHeadTags(resolved)
    expect(head).toContain("Koo Trading Fees: Maker, Taker and Minimum Fees")
    expect(head).toContain("https://www.koo.xyz/faq/trading-fees")
  })

  it("replaces multiline homepage SEO with FAQ page SEO only", () => {
    const resolved = buildPageSeo(getFaqTopicPageSeo("trading-fees"))
    const html = applySeoToBuiltIndexHtml(
      multilineHomeIndex,
      resolved,
      '<main data-koo-prerender="faq"><h1>Fees</h1></main>',
    )

    expect(html).toContain(
      "<title>Koo Trading Fees: Maker, Taker and Minimum Fees</title>",
    )
    expect(html).toContain(
      'content="Koo charges a 0.02% taker fee with a 0.05 USDC minimum per order. Learn about the 0.005% maker rebate and partial fills."',
    )
    expect(html).toContain('href="https://www.koo.xyz/faq/trading-fees"')
    expect(html).not.toContain(HOME_PAGE_TITLE)
    expect(html).not.toContain("Explore Koo")
    expect(countMatches(html, /name="description"/g)).toBe(1)
    expect(countMatches(html, /property="og:title"/g)).toBe(1)
    expect(countMatches(html, /name="twitter:title"/g)).toBe(1)
    expect(countMatches(html, /id="koo-page-jsonld"/g)).toBe(1)
  })

  it("dedupes homepage SEO tags when reapplying home definition", () => {
    const resolved = buildPageSeo(homePageSeo)
    const html = applySeoToBuiltIndexHtml(
      multilineHomeIndex,
      resolved,
      renderHomeStaticRoot(),
    )

    expect(html).toContain(`<title>${HOME_PAGE_TITLE}</title>`)
    expect(html).toContain(HOME_PAGE_DESCRIPTION)
    expect(countMatches(html, /name="description"/g)).toBe(1)
    expect(countMatches(html, /property="og:title"/g)).toBe(1)
    expect(countMatches(html, /name="twitter:title"/g)).toBe(1)
    expect(countMatches(html, /rel="canonical"/g)).toBe(1)
    expect(countMatches(html, /id="koo-page-jsonld"/g)).toBe(1)
    expect(html).toContain('data-koo-prerender="home"')
    expect(html).toContain("Portable Accounts")
  })
})
