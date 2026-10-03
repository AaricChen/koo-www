import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { describe, expect, it } from "vitest"
import { AppLayout } from "./AppLayout"

describe("AppLayout", () => {
  it("renders header, outlet, and footer once", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<p>Page body</p>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByRole("navigation", { name: "Primary" })).not.toBeNull()
    expect(screen.getByText("Page body")).not.toBeNull()
    expect(screen.getAllByRole("link", { name: "Docs" }).length).toBeGreaterThan(
      0,
    )
  })
})
