import type { FaqTopicSlug } from "../topics"
import type { FaqTopicContent } from "../types"
import { FAQ_TOPIC_PAGES } from "./topic-pages"

export function getFaqTopicContent(slug: FaqTopicSlug): FaqTopicContent {
  return FAQ_TOPIC_PAGES[slug]
}
