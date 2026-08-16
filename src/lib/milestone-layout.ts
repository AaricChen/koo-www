export const MILESTONE_DESIGN_WIDTH = 1440
export const MILESTONE_DESIGN_HEIGHT = 1480

/** Wrapper height is reserved from the design canvas, not content scrollHeight. */
export function milestoneWrapperHeight(
  designHeight: number,
  scale: number,
): number {
  return designHeight * scale
}
