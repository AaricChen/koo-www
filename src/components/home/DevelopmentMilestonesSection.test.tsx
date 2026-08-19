import { fireEvent, render, screen } from "@testing-library/react"
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
  it("keeps mobile cards click-only", () => {
    stubMatchMedia(() => false)
    const { container } = render(<DevelopmentMilestonesSection />)
    expect(screen.getAllByText("Phase 1").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Multi-Yield Sources").length).toBeGreaterThan(0)
    expect(container.querySelectorAll(".milestone-m-card").length).toBe(4)
    expect(container.innerHTML).toContain("w-[82.67vw]")
    expect(container.innerHTML).toContain("left-[-12.05%]")
    expect(container.innerHTML).toContain("center-glow-mobile.svg")
    expect(container.innerHTML).toContain("inset-[-62.68%_-32.26%]")
    expect(container.innerHTML).not.toContain("max-w-[343px]")
    for (const tag of container.querySelectorAll(".milestone-m-tag")) {
      expect(tag.closest(".milestone-features-inner")).toBeNull()
    }
  })

  it("does not mount the desktop path canvas below lg", () => {
    stubMatchMedia(() => false)
    const { container } = render(<DevelopmentMilestonesSection />)
    expect(container.querySelector(".milestone-line")).toBeNull()
    expect(container.querySelectorAll(".milestone-m-card").length).toBe(4)
  })

  it("mounts only the desktop canvas at lg", () => {
    stubMatchMedia((query) => query.includes("min-width"))
    const { container } = render(<DevelopmentMilestonesSection />)
    expect(container.querySelectorAll(".milestone-line")).toHaveLength(4)
    expect(container.querySelector(".milestone-line.is-active")).not.toBeNull()
    expect(container.querySelectorAll(".milestone-m-card")).toHaveLength(0)
    expect(container.querySelector("[data-floor-glow]")).toBeNull()
    expect(container.querySelector('[data-line-state="off"]')).not.toBeNull()
    expect(container.querySelector(".milestone-line-glow")).toBeNull()
    expect(container.querySelectorAll(".milestone-line-end-glow").length).toBe(8)
    expect(container.querySelector("[data-milestone-logo]")?.className).toContain(
      "z-[1]",
    )
    expect(
      container
        .querySelector("svg[aria-hidden]")
        ?.getAttribute("class")
        ?.includes("z-[1]"),
    ).toBe(false)
  })

  it("lights a desktop phase on hover", () => {
    stubMatchMedia((query) => query.includes("min-width"))
    const { container } = render(<DevelopmentMilestonesSection />)
    fireEvent.mouseEnter(screen.getByRole("button", { name: /Phase 2/i }))
    expect(
      screen.getByRole("button", { name: /Phase 2/i }).getAttribute("aria-pressed"),
    ).toBe("true")
    expect(
      container.querySelector(
        '[data-phase="phase-2"][data-line-state="on"].is-active',
      ),
    ).not.toBeNull()
    expect(
      container.querySelector('[data-phase="phase-1"][data-line-state="off"]'),
    ).not.toBeNull()
  })

  it("keeps the desktop canvas height fixed when switching phases", () => {
    stubMatchMedia((query) => query.includes("min-width"))
    const { container } = render(<DevelopmentMilestonesSection />)
    const canvas = screen.getByRole("group", {
      name: "Development milestone phases",
    })

    expect(canvas.style.height).toBe("1330px")
    expect(container.querySelector(".milestone-features")).toBeNull()
    expect(screen.getByText("Core Features")).toBeTruthy()

    fireEvent.mouseEnter(screen.getByRole("button", { name: /Phase 2/i }))
    expect(canvas.style.height).toBe("1330px")
    expect(screen.getByText("Upgrades")).toBeTruthy()
    expect(screen.queryByText("Core Features")).toBeNull()
    expect(container.querySelector(".milestone-features")).toBeNull()
  })
})
