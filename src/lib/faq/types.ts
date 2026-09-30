import type { ReactNode } from "react"

export type FaqAccordionItem = {
  id: string
  question: string
  answer?: string
  defaultOpen?: boolean
  detailLink?: {
    label: string
    href: string
  }
}

export type FaqTopicListItem = {
  text: ReactNode
}

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
