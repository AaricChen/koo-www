import { DevelopmentMilestonesSection } from "./components/home/DevelopmentMilestonesSection"
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
        <DevelopmentMilestonesSection />
        <EnterKooSection />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
