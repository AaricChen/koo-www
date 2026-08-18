import type { PhaseId } from "./milestone-phases"

export const MILESTONE_DESIGN_WIDTH = 1440
export const MILESTONE_DESIGN_HEIGHT = 1330
export const MILESTONE_HEADER_MAX_Y = 240
export const MILESTONE_QUAD_SPLIT_Y = 780

export const MILESTONE_PHASE_FRAMES: Record<
  PhaseId,
  { left: number; top: number; width: number }
> = {
  "phase-1": { left: 80, top: 296, width: 510 },
  "phase-2": { left: 82, top: 820, width: 431 },
  "phase-3": { left: 976, top: 296, width: 381 },
  "phase-4": { left: 976, top: 816, width: 372 },
}

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

/** Center of the 325×280 logo frame at (558, 472). */
export const MILESTONE_LOGO_HUB = { x: 720, y: 612 } as const

export type MilestoneLineSpec = {
  /** Hub (logo center) → title. On/off share geometry; only stroke style changes. */
  d: string
  hub: { x: number; y: number }
  dot: { x: number; y: number }
}

export const MILESTONE_LINES: Record<PhaseId, MilestoneLineSpec> = {
  "phase-1": {
    d: "M 720 612 L 533 312 H 330",
    hub: MILESTONE_LOGO_HUB,
    dot: { x: 330, y: 312 },
  },
  "phase-2": {
    d: "M 720 612 L 536 840 H 372",
    hub: MILESTONE_LOGO_HUB,
    dot: { x: 372, y: 840 },
  },
  "phase-3": {
    d: "M 720 612 L 847 312 H 961",
    hub: MILESTONE_LOGO_HUB,
    dot: { x: 961, y: 312 },
  },
  "phase-4": {
    d: "M 720 612 L 828 829 H 953",
    hub: MILESTONE_LOGO_HUB,
    dot: { x: 953, y: 829 },
  },
}
