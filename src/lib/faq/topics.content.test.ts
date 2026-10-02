import { describe, expect, it } from "vitest"
import { getFaqTopicContent } from "./content"
import { FAQ_TOPIC_SLUGS } from "./topics"

describe("getFaqTopicContent", () => {
  it("provides PDF copy for every FAQ topic slug", () => {
    for (const slug of FAQ_TOPIC_SLUGS) {
      const content = getFaqTopicContent(slug)
      expect(content.overviewTitle.length).toBeGreaterThan(0)
      expect(content.intro.length).toBeGreaterThan(20)
      expect(content.accordion?.length).toBeGreaterThanOrEqual(3)
    }
  })

  it("matches Figma What is Koo overview and FAQ accordion", () => {
    const content = getFaqTopicContent("what-is-koo")
    expect(content.overviewTitle).toBe("Derivatives built around your NFT account")
    expect(content.intro).toContain("final settlement are handled onchain")
    expect(content.sections).toHaveLength(4)
    const keyInfo = content.sections[0]
    expect(keyInfo.kind).toBe("list")
    if (keyInfo.kind === "list") {
      expect(keyInfo.title).toBe("Key information")
      expect(keyInfo.items[2]).toMatchObject({
        kind: "labeled",
        label: "Account model:",
        value: "NFT Accounts with Cross Margin",
      })
    }
    expect(content.sections[1]).toMatchObject({
      kind: "paragraphs",
      title: "Who Koo is for",
    })
    expect(content.sections[2]).toMatchObject({
      kind: "highlights",
      title: "How Koo differs",
    })
    expect(content.sections[3]).toMatchObject({
      kind: "list",
      title: "Four core capabilities",
    })
    expect(content.accordion?.[0]?.question).toBe("Is Koo a centralized exchange?")
    expect(content.accordion?.[1]?.question).toBe("Is everything on Koo onchain?")
    expect(content.accordion?.[2]?.question).toBe("Is Koo available everywhere?")
    expect(content.accordion?.every((item) => Boolean(item.answer))).toBe(true)
  })

  it("matches Figma How to trade content and FAQ accordion", () => {
    const content = getFaqTopicContent("how-to-trade")
    expect(content.pageHeaderTitle).toBe("How to trade on Koo?")
    expect(content.sections[0]).toMatchObject({
      kind: "list",
      title: "Key information",
    })
    expect(content.sections[1]).toMatchObject({
      title: "Step 1 — Connect a wallet",
      titleVariant: "accent",
    })
    expect(content.sections[7]?.dividerAfter).toBe(true)
    expect(content.accordion?.[0]?.question).toBe("Do I need ETH?")
    expect(content.accordion?.[1]?.answer).toContain("native USDC")
    expect(content.accordion?.[2]?.question).toBe(
      "How can I create separate risk boundaries?",
    )
  })

  it("matches Figma NFT Accounts content and FAQ accordion", () => {
    const content = getFaqTopicContent("nft-accounts")
    expect(content.pageHeaderTitle).toBe("What is a Koo NFT account?")
    expect(content.intro).toContain("account’s balances")
    expect(content.sections[0]).toMatchObject({
      kind: "list",
      title: "Key information",
    })
    if (content.sections[0]?.kind === "list") {
      expect(content.sections[0].items[0]).toMatchObject({
        kind: "plain",
        text: "One wallet can control multiple NFT Accounts.",
      })
    }
    expect(content.sections[1]?.title).toBe("How it works")
    expect(content.sections[1]?.kind).toBe("paragraphs")
    if (content.sections[1]?.kind === "paragraphs") {
      expect(content.sections[1].paragraphs).toHaveLength(3)
    }
    expect(content.sections[4]?.dividerAfter).toBe(true)
    expect(content.accordion?.[0]?.question).toBe(
      "How does an NFT Account relate to my wallet?",
    )
    expect(content.accordion?.[1]?.answer).toContain("Cross Margin")
    expect(content.accordion?.[2]?.question).toBe("What happens after transfer?")
  })

  it("matches Figma Yield-bearing Margin content and FAQ accordion", () => {
    const content = getFaqTopicContent("yield-bearing-margin")
    expect(content.pageHeaderTitle).toBe("What is yield-bearing margin on Koo?")
    expect(content.intro).toContain("account’s trading equity")
    expect(content.sections[0]?.kind).toBe("list")
    if (content.sections[0]?.kind === "list") {
      expect(content.sections[0].items[1]).toMatchObject({
        kind: "labeled",
        value: "Every 8 hours",
      })
    }
    expect(content.sections[2]?.title).toBe("Example")
    if (content.sections[2]?.kind === "paragraphs") {
      expect(content.sections[2].paragraphs).toHaveLength(1)
    }
    expect(content.sections[3]?.title).toBe("Risks and limits")
    expect(content.sections[3]?.dividerAfter).toBe(true)
    expect(content.accordion?.[0]?.question).toBe("Is the yield fixed?")
    expect(content.accordion?.[1]?.answer).toBe("Every eight hours.")
    expect(content.accordion?.[2]?.question).toBe("Can credited yield support margin?")
  })

  it("matches Figma Event Contracts content and FAQ accordion", () => {
    const content = getFaqTopicContent("event-contracts")
    expect(content.pageHeaderTitle).toBe("What are Koo event contracts?")
    if (content.sections[0]?.kind === "list") {
      expect(content.sections[0].items[0]).toMatchObject({
        kind: "labeled",
        value: "Delivery contract, no funding",
      })
    }
    expect(content.sections[1]?.title).toBe("Goal difference delivery contracts")
    expect(content.sections[2]?.title).toBe("Exchange market share perpetuals")
    expect(content.sections[4]?.dividerAfter).toBe(true)
    expect(content.accordion?.[0]?.question).toBe("Do all Event Contracts charge funding?")
    expect(content.accordion?.[1]?.answer).toContain("regular time plus stoppage time")
    expect(content.accordion?.[2]?.question).toBe(
      "What if live data conflicts with the official result?",
    )
  })

  it("matches Figma Vault content and FAQ accordion", () => {
    const content = getFaqTopicContent("vault")
    expect(content.pageHeaderTitle).toBe("What is the Koo vault?")
    expect(content.intro).toContain("Koo’s insurance-fund function")
    if (content.sections[0]?.kind === "list") {
      expect(content.sections[0].items[2]).toMatchObject({
        kind: "labeled",
        value: "5 minutes, subject to available liquidity",
      })
    }
    expect(content.sections[2]?.title).toBe("Understanding vault performance")
    expect(content.sections[4]?.dividerAfter).toBe(true)
    expect(content.accordion?.[0]?.question).toBe("Is Vault principal guaranteed?")
    expect(content.accordion?.[1]?.answer).toBe("No. Any APR is historical and can change.")
    expect(content.accordion?.[2]?.question).toBe("Can I withdraw immediately?")
  })

  it("matches Figma Crypto Perpetuals content and FAQ accordion", () => {
    const content = getFaqTopicContent("crypto-perpetuals")
    expect(content.pageHeaderTitle).toBe("Trade crypto perpetuals on Koo")
    expect(content.sections[0]).toMatchObject({
      kind: "list",
      title: "Key Information",
    })
    expect(content.sections[3]?.title).toBe("Leverage, fees and funding")
    if (content.sections[3]?.kind === "paragraphs") {
      expect(content.sections[3].paragraphs).toHaveLength(3)
    }
    expect(content.sections[4]?.dividerAfter).toBe(true)
    expect(content.accordion?.[0]?.question).toBe("Are all crypto markets 100×?")
    expect(content.accordion?.[1]?.answer).toContain("taker")
    expect(content.accordion?.[2]?.answer).toBe("Every eight hours.")
  })

  it("matches Figma TradFi Perpetuals content and FAQ accordion", () => {
    const content = getFaqTopicContent("tradfi-perpetuals")
    expect(content.pageHeaderTitle).toBe("Trade selected TradFi perpetuals on Koo")
    expect(content.sections[0]?.title).toBe("Key Information")
    expect(content.sections[1]?.title).toBe("Markets")
    expect(content.sections[2]?.title).toBe("Execution")
    if (content.sections[2]?.kind === "list") {
      expect(content.sections[2].items[0]).toMatchObject({ kind: "highlight", highlight: "Stocks" })
    }
    expect(content.sections[5]?.dividerAfter).toBe(true)
    expect(content.accordion?.[0]?.question).toBe(
      "Which types of TradFi markets does Koo cover?",
    )
    expect(content.accordion?.[1]?.question).toBe(
      "Can I trade when the underlying market is closed?",
    )
    expect(content.accordion?.[2]?.answer).toContain("Check the trading app for current values")
  })

  it("matches Figma Trading Fees content and FAQ accordion", () => {
    const content = getFaqTopicContent("trading-fees")
    expect(content.pageHeaderTitle).toBe("What are Koo’s trading fees?")
    expect(content.intro).toContain("minimum taker fee of 0.05 USDC")
    expect(content.sections[0]?.title).toBe("Key Information")
    if (content.sections[0]?.kind === "list") {
      expect(content.sections[0].items[0]).toMatchObject({
        value: "0.02%, minimum 0.05 USDC per order",
      })
    }
    expect(content.sections[2]?.title).toBe("Formula")
    expect(content.sections[3]?.title).toBe("What is not included")
    expect(content.sections[3]?.dividerAfter).toBe(true)
    expect(content.accordion?.[0]?.question).toBe(
      "Does a limit order always receive the maker rebate?",
    )
    expect(content.accordion?.[1]?.question).toBe("Is funding included in the trading fee?")
    expect(content.accordion?.[2]?.answer).toContain("same maker and taker rates")
  })

  it("matches Figma Funding content and FAQ accordion", () => {
    const content = getFaqTopicContent("funding")
    expect(content.pageHeaderTitle).toBe("How does funding work on Koo?")
    expect(content.intro).toContain("Koo’s current open perpetual markets")
    if (content.sections[0]?.kind === "list") {
      expect(content.sections[0].items[0]).toMatchObject({
        kind: "labeled",
        value: "Longs pay shorts",
      })
    }
    expect(content.sections[3]?.title).toBe("Formula and example")
    expect(content.sections[4]?.dividerAfter).toBe(true)
    expect(content.accordion?.[0]?.question).toBe("Is funding a holding fee paid to Koo?")
    expect(content.accordion?.[1]?.question).toBe("Is the rate always 0.02%?")
    expect(content.accordion?.[2]?.answer).toContain("Goal Difference delivery contracts do not")
  })

  it("matches Figma Liquidation content and FAQ accordion", () => {
    const content = getFaqTopicContent("liquidation-risk")
    expect(content.pageHeaderTitle).toBe("How does liquidation work on Koo?")
    if (content.sections[0]?.kind === "list") {
      expect(content.sections[0].items[2]).toMatchObject({
        kind: "labeled",
        value: "Reference Only",
      })
    }
    expect(content.sections[2]?.title).toBe("Trigger sequence")
    expect(content.sections[5]?.dividerAfter).toBe(true)
    expect(content.accordion?.[0]?.answer).toBe(
      "The NFT Account Risk Ratio reaching 100%.",
    )
    expect(content.accordion?.[1]?.question).toBe("Why can the estimate change?")
    expect(content.accordion?.[2]?.question).toBe("Does Koo use Last Price?")
  })

  it("matches P10 trading fees intro rates", () => {
    const content = getFaqTopicContent("trading-fees")
    expect(content.intro).toContain("0.02%")
    expect(content.intro).toContain("0.05 USDC")
    expect(content.intro).toContain("-0.005%")
  })
})
