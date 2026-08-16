import { describe, expect, it } from "vitest"
import { isLgViewport, LG_MIN_WIDTH_PX } from "./viewport"

describe("isLgViewport", () => {
  it("treats Tailwind lg (1024) as the desktop floor", () => {
    expect(isLgViewport(LG_MIN_WIDTH_PX - 1)).toBe(false)
    expect(isLgViewport(LG_MIN_WIDTH_PX)).toBe(true)
    expect(isLgViewport(1440)).toBe(true)
  })
})
