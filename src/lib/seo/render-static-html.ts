import type { ResolvedPageSeo } from "./types"

function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

export function renderSeoHeadTags(resolved: ResolvedPageSeo): string {
  const { openGraph: og } = resolved
  const lines = [
    `<title>${escapeHtml(resolved.title)}</title>`,
    `<meta name="description" content="${escapeHtml(resolved.description)}" />`,
    `<link rel="canonical" href="${escapeHtml(resolved.canonicalUrl)}" />`,
    `<meta property="og:type" content="${escapeHtml(og.type)}" />`,
    `<meta property="og:site_name" content="${escapeHtml(og.siteName)}" />`,
    `<meta property="og:url" content="${escapeHtml(og.url)}" />`,
    `<meta property="og:title" content="${escapeHtml(og.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(og.description)}" />`,
    `<meta property="og:image" content="${escapeHtml(og.image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(og.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(og.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(og.image)}" />`,
  ]

  if (resolved.jsonLd) {
    lines.push(
      `<script id="koo-page-jsonld" type="application/ld+json">${JSON.stringify(resolved.jsonLd)}</script>`,
    )
  }

  return lines.join("\n    ")
}

/**
 * Matches SEO tags whether attributes are on one line or split across lines
 * (as in the source index.html template).
 */
const SEO_HEAD_TAG_PATTERN =
  /<title\b[^>]*>[\s\S]*?<\/title>|<meta\b[^>]*\bname=["']description["'][^>]*\/?>|<link\b[^>]*\brel=["']canonical["'][^>]*\/?>|<meta\b[^>]*\bproperty=["']og:[^"']+["'][^>]*\/?>|<meta\b[^>]*\bname=["']twitter:[^"']+["'][^>]*\/?>|<script\b[^>]*\bid=["']koo-page-jsonld["'][^>]*>[\s\S]*?<\/script>/g

function collapseBlankLinesInHead(html: string): string {
  return html.replace(/<head>([\s\S]*?)<\/head>/i, (_match, headInner: string) => {
    const cleaned = headInner.replace(/^\s*\n/gm, "").replace(/\n{3,}/g, "\n\n")
    return `<head>${cleaned}</head>`
  })
}

export function applySeoToBuiltIndexHtml(
  html: string,
  resolved: ResolvedPageSeo,
  staticRootHtml?: string,
): string {
  const withoutSeoHead = collapseBlankLinesInHead(
    html.replace(SEO_HEAD_TAG_PATTERN, ""),
  )
  const headTags = renderSeoHeadTags(resolved)
  const withHead = withoutSeoHead.replace(
    /<head>\s*/,
    `<head>\n    ${headTags}\n    `,
  )

  if (!staticRootHtml) {
    return withHead
  }

  return withHead.replace(
    '<div id="root"></div>',
    `<div id="root">${staticRootHtml}</div>`,
  )
}
