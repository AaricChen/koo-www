import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { DevelopmentMilestonesSection } from "./DevelopmentMilestonesSection"

function stubMatchMedia(matchesQuery: (query: string) => boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches: matchesQuery(query),
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
  })
}

describe("DevelopmentMilestonesSection", () => {
  it("renders the four phases without hover-only selection hooks in markup", () => {
    stubMatchMedia(() => false)
    const { container } = render(<DevelopmentMilestonesSection />)
    expect(screen.getAllByText("Phase 1").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Multi-Yield Sources").length).toBeGreaterThan(0)
    expect(container.innerHTML).not.toContain("onMouseEnter")
  })

  it("does not mount the desktop path canvas below lg", () => {
    stubMatchMedia(() => false)
    const { container } = render(<DevelopmentMilestonesSection />)
    expect(container.innerHTML).not.toContain("path-group9-on.svg")
    expect(container.querySelectorAll(".milestone-m-card").length).toBe(4)
  })

  it("mounts only the desktop canvas at lg", () => {
    stubMatchMedia((query) => query.includes("min-width"))
    const { container } = render(<DevelopmentMilestonesSection />)
    expect(container.innerHTML).toContain("path-group9-on.svg")
    expect(container.querySelectorAll(".milestone-m-card")).toHaveLength(0)
  })
})
