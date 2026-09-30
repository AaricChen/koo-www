import type { FaqAccordionItem } from "../types"

export const WHAT_IS_KOO_OVERVIEW = {
  title: "Derivatives built around your NFT account",
  intro:
    "Koo is an Arbitrum-based hybrid derivatives platform built around NFT accounts. Users trade crypto, TradFi and event contracts with USDC margin while each NFT Account maintains its own balances, positions, orders and risk state.",
} as const

export const WHAT_IS_KOO_ACCORDION: FaqAccordionItem[] = [
  {
    id: "what-is-koo",
    question: "What is Koo?",
    answer:
      "Koo is an Arbitrum-based hybrid derivatives platform built around NFT accounts. Assets and final settlement are handled onchain, while order matching, real-time pricing and risk calculations are handled by offchain systems.",
    defaultOpen: true,
    detailLink: {
      label: "View the details",
      href: "/faq/what-is-koo",
    },
  },
  {
    id: "collateral",
    question: "What collateral does Koo support?",
  },
  {
    id: "isolated-margin",
    question: "Does Koo support Isolated Margin?",
  },
]

export const WHAT_IS_KOO_TOPIC_ACCORDION: FaqAccordionItem[] = [
  {
    id: "cex",
    question: "Is Koo a centralized exchange?",
    answer:
      "No. It uses a hybrid architecture with onchain custody and final settlement plus offchain matching and real-time risk.",
    defaultOpen: true,
  },
  {
    id: "on-chain",
    question: "Is everything on Koo on-chain?",
  },
  {
    id: "availability",
    question: "Is Koo available everywhere?",
  },
]
