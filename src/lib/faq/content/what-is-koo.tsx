import { DOCS_URL } from "../../links"
import type { FaqTopicContent } from "../types"

/** Figma `faq-main-m/FAQ Overview` (5589:64586) + nested FAQ accordion. */
export const WHAT_IS_KOO_TOPIC_CONTENT: FaqTopicContent = {
  overviewTitle: "Derivatives built around your NFT account",
  intro:
    "Koo is an Arbitrum-based hybrid derivatives platform built around NFT accounts. Users trade crypto, TradFi and event contracts with USDC margin while each NFT Account maintains its own balances, positions, orders and risk state.",
  sections: [
    {
      kind: "list",
      title: "Key information",
      items: [
        {
          text: (
            <>
              Network: <span className="text-foreground">Arbitrum One</span>
            </>
          ),
        },
        {
          text: (
            <>
              Collateral: <span className="text-foreground">Native USDC</span>
            </>
          ),
        },
        {
          text: (
            <>
              Architecture:{" "}
              <span className="text-foreground">
                on-chain custody and final settlement; off-chain matching,
                pricing and real-time risk
              </span>
            </>
          ),
        },
      ],
    },
    {
      kind: "list",
      title: "Core products",
      items: [
        {
          text: (
            <>
              <span className="text-foreground">NFT Accounts</span> - One
              transferable account object containing its own trading state.
            </>
          ),
        },
        {
          text: (
            <>
              <span className="text-foreground">Yield-bearing Margin</span> -
              Eligible USDC margin may earn variable yield while supporting
              trading.
            </>
          ),
        },
        {
          text: (
            <>
              <span className="text-foreground">Event Contracts</span> -
              Delivery and perpetual products tied to defined event metrics.
            </>
          ),
        },
        {
          text: (
            <>
              <span className="text-foreground">Vault</span> - Koo&apos;s USDC
              insurance-fund vault, with liquidity and loss risk.
            </>
          ),
        },
      ],
    },
    {
      kind: "list",
      title: "Markets",
      items: [
        { text: "Crypto Perpetuals." },
        {
          text: "TradFi Perpetuals covering selected stocks, ETFs, precious metals and oil.",
        },
        { text: "Event Contracts tied to defined event metrics." },
      ],
    },
    {
      kind: "paragraphs",
      title: "How Koo works",
      paragraphs: [
        "A wallet controls one or more NFT Accounts.",
        "Assets and final settlement are on Arbitrum; matching and real-time risk calculations run offchain.",
        "Users should verify the exact market rules, fees, funding status and risk parameters before trading.",
      ],
    },
    {
      kind: "paragraphs",
      title: "Trust and risk",
      paragraphs: [
        "Derivatives can cause a partial or total loss of margin. Yield-bearing Margin and Vault participation also involve protocol, liquidity and principal-loss risks. Yield is variable and principal remains at risk.",
        "Product availability is subject to applicable laws and Koo's Terms of Service. Access may be restricted in certain jurisdictions.",
      ],
    },
  ],
  accordion: [
    {
      id: "what-is-koo",
      question: "What is Koo?",
      answer:
        "Koo is an Arbitrum-based hybrid derivatives platform built around NFT accounts. Assets and final settlement are handled onchain, while order matching, real-time pricing and risk calculations are handled by offchain systems.",
      defaultOpen: true,
      detailLink: {
        label: "View the details",
        href: `${DOCS_URL}about-koo.xyz`,
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
  ],
}
