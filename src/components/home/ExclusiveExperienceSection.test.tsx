import { fireEvent, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { ExclusiveExperienceSection } from "./ExclusiveExperienceSection"

beforeEach(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
  })
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

  it("does not eager-preload experience videos", () => {
    const { container } = render(<ExclusiveExperienceSection />)
    const videos = container.querySelectorAll("video")
    expect(videos.length).toBe(4)
    for (const video of videos) {
      expect(video.getAttribute("preload")).toBe("metadata")
    }
  })
})
