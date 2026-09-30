import { getFaqTopicContent } from "../../lib/faq/content"
import type { FaqTopicSlug } from "../../lib/faq/topics"
import { FaqTopicAccordion } from "./FaqTopicAccordion"
import { FaqTopicFooter } from "./FaqTopicFooter"
import { FaqTopicSections } from "./FaqTopicSections"

/** Figma `faq-main-m` content card (5589:64586). */
export function FaqTopicMainPanel({ topicSlug }: { topicSlug: FaqTopicSlug }) {
  const content = getFaqTopicContent(topicSlug)

  return (
    <article className="flex w-full flex-col items-center gap-6 bg-surface-soft p-4 lg:items-start lg:gap-8 lg:p-8">
      <div className="flex w-full flex-col gap-[14px] lg:gap-8">
        <h2 className="text-sm font-semibold leading-[18px] text-foreground lg:text-2xl lg:leading-6">
          {content.overviewTitle}
        </h2>
        <FaqTopicSections intro={content.intro} sections={content.sections} />
      </div>
      {content.accordion && content.accordion.length > 0 ? (
        <FaqTopicAccordion
          title={content.accordionTitle ?? "FAQ"}
          items={content.accordion}
        />
      ) : null}
      <FaqTopicFooter />
    </article>
  )
}
