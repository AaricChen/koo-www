import { cleanup } from "@testing-library/react"
import { afterEach } from "vitest"

afterEach(() => {
  cleanup()
})

if (typeof HTMLMediaElement !== "undefined") {
  HTMLMediaElement.prototype.play = async () => undefined
  HTMLMediaElement.prototype.pause = () => undefined
}
