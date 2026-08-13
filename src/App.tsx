import { ExclusiveExperienceSection } from "./components/home/ExclusiveExperienceSection"
import { HeroSection } from "./components/home/HeroSection"
import { SiteHeader } from "./components/home/SiteHeader"
import { WhyKooSection } from "./components/home/WhyKooSection"

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="mx-auto w-full max-w-[1440px]">
        <SiteHeader />
        <main>
          <HeroSection />
          <WhyKooSection />
          <ExclusiveExperienceSection />
        </main>
      </div>
    </div>
  )
}

export default App
