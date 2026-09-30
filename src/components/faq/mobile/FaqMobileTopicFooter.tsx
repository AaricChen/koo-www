import { APP_URL, DOCS_URL } from "../../../lib/links"
import { GradientButton } from "../../ui/Button"

const ARCHITECTURE_URL =
  "https://docs.koo.xyz/about-koo.xyz/core-technical-architecture"

export function FaqMobileTopicFooter() {
  return (
    <div className="flex w-full max-w-[311px] flex-col items-center gap-6">
      <div className="flex flex-wrap items-center justify-center gap-[13px] text-xs leading-3 text-secondary">
        <a
          href={DOCS_URL}
          target="_blank"
          rel="noreferrer"
          className="transition-colors duration-300 hover:text-foreground"
        >
          About Koo
        </a>
        <span className="text-muted-foreground" aria-hidden>
          ｜
        </span>
        <a
          href={ARCHITECTURE_URL}
          target="_blank"
          rel="noreferrer"
          className="transition-colors duration-300 hover:text-foreground"
        >
          Core Technical Architecture
        </a>
      </div>
      <GradientButton
        href={APP_URL}
        target="_blank"
        rel="noreferrer"
        className="w-full px-[34px] py-[14px] text-sm leading-[14px] font-medium"
      >
        Explore Markets
      </GradientButton>
    </div>
  )
}
