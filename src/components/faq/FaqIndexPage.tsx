import type { FaqTopicSlug } from "../../lib/faq/topics"
import { FaqDesktopIndexPage } from "./desktop/FaqDesktopIndexPage"
import { FaqMobileIndexPage } from "./mobile/FaqMobileIndexPage"

export function FaqIndexPage({ topicSlug }: { topicSlug: FaqTopicSlug }) {
  return (
    <>
      <FaqMobileIndexPage topicSlug={topicSlug} />
      <FaqDesktopIndexPage topicSlug={topicSlug} />
    </>
  )
}
