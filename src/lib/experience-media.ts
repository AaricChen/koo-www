export function shouldPlayExperienceVideo({
  isActive,
  sectionVisible,
  reducedMotion,
  compactLayout = false,
  cardVisible = false,
}: {
  isActive: boolean
  sectionVisible: boolean
  reducedMotion: boolean
  compactLayout?: boolean
  cardVisible?: boolean
}): boolean {
  if (reducedMotion) return false
  if (compactLayout) return cardVisible
  return isActive && sectionVisible
}

export function shouldHideExperienceUnderFromAT({
  isActive,
  compactLayout,
}: {
  isActive: boolean
  compactLayout: boolean
}): boolean {
  if (compactLayout) return false
  return !isActive
}

export function isExperienceActivateKey(key: string): boolean {
  return key === "Enter" || key === " "
}
