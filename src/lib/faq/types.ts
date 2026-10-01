import type { ReactNode } from "react"

export type FaqAccordionItem = {
  id: string
  question: string
  answer?: string
  defaultOpen?: boolean
}

export type FaqTopicListItem =
  | { kind: "plain"; text: string }
  | { kind: "labeled"; label: string; value: string }
  | { kind: "highlight"; highlight: string; rest: string }
  /** @deprecated Prefer structured kinds; still rendered for other topics. */
  | { text: ReactNode }

export type FaqTopicSection =
  | { kind: "paragraphs"; title?: string; paragraphs: string[] }
  | { kind: "list"; title: string; items: FaqTopicListItem[] }

export type FaqTopicContent = {
  overviewTitle: string
  intro: string
  sections: FaqTopicSection[]
  accordion?: FaqAccordionItem[]
  accordionTitle?: string
}
