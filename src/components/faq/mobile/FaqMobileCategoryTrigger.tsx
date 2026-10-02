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
      data-figma-node="5591:67650"
      aria-haspopup="dialog"
      aria-label={`Select FAQ category: ${topic.menuLabel}`}
      className="faq-category-trigger flex w-full min-w-0 items-center gap-2.5 rounded-[4px] border p-1.5 text-left transition-colors duration-300"
    >
      <span className="flex shrink-0 items-center gap-1.5 pl-0.5">
        <FaqCategoryIcon className="faq-category-trigger__icon size-5 shrink-0" />
        <span className="h-6 w-px bg-faq-chrome-line" aria-hidden />
      </span>
      <span className="min-w-0 flex-1 text-sm font-semibold leading-[18px] text-foreground [overflow-wrap:anywhere]">
        {topic.menuLabel}
      </span>
      <FaqChevronIcon
        aria-hidden
        className="mr-0.5 size-3.5 shrink-0 text-foreground"
      />
    </button>
  )
}
