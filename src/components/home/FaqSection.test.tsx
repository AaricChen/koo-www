import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { afterEach, describe, expect, it } from "vitest"
import { FAQ_URL } from "../../lib/links"
import { FaqSection } from "./FaqSection"

afterEach(() => {
  cleanup()
})

describe("FaqSection", () => {
  it("matches the homepage FAQ layout and links", () => {
    const { container } = render(
      <MemoryRouter>
        <FaqSection />
      </MemoryRouter>,
    )
    expect(
      screen.getByRole("heading", { name: "Frequently Asked Questions" }),
    ).not.toBeNull()
    const readMore = screen.getByRole("link", { name: /View and read more/i })
    expect(readMore).toHaveProperty("href", expect.stringContaining(FAQ_URL))
    expect(readMore.className).toContain("gap-1.5")
    expect(readMore.className).toContain("lg:gap-3")
    expect(readMore.className).toContain("text-xs")
    expect(readMore.className).toContain("lg:text-xl")
    expect(readMore.className).toContain("leading-4")
    expect(readMore.className).toContain("lg:leading-5")
    expect(readMore.className).toContain("text-muted-foreground")
    expect(
      screen.getByRole("button", { name: "What is Koo?" }).getAttribute("aria-expanded"),
    ).toBe("true")
    expect(
      screen.getByRole("link", { name: /View the details/i }),
    ).toHaveProperty("href", expect.stringContaining("/faq/what-is-koo"))
    expect(container.innerHTML).toContain("bg-section-alt")
    expect(container.innerHTML).toContain("lg:pt-[100px]")
    expect(container.innerHTML).toContain("lg:text-[40px]")
    expect(container.innerHTML).toContain("home-faq-panel")
    expect(container.innerHTML).toContain("home-faq-trigger")
    expect(container.innerHTML).toContain("px-5 py-6")
    expect(container.innerHTML).toContain("lg:px-8 lg:py-12")
    expect(container.innerHTML).toContain("leading-[22px]")
    expect(container.innerHTML).toContain("lg:leading-[24px]")
    expect(container.innerHTML).toContain("size-[14px]")
    expect(container.innerHTML).toContain("lg:text-[18px]")
    expect(container.innerHTML).toContain("lg:leading-7")
    expect(container.innerHTML).toContain("border-color: rgb(61, 122, 255)")
    expect(container.innerHTML).toContain("View the details")
    expect(container.querySelector('a[href="#"]')).toBeNull()
    expect(screen.getByText(/Goal Difference delivery contracts/)).not.toBeNull()
  })

  it("collapses the open item when its header is clicked again", () => {
    const { container } = render(
      <MemoryRouter>
        <FaqSection />
      </MemoryRouter>,
    )
    const toggle = screen.getByRole("button", { name: "What is Koo?" })
    fireEvent.click(toggle)
    expect(toggle.getAttribute("aria-expanded")).toBe("false")
    expect(container.querySelector(".home-faq-item.is-open")).toBeNull()
  })

  it("animates panel open state when switching items", () => {
    const { container } = render(
      <MemoryRouter>
        <FaqSection />
      </MemoryRouter>,
    )
    fireEvent.click(screen.getByRole("button", { name: "How to trade on Koo?" }))
    expect(
      screen.getByRole("button", { name: "How to trade on Koo?" }).getAttribute(
        "aria-expanded",
      ),
    ).toBe("true")
    expect(container.querySelectorAll(".home-faq-item.is-open")).toHaveLength(1)
  })
})
