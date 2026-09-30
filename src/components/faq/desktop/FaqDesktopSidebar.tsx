import { NavLink } from "react-router-dom"
import { FAQ_TOPICS, faqTopicPath, type FaqTopicSlug } from "../../../lib/faq/topics"

function sidebarLinkClass(isActive: boolean) {
  return `flex h-12 w-full items-center rounded-[4px] px-3 text-left text-xs leading-3 transition-colors duration-300 ${
    isActive
      ? "border border-secondary bg-surface-soft font-bold text-foreground"
      : "bg-[rgba(43,48,72,0.2)] font-normal text-muted-foreground hover:text-foreground"
  }`
}

/** Desktop category nav — sheet item styles from Figma category list (5591:66837 context). */
export function FaqDesktopSidebar({ activeSlug: _activeSlug }: { activeSlug: FaqTopicSlug }) {
  return (
    <nav
      aria-label="FAQ categories"
      className="sticky top-24 flex w-full max-w-[320px] shrink-0 flex-col gap-3 self-start"
    >
      {FAQ_TOPICS.map((topic) => (
        <NavLink
          key={topic.slug}
          to={faqTopicPath(topic.slug)}
          className={({ isActive }) => sidebarLinkClass(isActive)}
        >
          {topic.menuLabel}
        </NavLink>
      ))}
    </nav>
  )
}
