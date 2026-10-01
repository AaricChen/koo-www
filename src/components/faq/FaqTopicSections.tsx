import { Fragment } from "react"
import type { FaqTopicListItem, FaqTopicSection } from "../../lib/faq/types"

function FaqTopicSectionDivider() {
  return <div className="faq-topic-divider h-px w-full shrink-0" aria-hidden />
}

function FaqTopicSectionTitle({
  children,
  variant = "default",
}: {
  children: string
  variant?: "default" | "accent"
}) {
  return (
    <h3
      className={
        variant === "accent"
          ? "faq-topic-content__section-title faq-topic-content__section-title--accent"
          : "faq-topic-content__section-title"
      }
    >
      {children}
    </h3>
  )
}

function paragraphSectionClassName(titleVariant?: "default" | "accent") {
  return titleVariant === "accent"
    ? "faq-topic-content__section faq-topic-content__section--step"
    : "faq-topic-content__section"
}

function renderListItem(item: FaqTopicListItem, index: number) {
  if ("kind" in item && item.kind === "labeled") {
    return (
      <li key={index} className="faq-topic-content__list-item">
        {item.label}{" "}
        <span className="faq-topic-content__emphasis">{item.value}</span>
      </li>
    )
  }
  if ("kind" in item && item.kind === "highlight") {
    return (
      <li key={index} className="faq-topic-content__list-item">
        <span className="faq-topic-content__emphasis">{item.highlight}</span>
        {item.rest}
      </li>
    )
  }
  if ("kind" in item && item.kind === "plain") {
    return (
      <li key={index} className="faq-topic-content__list-item">
        {item.text}
      </li>
    )
  }
  return (
    <li key={index} className="faq-topic-content__list-item">
      {item.text}
    </li>
  )
}

function FaqTopicListSection({
  title,
  items,
}: {
  title: string
  items: FaqTopicListItem[]
}) {
  return (
    <section className="faq-topic-content__section">
      <FaqTopicSectionTitle>{title}</FaqTopicSectionTitle>
      <ul className="faq-topic-content__list">
        {items.map((item, index) => renderListItem(item, index))}
      </ul>
    </section>
  )
}

export function FaqTopicSections({
  sections,
  leadingDivider = false,
}: {
  sections: FaqTopicSection[]
  /** Figma divider after intro (`5656:72120`) before first block. */
  leadingDivider?: boolean
}) {
  if (sections.length === 0) return null

  return (
    <>
      {sections.map((section, index) => {
        const defaultDividerBefore = index > 0 || leadingDivider
        const showDividerBefore =
          section.dividerBefore === false
            ? false
            : section.dividerBefore === true
              ? true
              : defaultDividerBefore
        const key = `${section.kind}-${"title" in section ? section.title : index}-${index}`

        if (section.kind === "list") {
          return (
            <Fragment key={key}>
              {showDividerBefore ? <FaqTopicSectionDivider /> : null}
              <FaqTopicListSection title={section.title} items={section.items} />
              {section.dividerAfter ? <FaqTopicSectionDivider /> : null}
            </Fragment>
          )
        }

        if (section.kind === "highlights") {
          return (
            <Fragment key={key}>
              {showDividerBefore ? <FaqTopicSectionDivider /> : null}
              <section className="faq-topic-content__section">
                <FaqTopicSectionTitle>{section.title}</FaqTopicSectionTitle>
                <div className="faq-topic-content__highlight-block">
                  {section.items.map((item) => (
                    <p key={item.highlight} className="faq-topic-content__section-body">
                      <span className="faq-topic-content__emphasis">
                        {item.highlight}
                      </span>
                      {item.rest}
                    </p>
                  ))}
                </div>
              </section>
              {section.dividerAfter ? <FaqTopicSectionDivider /> : null}
            </Fragment>
          )
        }

        return (
          <Fragment key={key}>
            {showDividerBefore ? <FaqTopicSectionDivider /> : null}
            <section className={paragraphSectionClassName(section.titleVariant)}>
              {section.title ? (
                <FaqTopicSectionTitle variant={section.titleVariant ?? "default"}>
                  {section.title}
                </FaqTopicSectionTitle>
              ) : null}
              <div className="faq-topic-content__paragraph-block">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="faq-topic-content__section-body">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
            {section.dividerAfter ? <FaqTopicSectionDivider /> : null}
          </Fragment>
        )
      })}
    </>
  )
}
