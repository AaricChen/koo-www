import { APP_URL } from "../../lib/links"
import { GradientButton } from "../ui/Button"

export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[809px] items-center justify-center overflow-hidden px-6 pb-24 pt-20 sm:px-10 lg:px-20">
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/assets/hero-bg.png"
          alt=""
          className="size-full object-cover opacity-30"
        />
      </div>

      <div className="relative z-10 flex w-full max-w-[1050px] flex-col items-center gap-9">
        <div className="animate-fade-in relative size-[140px] sm:size-[180px]">
          <img
            src="/assets/hero-logo.png"
            alt="Koo"
            className="animate-logo-glow absolute inset-0 size-full object-cover mix-blend-soft-light"
            width={180}
            height={177}
          />
          <img
            src="/assets/hero-logo.png"
            alt=""
            aria-hidden
            className="absolute inset-0 mt-[3px] size-full object-cover mix-blend-lighten"
            width={180}
            height={177}
          />
        </div>

        <div className="animate-fade-up flex w-full flex-col items-center gap-14 text-center [animation-delay:120ms]">
          <div className="flex max-w-[760px] flex-col items-center gap-7 px-4">
            <h1 className="font-display max-w-[526px] text-[36px] font-semibold leading-tight text-foreground sm:text-[52px] sm:leading-[57px]">
              Portable Accounts, Productive Capital.
            </h1>
            <p className="text-base leading-[28px] text-muted-foreground sm:text-xl sm:leading-[30px]">
              Professional event contract trading powered by NFT on-chain
              accounts, yield-earning margin funds and KFC token holder revenue
              sharing.
            </p>
          </div>
          <GradientButton href={APP_URL} target="_blank" rel="noreferrer">
            Start Trading
          </GradientButton>
        </div>
      </div>
    </section>
  )
}
