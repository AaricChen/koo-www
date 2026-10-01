import { useEffect, useId } from "react"
import { FAQ_TOPICS, type FaqTopicSlug } from "../../../lib/faq/topics"
import { FAQ_FIGMA_PRIMARY, FAQ_FIGMA_SECONDARY } from "../../../lib/faq/figma-tokens"
import { FaqCheckIcon, FaqCloseIcon } from "../FaqIcons"

export function FaqMobileCategorySheet({
  open,
  activeSlug,
  onClose,
  onSelect,
}: {
  open: boolean
  activeSlug: FaqTopicSlug
  onClose: () => void
  onSelect: (slug: FaqTopicSlug) => void
}) {
  const titleId = useId()

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [onClose, open])

  return (
    <>
      <div
        className={`faq-category-overlay lg:hidden ${open ? "is-open" : ""}`}
        aria-hidden={!open}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal={open}
        aria-labelledby={titleId}
        aria-hidden={!open}
        inert={!open}
        className={`faq-category-sheet lg:hidden ${open ? "is-open" : ""}`}
      >
        <div className="flex w-full items-center justify-between px-1">
          <p
            id={titleId}
            className="text-sm font-bold leading-[14px]"
            style={{ color: FAQ_FIGMA_SECONDARY }}
          >
            Select a Category
          </p>
          <button
            type="button"
            aria-label="Close category menu"
            onClick={onClose}
            className="flex size-6 shrink-0 items-center justify-center text-foreground"
          >
            <FaqCloseIcon />
          </button>
        </div>
        <ul className="mt-5 flex w-full flex-col gap-3">
          {FAQ_TOPICS.map((topic) => {
            const selected = topic.slug === activeSlug
            return (
              <li key={topic.slug}>
                <button
                  type="button"
                  onClick={() => {
                    onSelect(topic.slug)
                    onClose()
                  }}
                  className={`flex h-12 w-full items-center justify-between rounded-[4px] px-3 text-left text-xs leading-3 transition-colors duration-300 ${
                    selected
                      ? "border bg-surface-soft font-bold text-foreground"
                      : "bg-[rgba(43,48,72,0.2)] font-normal text-muted-foreground"
                  }`}
                  style={
                    selected ? { borderColor: FAQ_FIGMA_PRIMARY } : undefined
                  }
                >
                  <span>{topic.menuLabel}</span>
                  {selected ? (
                    <FaqCheckIcon style={{ color: FAQ_FIGMA_SECONDARY }} />
                  ) : null}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
