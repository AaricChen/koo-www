export function shouldPlayExperienceVideo({
  isActive,
  sectionVisible,
  reducedMotion,
}: {
  isActive: boolean
  sectionVisible: boolean
  reducedMotion: boolean
}): boolean {
  return isActive && sectionVisible && !reducedMotion
}

export function isExperienceActivateKey(key: string): boolean {
  return key === "Enter" || key === " "
}
