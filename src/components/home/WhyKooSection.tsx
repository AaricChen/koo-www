const features = [
  {
    title: "NFT-Account",
    description:
      "Transferable on-chain trading identity with full asset ownership.",
    icon: "/assets/why/nft-account.png",
  },
  {
    title: "Trade with earn",
    description:
      "Idle collateral earns passive yield while available for trading.",
    icon: "/assets/why/trade-earn.png",
  },
  {
    title: "Self-Custody",
    description:
      "Fully on-chain self-custody, secure settlement and risk protection.",
    icon: "/assets/why/self-custody.png",
  },
  {
    title: "High Throughput",
    description:
      "Hybrid matching architecture for ultra-fast, verifiable order execution.",
    icon: "/assets/why/high-throughput.png",
  },
] as const

/** Figma 3170:53036 Rectangle 4 */
const WHY_KOO_PRODUCT_GLOW =
  "linear-gradient(203.01deg, rgba(0, 46, 95, 0.3) 7.13%, rgba(0, 0, 0, 0.5) 51.37%)"

/** Figma 3157:53006 1234 4 */
const WHY_KOO_PRODUCT_WASH =
  "linear-gradient(240.56deg, rgba(136, 136, 136, 0.2) 27.08%, rgba(0, 0, 0, 0.2) 85.26%)"

function ProductFrame({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div
        aria-hidden
        data-why-glow=""
        className="absolute inset-0 overflow-hidden rounded-2xl blur-[28px] [transform:rotate(3deg)_skewX(3deg)]"
        style={{ backgroundImage: WHY_KOO_PRODUCT_GLOW }}
      />
      <div
        aria-hidden
        className="absolute left-[9%] top-[2.6%] h-[79%] w-[90%] rounded-[14px] bg-[rgba(9,9,9,0.6)] [transform:rotate(3deg)_skewX(3deg)]"
      />
      <div
        aria-hidden
        className="absolute left-[4%] top-[4.4%] h-[88%] w-[93%] rounded-[12px] bg-[rgba(29,33,49,0.4)] [transform:rotate(3deg)_skewX(3deg)]"
      />
      <div className="absolute left-[5.9%] top-[6.6%] h-[84%] w-[89%] overflow-hidden rounded-lg [transform:rotate(3deg)_skewX(3deg)]">
        <img
          src="/assets/why/product.png"
          alt=""
          aria-hidden
          className="size-full object-cover object-center"
          width={1728}
          height={1208}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ backgroundImage: WHY_KOO_PRODUCT_WASH }}
        />
      </div>
    </div>
  )
}

export function WhyKooSection() {
  return (
    <section className="relative flex flex-col items-center overflow-x-clip px-4 pb-6 pt-4 sm:px-10 sm:pt-8 lg:px-20 lg:pb-[100px] lg:pt-24">
      <div className="relative w-full max-w-[1280px] pt-[164px] lg:pt-0">
        <ProductFrame className="pointer-events-none absolute top-0 left-1/2 z-0 h-[230px] w-[315px] -translate-x-1/2 lg:hidden" />
        <ProductFrame className="pointer-events-none absolute top-[-67px] right-0 z-0 hidden h-[403px] w-[min(502px,46%)] max-w-full lg:block" />

        <div className="relative z-10 flex flex-col gap-8 lg:gap-20">
          <div className="flex flex-col gap-5 px-0 text-center sm:px-4 lg:max-w-[541px] lg:gap-8 lg:text-left">
            <h2 className="font-display text-2xl font-bold leading-6 text-foreground lg:text-[40px] lg:font-semibold lg:leading-10">
              Why Koo.xyz
            </h2>
            <p className="mx-auto max-w-[509px] text-xs leading-4 text-muted-foreground lg:mx-0 lg:text-base lg:leading-6">
              Koo is an Arbitrum hybrid derivatives platform, combining
              off-chain matching and verifiable on-chain settlement to fix CEX
              & DEX core flaws.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-8">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="flex flex-col items-start gap-3 overflow-hidden rounded-xl bg-[rgba(43,48,72,0.2)] px-3 pb-4 pt-2 backdrop-blur-[15px] lg:gap-4 lg:bg-surface-soft lg:px-5 lg:pb-5"
              >
                <div className="relative size-[76px] shrink-0 overflow-hidden lg:size-[100px]">
                  <img
                    src={feature.icon}
                    alt=""
                    className="size-full object-contain"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex w-full flex-col gap-2.5 lg:gap-3.5">
                  <h3 className="font-display text-base font-semibold leading-5 text-[rgba(250,250,250,0.8)] lg:text-xl lg:text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-xs leading-4 text-faint lg:text-sm lg:leading-5 lg:text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
