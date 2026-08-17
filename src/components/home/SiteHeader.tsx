import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type Ref,
} from "react"
import { APP_URL, DOCS_URL } from "../../lib/links"
import { useMatchMedia } from "../../lib/use-match-media"
import { OutlineButton } from "../ui/Button"

const navItems = [
  { label: "Home", href: "/", active: true },
  { label: "Docs", href: DOCS_URL, active: false },
] as const

const communitySocials = [
  { label: "X / Twitter", icon: "/assets/social-x.svg" },
  { label: "Discord", icon: "/assets/social-discord.svg" },
  { label: "Telegram", icon: "/assets/social-tg.svg" },
] as const

const MD_MIN_WIDTH_QUERY = "(min-width: 768px)"

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 18 18"
      className="size-[18px]"
      fill="none"
      aria-hidden
    >
      <path
        d="M3.1 4.6h11.8M3.1 9h11.8M3.1 13.4h11.8"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden>
      <path
        d="M6.2 6.2 17.8 17.8M17.8 6.2 6.2 17.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M4.2 6.2 8 10l3.8-3.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
      <path
        d="M6.2 4.2 10 8l-3.8 3.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.6"
      />
    </svg>
  )
}

function IconButton({
  label,
  expanded,
  controls,
  onClick,
  buttonRef,
  children,
}: {
  label: string
  expanded?: boolean
  controls?: string
  onClick: () => void
  buttonRef?: Ref<HTMLButtonElement>
  children: ReactNode
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={label}
      aria-expanded={expanded}
      aria-controls={controls}
      onClick={onClick}
      className="flex size-7 shrink-0 items-center justify-center rounded-[4px] bg-surface-soft p-[5px] text-foreground transition duration-300 hover:bg-surface-muted"
    >
      {children}
    </button>
  )
}

function MobileMark({ onClick }: { onClick?: () => void }) {
  return (
    <a
      href="/"
      onClick={onClick}
      className="relative block h-4 w-9 shrink-0 overflow-hidden"
    >
      <img
        src="/assets/logo-main.svg"
        alt="Koo.xyz"
        className="size-full object-contain object-left"
        width={36}
        height={16}
      />
    </a>
  )
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [communityOpen, setCommunityOpen] = useState(false)
  const isDesktop = useMatchMedia(MD_MIN_WIDTH_QUERY)
  const menuId = useId()
  const communityId = useId()
  const openButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const closeMenu = useCallback(() => {
    openButtonRef.current?.focus()
    setMenuOpen(false)
    setCommunityOpen(false)
  }, [])

  useEffect(() => {
    if (isDesktop) {
      setMenuOpen(false)
      setCommunityOpen(false)
    }
  }, [isDesktop])

  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeButtonRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [closeMenu, menuOpen])

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-transparent backdrop-blur-[12px]">
        <div className="flex h-[50px] items-center justify-between px-1.5 md:hidden">
          <div className="flex items-center gap-1.5">
            <IconButton
              label="Open menu"
              expanded={menuOpen}
              controls={menuId}
              onClick={() => setMenuOpen(true)}
              buttonRef={openButtonRef}
            >
              <MenuIcon />
            </IconButton>
            <MobileMark />
          </div>
          <OutlineButton
            href={APP_URL}
            target="_blank"
            rel="noreferrer"
            className="h-7 shrink-0 px-2.5 py-2 text-xs leading-3"
          >
            Launch App
          </OutlineButton>
        </div>

        <div className="hidden w-full items-center justify-between px-7 py-5 md:flex">
          <a
            href="/"
            className="relative block h-10 w-[175px] shrink-0 overflow-hidden"
          >
            <img
              src="/assets/koo-logo-2.png"
              alt="Koo.xyz"
              className="size-full object-contain object-left"
              width={175}
              height={40}
            />
          </a>

          <div className="flex min-w-0 items-center justify-end gap-12">
            <nav aria-label="Primary" className="flex items-center gap-[29px]">
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
              className="shrink-0 px-4 py-[11px] text-[14px] leading-[14px]"
            >
              Launch App
            </OutlineButton>
          </div>
        </div>
      </header>

      <div
        className={`mobile-nav-overlay md:hidden ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
        onClick={closeMenu}
      />
      <div
        id={menuId}
        className={`mobile-nav-drawer md:hidden ${menuOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal={menuOpen}
        aria-label="Menu"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-1.5">
            <IconButton label="Close menu" onClick={closeMenu}>
              <MenuIcon />
            </IconButton>
            <MobileMark onClick={closeMenu} />
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
            className="flex size-6 shrink-0 items-center justify-center text-foreground"
          >
            <CloseIcon />
          </button>
        </div>

        <nav
          aria-label="Mobile"
          className="flex w-full flex-col items-start gap-6 px-1"
        >
          <a
            href="/"
            className="mobile-nav-item pr-1 text-sm leading-[14px] text-muted-foreground transition hover:text-foreground"
            onClick={closeMenu}
          >
            Home
          </a>
          <div className="mobile-nav-rule" aria-hidden />
          <a
            href={DOCS_URL}
            className="mobile-nav-item w-full text-sm leading-[14px] text-muted-foreground transition hover:text-foreground"
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
          >
            Docs
          </a>
          <div className="mobile-nav-rule" aria-hidden />
          <div
            className={`mobile-nav-item flex w-full flex-col ${
              communityOpen ? "gap-10" : "gap-0"
            }`}
          >
            <button
              type="button"
              aria-expanded={communityOpen}
              aria-controls={communityId}
              onClick={() => setCommunityOpen((open) => !open)}
              className={`flex w-full items-center justify-between pr-1 text-left text-sm leading-[14px] transition hover:text-foreground ${
                communityOpen
                  ? "font-medium text-foreground"
                  : "font-normal text-muted-foreground"
              }`}
            >
              Community
              <span
                className={`inline-flex text-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  communityOpen ? "rotate-180" : ""
                }`}
              >
                <ChevronDownIcon />
              </span>
            </button>
            <div
              id={communityId}
              className="mobile-nav-community"
              data-open={communityOpen}
              aria-hidden={!communityOpen}
            >
              <div className="mobile-nav-community-inner">
                <ul className="flex w-full flex-col gap-7 py-0 pl-3 pr-2">
                  {communitySocials.map((social) => (
                    <li
                      key={social.label}
                      className="flex w-full items-center justify-between"
                    >
                      <span className="flex items-center gap-3">
                        <img
                          src={social.icon}
                          alt=""
                          aria-hidden
                          className="size-6 shrink-0"
                          width={24}
                          height={24}
                        />
                        <span className="text-xs leading-3 text-muted-foreground">
                          {social.label}
                        </span>
                      </span>
                      <ChevronRightIcon />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
