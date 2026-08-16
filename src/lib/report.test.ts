import { afterEach, describe, expect, it, vi } from "vitest"
import { reportMediaFailure, reportRenderFailure } from "./report"

describe("report", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("logs media failures with a stable prefix", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {})
    const cause = new Error("autoplay blocked")
    reportMediaFailure("/assets/experience/ownership.mp4", cause)
    expect(error).toHaveBeenCalledWith(
      "[koo-www] media failed: /assets/experience/ownership.mp4",
      cause,
    )
  })

  it("logs render failures with a stable prefix", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {})
    const cause = new Error("boom")
    reportRenderFailure(cause, "at App")
    expect(error).toHaveBeenCalledWith("[koo-www] render failed", cause, "at App")
  })
})
