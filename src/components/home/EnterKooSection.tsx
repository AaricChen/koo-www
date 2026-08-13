import { APP_URL } from "../../lib/links"
import { GradientButton } from "../ui/Button"

/**
 * Figma `Enter KryptoX` (3732:11027) — 1440×572
 * py 140 / px 80 · content gap 60 · copy gap 40/20 · button 200×48 rounded-8
 *
 * Infinity graphic is an image fill MCP cannot export; the node screenshot
 * supplies it. Crisp HTML copy/CTA sit on top and cover the soft raster text.
 */
export function EnterKooSection() {
  return (
    <section className="relative isolate flex flex-col items-center overflow-x-clip bg-background px-6 py-20 sm:px-20 sm:py-[140px]">
      <div className="pointer-events-none absolute inset-0">
        <img
          src="/assets/enter/section-bg.png"
          alt=""
          aria-hidden
          className="size-full object-cover object-center"
        />
      </div>

      <div className="relative z-10 flex w-full max-w-[1280px] flex-col items-center gap-[60px]">
        <div className="flex w-full flex-col items-center gap-10 px-4 text-center sm:px-10">
          <p className="w-full text-xl leading-5 text-foreground">Enter Koo.xyz</p>

          <div className="flex w-full max-w-[856px] flex-col items-center gap-5">
            <h2 className="font-display w-full text-[32px] font-bold leading-10 text-foreground sm:text-[44px] sm:leading-[44px]">
              Own the account. Put capital to work.
            </h2>
            <p className="w-full text-base leading-7 text-muted-foreground sm:text-xl sm:leading-[30px]">
              A derivatives platform designed around account ownership,
              productive capital and verifiable settlement.
            </p>
          </div>
        </div>

        <GradientButton
          href={APP_URL}
          target="_blank"
          rel="noreferrer"
          className="h-12 min-w-[200px] rounded-lg px-[34px] py-[14px] text-xl font-medium leading-5"
        >
          Start Trading
        </GradientButton>
      </div>
    </section>
  )
}
