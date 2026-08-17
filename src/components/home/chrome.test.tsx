import { cleanup, fireEvent, render, screen } from "@testing-library/react"
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
    const marks = screen.getAllByRole("link", { name: "Koo.xyz" })
    expect(marks.length).toBeGreaterThanOrEqual(1)
    for (const mark of marks) {
      expect(mark.getAttribute("href")).toBe("/")
    }
    const homes = screen.getAllByRole("link", { name: "Home" })
    expect(homes.length).toBeGreaterThanOrEqual(1)
    for (const home of homes) {
      expect(home.getAttribute("href")).toBe("/")
    }
    const docs = screen.getAllByRole("link", { name: "Docs" })
    expect(docs.length).toBeGreaterThanOrEqual(1)
    for (const link of docs) {
      expect(link).toHaveProperty("href", DOCS_URL)
    }
    expect(container.innerHTML).toContain("md:hidden")
    expect(container.innerHTML).toContain("logo-main.svg")
    expect(container.innerHTML).toContain("h-[50px]")
    const launch = screen.getAllByRole("link", { name: "Launch App" })
    expect(launch.length).toBe(2)
    for (const link of launch) {
      expect(link).toHaveProperty("href", APP_URL)
      expect(link.className).toContain("rounded-[4px]")
      expect(link.className).toContain("hover:text-secondary")
    }
    expect(launch[0].className).toContain("h-7")
    expect(launch[1].className).toContain("px-4")
    expect(launch[1].className).toContain("py-[11px]")
    expect(container.querySelector('a[href="#"]')).toBeNull()
    expect(screen.queryByRole("link", { name: "Community" })).toBeNull()
  })

  it("slides the mobile drawer in from the left", () => {
    const { container } = render(<SiteHeader />)
    const overlay = container.querySelector(".mobile-nav-overlay")
    const drawer = container.querySelector(".mobile-nav-drawer")
    expect(overlay).not.toBeNull()
    expect(drawer).not.toBeNull()
    expect(overlay?.classList.contains("is-open")).toBe(false)
    expect(drawer?.classList.contains("is-open")).toBe(false)
    expect(screen.queryByRole("dialog", { name: "Menu" })).toBeNull()

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }))
    expect(overlay?.classList.contains("is-open")).toBe(true)
    expect(drawer?.classList.contains("is-open")).toBe(true)
    expect(screen.getByRole("dialog", { name: "Menu" })).not.toBeNull()
    expect(screen.getByRole("navigation", { name: "Mobile" })).not.toBeNull()
    expect(
      drawer?.querySelector(".flex.w-full.items-center.justify-between"),
    ).not.toBeNull()

    const community = screen.getByRole("button", { name: "Community" })
    expect(community.getAttribute("aria-expanded")).toBe("false")
    fireEvent.click(community)
    expect(community.getAttribute("aria-expanded")).toBe("true")
    expect(
      container.querySelector('.mobile-nav-community[data-open="true"]'),
    ).not.toBeNull()
    expect(container.querySelector('img[src="/assets/social-x.svg"]')).not.toBeNull()
    expect(screen.getByText("X / Twitter")).not.toBeNull()
    expect(screen.getByText("Discord")).not.toBeNull()
    expect(screen.getByText("Telegram")).not.toBeNull()
    expect(screen.queryByText("Instagram")).toBeNull()
    expect(container.querySelector('a[href="#"]')).toBeNull()

    fireEvent.click(screen.getAllByRole("button", { name: "Close menu" })[0])
    expect(overlay?.classList.contains("is-open")).toBe(false)
    expect(drawer?.classList.contains("is-open")).toBe(false)
    expect(screen.queryByRole("dialog", { name: "Menu" })).toBeNull()
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

describe("HeroSection", () => {
  it("fades and blurs the hero background into the next section", () => {
    const { container } = render(<HeroSection />)
    expect(container.querySelector(".hero-bg-fade")).not.toBeNull()
    expect(container.querySelector(".hero-bottom-blur")).not.toBeNull()
    expect(container.querySelector("section")?.className).toContain("lg:pb-28")
    expect(container.querySelector("img[src='/assets/hero-bg.png']")).toBeNull()
    expect(
      container.querySelector("video")?.getAttribute("poster"),
    ).toBe("/assets/hero-bg.png")
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
    expect(container.innerHTML).toContain("blur-[28px]")
    expect(container.innerHTML).toContain("rounded-2xl")
    expect(container.innerHTML).toContain(
      "linear-gradient(203.01deg, rgba(0, 46, 95, 0.3) 7.13%, rgba(0, 0, 0, 0.5) 51.37%)",
    )
    expect(container.innerHTML).toContain(
      "linear-gradient(240.56deg, rgba(136, 136, 136, 0.2) 27.08%, rgba(0, 0, 0, 0.2) 85.26%)",
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
