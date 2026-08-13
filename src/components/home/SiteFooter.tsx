import { DOCS_URL } from "../../lib/links"

const links = [
  { label: "Docs", href: DOCS_URL },
  { label: "Support", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
] as const

const socials = [
  { name: "X", src: "/assets/footer/social-x.svg", href: "#" },
  { name: "Discord", src: "/assets/footer/social-discord.svg", href: "#" },
  { name: "Telegram", src: "/assets/footer/social-tg.svg", href: "#" },
] as const

export function SiteFooter() {
  return (
    <footer className="bg-footer-bar flex flex-col items-start justify-between gap-10 px-6 pb-[60px] pt-10 sm:flex-row sm:items-end sm:gap-6 sm:px-10 lg:px-20">
      {/* Frame 88 — logo + copyright, gap 20 */}
      <div className="flex flex-col items-start justify-center gap-5">
        <a href="/" className="relative block h-9 w-[158px] shrink-0 overflow-hidden">
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
        <p className="whitespace-nowrap text-sm leading-[14px] text-muted-foreground">
          © 2026 Koo. All Rights Reserved.
        </p>
      </div>

      {/* Frame 92 — links + socials, gap 24, w 395 */}
      <div className="flex w-full max-w-[395px] flex-col items-start gap-6 sm:items-end">
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm leading-[14px] text-muted-foreground sm:justify-end"
        >
          {links.slice(0, 2).map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition hover:text-foreground"
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            >
              {link.label}
            </a>
          ))}
          <span aria-hidden>｜</span>
          {links.slice(2).map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4 sm:justify-end">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              aria-label={social.name}
              className="size-6 overflow-hidden opacity-90 transition hover:opacity-100"
            >
              <img
                src={social.src}
                alt=""
                className="size-full"
                width={24}
                height={24}
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
