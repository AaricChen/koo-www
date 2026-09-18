import { describe, expect, it } from "vitest"
import {
  APP_URL,
  DISCORD_URL,
  DOCS_URL,
  ROADMAP_URL,
  SUPPORT_URL,
  TELEGRAM_URL,
  X_URL,
} from "./links"

describe("public URLs", () => {
  it("points CTAs at the Koo app and docs hosts", () => {
    expect(APP_URL).toBe("https://app.koo.xyz/")
    expect(DOCS_URL).toBe("https://docs.koo.xyz/")
    expect(SUPPORT_URL).toBe("https://docs.koo.xyz/feedback-and-support")
    expect(ROADMAP_URL).toBe("https://docs.koo.xyz/about-koo.xyz/roadmap")
    expect(DISCORD_URL).toBe("https://discord.gg/VVA2neHGuD")
    expect(TELEGRAM_URL).toBe("https://t.me/KooCommunity")
    expect(X_URL).toBe("https://x.com/koomarkets?s=11")
  })
})
