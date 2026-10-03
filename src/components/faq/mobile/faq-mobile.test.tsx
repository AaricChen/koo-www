import { cleanup, fireEvent, render, screen, within } from "@testing-library/react"
import { MemoryRouter, Route, Routes, useParams } from "react-router-dom"
import { isFaqTopicSlug } from "../../../lib/faq/topics"
import { afterEach, describe, expect, it } from "vitest"
import { DOCS_URL } from "../../../lib/links"
import { FaqMobileIndexPage } from "./FaqMobileIndexPage"

afterEach(() => {
  cleanup()
})

function FaqMobileRoute() {
  const { topicSlug } = useParams()
  if (!topicSlug || !isFaqTopicSlug(topicSlug)) return null
  return <FaqMobileIndexPage topicSlug={topicSlug} />
}

describe("FaqMobileIndexPage", () => {
  it("renders the mobile hero and category trigger for What is Koo", () => {
    render(
      <MemoryRouter initialEntries={["/faq/what-is-koo"]}>
        <FaqMobileIndexPage topicSlug="what-is-koo" />
      </MemoryRouter>,
    )
    expect(
      screen.getByRole("heading", { name: "Frequently Asked Questions" }),
    ).not.toBeNull()
    expect(screen.getByRole("link", { name: "Full Docs" })).toHaveProperty(
      "href",
      DOCS_URL,
    )
    const categoryTrigger = screen.getByRole("button", {
      name: "Select FAQ category: What is Koo?",
    })
    expect(categoryTrigger).not.toBeNull()
    expect(categoryTrigger.className).toContain("w-full")
    expect(categoryTrigger.className).toContain("min-w-0")
    expect(
      categoryTrigger.closest(".faq-mobile-category-sticky")?.className,
    ).toContain("bg-section-alt")
    const mobileRoot = categoryTrigger.closest("[data-figma-node='5589:66293']")
    expect(mobileRoot?.className).toContain("px-4")
    expect(
      screen.getByRole("heading", {
        name: "Derivatives built around your NFT account",
      }),
    ).not.toBeNull()
    expect(screen.getByRole("heading", { name: "Key information" })).not.toBeNull()
    expect(screen.getByText("Who Koo is for")).not.toBeNull()
    expect(screen.queryByRole("link", { name: /View the details/i })).toBeNull()
    expect(screen.getByRole("link", { name: "Explore Markets" })).not.toBeNull()
    expect(screen.getByText("Key information")).not.toBeNull()
  })

  it("opens the category sheet and navigates to another topic", () => {
    render(
      <MemoryRouter initialEntries={["/faq/what-is-koo"]}>
        <Routes>
          <Route path="/faq/:topicSlug" element={<FaqMobileRoute />} />
        </Routes>
      </MemoryRouter>,
    )

    fireEvent.click(
      screen.getByRole("button", { name: "Select FAQ category: What is Koo?" }),
    )
    const dialog = screen.getByRole("dialog", { name: "Select a Category" })
    fireEvent.click(within(dialog).getByRole("button", { name: "How to Trade?" }))
    expect(
      screen.getByRole("button", { name: "Select FAQ category: How to Trade?" }),
    ).not.toBeNull()
    expect(screen.getByRole("heading", { name: "How to trade on Koo" })).not.toBeNull()
  })
})
