import { useId, useState } from "react"
import type { FaqAccordionItem } from "../../lib/faq/types"
import { FaqDetailLink } from "./FaqDetailLink"
import { FaqChevronIcon } from "./FaqIcons"

function FaqTopicAccordionItem({
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
    <article className={`faq-topic-card ${expanded ? "is-open" : ""}`}>
      <button
        id={buttonId}
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={onToggle}
        className="faq-topic-card-trigger flex w-full cursor-pointer items-center justify-between gap-3 text-left"
      >
        <span
          className={`min-w-0 flex-1 text-[14px] leading-[22px] text-foreground ${
            expanded ? "font-semibold" : "font-normal"
          }`}
        >
          {item.question}
        </span>
        <FaqChevronIcon
          direction={expanded ? "up" : "down"}
          className="size-[14px] shrink-0 text-foreground"
        />
      </button>
      {item.answer ? (
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          aria-hidden={!expanded}
          className={
            expanded
              ? "faq-topic-accordion-body flex flex-col gap-4 px-3 pb-[18px]"
              : undefined
          }
        >
          <div className={`faq-topic-panel ${expanded ? "is-open" : ""}`}>
            <div className="faq-topic-panel-inner">
              <p className="text-[12px] leading-5 text-muted-foreground">
                {item.answer}
              </p>
            </div>
          </div>
          {expanded && item.detailLink ? (
            <FaqDetailLink
              href={item.detailLink.href}
              label={item.detailLink.label}
            />
          ) : null}
        </div>
      ) : null}
    </article>
  )
}

/** Figma `faq-card-m` list inside topic overview (5589:64611). */
export function FaqTopicAccordion({
  title = "FAQ",
  items,
  showTitle = true,
}: {
  title?: string
  items: FaqAccordionItem[]
  showTitle?: boolean
}) {
  const baseId = useId()
  const defaultOpenId = items.find((item) => item.defaultOpen && item.answer)?.id ?? null
  const [openId, setOpenId] = useState<string | null>(defaultOpenId)

  return (
    <section className="flex w-full flex-col gap-4">
      {showTitle ? (
        <h2 className="text-base font-semibold leading-4 text-foreground lg:text-xl lg:leading-5">
          {title}
        </h2>
      ) : null}
      <div className="flex w-full flex-col">
        {items.map((item, index) => {
          const panelId = `${baseId}-${item.id}-panel`
          const buttonId = `${baseId}-${item.id}-button`
          const open = openId === item.id
          return (
            <div key={item.id} className="contents">
              {index > 0 ? (
                <div className="faq-topic-divider h-px w-full" aria-hidden />
              ) : null}
              <FaqTopicAccordionItem
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
