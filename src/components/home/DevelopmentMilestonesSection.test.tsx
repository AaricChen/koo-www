import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { DevelopmentMilestonesSection } from "./DevelopmentMilestonesSection"

describe("DevelopmentMilestonesSection", () => {
  it("renders the four phases without hover-only selection hooks in markup", () => {
    const { container } = render(<DevelopmentMilestonesSection />)
    expect(screen.getAllByText("Phase 1").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Multi-Yield Sources").length).toBeGreaterThan(0)
    expect(container.innerHTML).not.toContain("onMouseEnter")
  })
})
