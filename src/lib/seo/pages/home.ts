import { buildHomePageJsonLd } from "../build-page-seo"
import { definePageSeo } from "../define-page-seo"

export const HOME_PAGE_TITLE =
  "Koo | NFT Account-Based Derivatives on Arbitrum"

export const HOME_PAGE_DESCRIPTION =
  "Explore Koo, an Arbitrum-based hybrid derivatives platform for crypto, TradFi and event contracts, built around NFT trading accounts."

export const homePageSeo = definePageSeo({
  title: HOME_PAGE_TITLE,
  description: HOME_PAGE_DESCRIPTION,
  canonicalPath: "/",
  includeWebPageSchema: false,
  jsonLd: buildHomePageJsonLd(HOME_PAGE_DESCRIPTION),
})
