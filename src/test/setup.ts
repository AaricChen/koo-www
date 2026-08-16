import { cleanup } from "@testing-library/react"
import { afterEach, vi } from "vitest"

afterEach(() => {
  cleanup()
})

if (typeof HTMLMediaElement !== "undefined") {
  HTMLMediaElement.prototype.play = async () => undefined
  HTMLMediaElement.prototype.pause = () => undefined
}

if (typeof ResizeObserver === "undefined") {
  class FakeResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  vi.stubGlobal("ResizeObserver", FakeResizeObserver)
}
