import type { FaqTopicListItem, FaqTopicSection } from "../../lib/faq/types"
import { FAQ_FIGMA_SECONDARY } from "../../lib/faq/figma-tokens"

function renderListItem(item: FaqTopicListItem, index: number) {
  if ("kind" in item && item.kind === "labeled") {
    return (
      <li key={index} className="mb-1.5 last:mb-0 leading-4">
        <span className="text-muted-foreground">{item.label}</span>{" "}
        <span style={{ color: FAQ_FIGMA_SECONDARY }}>{item.value}</span>
      </li>
    )
  }
  if ("kind" in item && item.kind === "highlight") {
    return (
      <li key={index} className="mb-1.5 last:mb-0">
        <span className="text-foreground">{item.highlight}</span>
        {item.rest}
      </li>
    )
  }
  if ("kind" in item && item.kind === "plain") {
    return (
      <li key={index} className="mb-1.5 last:mb-0">
        {item.text}
      </li>
    )
  }
  return (
    <li key={index} className="mb-1.5 last:mb-0">
      {item.text}
    </li>
  )
}

function FaqTopicListSection({
  title,
  items,
}: {
  title: string
  items: FaqTopicListItem[]
}) {
  return (
    <div className="flex w-full flex-col gap-3 lg:gap-4">
      <h3 className="text-xs font-semibold leading-3 text-foreground lg:text-sm lg:leading-[14px]">
        {title}
      </h3>
      <ul className="list-disc pl-[18px] text-xs leading-4 text-muted-foreground lg:text-sm lg:leading-5">
        {items.map((item, index) => renderListItem(item, index))}
      </ul>
    </div>
  )
}

export function FaqTopicSections({
  intro,
  sections,
}: {
  intro: string
  sections: FaqTopicSection[]
}) {
  return (
    <div className="flex w-full flex-col gap-4 text-xs leading-4 text-muted-foreground lg:gap-5 lg:text-base lg:leading-7">
      <p className="leading-4 lg:leading-7">{intro}</p>
      {sections.map((section, index) => {
        if (section.kind === "list") {
          return (
            <FaqTopicListSection
              key={`${section.title}-${index}`}
              title={section.title}
              items={section.items}
            />
          )
        }
        return (
          <div
            key={`${section.title ?? "p"}-${index}`}
            className="flex w-full flex-col gap-3 lg:gap-4"
          >
            {section.title ? (
              <h3 className="text-xs font-semibold leading-3 text-foreground lg:text-sm lg:leading-[14px]">
                {section.title}
              </h3>
            ) : null}
            <div className="space-y-1.5 lg:space-y-2">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="leading-4 lg:leading-7">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
