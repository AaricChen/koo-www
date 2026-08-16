import { render } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { BackgroundVideo } from "./BackgroundVideo"

afterEach(() => {
  vi.unstubAllGlobals()
})

describe("BackgroundVideo", () => {
  it("does not observe or play when the user prefers reduced motion", () => {
    const observe = vi.fn()
    const play = vi.fn()
    vi.stubGlobal(
      "matchMedia",
      (query: string) => ({
        matches: query.includes("prefers-reduced-motion"),
        media: query,
        addEventListener: () => {},
        removeEventListener: () => {},
      }),
    )
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe = observe
        disconnect() {}
        unobserve() {}
      },
    )
    HTMLMediaElement.prototype.play = play

    render(
      <BackgroundVideo src="/assets/hero-bg.mp4" poster="/assets/hero-bg.png" />,
    )

    expect(observe).not.toHaveBeenCalled()
    expect(play).not.toHaveBeenCalled()
  })

  it("preloads metadata only", () => {
    vi.stubGlobal("matchMedia", () => ({
      matches: false,
      media: "",
      addEventListener: () => {},
      removeEventListener: () => {},
    }))
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe() {}
        disconnect() {}
        unobserve() {}
      },
    )

    const { container } = render(
      <BackgroundVideo src="/assets/hero-bg.mp4" poster="/assets/hero-bg.png" />,
    )
    expect(container.querySelector("video")?.getAttribute("preload")).toBe(
      "metadata",
    )
  })
})
