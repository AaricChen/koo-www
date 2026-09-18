import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { DISCORD_URL, TELEGRAM_URL, X_URL } from "../../lib/links"
import { CommunitySection } from "./CommunitySection"

describe("CommunitySection", () => {
  it("renders desktop community channels with live links", () => {
    render(<CommunitySection />)
    expect(screen.getByRole("heading", { name: "Community" })).not.toBeNull()
    expect(
      screen.getByRole("link", {
        name: "Telegram: Group Chat & Announcements",
      }),
    ).toHaveProperty("href", TELEGRAM_URL)
    expect(
      screen.getByRole("link", {
        name: "Discord: Chat & Community Discussions",
      }),
    ).toHaveProperty("href", DISCORD_URL)
    expect(
      screen.getByRole("link", {
        name: "X (Twitter): News & Real‑time Updates",
      }),
    ).toHaveProperty("href", X_URL)
    expect(document.body.innerHTML).toContain("/assets/community/qr-tg.png")
    expect(document.body.innerHTML).toContain("community-card-qr")
  })
})
