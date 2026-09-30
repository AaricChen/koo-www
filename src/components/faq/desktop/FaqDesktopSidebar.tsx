import { NavLink } from "react-router-dom"
import { FaqSidebarCaretIcon } from "../FaqIcons"
import { FAQ_TOPICS, faqTopicPath, type FaqTopicSlug } from "../../../lib/faq/topics"

/** Figma `FAQ-menu` / `btn-FAQ-menu` — regular, hover, onclick (5534:42888). */
export function FaqDesktopSidebar({ activeSlug: _activeSlug }: { activeSlug: FaqTopicSlug }) {
  return (
    <nav
      aria-label="FAQ categories"
      className="faq-sidebar-nav sticky top-24 w-[240px] shrink-0 self-start"
    >
      {FAQ_TOPICS.map((topic, index) => (
        <div key={topic.slug} className="faq-sidebar-nav-entry">
          {index > 0 ? <div className="faq-sidebar-divider" aria-hidden /> : null}
          <NavLink
            to={faqTopicPath(topic.slug)}
            className={({ isActive }) =>
              isActive ? "faq-sidebar-item is-active" : "faq-sidebar-item"
            }
          >
            {({ isActive }) => (
              <>
                {isActive ? (
                  <FaqSidebarCaretIcon className="size-5 shrink-0 text-foreground" />
                ) : null}
                <span className="min-w-0">{topic.menuLabel}</span>
              </>
            )}
          </NavLink>
        </div>
      ))}
    </nav>
  )
}
