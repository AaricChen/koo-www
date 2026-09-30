import type { FaqTopicMeta } from "../../../lib/faq/topics"
import { FaqMobileTopicFooter } from "./FaqMobileTopicFooter"

export function FaqMobileTopicPlaceholder({ topic }: { topic: FaqTopicMeta }) {
  return (
    <article className="flex w-full flex-col items-center gap-6 bg-surface-soft p-4">
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="h-4 w-1 shrink-0 bg-secondary" aria-hidden />
          <h2 className="text-base font-semibold leading-4 text-foreground">
            {topic.menuLabel}
          </h2>
        </div>
        <p className="text-xs leading-5 text-muted-foreground">
          Detailed answers for this category are coming soon. Use Full Docs or
          switch categories to explore other topics.
        </p>
      </div>
      <FaqMobileTopicFooter />
    </article>
  )
}
