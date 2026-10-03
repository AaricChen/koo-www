import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { FaqTopicFaq } from "./FaqTopicFaq"

afterEach(() => {
  cleanup()
})

describe("FaqTopicFaq", () => {
  it("matches Figma 5589:64609 container and omits detail links", () => {
    const { container } = render(
      <FaqTopicFaq
        items={[
          {
            id: "a",
            question: "What is Koo?",
            answer: "Hybrid derivatives platform.",
            defaultOpen: true,
          },
          { id: "b", question: "Pending" },
        ]}
      />,
    )

    expect(container.querySelector(".faq-topic-faq")).not.toBeNull()
    expect(container.querySelector('[data-figma-node="5589:64611"]')).not.toBeNull()
    expect(container.querySelectorAll(".faq-topic-faq__question-mark")).toHaveLength(2)
    expect(container.querySelector(".faq-topic-faq__question-text")?.textContent).toBe(
      "What is Koo?",
    )
    expect(screen.getByRole("heading", { name: "FAQ" }).className).toContain(
      "faq-topic-faq__heading",
    )
    expect(screen.queryByRole("link", { name: /View the details/i })).toBeNull()
    expect(screen.getByText("Hybrid derivatives platform.")).not.toBeNull()
  })

  it("animates chevron and panel when toggling", async () => {
    const { container } = render(
      <FaqTopicFaq
        items={[
          {
            id: "a",
            question: "First",
            answer: "Answer one",
            defaultOpen: true,
          },
          { id: "b", question: "Second", answer: "Answer two" },
        ]}
      />,
    )

    const openChevron = container.querySelector(".faq-topic-faq__chevron.is-open")
    expect(openChevron).not.toBeNull()
    expect(container.querySelector(".faq-topic-panel.is-open")).not.toBeNull()

    fireEvent.click(screen.getByRole("button", { name: "First" }))
    await waitFor(() => {
      expect(container.querySelector(".faq-topic-faq__chevron.is-open")).toBeNull()
    })
  })

  it("keeps only the first item open by default and resets after topic items change", () => {
    const firstPage = [
      { id: "a", question: "First", answer: "Answer one" },
      { id: "b", question: "Second", answer: "Answer two" },
      { id: "c", question: "Third", answer: "Answer three" },
    ]
    const secondPage = [
      { id: "x", question: "Other first", answer: "Other answer" },
      { id: "y", question: "Other second", answer: "More" },
    ]

    const { rerender } = render(<FaqTopicFaq items={firstPage} />)

    expect(screen.getByRole("button", { name: "First" }).getAttribute("aria-expanded")).toBe(
      "true",
    )
    expect(screen.getByRole("button", { name: "Second" }).getAttribute("aria-expanded")).toBe(
      "false",
    )
    expect(screen.getByRole("button", { name: "Third" }).getAttribute("aria-expanded")).toBe(
      "false",
    )

    fireEvent.click(screen.getByRole("button", { name: "Second" }))
    expect(screen.getByRole("button", { name: "Second" }).getAttribute("aria-expanded")).toBe(
      "true",
    )

    rerender(<FaqTopicFaq items={secondPage} />)
    expect(
      screen.getByRole("button", { name: "Other first" }).getAttribute("aria-expanded"),
    ).toBe("true")
    expect(
      screen.getByRole("button", { name: "Other second" }).getAttribute("aria-expanded"),
    ).toBe("false")
  })

  it("expands an answered item and ignores items without answers", () => {
    render(
      <FaqTopicFaq
        items={[
          {
            id: "a",
            question: "Answered",
            answer: "Yes",
            defaultOpen: true,
          },
          { id: "b", question: "Pending" },
        ]}
      />,
    )
    expect(screen.getByText("Yes")).not.toBeNull()
    fireEvent.click(screen.getByRole("button", { name: "Pending" }))
    expect(screen.queryByText("Pending answer")).toBeNull()
  })
})
