import { APP_URL } from "../../lib/links"
import { GradientButton } from "../ui/Button"

export function CtaSection() {
  return (
    <section className="flex flex-col items-center bg-surface-muted px-6 py-14 sm:p-20">
      <div className="flex w-full max-w-[1280px] flex-col items-center gap-[60px]">
        <div className="flex w-full flex-col items-center gap-8 px-4 text-center sm:px-10">
          <p className="text-xl leading-5 text-foreground">Enter Koo</p>
          <div className="flex w-full flex-col items-center gap-5">
            <h2 className="font-display max-w-[900px] text-[32px] font-semibold leading-tight text-foreground sm:text-[44px] sm:leading-[44px]">
              Own the account. Put capital to work.
            </h2>
            <p className="max-w-[844px] text-base leading-7 text-muted-foreground sm:text-xl sm:leading-[30px]">
              A derivatives platform designed around account ownership,
              productive capital and verifiable settlement.
            </p>
          </div>
        </div>
        <GradientButton href={APP_URL} target="_blank" rel="noreferrer">
          Start Trading
        </GradientButton>
      </div>
    </section>
  )
}
