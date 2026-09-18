import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type Ref,
} from "react"
import {
  APP_URL,
  DISCORD_URL,
  DOCS_URL,
  ROADMAP_URL,
  TELEGRAM_URL,
  X_URL,
} from "../../lib/links"
import { useMatchMedia } from "../../lib/use-match-media"
import { OutlineButton } from "../ui/Button"

const navItems = [
  { label: "Home", href: "/" },
  { label: "Docs", href: DOCS_URL },
  { label: "Roadmap", href: ROADMAP_URL },
] as const

const communityLinks = [
  { label: "Telegram", href: TELEGRAM_URL, icon: "/assets/social-tg.svg" },
  { label: "Discord", href: DISCORD_URL, icon: "/assets/social-discord.svg" },
  { label: "X / Twitter", href: X_URL, icon: "/assets/social-x.svg" },
] as const

const navLinkClass =
  "cursor-pointer whitespace-nowrap text-base leading-4 font-normal text-muted-foreground transition-colors duration-300 ease-out hover:text-foreground active:font-medium active:text-foreground"

const navLinkActiveClass =
  "cursor-pointer whitespace-nowrap text-base leading-4 font-medium text-foreground transition-colors duration-300 ease-out hover:text-foreground"

const mobileNavLinkClass =
  "mobile-nav-item cursor-pointer text-sm leading-[14px] text-muted-foreground transition-colors duration-300 ease-out hover:text-foreground active:font-medium active:text-foreground"

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

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className ?? "size-3"}
      fill="none"
      aria-hidden
    >
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

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className ?? "size-3 shrink-0"}
      fill="none"
      aria-hidden
    >
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

function NavDivider() {
  return (
    <span
      aria-hidden
      className="h-4 w-px shrink-0 bg-[rgba(250,250,250,0.2)]"
    />
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
  const [desktopCommunityOpen, setDesktopCommunityOpen] = useState(false)
  const [mobileCommunityOpen, setMobileCommunityOpen] = useState(false)
  const isDesktop = useMatchMedia(MD_MIN_WIDTH_QUERY)
  const menuId = useId()
  const communityMenuId = useId()
  const mobileCommunityId = useId()
  const openButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const communityRef = useRef<HTMLDivElement>(null)

  const closeMenu = useCallback(() => {
    openButtonRef.current?.focus()
    setMenuOpen(false)
    setMobileCommunityOpen(false)
  }, [])

  useEffect(() => {
    if (isDesktop) {
      setMenuOpen(false)
      setMobileCommunityOpen(false)
    } else {
      setDesktopCommunityOpen(false)
    }
  }, [isDesktop])

  useEffect(() => {
    if (!desktopCommunityOpen) return

    const onPointerDown = (event: PointerEvent) => {
      if (
        communityRef.current &&
        !communityRef.current.contains(event.target as Node)
      ) {
        setDesktopCommunityOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDesktopCommunityOpen(false)
    }

    window.addEventListener("pointerdown", onPointerDown)
    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [desktopCommunityOpen])

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
      <header className="sticky top-0 z-50 w-full overflow-visible bg-transparent backdrop-blur-[12px]">
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

        <div className="hidden w-full items-center justify-between overflow-visible px-7 py-5 md:flex">
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

          <div className="flex min-w-0 items-center justify-end gap-12 overflow-visible">
            <nav
              aria-label="Primary"
              className="flex items-center gap-[29px] overflow-visible"
            >
              {navItems.map((item, index) => (
                <div key={item.label} className="contents">
                  {index > 0 ? <NavDivider /> : null}
                  <a
                    href={item.href}
                    className={navLinkClass}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http") ? "noreferrer" : undefined
                    }
                  >
                    {item.label}
                  </a>
                </div>
              ))}
              <NavDivider />
              <div ref={communityRef} className="relative">
                <button
                  type="button"
                  aria-expanded={desktopCommunityOpen}
                  aria-controls={communityMenuId}
                  aria-haspopup="menu"
                  onClick={() => setDesktopCommunityOpen((open) => !open)}
                  className={`flex items-end gap-2 transition-colors duration-300 ease-out ${
                    desktopCommunityOpen ? navLinkActiveClass : navLinkClass
                  }`}
                >
                  Community
                  <span
                    className={`inline-flex transition-transform duration-300 ease-out ${
                      desktopCommunityOpen ? "-scale-y-100" : ""
                    }`}
                  >
                    <ChevronDownIcon />
                  </span>
                </button>
                <div
                  className={`header-community-dropdown ${
                    desktopCommunityOpen ? "is-open" : ""
                  }`}
                  aria-hidden={!desktopCommunityOpen}
                >
                  <div
                    id={communityMenuId}
                    role="menu"
                    aria-label="Community"
                    inert={!desktopCommunityOpen}
                    className="header-community-dropdown-panel flex w-[199px] flex-col gap-4 rounded-[4px] border border-[rgba(61,122,255,0.6)] px-2.5 py-4"
                  >
                      {communityLinks.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          role="menuitem"
                          target="_blank"
                          rel="noreferrer"
                          tabIndex={desktopCommunityOpen ? undefined : -1}
                          onClick={() => setDesktopCommunityOpen(false)}
                          className="flex w-full cursor-pointer items-center justify-between rounded-[4px] px-1.5 py-2 text-xs leading-3 text-muted-foreground transition-colors duration-300 ease-out hover:bg-surface-soft hover:text-foreground active:bg-surface-soft active:text-foreground"
                        >
                          <span className="flex items-center gap-2">
                            <img
                              src={item.icon}
                              alt=""
                              aria-hidden
                              className="size-5 shrink-0"
                              width={20}
                              height={20}
                            />
                            {item.label}
                          </span>
                          <ChevronRightIcon />
                        </a>
                      ))}
                  </div>
                </div>
              </div>
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
          <a href="/" className={`${mobileNavLinkClass} pr-1`} onClick={closeMenu}>
            Home
          </a>
          <div className="mobile-nav-rule" aria-hidden />
          <a
            href={DOCS_URL}
            className={`${mobileNavLinkClass} w-full`}
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
          >
            Docs
          </a>
          <div className="mobile-nav-rule" aria-hidden />
          <a
            href={ROADMAP_URL}
            className={`${mobileNavLinkClass} w-full`}
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
          >
            Roadmap
          </a>
          <div className="mobile-nav-rule" aria-hidden />
          <div
            className={`mobile-nav-item flex w-full flex-col ${
              mobileCommunityOpen ? "gap-10" : "gap-0"
            }`}
          >
            <button
              type="button"
              aria-expanded={mobileCommunityOpen}
              aria-controls={mobileCommunityId}
              onClick={() => setMobileCommunityOpen((open) => !open)}
              className={`flex w-full cursor-pointer items-center justify-between pr-1 text-left text-sm leading-[14px] transition-colors duration-300 ease-out ${
                mobileCommunityOpen
                  ? "font-medium text-foreground"
                  : "font-normal text-muted-foreground hover:text-foreground active:font-medium active:text-foreground"
              }`}
            >
              Community
              <span
                className={`inline-flex transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  mobileCommunityOpen ? "-scale-y-100" : ""
                }`}
              >
                <ChevronDownIcon className="size-4" />
              </span>
            </button>
            <div
              id={mobileCommunityId}
              className="mobile-nav-community"
              data-open={mobileCommunityOpen}
              aria-hidden={!mobileCommunityOpen}
            >
              <div className="mobile-nav-community-inner">
                <ul className="flex w-full flex-col gap-7 py-0 pl-3 pr-2">
                  {communityLinks.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        onClick={closeMenu}
                        className="flex w-full cursor-pointer items-center justify-between text-xs leading-3 text-muted-foreground transition-colors duration-300 ease-out hover:text-foreground active:font-medium active:text-foreground"
                      >
                        <span className="flex items-center gap-3">
                          <img
                            src={item.icon}
                            alt=""
                            aria-hidden
                            className="size-6 shrink-0"
                            width={24}
                            height={24}
                          />
                          {item.label}
                        </span>
                        <ChevronRightIcon className="size-4 shrink-0" />
                      </a>
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
