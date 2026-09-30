import type { FaqTopicListItem, FaqTopicSection } from "../../lib/faq/types"

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
      <ul className="list-disc space-y-1.5 pl-[18px] text-xs leading-4 text-muted-foreground lg:text-sm lg:leading-5">
        {items.map((item, index) => (
          <li key={index}>{item.text}</li>
        ))}
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
      <p>{intro}</p>
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
          <div key={`${section.title ?? "p"}-${index}`} className="flex w-full flex-col gap-3 lg:gap-4">
            {section.title ? (
              <h3 className="text-xs font-semibold leading-3 text-foreground lg:text-sm lg:leading-[14px]">
                {section.title}
              </h3>
            ) : null}
            <div className="space-y-1.5 lg:space-y-2">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
