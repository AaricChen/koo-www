import { InfoCard, SectionHeader } from "../ui/Cards"

const layers = [
  {
    title: "Front Access Layer",
    description:
      "Web/mobile UI, full quant API & referral rebate system.",
  },
  {
    title: "Off-Chain Matching Engine",
    description:
      "Real-time risk calculation & maker negative fee incentive.",
  },
  {
    title: "On-Chain Settlement",
    description:
      "Full custody, DeFi vaults, multi-stage liquidation & insurance. All data verifiable on Arbitrum.",
  },
  {
    title: "On-Chain Asset Proof",
    description: "All balance & yield records open for public verification.",
  },
  {
    title: "Third-Party Audit",
    description: "All core contracts audited before official launch.",
  },
  {
    title: "Multi-Tier Insurance",
    description:
      "Independent vault covers extreme market liquidation loss.",
  },
]

export function TechSection() {
  return (
    <section className="flex flex-col items-center gap-12 bg-background px-6 py-14 sm:p-20">
      <SectionHeader
        title="Tech & Security System"
        description="Three-layer hybrid structure with audited smart contracts & multi-risk protection."
        className="px-4 sm:px-10"
      />
      <div className="grid w-full max-w-[1280px] gap-5 md:grid-cols-3">
        {layers.map((layer) => (
          <InfoCard
            key={layer.title}
            title={layer.title}
            description={layer.description}
            iconSrc="/assets/icon-dot-cyan.svg"
          />
        ))}
      </div>
    </section>
  )
}
