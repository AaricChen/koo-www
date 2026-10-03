import { FAQ_TOPIC_PAGES } from "../../faq/content/topic-pages"
import {
  FAQ_TOPIC_SLUGS,
  type FaqTopicSlug,
  faqTopicPath,
} from "../../faq/topics"
import { definePageSeo } from "../define-page-seo"
import { truncateMetaDescription } from "../utils"
import type { PageSeoDefinition } from "../types"

type FaqTopicSeoDraft = {
  title: string
  /** When omitted, falls back to the topic intro (trimmed). Override when Growth finalizes copy. */
  description?: string
}

function faqTopicSeo(
  slug: FaqTopicSlug,
  draft: FaqTopicSeoDraft,
): PageSeoDefinition {
  const description =
    draft.description ??
    truncateMetaDescription(FAQ_TOPIC_PAGES[slug].intro)

  return definePageSeo({
    title: draft.title,
    description,
    canonicalPath: faqTopicPath(slug),
  })
}

/**
 * One SEO definition per FAQ URL. Edit `title` / `description` here as copy is finalized.
 * Titles follow Growth P02–P12; descriptions default to intro text until replaced.
 */
export const FAQ_TOPIC_PAGE_SEO = {
  "what-is-koo": faqTopicSeo("what-is-koo", {
    title: "What Is Koo? NFT Account-Based Derivatives Explained",
  }),
  "how-to-trade": faqTopicSeo("how-to-trade", {
    title: "How to Trade on Koo: A Step-by-Step Guide",
  }),
  "nft-accounts": faqTopicSeo("nft-accounts", {
    title: "Koo NFT Accounts: How Trading Accounts Work",
  }),
  "yield-bearing-margin": faqTopicSeo("yield-bearing-margin", {
    title: "Yield-Bearing Margin on Koo",
  }),
  "event-contracts": faqTopicSeo("event-contracts", {
    title: "Koo Event Contracts: Delivery and Perpetual Markets",
  }),
  vault: faqTopicSeo("vault", {
    title: "Koo Vault: Insurance-Fund Participation and Risks",
  }),
  "crypto-perpetuals": faqTopicSeo("crypto-perpetuals", {
    title: "Crypto Perpetuals on Koo",
  }),
  "tradfi-perpetuals": faqTopicSeo("tradfi-perpetuals", {
    title: "TradFi Perpetuals on Koo: Stocks, ETFs and Commodities",
  }),
  "trading-fees": faqTopicSeo("trading-fees", {
    title: "Koo Trading Fees: Maker and Taker Rates",
  }),
  funding: faqTopicSeo("funding", {
    title: "Koo Funding Rates: Schedule, Direction and Formula",
  }),
  "liquidation-risk": faqTopicSeo("liquidation-risk", {
    title: "Koo Liquidation: Risk Ratio and Cross Margin Explained",
  }),
} satisfies Record<FaqTopicSlug, PageSeoDefinition>

export function getFaqTopicPageSeo(slug: FaqTopicSlug): PageSeoDefinition {
  return FAQ_TOPIC_PAGE_SEO[slug]
}

/** Ensures every routable FAQ slug has SEO copy at build time. */
export function assertFaqTopicSeoRegistryComplete() {
  for (const slug of FAQ_TOPIC_SLUGS) {
    if (!FAQ_TOPIC_PAGE_SEO[slug]) {
      throw new Error(`[koo-www] Missing FAQ page SEO for slug: ${slug}`)
    }
  }
}

assertFaqTopicSeoRegistryComplete()
