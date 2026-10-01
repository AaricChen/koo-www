import { getFaqTopicContent } from "../../lib/faq/content"
import type { FaqTopicSlug } from "../../lib/faq/topics"
import { FaqTopicAccordion } from "./FaqTopicAccordion"
import { FaqTopicFooter } from "./FaqTopicFooter"
import { FaqTopicSections } from "./FaqTopicSections"

/** Figma `faq-main-m` content card (5589:64586). */
export function FaqTopicMainPanel({ topicSlug }: { topicSlug: FaqTopicSlug }) {
  const content = getFaqTopicContent(topicSlug)

  return (
    <article
      data-figma-node="5589:64586"
      className="flex w-full flex-col items-center bg-surface-soft p-4 lg:items-start lg:p-8"
    >
      <div className="flex w-full max-w-[311px] flex-col items-center gap-6 lg:max-w-none lg:items-start lg:gap-8">
        <div className="flex w-full flex-col gap-[14px] lg:gap-8">
          <h2 className="w-full text-sm font-semibold leading-[18px] text-foreground lg:text-2xl lg:leading-6">
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
      </div>
    </article>
  )
}
