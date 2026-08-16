import { APP_URL } from "../../lib/links"
import { GradientButton } from "../ui/Button"
import { BackgroundVideo } from "./BackgroundVideo"

/**
 * Figma `Enter Koo` (3732:11027) / `Enter Koo-m` (3487:58734)
 */
export function EnterKooSection() {
  return (
    <section className="relative isolate flex flex-col items-center overflow-x-clip bg-background px-4 py-[60px] lg:px-20 lg:py-[140px]">
      <div className="pointer-events-none absolute inset-0">
        <BackgroundVideo
          src="/assets/enter/section-bg.mp4"
          playOnCompact
          className="size-full object-cover object-center"
        />
      </div>

      <div className="relative z-10 flex w-full max-w-[1280px] flex-col items-center gap-10 lg:gap-[60px]">
        <div className="flex w-full flex-col items-center gap-6 px-5 text-center lg:gap-10 lg:px-10">
          <p className="w-full text-sm leading-[14px] text-foreground lg:text-xl lg:leading-5">
            Enter Koo.xyz
          </p>

          <div className="flex w-full max-w-[285px] flex-col items-center gap-4 lg:max-w-[856px] lg:gap-5">
            <h2 className="font-display w-full text-[28px] font-bold leading-8 text-foreground lg:text-[44px] lg:leading-[44px]">
              Own the account. Put capital to work.
            </h2>
            <p className="w-full text-sm leading-5 text-muted-foreground lg:text-xl lg:leading-[30px]">
              A derivatives platform designed around account ownership,
              productive capital and verifiable settlement.
            </p>
          </div>
        </div>

        <GradientButton
          href={APP_URL}
          target="_blank"
          rel="noreferrer"
          className="h-auto w-full max-w-[300px] rounded-lg px-[34px] py-3 text-base font-medium leading-4 lg:h-12 lg:min-w-[200px] lg:w-auto lg:py-[14px] lg:text-xl lg:leading-5"
        >
          Start Trading
        </GradientButton>
      </div>
    </section>
  )
}
