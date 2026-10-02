import type {
  FaqAccordionItem,
  FaqTopicContent,
  FaqTopicListItem,
  FaqTopicParagraph,
  FaqTopicSection,
} from "../types"

type FaqTopicSectionLayout = {
  dividerBefore?: boolean
  dividerAfter?: boolean
  titleVariant?: "default" | "accent"
}

export function faqTopic(
  overviewTitle: string,
  intro: string,
  sections: FaqTopicSection[],
  accordion?: FaqAccordionItem[],
  pageHeaderTitle?: string,
): FaqTopicContent {
  return { overviewTitle, intro, sections, accordion, pageHeaderTitle }
}

export function keyInfo(
  lines: string[],
  layout?: FaqTopicSectionLayout,
): FaqTopicSection {
  return {
    kind: "list",
    title: "Key information",
    items: lines.map((text) => ({ kind: "plain", text })),
    ...layout,
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

export function keyInfoItems(
  items: FaqTopicListItem[],
  title = "Key information",
): FaqTopicSection {
  return { kind: "list", title, items }
}

export function topicListSection(
  title: string,
  items: FaqTopicListItem[],
  layout?: FaqTopicSectionLayout,
): FaqTopicSection {
  return { kind: "list", title, items, ...layout }
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

export function highlightsSection(
  title: string,
  items: Array<{ highlight: string; rest: string }>,
): FaqTopicSection {
  return { kind: "highlights", title, items }
}

export function plainListSection(
  title: string,
  lines: string[],
  layout?: FaqTopicSectionLayout,
): FaqTopicSection {
  return {
    kind: "list",
    title,
    items: lines.map((text) => ({ kind: "plain", text })),
    ...layout,
  }
}

export function paraSection(
  title: string,
  paragraphs: FaqTopicParagraph[],
  layout?: FaqTopicSectionLayout,
): FaqTopicSection {
  return { kind: "paragraphs", title, paragraphs, ...layout }
}

export function faqItems(
  items: Array<{
    id: string
    question: string
    answer?: string
    defaultOpen?: boolean
  }>,
): FaqAccordionItem[] {
  return items.map(({ id, question, answer, defaultOpen }) => ({
    id,
    question,
    answer,
    defaultOpen,
  }))
}
