import { describe, expect, it } from "vitest"
import { buildPageSeo } from "./build-page-seo"
import { getFaqTopicPageSeo } from "./pages/faq-topic-seo"
import { homePageSeo } from "./pages/home"
import { renderHomeStaticRoot } from "./render-prerender-root"
import {
  applySeoToBuiltIndexHtml,
  renderSeoHeadTags,
} from "./render-static-html"

const sampleIndex = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Old title</title>
    <meta name="description" content="old" />
    <link rel="canonical" href="https://example.com/" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`

describe("render-static-html", () => {
  it("renders FAQ title and canonical in head tags", () => {
    const resolved = buildPageSeo(getFaqTopicPageSeo("trading-fees"))
    const head = renderSeoHeadTags(resolved)
    expect(head).toContain("Koo Trading Fees: Maker and Taker Rates")
    expect(head).toContain("https://www.koo.xyz/faq/trading-fees")
  })

  it("applies SEO and static root markup into built index template", () => {
    const resolved = buildPageSeo(getFaqTopicPageSeo("what-is-koo"))
    const staticRoot = '<main data-koo-prerender="faq"><h1>What is Koo?</h1></main>'
    const html = applySeoToBuiltIndexHtml(sampleIndex, resolved, staticRoot)

    expect(html).toContain("<h1>What is Koo?</h1>")
    expect(html).toContain('id="root"><main data-koo-prerender="faq">')
    expect(html).not.toContain("Old title")
  })

  it("injects homepage body into #root", () => {
    const resolved = buildPageSeo(homePageSeo)
    const html = applySeoToBuiltIndexHtml(
      sampleIndex,
      resolved,
      renderHomeStaticRoot(),
    )
    expect(html).toContain(homePageSeo.title)
    expect(html).toContain('data-koo-prerender="home"')
    expect(html).toContain("Portable Accounts")
    expect(html).not.toContain('<div id="root"></div>')
  })
})
