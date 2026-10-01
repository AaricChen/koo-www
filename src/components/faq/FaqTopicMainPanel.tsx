import { getFaqTopicContent } from "../../lib/faq/content"
import type { FaqTopicSlug } from "../../lib/faq/topics"
import { FaqMainPanel } from "./FaqMainPanel"
import { FaqTopicSections } from "./FaqTopicSections"

export function FaqTopicMainPanel({ topicSlug }: { topicSlug: FaqTopicSlug }) {
  const content = getFaqTopicContent(topicSlug)

  return (
    <FaqMainPanel
      title={content.overviewTitle}
      intro={content.intro}
      accordionTitle={content.accordionTitle ?? "FAQ"}
      accordionItems={content.accordion}
    >
      {content.sections.length > 0 ? (
        <FaqTopicSections sections={content.sections} />
      ) : null}
    </FaqMainPanel>
  )
}
