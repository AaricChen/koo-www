import { Outlet } from "react-router-dom"
import { SiteFooter } from "../components/home/SiteFooter"
import { SiteHeader } from "../components/home/SiteHeader"
import { ScrollToTop } from "./ScrollToTop"

export function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </>
  )
}
