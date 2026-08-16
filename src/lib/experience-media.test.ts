import { describe, expect, it } from "vitest"
import {
  isExperienceActivateKey,
  shouldHideExperienceUnderFromAT,
  shouldPlayExperienceVideo,
} from "./experience-media"
import { milestoneWrapperHeight } from "./milestone-layout"

describe("shouldPlayExperienceVideo", () => {
  it("plays only the active clip when the section is on screen and motion is allowed", () => {
    expect(
      shouldPlayExperienceVideo({
        isActive: true,
        sectionVisible: true,
        reducedMotion: false,
      }),
    ).toBe(true)
  })

  it("does not play off-screen, inactive desktop, or reduced-motion clips", () => {
    expect(
      shouldPlayExperienceVideo({
        isActive: true,
        sectionVisible: false,
        reducedMotion: false,
      }),
    ).toBe(false)
    expect(
      shouldPlayExperienceVideo({
        isActive: false,
        sectionVisible: true,
        reducedMotion: false,
      }),
    ).toBe(false)
    expect(
      shouldPlayExperienceVideo({
        isActive: true,
        sectionVisible: true,
        reducedMotion: true,
      }),
    ).toBe(false)
  })

  it("plays a stacked clip only when that card is on screen", () => {
    expect(
      shouldPlayExperienceVideo({
        isActive: false,
        sectionVisible: true,
        reducedMotion: false,
        compactLayout: true,
        cardVisible: false,
      }),
    ).toBe(false)
    expect(
      shouldPlayExperienceVideo({
        isActive: false,
        sectionVisible: true,
        reducedMotion: false,
        compactLayout: true,
        cardVisible: true,
      }),
    ).toBe(true)
  })
})

describe("shouldHideExperienceUnderFromAT", () => {
  it("keeps stacked mobile copy in the accessibility tree", () => {
    expect(
      shouldHideExperienceUnderFromAT({
        isActive: false,
        compactLayout: true,
      }),
    ).toBe(false)
    expect(
      shouldHideExperienceUnderFromAT({
        isActive: false,
        compactLayout: false,
      }),
    ).toBe(true)
  })
})

describe("isExperienceActivateKey", () => {
  it("treats Enter and Space as activation keys", () => {
    expect(isExperienceActivateKey("Enter")).toBe(true)
    expect(isExperienceActivateKey(" ")).toBe(true)
    expect(isExperienceActivateKey("Tab")).toBe(false)
    expect(isExperienceActivateKey("Escape")).toBe(false)
  })
})

describe("milestoneWrapperHeight", () => {
  it("scales the reserved design height and ignores content growth", () => {
    expect(milestoneWrapperHeight(1480, 1)).toBe(1480)
    expect(milestoneWrapperHeight(1480, 0.5)).toBe(740)
  })
})
