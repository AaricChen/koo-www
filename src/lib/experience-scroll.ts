export const EXPERIENCE_ANIM_LOCK_MS = 420

export function shouldAcceptExperienceIndexChange(
  now: number,
  lockUntil: number,
): boolean {
  return now >= lockUntil
}

export function nextExperienceIndexFromRects({
  goingDown,
  zoneTop,
  zoneBottom,
  rects,
  prev,
}: {
  goingDown: boolean
  zoneTop: number
  zoneBottom: number
  rects: Array<{ top: number; bottom: number } | null>
  prev: number
}): number {
  if (rects.length === 0) return prev

  if (goingDown) {
    let next = 0
    for (let i = 0; i < rects.length; i++) {
      const rect = rects[i]
      if (!rect) continue
      if (rect.top <= zoneBottom) next = i
    }
    return next
  }

  let next = Math.max(rects.length - 1, 0)
  for (let i = 0; i < rects.length; i++) {
    const rect = rects[i]
    if (!rect) continue
    if (rect.bottom >= zoneTop) {
      next = i
      break
    }
  }
  return next
}
