import { Navigate, useParams } from "react-router-dom"
import { FaqIndexPage } from "../components/faq/FaqIndexPage"
import { SiteFooter } from "../components/home/SiteFooter"
import { SiteHeader } from "../components/home/SiteHeader"
import {
  DEFAULT_FAQ_TOPIC_SLUG,
  isFaqTopicSlug,
} from "../lib/faq/topics"

export function FaqTopicPage() {
  const { topicSlug } = useParams()
  if (!topicSlug || !isFaqTopicSlug(topicSlug)) {
    return <Navigate to={`/faq/${DEFAULT_FAQ_TOPIC_SLUG}`} replace />
  }

  return (
    <>
      <SiteHeader />
      <main>
        <FaqIndexPage topicSlug={topicSlug} />
      </main>
      <SiteFooter />
    </>
  )
}
