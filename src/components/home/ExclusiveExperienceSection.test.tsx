import { fireEvent, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { ExclusiveExperienceSection } from "./ExclusiveExperienceSection"

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

beforeEach(() => {
  stubMatchMedia(() => false)
  class FakeIntersectionObserver {
    observe() {}
    disconnect() {}
    unobserve() {}
  }
  vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver)
})

describe("ExclusiveExperienceSection", () => {
  it("lets keyboard users activate a feature row", () => {
    render(<ExclusiveExperienceSection />)
    const first = screen.getByRole("article", {
      name: /Transferable Account Ownership/i,
    })
    expect(first.tabIndex).toBe(0)
    const second = screen.getByRole("article", {
      name: /Yield-Generating Margin Capital/i,
    })
    fireEvent.keyDown(second, { key: "Enter" })
    expect(second.getAttribute("aria-current")).toBe("true")
    expect(first.getAttribute("aria-current")).toBeNull()
  })

  it("keeps stacked mobile copy visible to AT and still mounts clips", () => {
    const { container } = render(<ExclusiveExperienceSection />)
    const videos = container.querySelectorAll("video")
    expect(videos.length).toBe(4)
    for (const video of videos) {
      expect(video.getAttribute("preload")).toBe("metadata")
    }
    const under = container.querySelectorAll(".experience-under")
    expect(under.length).toBeGreaterThan(0)
    for (const node of under) {
      expect(node.getAttribute("aria-hidden")).toBe("false")
    }
    const first = container.querySelector(".experience-item")
    expect(first?.querySelector(".experience-media")).not.toBeNull()
    expect(first?.querySelector(".experience-left")).not.toBeNull()
  })
})
