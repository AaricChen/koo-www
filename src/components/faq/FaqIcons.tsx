import type { SVGProps } from "react"

export function FaqChevronIcon({
  className,
  direction = "down",
}: {
  className?: string
  direction?: "down" | "up"
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className ?? "size-3.5 shrink-0"}
      fill="none"
      aria-hidden
    >
      <path
        d="M4.2 6.2 8 10l3.8-3.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform={direction === "up" ? "rotate(180 8 8)" : undefined}
      />
    </svg>
  )
}

export function FaqChevronRightIcon({
  className,
  ...props
}: { className?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className ?? "size-3 shrink-0"}
      fill="none"
      aria-hidden
      {...props}
    >
      <path
        d="M6.2 4.2 10 8l-3.8 3.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function FaqCheckIcon({
  className,
  ...props
}: { className?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className ?? "size-5 shrink-0 text-secondary"}
      fill="none"
      aria-hidden
      {...props}
    >
      <path
        d="M5 10.2 8.2 13.4 15 6.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function FaqCloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "size-6"} fill="none" aria-hidden>
      <path
        d="M6.2 6.2 17.8 17.8M17.8 6.2 6.2 17.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Figma `btn-FAQ-menu` active caret (5554:58209), 20px, points right. */
export function FaqSidebarCaretIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className ?? "size-5 shrink-0 text-foreground"}
      fill="none"
      aria-hidden
    >
      <path
        d="M7.5 5.2 12.3 10l-4.8 4.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function FaqCategoryIcon({
  className,
  ...props
}: { className?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className ?? "size-5 shrink-0 text-secondary"}
      fill="none"
      aria-hidden
      {...props}
    >
      <path
        d="M5.5 4.5h9M5.5 10h9M5.5 15.5h5.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}
