import type { ReactNode } from "react"

/** Figma `5632:70286` + accent `5642:71964` + title `5632:70287`. */
export function FaqTopicContentHeader({ title }: { title: string }) {
  return (
    <div
      data-figma-node="5632:70286"
      className="faq-topic-content__header"
    >
      <div className="faq-topic-content__heading">
        <span
          className="faq-topic-content__accent"
          data-figma-node="5642:71964"
          aria-hidden
        />
        <h2
          data-figma-node="5632:70287"
          className="faq-topic-content__title"
        >
          {title}
        </h2>
      </div>
    </div>
  )
}

/** Figma upper content stack `5632:70285` (header + body). */
export function FaqTopicContentArea({
  headerTitle,
  children,
}: {
  headerTitle: string
  children: ReactNode
}) {
  return (
    <div data-figma-node="5632:70285" className="faq-topic-content">
      <FaqTopicContentHeader title={headerTitle} />
      <div data-figma-node="5632:70289" className="faq-topic-content__body">
        {children}
      </div>
    </div>
  )
}
