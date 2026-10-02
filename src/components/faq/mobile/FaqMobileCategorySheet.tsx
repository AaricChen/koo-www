import { useEffect, useId } from "react"
import { FAQ_TOPICS, type FaqTopicSlug } from "../../../lib/faq/topics"
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
        data-figma-node="5591:67996"
        className={`faq-category-sheet lg:hidden ${open ? "is-open" : ""}`}
      >
        <div className="faq-category-sheet__inner">
          <div className="faq-category-sheet__header">
            <p id={titleId} className="faq-category-sheet__title">
              Select a Category
            </p>
            <button
              type="button"
              aria-label="Close category menu"
              onClick={onClose}
              className="faq-category-sheet__close"
            >
              <FaqCloseIcon className="size-6" />
            </button>
          </div>

          <div className="faq-category-sheet__menu">
            <div className="faq-category-sheet__scroll">
              <ul className="faq-category-sheet__list">
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
                        className={
                          selected
                            ? "faq-category-sheet-item is-selected"
                            : "faq-category-sheet-item"
                        }
                      >
                        <span className="faq-category-sheet-item__label">
                          {topic.menuLabel}
                        </span>
                        {selected ? (
                          <FaqCheckIcon className="faq-category-sheet-item__check size-5 shrink-0" />
                        ) : null}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
