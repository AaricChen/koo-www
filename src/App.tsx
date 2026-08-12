import { CtaSection } from "./components/home/CtaSection"
import { EdgesSection } from "./components/home/EdgesSection"
import { FeaturesSection } from "./components/home/FeaturesSection"
import { HeroSection } from "./components/home/HeroSection"
import { ProductsSection } from "./components/home/ProductsSection"
import { QuantSection } from "./components/home/QuantSection"
import { SiteFooter } from "./components/home/SiteFooter"
import { TechSection } from "./components/home/TechSection"
import { TokenSection } from "./components/home/TokenSection"
import { WhatIsKooSection } from "./components/home/WhatIsKooSection"

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <main>
        <HeroSection />
        <WhatIsKooSection />
        <FeaturesSection />
        <EdgesSection />
        <ProductsSection />
        <TokenSection />
        <TechSection />
        <QuantSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
