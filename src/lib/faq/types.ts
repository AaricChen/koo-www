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
