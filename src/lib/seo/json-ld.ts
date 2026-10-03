import {
  absoluteUrl,
  ORGANIZATION_SAME_AS,
  SITE_NAME,
  SITE_ORIGIN,
} from "./site"

export function buildWebPageJsonLd(input: {
  url: string
  name: string
  description: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${input.url}#webpage`,
    url: input.url,
    name: input.name,
    description: input.description,
    isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
  }
}

export function buildSiteGraphJsonLd(homeDescription: string) {
  const homeUrl = absoluteUrl("/")
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${homeUrl}#organization`,
        name: SITE_NAME,
        url: homeUrl,
        logo: absoluteUrl("/assets/logo-main.svg"),
        sameAs: [...ORGANIZATION_SAME_AS],
      },
      {
        "@type": "WebSite",
        "@id": `${homeUrl}#website`,
        url: homeUrl,
        name: SITE_NAME,
        description: homeDescription,
        publisher: { "@id": `${homeUrl}#organization` },
      },
    ],
  }
}
