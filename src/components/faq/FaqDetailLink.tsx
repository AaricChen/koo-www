import { Link } from "react-router-dom"
import { FAQ_FIGMA_PRIMARY } from "../../lib/faq/figma-tokens"
import { FaqChevronRightIcon } from "./FaqIcons"

/** Figma `5524:41351` — border/text `#3D7AFF`. */
export function FaqDetailLink({
  href,
  label = "View the details",
}: {
  href: string
  label?: string
}) {
  const className =
    "inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-[4px] border px-3 py-[9px] text-xs leading-3 font-normal transition-colors duration-300 hover:bg-[rgba(61,122,255,0.12)] lg:w-auto lg:py-2 lg:text-sm lg:leading-[14px]"
  const style = {
    borderColor: FAQ_FIGMA_PRIMARY,
    color: FAQ_FIGMA_PRIMARY,
  } as const
  const icon = (
    <FaqChevronRightIcon
      aria-hidden
      className="size-3 -rotate-90 lg:size-4"
      style={{ color: FAQ_FIGMA_PRIMARY }}
    />
  )

  if (href.startsWith("http") || href.startsWith("//")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={className}
        style={style}
      >
        {label}
        {icon}
      </a>
    )
  }

  return (
    <Link to={href} className={className} style={style}>
      {label}
      {icon}
    </Link>
  )
}
