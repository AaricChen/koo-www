import { useEffect } from "react"
import { useLocation } from "react-router-dom"

/** Reset window scroll on in-app navigation (e.g. home FAQ → topic, sidebar topic switch). */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
