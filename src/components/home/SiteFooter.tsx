import { DOCS_URL, SUPPORT_URL } from "../../lib/links"

function FooterLogo({ className }: { className?: string }) {
  return (
    <a
      href="/"
      className={
        className ??
        "relative block h-[26px] w-[115px] shrink-0 overflow-hidden lg:h-9 lg:w-[158px]"
      }
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
  )
}

const footerLinkClass =
  "transition hover:text-foreground text-muted-foreground"

export function SiteFooter() {
  return (
    <footer className="bg-footer-bar px-4 py-6 lg:px-20 lg:pb-[60px] lg:pt-10">
      <div className="flex flex-col items-center gap-12 lg:hidden">
        <div className="flex w-full flex-col items-center gap-6">
          <FooterLogo />
          <div className="flex w-full flex-col items-center gap-6">
            <div className="flex w-full flex-wrap items-center justify-center gap-3">
              <div
                className={`flex items-center gap-4 text-xs leading-3 ${footerLinkClass}`}
              >
                <a href={DOCS_URL} target="_blank" rel="noreferrer">
                  Docs
                </a>
                <a href={SUPPORT_URL} target="_blank" rel="noreferrer">
                  Support
                </a>
              </div>
              <span
                className="text-sm leading-[14px] text-muted-foreground"
                aria-hidden
              >
                ｜
              </span>
              <span className="whitespace-nowrap text-xs leading-3 text-muted-foreground">
                Terms of Use
              </span>
            </div>
            <div className="flex items-center gap-4" aria-hidden>
              <img
                src="/assets/footer/social-x.svg"
                alt=""
                aria-hidden
                className="size-6 shrink-0"
                width={24}
                height={24}
              />
              <img
                src="/assets/footer/social-discord.svg"
                alt=""
                aria-hidden
                className="size-6 shrink-0"
                width={24}
                height={24}
              />
              <img
                src="/assets/footer/social-tg.svg"
                alt=""
                aria-hidden
                className="size-6 shrink-0"
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>
        <p className="whitespace-nowrap text-xs leading-3 text-faint">
          © 2026 Koo. All Rights Reserved.
        </p>
      </div>

      <div className="hidden items-end justify-between lg:flex">
        <div className="flex flex-col items-start justify-center gap-5">
          <FooterLogo />
          <p className="whitespace-nowrap text-sm leading-[14px] text-muted-foreground">
            © 2026 Koo. All Rights Reserved.
          </p>
        </div>

        <nav
          aria-label="Footer"
          className={`flex flex-wrap items-center justify-end gap-5 text-sm leading-[14px] ${footerLinkClass}`}
        >
          <a href={DOCS_URL} target="_blank" rel="noreferrer">
            Docs
          </a>
          <a href={SUPPORT_URL} target="_blank" rel="noreferrer">
            Support
          </a>
        </nav>
      </div>
    </footer>
  )
}
