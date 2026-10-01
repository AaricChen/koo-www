import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { FaqTopicSections } from "./FaqTopicSections"

describe("FaqTopicSections", () => {
  it("renders Key information values in Figma secondary blue", () => {
    render(
      <FaqTopicSections
        intro="Intro"
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
    expect(value.className).toContain("text-secondary")
    const label = screen.getByText("Network:")
    expect(label.className).toContain("text-muted-foreground")
  })
})
