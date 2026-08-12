import { SectionHeader } from "../ui/Cards"

const products = [
  {
    title: "Crypto Perpetuals",
    description: "BTC / ETH / SOL mainstream pairs",
  },
  {
    title: "Precious Metals",
    description: "Gold & Silver RWA contracts",
  },
  {
    title: "Energy Assets",
    description: "Crude Oil, Natural Gas",
  },
  {
    title: "US Equity RWA",
    description: "Index & blue-chip stocks",
  },
  {
    title: "Special Events",
    description: "Macro & sports contracts",
  },
]

export function ProductsSection() {
  return (
    <section className="flex flex-col items-center gap-12 bg-background px-6 py-14 sm:p-20">
      <SectionHeader
        title="Trade All Types of Event Contracts"
        description="Diversified trading products covering crypto, commodity, RWA traditional financial assets and special event derivatives."
        className="px-4 sm:px-10"
      />
      <div className="flex w-full max-w-[1280px] flex-col items-stretch gap-6 sm:flex-row sm:items-center sm:justify-center sm:gap-0">
        {products.map((product, index) => (
          <div key={product.title} className="contents">
            <article className="flex flex-1 flex-col items-center gap-4 rounded-md px-4 py-5 text-center">
              <div className="size-12 overflow-hidden">
                <img
                  src="/assets/icon-dot.svg"
                  alt=""
                  className="size-full"
                  width={48}
                  height={48}
                />
              </div>
              <h3 className="font-display text-lg font-semibold leading-6 text-foreground">
                {product.title}
              </h3>
              <p className="text-sm leading-5 text-muted-foreground">
                {product.description}
              </p>
            </article>
            {index < products.length - 1 ? (
              <div
                aria-hidden
                className="mx-auto hidden h-16 w-px shrink-0 bg-border sm:mx-2 sm:block"
              />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}
