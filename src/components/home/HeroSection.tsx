import { APP_URL } from "../../lib/links"
import { GradientButton } from "../ui/Button"
import { BackgroundVideo } from "./BackgroundVideo"

export function HeroSection() {
  return (
    <section className="relative isolate -mt-20 flex min-h-[640px] items-center justify-center overflow-hidden px-6 pb-16 pt-28 sm:min-h-[809px] sm:px-10 sm:pb-24 lg:px-20">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <BackgroundVideo
          src="/assets/hero-bg.mp4"
          poster="/assets/hero-bg.png"
          className="size-full object-cover"
        />
      </div>

      {/* Figma Frame 23 — 1050×546 content stack */}
      <div className="relative z-10 flex w-full max-w-[1050px] flex-col items-center gap-9">
        <div className="animate-fade-in relative size-[140px] shrink-0 overflow-hidden sm:size-[180px]">
          <img
            src="/assets/hero-logo.png"
            alt="Koo"
            className="animate-logo-glow size-full object-contain"
            width={180}
            height={177}
          />
        </div>

        <div className="animate-fade-up flex w-full flex-col items-center gap-10 sm:gap-[72px] [animation-delay:120ms]">
          <div className="flex w-full flex-col items-center gap-7 px-4 text-center sm:px-10">
            <h1 className="font-display max-w-[520px] text-[34px] font-bold leading-[1.15] text-foreground sm:text-[52px] sm:leading-[57px]">
              Portable Accounts, Productive Capital.
            </h1>
            <p className="max-w-[866px] text-base leading-7 text-muted-foreground sm:text-xl sm:leading-[30px]">
              Professional event contract trading powered by NFT on-chain
              accounts, yield-earning margin funds and KFC token holder revenue
              sharing.
            </p>
          </div>

          <GradientButton
            href={APP_URL}
            target="_blank"
            rel="noreferrer"
            className="h-14 min-w-[212px] rounded-lg px-[34px] py-[14px] text-xl leading-5"
          >
            Start Trading
          </GradientButton>
        </div>
      </div>
    </section>
  )
}
