import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { APP_URL, DOCS_URL } from "../../lib/links"
import { SiteFooter } from "./SiteFooter"
import { SiteHeader } from "./SiteHeader"
import { WhyKooSection } from "./WhyKooSection"

afterEach(() => {
  cleanup()
})

describe("SiteHeader", () => {
  it("exposes Home, Docs, and Launch App without placeholder hashes", () => {
    const { container } = render(<SiteHeader />)
    expect(screen.getByRole("link", { name: "Home" }).getAttribute("href")).toBe(
      "/",
    )
    expect(screen.getByRole("link", { name: "Docs" })).toHaveProperty(
      "href",
      DOCS_URL,
    )
    expect(screen.getByRole("link", { name: "Launch App" })).toHaveProperty(
      "href",
      APP_URL,
    )
    expect(container.querySelector('a[href="#"]')).toBeNull()
    expect(screen.queryByRole("link", { name: "Community" })).toBeNull()
  })
})

describe("SiteFooter", () => {
  it("keeps Docs live and omits legal or social hash links", () => {
    const { container } = render(<SiteFooter />)
    expect(screen.getByRole("link", { name: "Docs" })).toHaveProperty(
      "href",
      DOCS_URL,
    )
    expect(container.querySelector('a[href="#"]')).toBeNull()
    expect(screen.queryByRole("link", { name: "Terms of Service" })).toBeNull()
    expect(screen.queryByRole("link", { name: "Privacy Policy" })).toBeNull()
  })
})

describe("WhyKooSection", () => {
  it("does not pin the desktop product shot to a Figma left offset", () => {
    const { container } = render(<WhyKooSection />)
    expect(container.innerHTML).not.toContain("left-[758px]")
    expect(container.innerHTML).toContain("right-0")
    expect(container.innerHTML).toContain("w-[min(502px,46%)]")
  })
})
