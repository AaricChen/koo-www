import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { APP_URL, DOCS_URL } from "../../lib/links"
import { EnterKooSection } from "./EnterKooSection"
import { HeroSection } from "./HeroSection"
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
    const docs = screen.getAllByRole("link", { name: "Docs" })
    expect(docs.length).toBeGreaterThanOrEqual(1)
    for (const link of docs) {
      expect(link).toHaveProperty("href", DOCS_URL)
    }
    expect(container.innerHTML).toContain("md:hidden")
    expect(container.innerHTML).toContain("w-[min(120px,38vw)]")
    expect(screen.getByRole("link", { name: "Launch App" })).toHaveProperty(
      "href",
      APP_URL,
    )
    expect(screen.getByRole("link", { name: "Launch App" }).className).toContain(
      "min-h-11",
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

describe("primary CTAs", () => {
  it("uses a fluid 300px cap so 320px viewports do not clip Start Trading", () => {
    const hero = render(<HeroSection />)
    const heroCta = hero.getByRole("link", { name: "Start Trading" })
    expect(heroCta.className).toContain("max-w-[300px]")
    expect(heroCta.className.split(" ").includes("w-[300px]")).toBe(false)
    hero.unmount()

    const enter = render(<EnterKooSection />)
    const enterCta = enter.getByRole("link", { name: "Start Trading" })
    expect(enterCta.className).toContain("max-w-[300px]")
    expect(enterCta.className.split(" ").includes("w-[300px]")).toBe(false)
    expect(enter.container.innerHTML).not.toContain("section-bg.png")
    expect(enter.container.innerHTML).toContain("opacity-20")
  })
})

describe("WhyKooSection", () => {
  it("does not pin the desktop product shot to a Figma left offset", () => {
    const { container } = render(<WhyKooSection />)
    expect(container.innerHTML).not.toContain("left-[758px]")
    expect(container.innerHTML).toContain("right-0")
    expect(container.innerHTML).toContain("w-[min(502px,46%)]")
    expect(container.innerHTML).toContain("mask-image")
    expect(container.innerHTML).toContain("object-top")
    expect(container.innerHTML).toContain(
      "linear-gradient(242deg, rgba(136, 136, 136, 0.2) 31%, rgba(0, 0, 0, 0.2) 98%)",
    )
  })

  it("keeps the mobile product shot decorative", () => {
    const { container } = render(<WhyKooSection />)
    const shots = container.querySelectorAll('img[src="/assets/why/product.png"]')
    expect(shots.length).toBeGreaterThan(0)
    for (const shot of shots) {
      expect(shot.getAttribute("alt")).toBe("")
      expect(shot.getAttribute("aria-hidden")).toBe("true")
    }
  })
})
