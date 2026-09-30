import { useId, useState } from "react"
import type { FaqAccordionItem } from "../../../lib/faq/types"
import { FaqChevronIcon, FaqChevronRightIcon } from "../FaqIcons"

function FaqAccordionRow({
  item,
  open,
  onToggle,
  panelId,
  buttonId,
}: {
  item: FaqAccordionItem
  open: boolean
  onToggle: () => void
  panelId: string
  buttonId: string
}) {
  const expanded = open && Boolean(item.answer)

  return (
    <div className="w-full">
      <button
        id={buttonId}
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={onToggle}
        className={`flex w-full items-center justify-between gap-3 px-3 py-[18px] text-left transition-colors duration-300 ${
          expanded ? "bg-[rgba(43,48,72,0.6)]" : "bg-surface-soft"
        }`}
      >
        <span
          className={`max-w-[268px] text-sm leading-[22px] ${
            expanded ? "font-semibold text-foreground" : "font-normal text-foreground"
          }`}
        >
          {item.question}
        </span>
        <FaqChevronIcon
          direction={expanded ? "up" : "down"}
          className="size-3.5 shrink-0 text-foreground"
        />
      </button>
      {expanded && item.answer ? (
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="bg-[rgba(43,48,72,0.6)] px-3 pb-[18px]"
        >
          <p className="text-xs leading-5 text-muted-foreground">{item.answer}</p>
          {item.detailLink ? (
            <a
              href={item.detailLink.href}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-[4px] border border-border-strong px-3 py-[9px] text-xs leading-3 text-primary transition-colors duration-300 hover:bg-[rgba(61,122,255,0.12)]"
            >
              {item.detailLink.label}
              <FaqChevronRightIcon className="size-3 -rotate-90 text-primary" />
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export function FaqMobileAccordion({
  title = "FAQ",
  items,
}: {
  title?: string
  items: FaqAccordionItem[]
}) {
  const baseId = useId()
  const defaultOpenId = items.find((item) => item.defaultOpen)?.id ?? null
  const [openId, setOpenId] = useState<string | null>(defaultOpenId)

  return (
    <section className="flex w-full flex-col gap-4">
      <h2 className="text-base font-semibold leading-4 text-foreground">{title}</h2>
      <div className="flex w-full flex-col">
        {items.map((item, index) => {
          const panelId = `${baseId}-${item.id}-panel`
          const buttonId = `${baseId}-${item.id}-button`
          const open = openId === item.id
          return (
            <div key={item.id} className="contents">
              {index > 0 ? (
                <div className="h-px w-full bg-[rgba(250,250,250,0.08)]" aria-hidden />
              ) : null}
              <FaqAccordionRow
                item={item}
                open={open}
                onToggle={() => {
                  if (!item.answer) return
                  setOpenId((current) => (current === item.id ? null : item.id))
                }}
                panelId={panelId}
                buttonId={buttonId}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}
