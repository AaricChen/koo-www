import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaqTopicHero } from "../FaqTopicHero"
import { FaqTopicMainPanel } from "../FaqTopicMainPanel"
import {
  faqTopicPath,
  getFaqTopicMeta,
  type FaqTopicSlug,
} from "../../../lib/faq/topics"
import { FaqMobileCategorySheet } from "./FaqMobileCategorySheet"
import { FaqMobileCategoryTrigger } from "./FaqMobileCategoryTrigger"

/** Figma `FAQ-index-m` (5589:66293). */
export function FaqMobileIndexPage({ topicSlug }: { topicSlug: FaqTopicSlug }) {
  const navigate = useNavigate()
  const [categoryOpen, setCategoryOpen] = useState(false)
  const topic = getFaqTopicMeta(topicSlug)

  return (
    <div
      data-figma-node="5589:66293"
      className="bg-section-alt flex w-full flex-col items-stretch px-4 pb-5 pt-6 lg:hidden"
    >
      <div className="flex w-full min-w-0 flex-col items-stretch gap-5">
        <FaqTopicHero />
        <div
          data-figma-node="5591:67743"
          className="flex w-full min-w-0 flex-col gap-3"
        >
          <div className="faq-mobile-category-sticky">
            <FaqMobileCategoryTrigger
              topic={topic}
              sheetOpen={categoryOpen}
              onClick={() => setCategoryOpen(true)}
            />
          </div>
          <FaqTopicMainPanel topicSlug={topicSlug} />
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
