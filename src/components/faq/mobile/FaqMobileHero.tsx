import { DOCS_URL } from "../../../lib/links"

export function FaqMobileHero() {
  return (
    <header className="flex w-full flex-col items-center gap-3 px-2 text-center">
      <h1 className="w-full text-xl font-bold leading-5 text-foreground">
        Frequently Asked Questions
      </h1>
      <p className="w-full text-xs leading-[18px] text-muted-foreground">
        Quick answers to questions you may have about koo.xyz and trading.
        Can&apos;t find what you&apos;re looking for? Check out our{" "}
        <a
          href={DOCS_URL}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-secondary underline decoration-solid underline-offset-2"
        >
          Full Docs
        </a>
      </p>
    </header>
  )
}
