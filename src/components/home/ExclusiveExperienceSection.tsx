const features = [
  {
    title: "Transferable Account Ownership",
    description:
      "Own and freely transfer your trading account as an on-chain NFT.",
    tags: [
      "Transferable Ownership",
      "On-chain Identity",
      "Asset Tokenization",
    ],
    image: "/assets/experience/ownership.png",
    imageAlt: "NFT transferable account illustration",
    imageFirst: false,
    textPadClass: "lg:pt-[26px]",
    titleClass: "max-w-[300px]",
    copyClass: "lg:w-[527px]",
  },
  {
    title: "Yield-Generating Margin Capital",
    description:
      "Idle collateral generates passive income while ready for trading.",
    tags: ["Idle Yield", "Capital Appreciation", "Margin Earnings"],
    image: "/assets/experience/yield.png",
    imageAlt: "Yield-generating margin capital illustration",
    imageFirst: true,
    textPadClass: "lg:pt-[46px]",
    titleClass: "max-w-[300px]",
    copyClass: "lg:w-[513px]",
  },
  {
    title: "Event Futures",
    description:
      "Trade every event on-chain. Sport matches, CEX market share, political and economic events etc..",
    tags: ["Trade Everything"],
    image: "/assets/experience/futures.png",
    imageAlt: "Event futures trading illustration",
    imageFirst: false,
    textPadClass: "lg:pt-[54px]",
    titleClass: "max-w-[300px]",
    copyClass: "lg:w-[514px]",
  },
  {
    title: "Profit Sharing for KFC Holders",
    description:
      "Get proportional platform revenue dividends via KFC token holdings.",
    tags: [
      "Pro-rata Dividends",
      "Holder Rewards",
      "DAO Governance",
      "Revenue Sharing",
    ],
    image: "/assets/experience/profit.png",
    imageAlt: "KFC profit sharing illustration",
    imageFirst: true,
    textPadClass: "lg:pt-[46px]",
    titleClass: "max-w-[263px]",
    copyClass: "lg:w-[629px]",
  },
] as const

function FeatureTag({ label }: { label: string }) {
  return (
    <span className="inline-flex h-[34px] shrink-0 items-center rounded-[18px] border border-[#3d7aff] bg-[rgba(61,122,255,0.06)] px-3.5 text-sm leading-[14px] text-secondary">
      {label}
    </span>
  )
}

export function ExclusiveExperienceSection() {
  return (
    <section className="bg-section-alt flex flex-col items-center gap-[72px] px-6 pb-20 pt-14 sm:gap-[100px] sm:px-10 sm:pb-[140px] sm:pt-[100px] lg:gap-[120px] lg:px-20">
      <div className="w-full max-w-[1280px] px-0 text-center sm:px-10">
        <h2 className="font-display text-[28px] font-bold leading-9 text-foreground sm:text-[40px] sm:leading-10">
          The Koo Exclusive Experience
        </h2>
      </div>

      <div className="flex w-full max-w-[1280px] flex-col gap-16 sm:gap-24 lg:gap-[140px]">
        {features.map((feature) => (
          <article
            key={feature.title}
            className={`flex flex-col gap-8 lg:h-[280px] lg:flex-row lg:items-start lg:justify-between ${
              feature.imageFirst ? "lg:pl-6 lg:pr-4" : "lg:pl-4 lg:pr-6"
            }`}
          >
            <div
              className={`flex w-full flex-col gap-8 ${feature.copyClass} ${feature.textPadClass} ${
                feature.imageFirst ? "lg:order-2" : "lg:order-1"
              }`}
            >
              <h3
                className={`font-display text-[26px] font-semibold leading-9 text-foreground sm:text-[32px] sm:leading-10 ${feature.titleClass}`}
              >
                {feature.title}
              </h3>
              <div className="flex flex-col gap-[18px]">
                <p className="max-w-[544px] text-base leading-6 text-muted-foreground">
                  {feature.description}
                </p>
                <div className="flex flex-wrap content-start gap-3">
                  {feature.tags.map((tag) => (
                    <FeatureTag key={tag} label={tag} />
                  ))}
                </div>
              </div>
            </div>

            <div
              className={`relative aspect-[485/280] w-full max-w-[485px] shrink-0 overflow-hidden rounded-[20px] shadow-[-12px_12px_27.9px_rgba(2,12,21,0.4)] lg:aspect-auto lg:h-[280px] lg:w-[485px] ${
                feature.imageFirst ? "lg:order-1" : "lg:order-2"
              }`}
            >
              <img
                src={feature.image}
                alt={feature.imageAlt}
                className="size-full object-cover object-center"
                width={485}
                height={280}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_16px_16px_16px_rgba(0,0,0,0.4)]"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
