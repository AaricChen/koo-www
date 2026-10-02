import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { FaqTopicSections } from "./FaqTopicSections"

describe("FaqTopicSections", () => {
  it("renders step titles in Figma secondary blue", () => {
    render(
      <FaqTopicSections
        sections={[
          {
            kind: "paragraphs",
            title: "Step 1 — Connect a wallet",
            paragraphs: ["Body copy."],
            titleVariant: "accent",
          },
        ]}
      />,
    )
    expect(screen.getByRole("heading", { name: "Step 1 — Connect a wallet" }).className).toContain(
      "faq-topic-content__section-title--accent",
    )
  })

  it("renders segmented list parts in Figma secondary blue", () => {
    render(
      <FaqTopicSections
        sections={[
          {
            kind: "list",
            title: "Formula",
            items: [
              {
                kind: "segments",
                parts: [
                  { text: "Fee is " },
                  { text: "0.02%", emphasis: true },
                ],
              },
            ],
          },
        ]}
      />,
    )
    const emphasis = screen.getByText("0.02%")
    expect(emphasis.className).toContain("faq-topic-content__emphasis")
    expect(screen.getByText(/Fee is/)).not.toBeNull()
  })

  it("renders Key information values in Figma secondary blue", () => {
    render(
      <FaqTopicSections
        sections={[
          {
            kind: "list",
            title: "Key information",
            items: [
              { kind: "labeled", label: "Network:", value: "Arbitrum One" },
            ],
          },
        ]}
      />,
    )
    const value = screen.getByText("Arbitrum One")
    expect(value.className).toContain("faq-topic-content__emphasis")
    expect(screen.getByRole("heading", { name: "Key information" }).className).toContain(
      "faq-topic-content__section-title",
    )
  })
})
