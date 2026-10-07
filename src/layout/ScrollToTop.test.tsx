import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes, Link } from "react-router-dom"
import { afterEach, describe, expect, it, vi } from "vitest"
import { ScrollToTop } from "./ScrollToTop"

afterEach(() => {
  vi.restoreAllMocks()
})

describe("ScrollToTop", () => {
  it("scrolls to top when the pathname changes", () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {})

    render(
      <MemoryRouter initialEntries={["/"]}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Link to="/faq/what-is-koo">Details</Link>} />
          <Route path="/faq/:slug" element={<p>FAQ topic</p>} />
        </Routes>
      </MemoryRouter>,
    )

    expect(scrollTo).toHaveBeenCalledWith(0, 0)
    scrollTo.mockClear()

    fireEvent.click(screen.getByRole("link", { name: "Details" }))

    expect(screen.getByText("FAQ topic")).not.toBeNull()
    expect(scrollTo).toHaveBeenCalledWith(0, 0)
  })
})
