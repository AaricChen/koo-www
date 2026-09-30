import type { FaqTopicSlug } from "../topics"
import type { FaqTopicContent } from "../types"
import { WHAT_IS_KOO_TOPIC_CONTENT } from "./what-is-koo"

function topic(
  overviewTitle: string,
  intro: string,
  sections: FaqTopicContent["sections"] = [],
): FaqTopicContent {
  return { overviewTitle, intro, sections }
}

const TOPIC_CONTENT: Record<FaqTopicSlug, FaqTopicContent> = {
  "what-is-koo": WHAT_IS_KOO_TOPIC_CONTENT,
  "how-to-trade": topic(
    "How to trade on Koo",
    "To trade on Koo, connect a compatible wallet, prepare native USDC on Arbitrum One, create or select an NFT Account, choose a live market, place an order and monitor the account-level Risk Ratio.",
  ),
  "nft-accounts": topic(
    "What is a Koo NFT Account?",
    "A Koo NFT Account is the onchain ownership object for a trading account. It contains the account's balances, margin, positions, active orders and risk state, while the connected wallet controls it.",
  ),
  "yield-bearing-margin": topic(
    "What is Yield-bearing Margin on Koo?",
    "Yield-bearing Margin lets eligible USDC in a Koo NFT Account receive variable yield while remaining part of the account's trading equity. Yield is allocated every eight hours and credited to the account balance.",
  ),
  "event-contracts": topic(
    "What are Koo Event Contracts?",
    "Koo Event Contracts are derivatives whose value follows a defined event metric. Koo currently supports Goal Difference delivery contracts and exchange Market Share perpetual contracts; the two product types use different funding and settlement rules.",
  ),
  vault: topic(
    "What is the Koo Vault?",
    "The Koo Vault is a USDC insurance-fund vault. Participation involves liquidity, protocol and principal-loss risks; returns and liquidity are variable and not guaranteed.",
  ),
  "crypto-perpetuals": topic(
    "Trade crypto perpetuals on Koo",
    "Crypto perpetuals on Koo are USDC-margined contracts tied to supported digital assets. Verify live instrument status, leverage, fees and funding rules in the app before trading.",
  ),
  "tradfi-perpetuals": topic(
    "Trade selected TradFi perpetuals on Koo",
    "TradFi perpetuals cover selected stocks, ETFs, precious metals and oil. Availability, leverage and market stage depend on the live instrument list and applicable rules.",
  ),
  "trading-fees": topic(
    "What are Koo's trading fees?",
    "Koo charges maker and taker fees on executed trades. Fee tiers and last-updated values are configured on the platform; limit orders that cross immediately may pay taker fees.",
  ),
  funding: topic(
    "How does funding work on Koo?",
    "Funding transfers payments between long and short positions on perpetual contracts according to the platform schedule and formula. Goal Difference delivery contracts do not use funding; Market Share perpetual contracts do.",
  ),
  "liquidation-risk": topic(
    "How does liquidation work on Koo?",
    "Liquidation is driven by account-level risk metrics such as the Risk Ratio. When thresholds are breached, the system may cancel orders and close positions using mark price; always monitor risk in the app.",
  ),
}

export function getFaqTopicContent(slug: FaqTopicSlug): FaqTopicContent {
  return TOPIC_CONTENT[slug]
}
