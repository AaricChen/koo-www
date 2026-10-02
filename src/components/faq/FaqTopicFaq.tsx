import { useEffect, useId, useMemo, useState } from "react"
import type { FaqAccordionItem } from "../../lib/faq/types"
import { FaqChevronIcon } from "./FaqIcons"

function firstAnsweredItemId(items: FaqAccordionItem[]): string | null {
  return items.find((item) => item.answer)?.id ?? null
}

function FaqTopicFaqItem({
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
    <article className={`faq-topic-card w-full ${expanded ? "is-open" : ""}`}>
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
        <span
          className={`faq-topic-faq__chevron inline-flex shrink-0 ${
            expanded ? "is-open" : ""
          }`}
        >
          <FaqChevronIcon className="size-[14px] text-foreground" />
        </span>
      </button>
      {item.answer ? (
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          aria-hidden={!expanded}
          className="faq-topic-faq__panel"
        >
          <div className={`faq-topic-panel ${expanded ? "is-open" : ""}`}>
            <div className="faq-topic-panel-inner">
              <div className="faq-topic-faq__body">
                <p className="faq-topic-faq__answer">{item.answer}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </article>
  )
}

export type FaqTopicFaqProps = {
  title?: string
  items: FaqAccordionItem[]
}

/** Figma FAQ block on topic subpages (`5589:64609` → `5589:64611`). */
export function FaqTopicFaq({ title = "FAQ", items }: FaqTopicFaqProps) {
  if (items.length === 0) return null

  const baseId = useId()
  const itemsKey = useMemo(() => items.map((item) => item.id).join("|"), [items])
  const [openId, setOpenId] = useState<string | null>(() => firstAnsweredItemId(items))

  useEffect(() => {
    setOpenId(firstAnsweredItemId(items))
  }, [itemsKey, items])

  return (
    <section
      data-figma-node="5589:64609"
      className="faq-topic-faq"
      aria-labelledby="faq-topic-faq-heading"
    >
      <h2 id="faq-topic-faq-heading" data-figma-node="5589:64610" className="faq-topic-faq__heading">
        {title}
      </h2>
      <div data-figma-node="5589:64611" className="faq-topic-faq__list">
        {items.map((item, index) => {
          const panelId = `${baseId}-${item.id}-panel`
          const buttonId = `${baseId}-${item.id}-button`
          const open = openId === item.id
          return (
            <div key={item.id} className="contents">
              {index > 0 ? (
                <div className="faq-topic-divider h-px w-full" aria-hidden />
              ) : null}
              <FaqTopicFaqItem
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
