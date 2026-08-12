import { CoreCard, SectionHeader } from "../ui/Cards"

const pillars = [
  "Transferable NFT trading accounts",
  "Auto-yield passive margin income",
  "Multi-class event derivatives",
  "Low-latency open API tools",
  "KFC fee dividends & DAO rights",
]

export function WhatIsKooSection() {
  return (
    <section className="bg-section-alt flex flex-col items-center gap-12 px-6 py-14 sm:px-10 sm:py-[60px] lg:px-20">
      <div className="flex w-full max-w-[1280px] flex-col items-center gap-10 px-0 sm:px-[60px]">
        <SectionHeader
          title="What Is Koo?"
          description="Koo is an Arbitrum hybrid derivatives platform, combining off-chain matching and verifiable on-chain settlement to fix CEX & DEX core flaws."
        />
        <div className="h-px w-full overflow-hidden">
          <img
            src="/assets/divider-h.svg"
            alt=""
            className="block size-full min-h-px"
          />
        </div>
      </div>

      <div className="flex w-full max-w-[1280px] flex-col items-start gap-9 lg:flex-row">
        <div className="relative mx-auto h-[280px] w-full max-w-[314px] shrink-0 overflow-hidden sm:h-[328px]">
          <img
            src="/assets/what-is-koo.png"
            alt="Koo platform illustration"
            className="absolute left-[-12%] top-[-26%] h-[128%] w-[124%] max-w-none object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-7">
          <div className="flex flex-col gap-5">
            <CoreCard title="Core Positioning" className="bg-transparent">
              High-efficiency on-chain infrastructure integrating NFT accounts,
              auto-yield margin and KFC revenue sharing in one system.
            </CoreCard>

            <div className="grid gap-5 lg:grid-cols-[minmax(0,476px)_minmax(0,1fr)]">
              <CoreCard title="Five Core Value Pillars" className="bg-transparent">
                <ol className="list-decimal space-y-0 pl-[21px]">
                  {pillars.map((item) => (
                    <li key={item} className="leading-5">
                      {item}
                    </li>
                  ))}
                </ol>
              </CoreCard>
              <CoreCard
                title="Exclusive Tech Advantages"
                className="bg-transparent"
              >
                Offline asset withdrawal, smooth dynamic risk control, native
                Arbitrum DeFi compatibility, all data auditable on-chain.
              </CoreCard>
            </div>
          </div>

          <p className="text-sm leading-[22px] text-muted-foreground">
            We combine institutional trading performance and decentralized
            ownership for a user-sharing derivatives ecosystem.
          </p>
        </div>
      </div>
    </section>
  )
}
