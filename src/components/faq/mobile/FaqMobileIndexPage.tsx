import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  faqTopicPath,
  getFaqTopicMeta,
  type FaqTopicSlug,
} from "../../../lib/faq/topics"
import { FaqMobileCategorySheet } from "./FaqMobileCategorySheet"
import { FaqMobileCategoryTrigger } from "./FaqMobileCategoryTrigger"
import { FaqMobileHero } from "./FaqMobileHero"
import { FaqMobileTopicPlaceholder } from "./FaqMobileTopicPlaceholder"
import { FaqMobileWhatIsKooOverview } from "./FaqMobileWhatIsKooOverview"

export function FaqMobileIndexPage({ topicSlug }: { topicSlug: FaqTopicSlug }) {
  const navigate = useNavigate()
  const [categoryOpen, setCategoryOpen] = useState(false)
  const topic = getFaqTopicMeta(topicSlug)

  return (
    <div className="bg-section-alt flex w-full flex-col items-center overflow-x-clip pb-5 pt-6 px-4 lg:hidden">
      <div className="flex w-full max-w-[375px] flex-col items-center gap-5">
        <FaqMobileHero />
        <div className="flex w-full flex-col gap-3">
          <FaqMobileCategoryTrigger
            topic={topic}
            onClick={() => setCategoryOpen(true)}
          />
          {topicSlug === "what-is-koo" ? (
            <FaqMobileWhatIsKooOverview />
          ) : (
            <FaqMobileTopicPlaceholder topic={topic} />
          )}
        </div>
      </div>
      <FaqMobileCategorySheet
        open={categoryOpen}
        activeSlug={topicSlug}
        onClose={() => setCategoryOpen(false)}
        onSelect={(slug) => navigate(faqTopicPath(slug))}
      />
    </div>
  )
}
