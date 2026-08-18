import { APP_URL } from "../../lib/links"
import { GradientButton } from "../ui/Button"
import { BackgroundVideo } from "./BackgroundVideo"

function ScrollHint() {
  return (
    <div
      className="hero-scroll-hint flex flex-col items-center lg:hidden"
      aria-hidden
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="text-foreground"
      >
        <path
          d="M3.2 10.4 8 5.6l4.8 4.8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="-mt-2 text-foreground"
      >
        <path
          d="M3.2 10.4 8 5.6l4.8 4.8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative isolate -mt-20 flex min-h-[644px] items-start justify-center overflow-hidden px-4 pb-12 pt-[105px] sm:px-10 sm:pb-24 lg:min-h-[809px] lg:items-center lg:px-20 lg:pb-28 lg:pt-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-bg-fade absolute inset-0 opacity-40">
          <BackgroundVideo
            src="/assets/hero-bg.mp4"
            poster="/assets/hero-bg.png"
            className="size-full object-cover"
          />
        </div>
        <div className="hero-bottom-blur" aria-hidden />
      </div>

      <div className="relative z-10 flex w-full max-w-[1050px] flex-col items-center gap-10 lg:gap-9">
        <div className="animate-fade-in relative size-[120px] shrink-0 sm:size-[140px] lg:size-[180px]">
          <img
            src="/assets/hero-logo.png"
            alt="Koo"
            className="animate-logo-glow size-full object-contain"
            width={180}
            height={177}
          />
        </div>

        <div className="animate-fade-up flex w-full flex-col items-center gap-16 lg:gap-[72px] [animation-delay:120ms]">
          <div className="flex w-full flex-col items-center gap-5 px-4 text-center sm:gap-7 sm:px-10">
            <h1 className="font-display max-w-[310px] text-[32px] font-bold leading-9 text-foreground sm:max-w-[520px] sm:text-[34px] sm:leading-[1.15] lg:text-[52px] lg:leading-[57px]">
              <span className="lg:hidden">
                Portable Accounts
                <br />
                Productive Capital
              </span>
              <span className="hidden lg:inline">
                Portable Accounts, Productive Capital.
              </span>
            </h1>
            <p className="max-w-[308px] text-sm leading-5 text-muted-foreground sm:max-w-[866px] sm:text-base sm:leading-7 lg:text-xl lg:leading-[30px]">
              Professional event contract trading powered by NFT on-chain
              accounts, yield-earning margin funds and KFC token holder revenue
              sharing.
            </p>
          </div>

          <GradientButton
            href={APP_URL}
            target="_blank"
            rel="noreferrer"
            className="h-auto w-full max-w-[300px] rounded-lg px-[34px] py-3 text-base leading-4 lg:h-14 lg:min-w-[212px] lg:w-auto lg:py-[14px] lg:text-xl lg:leading-5"
          >
            Start Trading
          </GradientButton>

          <ScrollHint />
        </div>
      </div>
    </section>
  )
}
