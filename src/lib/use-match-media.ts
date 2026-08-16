import { useEffect, useState } from "react"

export function useMatchMedia(
  query: string,
  defaultMatches = false,
): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return defaultMatches
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const media = window.matchMedia(query)
    const sync = () => setMatches(media.matches)
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [query])

  return matches
}
