import { renderToStaticMarkup } from "react-dom/server"
import { MemoryRouter } from "react-router-dom"
import { FaqTopicPageMain } from "../../pages/FaqTopicPage"
import { HomePageMain } from "../../pages/HomePage"
import {
  faqTopicPath,
  type FaqTopicSlug,
} from "../faq/topics"

export function renderHomeStaticRoot(): string {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={["/"]}>
      <HomePageMain />
    </MemoryRouter>,
  )
}

export function renderFaqTopicStaticRoot(slug: FaqTopicSlug): string {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[faqTopicPath(slug)]}>
      <FaqTopicPageMain topicSlug={slug} />
    </MemoryRouter>,
  )
}
