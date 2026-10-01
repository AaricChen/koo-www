import { getFaqTopicContent } from "../../lib/faq/content"
import { getFaqTopicMeta, type FaqTopicSlug } from "../../lib/faq/topics"
import { FaqMainPanel } from "./FaqMainPanel"
import { FaqTopicSections } from "./FaqTopicSections"

export function FaqTopicMainPanel({ topicSlug }: { topicSlug: FaqTopicSlug }) {
  const topic = getFaqTopicMeta(topicSlug)
  const content = getFaqTopicContent(topicSlug)

  return (
    <FaqMainPanel
      headerTitle={content.pageHeaderTitle ?? topic.menuLabel}
      title={content.overviewTitle}
      intro={content.intro}
      accordionTitle={content.accordionTitle ?? "FAQ"}
      accordionItems={content.accordion}
    >
      {content.sections.length > 0 ? (
        <FaqTopicSections sections={content.sections} leadingDivider />
      ) : null}
    </FaqMainPanel>
  )
}
