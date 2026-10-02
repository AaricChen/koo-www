import type { FaqTopicSlug } from "../../../lib/faq/topics"
import { FaqTopicHero } from "../FaqTopicHero"
import { FaqTopicMainPanel } from "../FaqTopicMainPanel"
import { FaqDesktopSidebar } from "./FaqDesktopSidebar"

/** Desktop FAQ topic layout (sidebar + main); pairs with Figma `FAQ-index-m` content scale. */
export function FaqDesktopIndexPage({ topicSlug }: { topicSlug: FaqTopicSlug }) {
  return (
    <div className="bg-section-alt hidden w-full flex-col items-center overflow-x-clip px-20 pb-20 pt-[60px] lg:flex">
      <div className="flex w-full max-w-[1280px] flex-col items-center gap-[50px]">
        <FaqTopicHero />
        <div className="flex w-full items-start gap-12">
          <FaqDesktopSidebar activeSlug={topicSlug} />
          <div className="min-w-0 flex-1">
            <FaqTopicMainPanel topicSlug={topicSlug} />
          </div>
        </div>
      </div>
    </div>
  )
}
