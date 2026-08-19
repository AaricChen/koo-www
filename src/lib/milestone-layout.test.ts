import { describe, expect, it } from "vitest"
import {
  MILESTONE_CENTER_GLOW,
  MILESTONE_DESIGN_HEIGHT,
  MILESTONE_LINES,
  MILESTONE_LOGO_HUB,
  MILESTONE_PHASE_FRAMES,
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

describe("milestone lines", () => {
  it("starts every connector at the logo center", () => {
    expect(MILESTONE_LOGO_HUB).toEqual({ x: 720, y: 612 })
    expect(MILESTONE_LINES["phase-1"]?.hub).toEqual(MILESTONE_LOGO_HUB)
    expect(MILESTONE_LINES["phase-2"]?.hub).toEqual(MILESTONE_LOGO_HUB)
    expect(MILESTONE_LINES["phase-3"]?.hub).toEqual(MILESTONE_LOGO_HUB)
    expect(MILESTONE_LINES["phase-4"]?.hub).toEqual(MILESTONE_LOGO_HUB)
    expect(MILESTONE_LINES["phase-1"]?.d.startsWith("M 720 612")).toBe(true)
    expect(MILESTONE_LINES["phase-4"]?.d.startsWith("M 720 612")).toBe(true)
  })

  it("places glow at the shared hub and each title endpoint", () => {
    expect(MILESTONE_LINES["phase-1"]?.dot).toEqual({ x: 330, y: 312 })
    expect(MILESTONE_LINES["phase-4"]?.dot).toEqual({ x: 953, y: 829 })
  })
})

describe("milestone phase frames", () => {
  it("pins every phase to the Figma 1330 canvas", () => {
    expect(MILESTONE_PHASE_FRAMES["phase-1"]).toEqual({
      left: 80,
      top: 296,
      width: 510,
    })
    expect(MILESTONE_PHASE_FRAMES["phase-2"]?.top).toBe(820)
    expect(MILESTONE_PHASE_FRAMES["phase-3"]?.left).toBe(976)
    expect(MILESTONE_PHASE_FRAMES["phase-4"]?.top).toBe(816)
  })
})

describe("milestone center glow", () => {
  it("maps each hover variant to its Figma ellipse asset", () => {
    expect(MILESTONE_CENTER_GLOW["phase-1"]).toContain("center-glow-phase-1.png")
    expect(MILESTONE_CENTER_GLOW["phase-2"]).toContain("center-glow-phase-2.png")
    expect(MILESTONE_CENTER_GLOW["phase-3"]).toContain("center-glow-phase-3.png")
    expect(MILESTONE_CENTER_GLOW["phase-4"]).toContain("center-glow-phase-4.png")
  })
})

describe("milestoneWrapperHeight", () => {
  it("scales the reserved design height and ignores content growth", () => {
    expect(milestoneWrapperHeight(MILESTONE_DESIGN_HEIGHT, 1)).toBe(1330)
    expect(milestoneWrapperHeight(MILESTONE_DESIGN_HEIGHT, 0.5)).toBe(665)
  })
})
