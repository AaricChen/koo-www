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

export function WhyKooSection() {
  return (
    <section className="relative flex flex-col items-center overflow-x-clip px-6 pb-[60px] pt-14 sm:px-10 sm:pb-[100px] sm:pt-20 lg:px-20">
      {/* Figma Frame 100 — 1280×442 content */}
      <div className="relative w-full max-w-[1280px]">
        {/* Group 5 — exact Figma box: 501.98×402.88 @ (757.96, -67) */}
        <div className="pointer-events-none absolute top-[-67px] left-[758px] z-0 hidden h-[403px] w-[502px] lg:block">
          <img
            src="/assets/why/product.png"
            alt=""
            aria-hidden
            className="size-full object-cover object-center"
            width={502}
            height={403}
          />
        </div>

        <div className="relative z-10 flex flex-col gap-12 sm:gap-20">
          <div className="flex flex-col gap-8 px-0 sm:px-4 lg:max-w-[541px]">
            <h2 className="font-display text-[32px] font-semibold leading-10 text-foreground sm:text-[40px]">
              Why Koo.xyz
            </h2>
            <p className="max-w-[509px] text-base leading-6 text-muted-foreground">
              Koo is an Arbitrum hybrid derivatives platform, combining
              off-chain matching and verifiable on-chain settlement to fix CEX
              & DEX core flaws.
            </p>
          </div>

          {/* Mobile / tablet product — shown when absolute desktop placement is off */}
          <div className="relative mx-auto aspect-[502/403] w-full max-w-[502px] lg:hidden">
            <img
              src="/assets/why/product.png"
              alt="Koo trading interface"
              className="size-full object-cover object-center"
              width={502}
              height={403}
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-8">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="flex flex-col items-start gap-4 rounded-xl bg-surface-soft px-5 pb-5 pt-2 backdrop-blur-[15px]"
              >
                <div className="relative size-[100px] shrink-0 overflow-hidden">
                  <img
                    src={feature.icon}
                    alt=""
                    className="size-full object-contain"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex w-full flex-col gap-3.5">
                  <h3 className="font-display text-xl font-semibold leading-5 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-5 text-muted-foreground">
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
