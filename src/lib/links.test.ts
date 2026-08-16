import { describe, expect, it } from "vitest"
import { APP_URL, DOCS_URL } from "./links"

describe("public URLs", () => {
  it("points CTAs at the Koo app and docs hosts", () => {
    expect(APP_URL).toBe("https://app.koo.xyz/")
    expect(DOCS_URL).toBe("https://docs.koo.xyz/")
  })
})
