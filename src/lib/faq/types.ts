import type { ReactNode } from "react"

export type FaqAccordionItem = {
  id: string
  question: string
  answer?: string
  defaultOpen?: boolean
}

export type FaqTopicTextPart = { text: string; emphasis?: boolean }

export type FaqTopicParagraph =
  | string
  | { kind: "segments"; parts: FaqTopicTextPart[] }

export type FaqTopicListItem =
  | { kind: "plain"; text: string }
  | { kind: "labeled"; label: string; value: string }
  | { kind: "highlight"; highlight: string; rest: string }
  | { kind: "segments"; parts: FaqTopicTextPart[] }
  /** @deprecated Prefer structured kinds; still rendered for other topics. */
  | { text: ReactNode }

type FaqTopicSectionLayout = {
  /** When false, no divider before this block (Figma step groups). */
  dividerBefore?: boolean
  /** When true, render a divider after this block. */
  dividerAfter?: boolean
  /** Figma step headings (`5570:61047`): secondary blue, 12px title–body gap. */
  titleVariant?: "default" | "accent"
}

export type FaqTopicSection =
  | ({
      kind: "paragraphs"
      title?: string
      paragraphs: FaqTopicParagraph[]
    } & FaqTopicSectionLayout)
  | ({ kind: "list"; title: string; items: FaqTopicListItem[] } & FaqTopicSectionLayout)
  | ({
      kind: "highlights"
      title: string
      items: Array<{ highlight: string; rest: string }>
    } & FaqTopicSectionLayout)

export type FaqTopicContent = {
  overviewTitle: string
  /** Desktop accent header when it differs from sidebar label (`5632:70287`). */
  pageHeaderTitle?: string
  intro: string
  sections: FaqTopicSection[]
  accordion?: FaqAccordionItem[]
  accordionTitle?: string
}
