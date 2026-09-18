import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { DISCORD_URL, TELEGRAM_URL, X_URL } from "../../lib/links"
import { CommunitySection } from "./CommunitySection"

describe("CommunitySection", () => {
  it("renders mobile and desktop community channels with live links", () => {
    render(<CommunitySection />)
    expect(screen.getByRole("heading", { name: "Community" })).not.toBeNull()
    const telegram = screen.getAllByRole("link", {
      name: "Telegram: Group Chat & Announcements",
    })
    expect(telegram.length).toBeGreaterThanOrEqual(1)
    for (const link of telegram) {
      expect(link).toHaveProperty("href", TELEGRAM_URL)
    }
    const discord = screen.getAllByRole("link", {
      name: "Discord: Chat & Community Discussions",
    })
    expect(discord.length).toBeGreaterThanOrEqual(1)
    for (const link of discord) {
      expect(link).toHaveProperty("href", DISCORD_URL)
    }
    const xLink = screen.getAllByRole("link", {
      name: "X (Twitter): News & Real‑time Updates",
    })
    expect(xLink.length).toBeGreaterThanOrEqual(1)
    for (const link of xLink) {
      expect(link).toHaveProperty("href", X_URL)
    }
    expect(document.body.innerHTML).toContain("bg-mobile.png")
    expect(document.body.innerHTML).toContain("arrow-mobile.svg")
    expect(document.body.innerHTML).toContain("/assets/community/qr-tg.png")
    expect(document.body.innerHTML).toContain("community-card-qr")
  })
})
