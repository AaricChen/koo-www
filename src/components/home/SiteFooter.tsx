import { DOCS_URL } from "../../lib/links"

export function SiteFooter() {
  return (
    <footer className="bg-footer-bar flex flex-col items-center gap-6 px-4 py-6 lg:flex-row lg:items-end lg:justify-between lg:px-20 lg:pb-[60px] lg:pt-10">
      <div className="flex flex-col items-center justify-center gap-6 lg:items-start lg:gap-5">
        <a
          href="/"
          className="relative block h-[26px] w-[115px] shrink-0 overflow-hidden lg:h-9 lg:w-[158px]"
        >
          <div className="absolute inset-[20.75%_68.87%_20.92%_0.78%]">
            <img
              src="/assets/footer/logo-mark.svg"
              alt=""
              aria-hidden
              className="size-full"
            />
          </div>
          <div className="absolute inset-[23.33%_0.78%_10%_37.74%]">
            <img
              src="/assets/footer/logo-wordmark.svg"
              alt="Koo.xyz"
              className="size-full"
            />
          </div>
        </a>
        <p className="hidden whitespace-nowrap text-sm leading-[14px] text-muted-foreground lg:block">
          © 2026 Koo. All Rights Reserved.
        </p>
      </div>

      <nav
        aria-label="Footer"
        className="flex flex-wrap items-center justify-center text-xs leading-3 text-muted-foreground lg:justify-end lg:text-sm lg:leading-[14px]"
      >
        <a
          href={DOCS_URL}
          className="transition hover:text-foreground"
          target="_blank"
          rel="noreferrer"
        >
          Docs
        </a>
      </nav>

      <p className="mt-6 whitespace-nowrap text-xs leading-3 text-faint lg:hidden">
        © 2026 Koo. All Rights Reserved.
      </p>
    </footer>
  )
}
