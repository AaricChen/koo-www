export const PAGE_JSON_LD_SCRIPT_ID = "koo-page-jsonld"

export type PageMetaTags = {
  title: string
  description: string
  canonicalUrl: string
  openGraph: {
    type: "website"
    url: string
    title: string
    description: string
    image: string
    siteName: string
  }
}

function upsertMeta(
  selector: string,
  create: () => HTMLElement,
  apply: (element: HTMLElement) => void,
) {
  const existing = document.head.querySelector<HTMLElement>(selector)
  const element = existing ?? create()
  apply(element)
  if (!existing) {
    document.head.append(element)
  }
}

function setMetaName(name: string, content: string) {
  upsertMeta(
    `meta[name="${name}"]`,
    () => {
      const meta = document.createElement("meta")
      meta.setAttribute("name", name)
      return meta
    },
    (meta) => meta.setAttribute("content", content),
  )
}

function setMetaProperty(property: string, content: string) {
  upsertMeta(
    `meta[property="${property}"]`,
    () => {
      const meta = document.createElement("meta")
      meta.setAttribute("property", property)
      return meta
    },
    (meta) => meta.setAttribute("content", content),
  )
}

function setCanonicalLink(href: string) {
  upsertMeta(
    'link[rel="canonical"]',
    () => {
      const link = document.createElement("link")
      link.setAttribute("rel", "canonical")
      return link
    },
    (link) => link.setAttribute("href", href),
  )
}

export function applyPageMetaTags(meta: PageMetaTags) {
  document.title = meta.title
  setMetaName("description", meta.description)
  setCanonicalLink(meta.canonicalUrl)

  const { openGraph: og } = meta
  setMetaProperty("og:type", og.type)
  setMetaProperty("og:url", og.url)
  setMetaProperty("og:title", og.title)
  setMetaProperty("og:description", og.description)
  setMetaProperty("og:image", og.image)
  setMetaProperty("og:site_name", og.siteName)

  setMetaName("twitter:card", "summary_large_image")
  setMetaName("twitter:title", og.title)
  setMetaName("twitter:description", og.description)
  setMetaName("twitter:image", og.image)
}

export function applyPageJsonLd(
  data: Record<string, unknown> | Record<string, unknown>[] | null,
) {
  const existing = document.getElementById(PAGE_JSON_LD_SCRIPT_ID)
  if (data == null) {
    existing?.remove()
    return
  }

  let script: HTMLScriptElement
  if (existing instanceof HTMLScriptElement) {
    script = existing
  } else {
    script = document.createElement("script")
    script.type = "application/ld+json"
    script.id = PAGE_JSON_LD_SCRIPT_ID
    document.head.append(script)
  }
  script.textContent = JSON.stringify(data)
}
