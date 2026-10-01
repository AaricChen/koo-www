import { cleanup, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { afterEach, describe, expect, it } from "vitest"
import { FaqDesktopIndexPage } from "./FaqDesktopIndexPage"

afterEach(() => {
  cleanup()
})

describe("FaqDesktopIndexPage", () => {
  it("renders sidebar navigation and topic content", () => {
    render(
      <MemoryRouter initialEntries={["/faq/what-is-koo"]}>
        <FaqDesktopIndexPage topicSlug="what-is-koo" />
      </MemoryRouter>,
    )
    const nav = screen.getByRole("navigation", { name: "FAQ categories" })
    expect(nav).not.toBeNull()
    expect(nav.className).toContain("faq-sidebar-nav")
    const active = nav.querySelector(".faq-sidebar-item.is-active")
    expect(active).not.toBeNull()
    expect(active?.textContent).toContain("What is Koo?")
    expect(screen.getAllByRole("link", { name: /What is Koo\?/i }).length).toBeGreaterThan(0)
    expect(
      screen.getByRole("heading", {
        name: "Derivatives built around your NFT account",
      }),
    ).not.toBeNull()
  })
})
