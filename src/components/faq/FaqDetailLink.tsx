import { Link } from "react-router-dom"
import { FaqChevronRightIcon } from "./FaqIcons"

/** Figma `5524:41351` — border/text primary token. */
export function FaqDetailLink({
  href,
  label = "View the details",
}: {
  href: string
  label?: string
}) {
  const className = "faq-detail-link"
  const icon = (
    <FaqChevronRightIcon
      aria-hidden
      className="faq-detail-link__icon size-3 -rotate-90 lg:size-4"
    />
  )

  if (href.startsWith("http") || href.startsWith("//")) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {label}
        {icon}
      </a>
    )
  }

  return (
    <Link to={href} className={className}>
      {label}
      {icon}
    </Link>
  )
}
