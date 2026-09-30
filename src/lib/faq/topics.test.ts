import { describe, expect, it } from "vitest"
import {
  DEFAULT_FAQ_TOPIC_SLUG,
  FAQ_TOPICS,
  faqTopicPath,
  getFaqTopicMeta,
  isFaqTopicSlug,
} from "./topics"

describe("faq topics", () => {
  it("lists eleven sidebar categories", () => {
    expect(FAQ_TOPICS).toHaveLength(11)
  })

  it("resolves known slugs and paths", () => {
    expect(isFaqTopicSlug("what-is-koo")).toBe(true)
    expect(isFaqTopicSlug("unknown")).toBe(false)
    expect(getFaqTopicMeta("how-to-trade").menuLabel).toBe("How to Trade?")
    expect(faqTopicPath(DEFAULT_FAQ_TOPIC_SLUG)).toBe("/faq/what-is-koo")
  })
})
