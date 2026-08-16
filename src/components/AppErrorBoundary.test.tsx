import { render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { AppErrorBoundary } from "./AppErrorBoundary"

function Boom() {
  throw new Error("boom")
}

describe("AppErrorBoundary", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("renders a fallback and reports the render failure", () => {
    vi.spyOn(console, "error").mockImplementation(() => {})
    render(
      <AppErrorBoundary>
        <Boom />
      </AppErrorBoundary>,
    )
    expect(
      screen.getByText("Something went wrong. Please refresh the page."),
    ).toBeTruthy()
    expect(console.error).toHaveBeenCalled()
  })
})
