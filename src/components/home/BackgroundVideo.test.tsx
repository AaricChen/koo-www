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

  it("does not mount a video element on the compact layout", () => {
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: false,
      media: query,
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
    expect(container.querySelector("video")).toBeNull()
    expect(container.querySelector("img")?.getAttribute("src")).toBe(
      "/assets/hero-bg.png",
    )
  })

  it("mounts a video on compact when playOnCompact is set", () => {
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: false,
      media: query,
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
      <BackgroundVideo src="/assets/enter/section-bg.mp4" playOnCompact />,
    )
    expect(container.querySelector("img")).toBeNull()
    expect(container.querySelector("video")?.getAttribute("src")).toBe(
      "/assets/enter/section-bg.mp4",
    )
  })

  it("preloads metadata only on lg", () => {
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: query.includes("min-width"),
      media: query,
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
