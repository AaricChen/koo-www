import { APP_URL, DOCS_URL } from "../../lib/links"
import { OutlineButton } from "../ui/Button"

const navItems = [
  { label: "Home", href: "#", active: true },
  { label: "Docs", href: DOCS_URL, active: false },
  { label: "Community", href: "#", active: false },
] as const

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-transparent backdrop-blur-[12px]">
      <div className="flex w-full items-center justify-between px-7 py-5">
        <a href="/" className="relative block h-10 w-[175px] shrink-0 overflow-hidden">
          <img
            src="/assets/koo-logo-2.png"
            alt="Koo.xyz"
            className="size-full object-contain object-left"
            width={175}
            height={40}
          />
        </a>

        <div className="flex items-center justify-end gap-6 sm:gap-12">
          <nav
            aria-label="Primary"
            className="hidden items-center gap-[29px] md:flex"
          >
            {navItems.map((item, index) => (
              <div key={item.label} className="contents">
                {index > 0 ? (
                  <span
                    aria-hidden
                    className="h-4 w-px shrink-0 bg-[rgba(250,250,250,0.2)]"
                  />
                ) : null}
                <a
                  href={item.href}
                  className={`whitespace-nowrap text-base leading-4 transition hover:text-foreground ${
                    item.active
                      ? "font-medium text-foreground"
                      : "font-normal text-muted-foreground"
                  }`}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http") ? "noreferrer" : undefined
                  }
                  aria-current={item.active ? "page" : undefined}
                >
                  {item.label}
                </a>
              </div>
            ))}
          </nav>

          <OutlineButton
            href={APP_URL}
            target="_blank"
            rel="noreferrer"
          >
            Launch App
          </OutlineButton>
        </div>
      </div>
    </header>
  )
}
