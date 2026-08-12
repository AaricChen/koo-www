import { CoreCard, SectionHeader } from "../ui/Cards"

const features = [
  {
    title: "Portable NFT Accounts",
    description:
      "NFT-based trading identity, full asset ownership, withdraw via smart contracts even if backend fails.",
  },
  {
    title: "Yield-Bearing Margin",
    description:
      "Idle USDC auto-lend for 3%-5% annual return, trade & earn simultaneously.",
  },
  {
    title: "Event Contracts",
    description:
      "Multi-asset derivatives with oracle fair price, all settlement on-chain verifiable.",
    emphasized: true,
  },
  {
    title: "Pro Trading Terminal",
    description:
      "Millisecond matching, continuous risk model, full orders & open quant API.",
  },
  {
    title: "KFC Dividend",
    description:
      "Hold tokens to share platform trading fees, get discount & DAO voting rights.",
  },
]

export function FeaturesSection() {
  return (
    <section className="flex flex-col items-center gap-12 bg-background px-6 py-14 sm:p-20">
      <SectionHeader
        title="5 Core User-Centric Features"
        description="Solve major trading pain points for retail, quant traders and market makers."
        className="px-4 sm:px-10"
      />
      <div className="grid w-full max-w-[1280px] gap-5 sm:grid-cols-2 xl:grid-cols-5">
        {features.map((feature) => (
          <CoreCard
            key={feature.title}
            title={feature.title}
            emphasized={feature.emphasized}
          >
            {feature.description}
          </CoreCard>
        ))}
      </div>
    </section>
  )
}
