import type { FaqTopicMeta } from "../../../lib/faq/topics"
import {
  FAQ_MENU_TINT_BG,
  FAQ_MENU_TINT_BORDER,
  FAQ_FIGMA_SECONDARY,
} from "../../../lib/faq/figma-tokens"
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
      className="flex w-full items-center gap-2.5 rounded-[4px] border p-1.5 text-left transition-colors duration-300 hover:bg-[rgba(61,122,255,0.22)]"
      style={{
        borderColor: FAQ_MENU_TINT_BORDER,
        backgroundColor: FAQ_MENU_TINT_BG,
      }}
    >
      <span className="flex items-center gap-1.5 pl-0.5">
        <FaqCategoryIcon
          className="size-5 shrink-0"
          style={{ color: FAQ_FIGMA_SECONDARY }}
        />
        <span className="h-6 w-px bg-[rgba(250,250,250,0.12)]" aria-hidden />
      </span>
      <span className="flex-1 text-sm font-semibold leading-[18px] text-foreground">
        {topic.menuLabel}
      </span>
      <FaqChevronIcon className="mr-0.5 size-3.5 text-foreground" />
    </button>
  )
}
