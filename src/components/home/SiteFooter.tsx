import {
  DISCORD_URL,
  DOCS_URL,
  ROADMAP_URL,
  SUPPORT_URL,
  TELEGRAM_URL,
  X_URL,
} from "../../lib/links"

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
  "text-muted-foreground transition-colors duration-300 ease-out hover:text-foreground"

const footerSocialLinks = [
  { href: TELEGRAM_URL, icon: "/assets/footer/social-tg.svg", label: "Telegram" },
  { href: DISCORD_URL, icon: "/assets/footer/social-discord.svg", label: "Discord" },
  { href: X_URL, icon: "/assets/footer/social-x.svg", label: "X" },
] as const

function FooterSocialLinks({ className }: { className?: string }) {
  return (
    <div className={className ?? "flex items-center gap-4"}>
      {footerSocialLinks.map(({ href, icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="shrink-0 opacity-80 transition-opacity duration-300 ease-out hover:opacity-100"
        >
          <img
            src={icon}
            alt=""
            aria-hidden
            className="size-6"
            width={24}
            height={24}
          />
        </a>
      ))}
    </div>
  )
}

export function SiteFooter() {
  return (
    <footer className="bg-footer-bar px-4 py-6 lg:px-20 lg:pb-[60px] lg:pt-10">
      <div className="flex flex-col items-center gap-12 lg:hidden">
        <div className="flex w-full flex-col items-center gap-6">
          <FooterLogo />
          <div className="flex w-full flex-col items-center gap-6">
            <div className="flex w-full items-center justify-center gap-3 whitespace-nowrap">
              <nav
                aria-label="Footer"
                className="flex items-center gap-4 text-xs leading-3"
              >
                <a
                  href={DOCS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={footerLinkClass}
                >
                  Docs
                </a>
                <a
                  href={SUPPORT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={footerLinkClass}
                >
                  Support
                </a>
                <a
                  href={ROADMAP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={footerLinkClass}
                >
                  Roadmap
                </a>
              </nav>
              <span
                className="text-sm leading-[14px] text-muted-foreground"
                aria-hidden
              >
                ｜
              </span>
              <span className="text-xs leading-3 text-muted-foreground">
                Terms of Use
              </span>
            </div>
            <FooterSocialLinks className="flex items-center justify-center gap-4" />
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

        <div className="flex flex-col items-end gap-6">
          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center justify-end gap-5 text-sm leading-[14px]"
          >
            <a
              href={DOCS_URL}
              target="_blank"
              rel="noreferrer"
              className={footerLinkClass}
            >
              Docs
            </a>
            <a
              href={SUPPORT_URL}
              target="_blank"
              rel="noreferrer"
              className={footerLinkClass}
            >
              Support
            </a>
            <a
              href={ROADMAP_URL}
              target="_blank"
              rel="noreferrer"
              className={footerLinkClass}
            >
              Roadmap
            </a>
            <span className="text-muted-foreground" aria-hidden>
              ｜
            </span>
            <span className="text-muted-foreground">Terms of Use</span>
          </nav>
          <FooterSocialLinks />
        </div>
      </div>
    </footer>
  )
}
