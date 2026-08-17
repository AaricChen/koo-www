import type { PhaseId } from "./milestone-phases"

export const MILESTONE_DESIGN_WIDTH = 1440
export const MILESTONE_DESIGN_HEIGHT = 1480
export const MILESTONE_HEADER_MAX_Y = 240
export const MILESTONE_QUAD_SPLIT_Y = 640

/** Wrapper height is reserved from the design canvas, not content scrollHeight. */
export function milestoneWrapperHeight(
  designHeight: number,
  scale: number,
): number {
  return designHeight * scale
}

export function milestoneQuadrantAt(x: number, y: number): PhaseId | null {
  if (
    x < 0 ||
    y < MILESTONE_HEADER_MAX_Y ||
    x > MILESTONE_DESIGN_WIDTH ||
    y > MILESTONE_DESIGN_HEIGHT
  ) {
    return null
  }

  const left = x < MILESTONE_DESIGN_WIDTH / 2
  const top = y < MILESTONE_QUAD_SPLIT_Y
  if (left) return top ? "phase-1" : "phase-2"
  return top ? "phase-3" : "phase-4"
}

const PHASE_IDS: readonly PhaseId[] = [
  "phase-1",
  "phase-2",
  "phase-3",
  "phase-4",
]

export function asPhaseId(value: string | null | undefined): PhaseId | null {
  return PHASE_IDS.find((id) => id === value) ?? null
}

export function milestonePhaseFromPoint(
  x: number,
  y: number,
  cardPhaseId: PhaseId | null,
): PhaseId | null {
  return cardPhaseId ?? milestoneQuadrantAt(x, y)
}

export type MilestoneLineSpec = {
  /** Hub → title. Starts at the stack so CSS can draw the line outward. */
  on: string
  off: string
  hub: { x: number; y: number }
  dot: { x: number; y: number }
}

/** Focused paths attach higher on the plate stack than the dashed rest paths. */
export const MILESTONE_LINES: Record<PhaseId, MilestoneLineSpec> = {
  "phase-1": {
    on: "M 700 500 H 620 L 450 312 H 330",
    off: "M 700 630 H 620 L 450 312 H 330",
    hub: { x: 700, y: 500 },
    dot: { x: 330, y: 312 },
  },
  "phase-2": {
    on: "M 700 680 H 620 L 450 880 H 330",
    off: "M 700 740 H 620 L 450 880 H 330",
    hub: { x: 700, y: 680 },
    dot: { x: 330, y: 880 },
  },
  "phase-3": {
    on: "M 740 500 H 820 L 900 312 H 990",
    off: "M 740 630 H 820 L 900 312 H 990",
    hub: { x: 740, y: 500 },
    dot: { x: 990, y: 312 },
  },
  "phase-4": {
    on: "M 740 680 H 820 L 900 880 H 990",
    off: "M 740 740 H 820 L 900 880 H 990",
    hub: { x: 740, y: 680 },
    dot: { x: 990, y: 880 },
  },
}
