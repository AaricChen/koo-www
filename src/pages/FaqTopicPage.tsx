import { Navigate, useParams } from "react-router-dom"
import { FaqMobileIndexPage } from "../components/faq/mobile/FaqMobileIndexPage"
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
        <FaqMobileIndexPage topicSlug={topicSlug} />
        <div className="hidden min-h-[40vh] items-center justify-center px-7 py-20 lg:flex">
          <p className="max-w-lg text-center text-sm leading-5 text-muted-foreground">
            Desktop FAQ layout is in progress. Resize to mobile width or check
            back soon for the full sidebar experience.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
