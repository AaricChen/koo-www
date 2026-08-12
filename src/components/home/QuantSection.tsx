import { DOCS_URL } from "../../lib/links"
import { OutlineButton } from "../ui/Button"
import { CoreCard, SectionHeader } from "../ui/Cards"

const items = [
  {
    title: "Full Open API & SDK",
    description:
      "Market data, order & position interfaces for all quant frameworks.",
    emphasized: true,
  },
  {
    title: "Maker Rebate Incentive",
    description:
      "Negative trading fees + extra KFC rewards for liquidity providers.",
  },
  {
    title: "Custom Strategy Vault",
    description:
      "Combine margin yield & derivative strategies to boost capital efficiency.",
  },
]

export function QuantSection() {
  return (
    <section className="bg-section-alt flex flex-col items-center gap-12 px-6 py-14 sm:p-20">
      <SectionHeader
        title="For Quant & Market Makers"
        description="Complete dev tools & exclusive liquidity rewards for professional teams."
        className="px-4 sm:px-[60px]"
      />
      <div className="grid w-full max-w-[1280px] gap-5 md:grid-cols-3">
        {items.map((item) => (
          <CoreCard
            key={item.title}
            title={item.title}
            emphasized={item.emphasized}
          >
            {item.description}
          </CoreCard>
        ))}
      </div>
      <div className="flex w-full max-w-[1280px] justify-end">
        <OutlineButton href={DOCS_URL} target="_blank" rel="noreferrer">
          View Docs
        </OutlineButton>
      </div>
    </section>
  )
}
