import { DOCS_URL } from "../../lib/links"

const socials = [
  { name: "Instagram", src: "/assets/social-ins.svg", href: "#" },
  { name: "LinkedIn", src: "/assets/social-linkedin.svg", href: "#" },
  { name: "Discord", src: "/assets/social-discord.svg", href: "#" },
  { name: "Facebook", src: "/assets/social-fb.svg", href: "#" },
  { name: "Telegram", src: "/assets/social-tg.svg", href: "#" },
  { name: "X", src: "/assets/social-x.svg", href: "#" },
]

const links = [
  { label: "Docs", href: DOCS_URL },
  { label: "Support", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
]

export function SiteFooter() {
  return (
    <footer className="bg-footer flex flex-col gap-8 px-6 pb-[60px] pt-10 sm:flex-row sm:items-end sm:justify-between sm:px-20">
      <div className="flex flex-col items-start gap-5">
        <div className="relative h-[34px] w-[162px]">
          <img
            src="/assets/logo-mark.svg"
            alt=""
            className="absolute left-[1.8%] top-[16.67%] h-[60%] w-[28.9%]"
          />
          <img
            src="/assets/logo-wordmark.svg"
            alt="Koo"
            className="absolute left-[36.82%] top-[20%] h-[65.71%] w-[61.34%]"
          />
        </div>
        <p className="text-sm leading-[14px] text-muted-foreground">
          © 2026 Koo. All Rights Reserved.
        </p>
      </div>

      <div className="flex w-full max-w-[395px] flex-col items-start gap-6 sm:items-end">
        <nav className="flex flex-wrap items-center gap-5 text-sm leading-[14px] text-muted-foreground">
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
        <div className="flex items-center gap-4">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              aria-label={social.name}
              className="size-6 overflow-hidden opacity-80 transition hover:opacity-100"
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
