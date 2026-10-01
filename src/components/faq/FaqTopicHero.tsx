import { DOCS_URL } from "../../lib/links"
import { FAQ_FIGMA_SECONDARY } from "../../lib/faq/figma-tokens"

/** Figma `FAQ-index-m` header (5589:66227). Desktop scales typography in place. */
export function FaqTopicHero() {
  return (
    <header className="flex w-full flex-col items-center gap-3 px-2 text-center lg:gap-8 lg:px-4">
      <h1 className="w-full text-xl font-bold leading-5 text-foreground lg:text-[40px] lg:leading-10">
        Frequently Asked Questions
      </h1>
      <p className="w-full text-xs text-muted-foreground lg:max-w-[720px] lg:text-base lg:leading-6">
        <span className="leading-[18px] lg:leading-6">
          Quick answers to questions you may have about koo.xyz and trading.
          Can&apos;t find what you&apos;re looking for? Check out our{" "}
        </span>
        <a
          href={DOCS_URL}
          target="_blank"
          rel="noreferrer"
          className="font-semibold leading-[18px] underline decoration-solid underline-offset-2 lg:leading-6"
          style={{
            color: FAQ_FIGMA_SECONDARY,
            textDecorationColor: FAQ_FIGMA_SECONDARY,
          }}
        >
          Full Docs
        </a>
      </p>
    </header>
  )
}
