import type { FaqTopicSlug } from "./topics"
import { faqTopicPath } from "./topics"

export type HomeFaqItem = {
  id: string
  topicSlug: FaqTopicSlug
  question: string
  answer: string
}

/** Homepage FAQ accordion — copy from Figma `faq-card` show states. */
export const HOME_FAQ_ITEMS: readonly HomeFaqItem[] = [
  {
    id: "what-is-koo",
    topicSlug: "what-is-koo",
    question: "What is Koo?",
    answer:
      "Koo is an Arbitrum-based hybrid derivatives platform built around NFT accounts. Assets and final settlement are handled onchain, while order matching, real-time pricing and risk calculations are handled by offchain systems.",
  },
  {
    id: "how-to-trade",
    topicSlug: "how-to-trade",
    question: "How to trade on Koo?",
    answer:
      "To trade on Koo, connect a compatible wallet, prepare native USDC on Arbitrum One, create or select an NFT Account, choose a live market, place an order and monitor the account-level Risk Ratio.",
  },
  {
    id: "nft-account",
    topicSlug: "nft-accounts",
    question: "What is a Koo NFT Account?",
    answer:
      "A Koo NFT Account is the onchain ownership object for a trading account. It contains the account’s balances, margin, positions, active orders and risk state, while the connected wallet controls it.",
  },
  {
    id: "yield-margin",
    topicSlug: "yield-bearing-margin",
    question: "What is Yield-bearing Margin on Koo?",
    answer:
      "Yield-bearing Margin lets eligible USDC in a Koo NFT Account receive variable yield while remaining part of the account’s trading equity. Yield is allocated every eight hours and credited to the account balance.",
  },
  {
    id: "event-contracts",
    topicSlug: "event-contracts",
    question: "What are Koo Event Contracts?",
    answer:
      "Koo Event Contracts are derivatives whose value follows a defined event metric. Koo currently supports Goal Difference delivery contracts and exchange Market Share perpetual contracts; the two product types use different funding and settlement rules.",
  },
] as const

export function homeFaqDetailHref(topicSlug: FaqTopicSlug) {
  return faqTopicPath(topicSlug)
}
