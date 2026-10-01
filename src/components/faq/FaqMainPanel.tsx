import { Fragment, type ReactNode } from "react"
import type { FaqAccordionItem } from "../../lib/faq/types"
import { APP_URL, DOCS_URL } from "../../lib/links"
import { GradientButton } from "../ui/Button"
import { FaqTopicAccordion } from "./FaqTopicAccordion"

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

/** Figma `Frame 241` + `Frame 239` (5589:64588). */
export function FaqMainPanelTop({
  title,
  intro,
  children,
}: {
  title: string
  intro?: string
  children?: ReactNode
}) {
  return (
    <div
      data-figma-node="5589:64588"
      className="flex w-full flex-col items-start gap-[14px] not-italic"
    >
      <h2
        data-figma-node="5591:67739"
        className="w-full break-words text-[14px] font-semibold leading-[18px] text-foreground"
      >
        {title}
      </h2>
      <div
        data-figma-node="5589:64592"
        className="flex w-full flex-col items-start gap-4"
      >
        {intro ? (
          <p
            data-figma-node="5589:64593"
            className="w-full text-[12px] font-normal leading-4 text-muted-foreground"
          >
            {intro}
          </p>
        ) : null}
        {children}
      </div>
    </div>
  )
}

/** Figma `Frame 249` (5589:64609). */
export function FaqMainPanelFaq({
  title = "FAQ",
  items,
}: {
  title?: string
  items: FaqAccordionItem[]
}) {
  if (items.length === 0) return null

  return (
    <section
      data-figma-node="5589:64609"
      className="flex w-full flex-col items-start gap-4"
      aria-labelledby="faq-main-panel-faq-heading"
    >
      <h2
        id="faq-main-panel-faq-heading"
        data-figma-node="5589:64610"
        className="w-full break-words text-[16px] font-semibold leading-4 text-foreground"
      >
        {title}
      </h2>
      <div data-figma-node="5589:64611" className="flex w-full flex-col items-start">
        <FaqTopicAccordion items={items} showTitle={false} />
      </div>
    </section>
  )
}

/** Figma `faq-main-m/faq-main-footer-m` (5591:66959). */
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
      data-figma-node="5591:66959"
      className="flex w-full flex-col items-center gap-6"
    >
      <div
        data-figma-node="5591:66952"
        className="faq-main-panel-footer-links flex shrink-0 flex-wrap items-center justify-center gap-[13px] whitespace-nowrap text-[12px] leading-3"
      >
        {links.map((link, index) => (
          <Fragment key={link.href}>
            {index > 0 ? (
              <span className="font-normal" aria-hidden>
                ｜
              </span>
            ) : null}
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="font-normal transition-opacity duration-300 hover:opacity-90"
            >
              {link.label}
            </a>
          </Fragment>
        ))}
      </div>
      <GradientButton
        href={exploreHref}
        target="_blank"
        rel="noreferrer"
        data-figma-node="5591:66985"
        className="w-full rounded-[4px] px-[34px] py-[14px] text-[14px] leading-[14px] font-medium"
      >
        {exploreLabel}
      </GradientButton>
    </footer>
  )
}

export type FaqMainPanelProps = {
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
  const hasTopBody = Boolean(intro || children)
  const hasAccordion = Boolean(accordionItems && accordionItems.length > 0)

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
          <FaqMainPanelTop title={title} intro={intro}>
            {children}
          </FaqMainPanelTop>
        ) : null}

        {hasAccordion ? (
          <FaqMainPanelFaq title={accordionTitle} items={accordionItems!} />
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
