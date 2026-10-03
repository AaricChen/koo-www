import {
  FAQ_TOPIC_SLUGS,
  type FaqTopicSlug,
  faqTopicPath,
} from "../../faq/topics"
import { definePageSeo } from "../define-page-seo"
import type { PageSeoDefinition } from "../types"

/** Finalized title and meta description per FAQ URL (Growth P02–P12). */
export const FAQ_TOPIC_SEO_COPY = {
  "what-is-koo": {
    title: "What Is Koo? NFT Account-Based Derivatives Explained",
    description:
      "Learn how Koo combines NFT trading accounts, USDC margin, hybrid execution and crypto, TradFi and event derivatives on Arbitrum.",
  },
  "how-to-trade": {
    title: "How to Trade on Koo: A Step-by-Step Guide",
    description:
      "Connect a wallet, deposit native USDC on Arbitrum, use an NFT Account, place orders, monitor Risk Ratio and withdraw from Koo.",
  },
  "nft-accounts": {
    title: "Koo NFT Accounts: How Trading Accounts Work",
    description:
      "Understand how a Koo NFT Account holds margin, positions, orders and risk as one transferable account object on Arbitrum.",
  },
  "yield-bearing-margin": {
    title: "Yield-Bearing Margin on Koo",
    description:
      "Learn how eligible USDC margin may earn variable yield while remaining part of a Koo NFT Account’s trading equity, plus the key risks.",
  },
  "event-contracts": {
    title: "Koo Event Contracts: Delivery and Perpetual Markets",
    description:
      "Learn the difference between Koo Goal Difference delivery contracts and Market Share perpetual contracts, including funding and settlement rules.",
  },
  vault: {
    title: "Koo Vault: Insurance-Fund Participation and Risks",
    description:
      "Understand Koo’s USDC insurance-fund vault, how it can absorb liquidation risk, withdrawal limits and the possibility of loss.",
  },
  "crypto-perpetuals": {
    title: "Crypto Perpetuals on Koo",
    description:
      "Explore Koo crypto perpetual markets, USDC margin, order-book execution, eight-hour funding and account-level Cross Margin risk.",
  },
  "tradfi-perpetuals": {
    title: "TradFi Perpetuals on Koo: Stocks, ETFs and Commodities",
    description:
      "Explore selected Koo stock, ETF, precious-metal and oil perpetuals with USDC margin, dynamic funding and current market rules.",
  },
  "trading-fees": {
    title: "Koo Trading Fees: Maker and Taker Rates",
    description:
      "See Koo’s current 0.02% taker fee and -0.005% maker fee, how maker rebates work and when a limit order can be a taker.",
  },
  funding: {
    title: "Koo Funding Rates: Schedule, Direction and Formula",
    description:
      "Learn how Koo perpetual funding works, when it settles, who pays whom and why the actual rate varies by market and time.",
  },
  "liquidation-risk": {
    title: "Koo Liquidation: Risk Ratio and Cross Margin Explained",
    description:
      "Learn how Koo uses account-level Risk Ratio, Mark Price, Cross Margin, order cancellation and partial liquidation to manage risk.",
  },
} satisfies Record<FaqTopicSlug, { title: string; description: string }>

function buildFaqTopicPageSeo(slug: FaqTopicSlug): PageSeoDefinition {
  const copy = FAQ_TOPIC_SEO_COPY[slug]
  return definePageSeo({
    title: copy.title,
    description: copy.description,
    canonicalPath: faqTopicPath(slug),
  })
}

export const FAQ_TOPIC_PAGE_SEO = Object.fromEntries(
  FAQ_TOPIC_SLUGS.map((slug) => [slug, buildFaqTopicPageSeo(slug)]),
) as Record<FaqTopicSlug, PageSeoDefinition>

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
