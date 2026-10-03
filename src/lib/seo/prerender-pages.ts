import { FAQ_TOPIC_PAGES } from "../faq/content/topic-pages"
import { FAQ_TOPIC_SLUGS, faqTopicPath } from "../faq/topics"
import { buildPageSeo } from "./build-page-seo"
import { getFaqTopicPageSeo } from "./pages/faq-topic-seo"
import { homePageSeo } from "./pages/home"
import { renderFaqStaticMain } from "./render-static-html"
import type { PageSeoDefinition } from "./types"

export type PrerenderPage = {
  /** Output path relative to dist root (e.g. index.html or faq/x/index.html). */
  outFile: string
  definition: PageSeoDefinition
  staticRootHtml?: string
}

function faqStaticRootHtml(slug: (typeof FAQ_TOPIC_SLUGS)[number]): string {
  const content = FAQ_TOPIC_PAGES[slug]
  const h1 = content.pageHeaderTitle ?? content.overviewTitle
  return renderFaqStaticMain(h1, content.intro)
}

export function getPrerenderPages(): PrerenderPage[] {
  const pages: PrerenderPage[] = [
    {
      outFile: "index.html",
      definition: homePageSeo,
    },
  ]

  for (const slug of FAQ_TOPIC_SLUGS) {
    pages.push({
      outFile: `faq/${slug}/index.html`,
      definition: getFaqTopicPageSeo(slug),
      staticRootHtml: faqStaticRootHtml(slug),
    })
  }

  return pages
}

/** For tests and build scripts: resolved SEO + canonical path. */
export function getPrerenderPageTargets() {
  return getPrerenderPages().map((page) => ({
    outFile: page.outFile,
    canonicalPath: page.definition.canonicalPath,
    resolved: buildPageSeo(page.definition),
    staticRootHtml: page.staticRootHtml,
  }))
}

export function prerenderPathForCanonical(canonicalPath: string): string {
  if (canonicalPath === "/") {
    return "index.html"
  }
  if (canonicalPath.startsWith("/faq/")) {
    const slug = canonicalPath.slice("/faq/".length)
    return `faq/${slug}/index.html`
  }
  throw new Error(`[koo-www] Unsupported prerender path: ${canonicalPath}`)
}

export function assertPrerenderPathsMatchFaqRoutes() {
  for (const slug of FAQ_TOPIC_SLUGS) {
    const expected = `faq/${slug}/index.html`
    const fromPath = prerenderPathForCanonical(faqTopicPath(slug))
    if (fromPath !== expected) {
      throw new Error(
        `[koo-www] Prerender path mismatch for ${slug}: ${fromPath}`,
      )
    }
  }
}

assertPrerenderPathsMatchFaqRoutes()
