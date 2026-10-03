import { Navigate, useParams } from "react-router-dom"
import { FaqIndexPage } from "../components/faq/FaqIndexPage"
import { SiteFooter } from "../components/home/SiteFooter"
import { SiteHeader } from "../components/home/SiteHeader"
import {
  DEFAULT_FAQ_TOPIC_SLUG,
  type FaqTopicSlug,
  isFaqTopicSlug,
} from "../lib/faq/topics"
import { getFaqTopicPageSeo, usePageSeo } from "../lib/seo"

export function FaqTopicPage() {
  const { topicSlug } = useParams()
  if (!topicSlug || !isFaqTopicSlug(topicSlug)) {
    return <Navigate to={`/faq/${DEFAULT_FAQ_TOPIC_SLUG}`} replace />
  }

  return <FaqTopicPageView topicSlug={topicSlug} />
}

function FaqTopicPageView({ topicSlug }: { topicSlug: FaqTopicSlug }) {
  usePageSeo(getFaqTopicPageSeo(topicSlug))

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
