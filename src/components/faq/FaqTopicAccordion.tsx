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
          className={`max-w-[268px] text-sm leading-[22px] lg:max-w-none lg:text-base lg:leading-[22px] ${
            expanded ? "font-semibold text-foreground" : "font-normal text-foreground"
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
              ? "faq-topic-accordion-body flex flex-col gap-4 px-3 pb-[18px] lg:gap-4 lg:px-4 lg:pb-6"
              : undefined
          }
        >
          <div className={`faq-topic-panel ${expanded ? "is-open" : ""}`}>
            <div className="faq-topic-panel-inner">
              <p className="text-xs leading-5 text-muted-foreground lg:text-sm lg:leading-5">
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
}: {
  title?: string
  items: FaqAccordionItem[]
}) {
  const baseId = useId()
  const defaultOpenId = items.find((item) => item.defaultOpen && item.answer)?.id ?? null
  const [openId, setOpenId] = useState<string | null>(defaultOpenId)

  return (
    <section className="flex w-full flex-col gap-4 lg:gap-4">
      <h2 className="text-base font-semibold leading-4 text-foreground lg:text-xl lg:leading-5">
        {title}
      </h2>
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
