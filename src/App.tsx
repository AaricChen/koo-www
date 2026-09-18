import { Analytics } from "@vercel/analytics/react"
import { CommunitySection } from "./components/home/CommunitySection"
import { EnterKooSection } from "./components/home/EnterKooSection"
import { ExclusiveExperienceSection } from "./components/home/ExclusiveExperienceSection"
import { HeroSection } from "./components/home/HeroSection"
import { SiteFooter } from "./components/home/SiteFooter"
import { SiteHeader } from "./components/home/SiteHeader"
import { WhyKooSection } from "./components/home/WhyKooSection"

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <HeroSection />
        <WhyKooSection />
        <ExclusiveExperienceSection />
        <CommunitySection />
        <EnterKooSection />
      </main>
      <SiteFooter />
      <Analytics />
    </div>
  )
}

export default App
