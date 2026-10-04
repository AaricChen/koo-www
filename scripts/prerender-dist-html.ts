import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { buildPageSeo } from "../src/lib/seo/build-page-seo"
import { getPrerenderPages } from "../src/lib/seo/prerender-pages"
import { applySeoToBuiltIndexHtml } from "../src/lib/seo/render-static-html"
import { renderSitemapXml } from "../src/lib/seo/sitemap"

const distDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../dist",
)
const baseIndexPath = path.join(distDir, "index.html")

if (!fs.existsSync(baseIndexPath)) {
  throw new Error("[koo-www] dist/index.html missing; run vite build first")
}

const baseHtml = fs.readFileSync(baseIndexPath, "utf8")
const pages = getPrerenderPages()

for (const page of pages) {
  const resolved = buildPageSeo(page.definition)
  const html = applySeoToBuiltIndexHtml(
    baseHtml,
    resolved,
    page.staticRootHtml,
  )
  const outPath = path.join(distDir, page.outFile)
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, html, "utf8")
}

const sitemapPath = path.join(distDir, "sitemap.xml")
fs.writeFileSync(sitemapPath, renderSitemapXml(), "utf8")

console.info(`[koo-www] Prerendered ${pages.length} HTML routes into dist/`)
console.info(`[koo-www] Wrote ${path.relative(distDir, sitemapPath)}`)
