import type { FaqTopicMeta } from "../../../lib/faq/topics"
import { FaqCategoryIcon, FaqChevronIcon } from "../FaqIcons"

export function FaqMobileCategoryTrigger({
  topic,
  onClick,
}: {
  topic: FaqTopicMeta
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      aria-label={`Select FAQ category: ${topic.menuLabel}`}
      className="faq-category-trigger flex w-full items-center gap-2.5 rounded-[4px] border p-1.5 text-left transition-colors duration-300"
    >
      <span className="flex items-center gap-1.5 pl-0.5">
        <FaqCategoryIcon className="faq-category-trigger__icon size-5 shrink-0" />
        <span className="h-6 w-px bg-faq-chrome-line" aria-hidden />
      </span>
      <span className="flex-1 text-sm font-semibold leading-[18px] text-foreground">
        {topic.menuLabel}
      </span>
      <FaqChevronIcon className="mr-0.5 size-3.5 text-foreground" />
    </button>
  )
}
