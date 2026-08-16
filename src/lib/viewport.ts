export const LG_MIN_WIDTH_PX = 1024
export const LG_MIN_WIDTH_QUERY = `(min-width: ${LG_MIN_WIDTH_PX}px)`

export function isLgViewport(width: number): boolean {
  return width >= LG_MIN_WIDTH_PX
}
