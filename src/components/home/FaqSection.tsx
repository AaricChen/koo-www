import { useId, useState } from "react"
import { FaqDetailLink } from "../faq/FaqDetailLink"
import { FaqChevronIcon, FaqChevronRightIcon } from "../faq/FaqIcons"
import { HOME_FAQ_ITEMS, homeFaqDetailHref } from "../../lib/faq/home-faq"
import { FAQ_URL } from "../../lib/links"

function FaqSectionDivider() {
  return (
    <div className="faq-topic-divider h-px w-full" aria-hidden />
  )
}

function FaqHomeReadMoreLink() {
  return (
    <a
      href={FAQ_URL}
      className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-xs font-normal leading-4 text-muted-foreground transition-colors duration-300 hover:text-foreground lg:gap-3 lg:text-xl lg:leading-5"
    >
      View and read more
      <FaqChevronRightIcon
        aria-hidden
        className="size-3 shrink-0 text-muted-foreground lg:size-6"
      />
    </a>
  )
}

export function FaqSection() {
  const baseId = useId()
  const [openId, setOpenId] = useState<string | null>(HOME_FAQ_ITEMS[0]?.id ?? null)

  return (
    <section
      aria-labelledby="home-faq-heading"
      className="bg-section-alt flex w-full flex-col items-center overflow-x-clip px-4 pb-6 pt-10 lg:px-20 lg:pb-20 lg:pt-[100px]"
    >
      <div className="flex w-full max-w-[1280px] flex-col items-center gap-8 lg:gap-[50px]">
        <header className="flex w-full flex-col items-center gap-4 px-4 text-center lg:gap-8 lg:px-4">
          <h2
            id="home-faq-heading"
            className="max-w-[275px] text-2xl font-bold leading-8 text-foreground lg:max-w-none lg:text-[40px] lg:leading-10"
          >
            Frequently Asked Questions
          </h2>
          <FaqHomeReadMoreLink />
        </header>

        <div className="flex w-full flex-col">
          {HOME_FAQ_ITEMS.map((item, index) => {
            const expanded = openId === item.id
            const panelId = `${baseId}-${item.id}-panel`
            const buttonId = `${baseId}-${item.id}-button`

            return (
              <div key={item.id} className="contents">
                {index > 0 ? <FaqSectionDivider /> : null}
                <article
                  className={`home-faq-item px-5 py-6 lg:px-8 lg:py-12 ${
                    expanded ? "is-open" : ""
                  }`}
                >
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() =>
                      setOpenId((current) =>
                        current === item.id ? null : item.id,
                      )
                    }
                    className="home-faq-trigger flex w-full cursor-pointer items-center justify-between gap-4 text-left"
                  >
                    <span
                      className={`home-faq-question w-[268px] max-w-[calc(100%-1.125rem)] shrink-0 text-[14px] leading-[22px] text-foreground lg:w-auto lg:max-w-none lg:text-[24px] lg:leading-[24px] ${
                        expanded ? "is-open font-semibold" : "font-normal"
                      }`}
                    >
                      {item.question}
                    </span>
                    <span
                      className={`home-faq-chevron inline-flex shrink-0 ${
                        expanded ? "is-open" : ""
                      }`}
                    >
                      <FaqChevronIcon className="size-[14px] text-foreground lg:size-6" />
                    </span>
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    aria-hidden={!expanded}
                    className={expanded ? "flex w-full flex-col gap-6 lg:items-start" : undefined}
                  >
                    <div
                      className={`home-faq-panel ${expanded ? "is-open" : ""}`}
                    >
                      <div className="home-faq-panel-inner">
                        <p className="home-faq-answer w-full text-xs leading-5 text-muted-foreground lg:pr-10 lg:text-[18px] lg:leading-7">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                    {expanded ? (
                      <FaqDetailLink href={homeFaqDetailHref(item.topicSlug)} />
                    ) : null}
                  </div>
                </article>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
