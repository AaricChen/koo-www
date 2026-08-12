import type { ReactNode } from "react"

type CoreCardProps = {
  title: string
  children: ReactNode
  emphasized?: boolean
  className?: string
}

export function CoreCard({
  title,
  children,
  emphasized = false,
  className = "",
}: CoreCardProps) {
  const tone = emphasized
    ? "border-2 border-border-strong bg-surface"
    : "border border-border bg-surface-muted"

  return (
    <article
      className={`flex h-full flex-col gap-4 rounded-md px-4 py-5 ${tone} ${className}`}
    >
      <h3 className="font-display text-lg font-semibold leading-6 text-foreground">
        {title}
      </h3>
      <div className="text-sm leading-5 text-muted-foreground">{children}</div>
    </article>
  )
}

type InfoCardProps = {
  title: string
  description: string
  iconSrc: string
  className?: string
}

export function InfoCard({
  title,
  description,
  iconSrc,
  className = "",
}: InfoCardProps) {
  return (
    <article
      className={`flex h-full flex-col items-start gap-4 rounded-md border border-border-cyan bg-surface-soft px-4 py-5 ${className}`}
    >
      <div className="size-12 overflow-hidden">
        <img src={iconSrc} alt="" className="size-full" width={48} height={48} />
      </div>
      <h3 className="font-display text-lg font-semibold leading-6 text-foreground">
        {title}
      </h3>
      <p className="text-sm leading-5 text-muted-foreground">{description}</p>
    </article>
  )
}

type SectionHeaderProps = {
  title: string
  description?: string
  className?: string
}

export function SectionHeader({
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <header className={`flex w-full flex-col items-center gap-6 text-center ${className}`}>
      <h2 className="font-display text-[32px] font-semibold leading-8 text-foreground">
        {title}
      </h2>
      {description ? (
        <p className="max-w-[1008px] text-base leading-7 text-muted-foreground">
          {description}
        </p>
      ) : null}
    </header>
  )
}
