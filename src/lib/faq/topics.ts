export const FAQ_TOPIC_SLUGS = [
  "what-is-koo",
  "how-to-trade",
  "nft-accounts",
  "yield-bearing-margin",
  "event-contracts",
  "vault",
  "crypto-perpetuals",
  "tradfi-perpetuals",
  "trading-fees",
  "funding",
  "liquidation-risk",
] as const

export type FaqTopicSlug = (typeof FAQ_TOPIC_SLUGS)[number]

export type FaqTopicMeta = {
  slug: FaqTopicSlug
  menuLabel: string
}

export const FAQ_TOPICS: readonly FaqTopicMeta[] = [
  { slug: "what-is-koo", menuLabel: "What is Koo?" },
  { slug: "how-to-trade", menuLabel: "How to Trade?" },
  { slug: "nft-accounts", menuLabel: "NFT Accounts" },
  { slug: "yield-bearing-margin", menuLabel: "Yield-bearing Margin" },
  { slug: "event-contracts", menuLabel: "Event Contracts" },
  { slug: "vault", menuLabel: "Vault" },
  { slug: "crypto-perpetuals", menuLabel: "Crypto Perpetuals" },
  { slug: "tradfi-perpetuals", menuLabel: "TradFi Perpetuals" },
  { slug: "trading-fees", menuLabel: "Trading Fees" },
  { slug: "funding", menuLabel: "Funding" },
  { slug: "liquidation-risk", menuLabel: "Liquidation & Risk" },
] as const

export const DEFAULT_FAQ_TOPIC_SLUG: FaqTopicSlug = "what-is-koo"

export function isFaqTopicSlug(value: string): value is FaqTopicSlug {
  return (FAQ_TOPIC_SLUGS as readonly string[]).includes(value)
}

export function getFaqTopicMeta(slug: FaqTopicSlug): FaqTopicMeta {
  const topic = FAQ_TOPICS.find((item) => item.slug === slug)
  if (!topic) {
    throw new Error(`[koo-www] Unknown FAQ topic slug: ${slug}`)
  }
  return topic
}

export function faqTopicPath(slug: FaqTopicSlug) {
  return `/faq/${slug}`
}
