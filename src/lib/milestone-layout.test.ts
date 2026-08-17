import { describe, expect, it } from "vitest"
import {
  MILESTONE_LINES,
  asPhaseId,
  milestonePhaseFromPoint,
  milestoneQuadrantAt,
  milestoneWrapperHeight,
} from "./milestone-layout"

describe("milestoneQuadrantAt", () => {
  it("ignores the header band", () => {
    expect(milestoneQuadrantAt(200, 120)).toBeNull()
  })

  it("maps the four canvas quadrants to phases", () => {
    expect(milestoneQuadrantAt(200, 400)).toBe("phase-1")
    expect(milestoneQuadrantAt(200, 900)).toBe("phase-2")
    expect(milestoneQuadrantAt(1100, 400)).toBe("phase-3")
    expect(milestoneQuadrantAt(1100, 900)).toBe("phase-4")
  })
})

describe("asPhaseId", () => {
  it("accepts only the four milestone ids", () => {
    expect(asPhaseId("phase-3")).toBe("phase-3")
    expect(asPhaseId("phase-9")).toBeNull()
  })
})

describe("milestonePhaseFromPoint", () => {
  it("prefers the card under the pointer over the raw quadrant", () => {
    expect(milestonePhaseFromPoint(200, 900, "phase-1")).toBe("phase-1")
    expect(milestonePhaseFromPoint(200, 900, null)).toBe("phase-2")
  })
})

describe("milestone inactive lines", () => {
  it("keeps inactive connectors lower than the focused plate paths", () => {
    expect(MILESTONE_LINES["phase-1"]?.off).toContain("630")
    expect(MILESTONE_LINES["phase-1"]?.on).toContain("500")
    expect(MILESTONE_LINES["phase-3"]?.off).toContain("630")
    expect(MILESTONE_LINES["phase-2"]?.off).toContain("740")
    expect(MILESTONE_LINES["phase-4"]?.off).toContain("740")
  })

  it("places glow only at the hub and title endpoints", () => {
    expect(MILESTONE_LINES["phase-1"]?.hub).toEqual({ x: 700, y: 500 })
    expect(MILESTONE_LINES["phase-1"]?.dot).toEqual({ x: 330, y: 312 })
    expect(MILESTONE_LINES["phase-4"]?.hub).toEqual({ x: 740, y: 680 })
  })
})

describe("milestoneWrapperHeight", () => {
  it("scales the reserved design height and ignores content growth", () => {
    expect(milestoneWrapperHeight(1480, 1)).toBe(1480)
    expect(milestoneWrapperHeight(1480, 0.5)).toBe(740)
  })
})
