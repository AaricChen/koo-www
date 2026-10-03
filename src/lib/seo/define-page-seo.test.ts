import { describe, expect, it } from "vitest"
import { definePageSeo } from "./define-page-seo"

describe("definePageSeo", () => {
  it("freezes valid definitions", () => {
    const seo = definePageSeo({
      title: "Example",
      description: "Example description",
      canonicalPath: "/example",
    })
    expect(Object.isFrozen(seo)).toBe(true)
  })

  it("rejects empty title", () => {
    expect(() =>
      definePageSeo({
        title: "  ",
        description: "Desc",
        canonicalPath: "/x",
      }),
    ).toThrow(/title/)
  })
})
