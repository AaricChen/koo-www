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
    expect(screen.getAllByRole("link", { name: "What is Koo?" }).length).toBeGreaterThan(0)
    expect(screen.getByText("Derivatives built around your NFT account")).not.toBeNull()
  })
})
