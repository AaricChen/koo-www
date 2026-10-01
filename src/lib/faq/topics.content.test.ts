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
    const keyInfo = content.sections[0]
    expect(keyInfo.kind).toBe("list")
    if (keyInfo.kind === "list") {
      expect(keyInfo.items[2]).toMatchObject({
        kind: "labeled",
        label: "Account model:",
        value: "NFT Accounts with Cross Margin",
      })
    }
    expect(content.accordion?.[0]?.question).toBe("Is Koo a centralized exchange?")
    expect(content.accordion?.[1]?.question).toBe("Is everything on Koo onchain?")
    expect(content.accordion?.[2]?.question).toBe("Is Koo available everywhere?")
    expect(content.accordion?.every((item) => Boolean(item.answer))).toBe(true)
  })

  it("matches P10 trading fees intro rates", () => {
    const content = getFaqTopicContent("trading-fees")
    expect(content.intro).toContain("0.02%")
    expect(content.intro).toContain("-0.005%")
  })
})
