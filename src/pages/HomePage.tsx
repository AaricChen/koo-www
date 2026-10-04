import { CommunitySection } from "../components/home/CommunitySection"
import { EnterKooSection } from "../components/home/EnterKooSection"
import { FaqSection } from "../components/home/FaqSection"
import { ExclusiveExperienceSection } from "../components/home/ExclusiveExperienceSection"
import { HeroSection } from "../components/home/HeroSection"
import { WhyKooSection } from "../components/home/WhyKooSection"
import { homePageSeo, usePageSeo } from "../lib/seo"

/** Page body for CSR and build-time prerender (no SEO side effects). */
export function HomePageMain() {
  return (
    <main data-koo-prerender="home">
      <HeroSection />
      <WhyKooSection />
      <ExclusiveExperienceSection />
      <CommunitySection />
      <FaqSection />
      <EnterKooSection />
    </main>
  )
}

export function HomePage() {
  usePageSeo(homePageSeo)

  return <HomePageMain />
}
