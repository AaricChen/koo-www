import { CommunitySection } from "../components/home/CommunitySection"
import { EnterKooSection } from "../components/home/EnterKooSection"
import { FaqSection } from "../components/home/FaqSection"
import { ExclusiveExperienceSection } from "../components/home/ExclusiveExperienceSection"
import { HeroSection } from "../components/home/HeroSection"
import { SiteFooter } from "../components/home/SiteFooter"
import { SiteHeader } from "../components/home/SiteHeader"
import { WhyKooSection } from "../components/home/WhyKooSection"
import { homePageSeo, usePageSeo } from "../lib/seo"

export function HomePage() {
  usePageSeo(homePageSeo)

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <WhyKooSection />
        <ExclusiveExperienceSection />
        <CommunitySection />
        <FaqSection />
        <EnterKooSection />
      </main>
      <SiteFooter />
    </>
  )
}
