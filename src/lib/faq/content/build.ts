import type { FaqAccordionItem, FaqTopicContent, FaqTopicSection } from "../types"

export function faqTopic(
  overviewTitle: string,
  intro: string,
  sections: FaqTopicSection[],
  accordion?: FaqAccordionItem[],
): FaqTopicContent {
  return { overviewTitle, intro, sections, accordion }
}

export function keyInfo(lines: string[]): FaqTopicSection {
  return {
    kind: "list",
    title: "Key information",
    items: lines.map((text) => ({ text })),
  }
}

export function keyInfoLabeled(
  rows: Array<{ label: string; value: string }>,
): FaqTopicSection {
  return {
    kind: "list",
    title: "Key information",
    items: rows.map(({ label, value }) => ({ kind: "labeled", label, value })),
  }
}

export function listSection(title: string, lines: string[]): FaqTopicSection {
  return {
    kind: "list",
    title,
    items: lines.map((text) => ({ text })),
  }
}

export function highlightListSection(
  title: string,
  rows: Array<{ highlight: string; rest: string }>,
): FaqTopicSection {
  return {
    kind: "list",
    title,
    items: rows.map(({ highlight, rest }) => ({ kind: "highlight", highlight, rest })),
  }
}

export function paraSection(title: string, paragraphs: string[]): FaqTopicSection {
  return { kind: "paragraphs", title, paragraphs }
}

export function faqItems(
  items: Array<{
    id: string
    question: string
    answer?: string
    defaultOpen?: boolean
    detailLink?: FaqAccordionItem["detailLink"]
  }>,
): FaqAccordionItem[] {
  return items.map(({ id, question, answer, defaultOpen, detailLink }) => ({
    id,
    question,
    answer,
    defaultOpen,
    detailLink,
  }))
}
