import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { FaqMainPanel } from "./FaqMainPanel"

describe("FaqMainPanel", () => {
  it("matches Figma 5589:64587 three-part layout", () => {
    const { container } = render(
      <FaqMainPanel
        headerTitle="What is Koo?"
        title="Topic title"
        intro="Topic intro"
        accordionItems={[
          { id: "a", question: "Q1", answer: "A1", defaultOpen: true },
        ]}
      >
        <p>Custom body</p>
      </FaqMainPanel>,
    )

    expect(container.querySelector(".faq-main-panel")).not.toBeNull()
    const inner = container.querySelector('[data-figma-node="5589:64587"]')
    expect(inner).not.toBeNull()
    expect(inner!.className).toContain("faq-main-panel-inner")
    expect(container.querySelector('[data-figma-node="5632:70289"]')).not.toBeNull()
    expect(container.querySelector('[data-figma-node="5589:64609"]')).not.toBeNull()
    const footer = container.querySelector('[data-figma-node="5570:60149"]')
    expect(footer).not.toBeNull()
    expect(footer!.className).toContain("faq-main-panel-footer")
    expect(container.querySelector(".faq-main-panel-footer__button")).not.toBeNull()
    const aboutLink = screen.getByRole("link", { name: "About Koo" })
    expect(aboutLink.className).toContain("faq-secondary-underline-link")
    expect(aboutLink.className).toContain("faq-secondary-text-14")
    expect(container.querySelectorAll(".faq-main-panel-divider").length).toBe(0)

    const pageTitle = screen.getByRole("heading", { name: "What is Koo?" })
    expect(pageTitle.className).toContain("faq-topic-content__title")
    expect(screen.queryByRole("heading", { name: "Topic title" })).toBeNull()

    const intro = screen.getByText("Topic intro")
    expect(intro.className).toContain("faq-topic-content__description")

    const faqHeading = screen.getByRole("heading", { name: "FAQ" })
    expect(faqHeading.className).toContain("faq-topic-faq__heading")
    expect(screen.queryByRole("link", { name: /View the details/i })).toBeNull()

    expect(screen.getByText("Custom body")).not.toBeNull()
    expect(screen.getByRole("link", { name: "About Koo" })).not.toBeNull()
    expect(screen.getByRole("link", { name: "Explore Markets" })).not.toBeNull()
  })
})
