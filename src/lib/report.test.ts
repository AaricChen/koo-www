import { afterEach, describe, expect, it, vi } from "vitest"
import {
  getDiagnosticCounts,
  getDiagnosticEvents,
  installDiagnosticListeners,
  reportMediaFailure,
  reportRenderFailure,
  resetDiagnostics,
} from "./report"

describe("report", () => {
  afterEach(() => {
    vi.restoreAllMocks()
    resetDiagnostics()
  })

  it("logs media failures with a stable prefix and records a diagnostic", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {})
    const cause = new Error("autoplay blocked")
    reportMediaFailure("/assets/experience/ownership.mp4", cause)
    expect(error).toHaveBeenCalledWith(
      "[koo-www] media failed: /assets/experience/ownership.mp4",
      cause,
    )
    expect(getDiagnosticCounts().media).toBe(1)
    expect(getDiagnosticEvents()[0]?.source).toBe(
      "/assets/experience/ownership.mp4",
    )
  })

  it("logs render failures with a stable prefix and records a diagnostic", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {})
    const cause = new Error("boom")
    reportRenderFailure(cause, "at App")
    expect(error).toHaveBeenCalledWith("[koo-www] render failed", cause, "at App")
    expect(getDiagnosticCounts().render).toBe(1)
  })

  it("records window errors and unhandled rejections", () => {
    vi.spyOn(console, "error").mockImplementation(() => {})
    const stop = installDiagnosticListeners()
    window.dispatchEvent(
      new ErrorEvent("error", { message: "script failed", filename: "/app.js" }),
    )
    window.dispatchEvent(
      new PromiseRejectionEvent("unhandledrejection", {
        reason: new Error("nope"),
        promise: Promise.resolve(),
      }),
    )
    expect(getDiagnosticCounts().window).toBe(1)
    expect(getDiagnosticCounts().unhandled).toBe(1)
    stop()
  })
})
