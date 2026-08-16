import { describe, expect, it } from "vitest"
import {
  EXPERIENCE_ANIM_LOCK_MS,
  nextExperienceIndexFromRects,
  shouldAcceptExperienceIndexChange,
  shouldBindExperienceScrollSpy,
} from "./experience-scroll"

const rects = [
  { top: 100, bottom: 300 },
  { top: 400, bottom: 600 },
  { top: 700, bottom: 900 },
]

describe("nextExperienceIndexFromRects", () => {
  it("selects the last item whose top has crossed the lower zone when scrolling down", () => {
    expect(
      nextExperienceIndexFromRects({
        goingDown: true,
        zoneTop: 400,
        zoneBottom: 600,
        rects,
        prev: 0,
      }),
    ).toBe(1)
  })

  it("selects the first item whose bottom is still below the upper zone when scrolling up", () => {
    expect(
      nextExperienceIndexFromRects({
        goingDown: false,
        zoneTop: 400,
        zoneBottom: 600,
        rects,
        prev: 2,
      }),
    ).toBe(1)
  })

  it("keeps prev when there are no rects", () => {
    expect(
      nextExperienceIndexFromRects({
        goingDown: true,
        zoneTop: 400,
        zoneBottom: 600,
        rects: [],
        prev: 2,
      }),
    ).toBe(2)
  })
})

describe("shouldBindExperienceScrollSpy", () => {
  it("does not bind the desktop mid-zone spy on the compact stack", () => {
    expect(shouldBindExperienceScrollSpy(true)).toBe(false)
    expect(shouldBindExperienceScrollSpy(false)).toBe(true)
  })
})

describe("shouldAcceptExperienceIndexChange", () => {
  it("blocks changes while the enter/exit animation lock is held", () => {
    expect(shouldAcceptExperienceIndexChange(100, 100 + EXPERIENCE_ANIM_LOCK_MS)).toBe(
      false,
    )
    expect(shouldAcceptExperienceIndexChange(100 + EXPERIENCE_ANIM_LOCK_MS, 100)).toBe(
      true,
    )
  })
})
