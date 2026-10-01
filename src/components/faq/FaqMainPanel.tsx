import { Fragment, type ReactNode } from "react"
import type { FaqAccordionItem } from "../../lib/faq/types"
import { APP_URL, DOCS_URL } from "../../lib/links"
import { FaqTopicContentArea } from "./FaqTopicContentArea"
import { FaqTopicFaq } from "./FaqTopicFaq"

const DEFAULT_ARCHITECTURE_URL =
  "https://docs.koo.xyz/about-koo.xyz/core-technical-architecture"

export type FaqMainPanelLink = {
  label: string
  href: string
}

const DEFAULT_FOOTER_LINKS: FaqMainPanelLink[] = [
  { label: "About Koo", href: DOCS_URL },
  {
    label: "Core Technical Architecture",
    href: DEFAULT_ARCHITECTURE_URL,
  },
]

/** Figma mobile `5591:66959`, desktop row `5570:60149` (faq-main-footer). */
export function FaqMainPanelFooter({
  links = DEFAULT_FOOTER_LINKS,
  exploreHref = APP_URL,
  exploreLabel = "Explore Markets",
}: {
  links?: FaqMainPanelLink[]
  exploreHref?: string
  exploreLabel?: string
}) {
  return (
    <footer
      data-figma-node="5570:60149"
      data-figma-node-mobile="5591:66959"
      className="faq-main-panel-footer"
    >
      <div data-figma-node="5591:66952" className="faq-main-panel-footer__links">
        {links.map((link, index) => (
          <Fragment key={link.href}>
            {index > 0 ? (
              <span
                className="faq-main-panel-footer__sep faq-secondary-text-14"
                aria-hidden
              >
                ｜
              </span>
            ) : null}
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="faq-secondary-text-14 faq-secondary-underline-link"
            >
              {link.label}
            </a>
          </Fragment>
        ))}
      </div>
      <a
        href={exploreHref}
        target="_blank"
        rel="noreferrer"
        data-figma-node="5591:66985"
        className="faq-main-panel-footer__button bg-cta-gradient"
      >
        {exploreLabel}
      </a>
    </footer>
  )
}

export type FaqMainPanelProps = {
  /** Figma desktop page title with accent bar (`5632:70287`). */
  headerTitle: string
  /** Mobile overview heading (`5591:67739`); hidden on `lg+`. */
  title: string
  /** Figma intro copy (`5589:64593`). */
  intro?: string
  children?: ReactNode
  accordionTitle?: string
  accordionItems?: FaqAccordionItem[]
  footerLinks?: FaqMainPanelLink[]
  exploreHref?: string
  exploreLabel?: string
  className?: string
}

/**
 * Figma `faq-main-m/FAQ Overview` (5589:64586 → 5589:64587).
 * Three blocks: Top → FAQ → Footer; inner stack uses `.faq-main-panel-inner`.
 */
export function FaqMainPanel({
  headerTitle,
  title,
  intro,
  children,
  accordionTitle,
  accordionItems,
  footerLinks,
  exploreHref,
  exploreLabel,
  className = "",
}: FaqMainPanelProps) {
  const hasTopBody = Boolean(intro || children || title)
  const hasAccordion = Boolean(accordionItems && accordionItems.length > 0)
  const contentChildren = (
    <>
      {title ? (
        <h2
          data-figma-node="5591:67739"
          className="faq-topic-content__mobile-title w-full break-words lg:hidden"
        >
          {title}
        </h2>
      ) : null}
      {intro ? (
        <p
          data-figma-node="5632:70290"
          className="faq-topic-content__description"
        >
          {intro}
        </p>
      ) : null}
      {children}
    </>
  )

  return (
    <article
      data-figma-node="5589:64586"
      className={`faq-main-panel w-full ${className}`}
    >
      <div
        data-figma-node="5589:64587"
        className="faq-main-panel-inner"
      >
        {hasTopBody || title ? (
          <FaqTopicContentArea headerTitle={headerTitle}>
            {contentChildren}
          </FaqTopicContentArea>
        ) : null}

        {hasAccordion ? (
          <FaqTopicFaq title={accordionTitle} items={accordionItems!} />
        ) : null}

        <FaqMainPanelFooter
          links={footerLinks}
          exploreHref={exploreHref}
          exploreLabel={exploreLabel}
        />
      </div>
    </article>
  )
}
