import { CoreCard, SectionHeader } from "../ui/Cards"

const benefits = [
  {
    title: "Auto Fee Dividends",
    description:
      "All trading fees pooled and distributed to token holders regularly.",
    emphasized: true,
  },
  {
    title: "Trading Discount",
    description:
      "Tiered fee reduction for KFC holders to cut trading cost.",
  },
  {
    title: "DAO Governance",
    description: "Vote for new pairs, risk rules & product upgrades.",
  },
]

export function TokenSection() {
  return (
    <section className="bg-section-alt flex flex-col items-center gap-12 px-6 py-14 sm:p-20">
      <SectionHeader
        title="KFC Token User Benefits"
        description="Passive income & governance rights simply by holding tokens."
        className="px-4 sm:px-[60px]"
      />
      <div className="flex w-full max-w-[1280px] flex-col gap-10">
        <div className="grid gap-5 md:grid-cols-3">
          {benefits.map((benefit) => (
            <CoreCard
              key={benefit.title}
              title={benefit.title}
              emphasized={benefit.emphasized}
            >
              {benefit.description}
            </CoreCard>
          ))}
        </div>
        <p className="text-center text-sm leading-[14px] text-faint">
          Token Buyback & Burn: Platform revenue repurchases KFC to stabilize
          long-term value.
        </p>
      </div>
    </section>
  )
}
