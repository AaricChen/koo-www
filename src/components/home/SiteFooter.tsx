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

      <div className="flex w-full max-w-[395px] flex-col items-center gap-6 lg:items-end">
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs leading-3 text-muted-foreground lg:justify-end lg:gap-x-5 lg:text-sm lg:leading-[14px]"
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
          <span aria-hidden className="text-sm leading-[14px]">
            ｜
          </span>
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

        <div className="flex items-center gap-4 lg:justify-end">
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

      <p className="mt-6 whitespace-nowrap text-xs leading-3 text-faint lg:hidden">
        © 2026 Koo. All Rights Reserved.
      </p>
    </footer>
  )
}
