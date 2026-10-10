import type { AnchorHTMLAttributes, ReactNode } from "react"

type GradientButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
}

export function GradientButton({
  children,
  className = "",
  ...props
}: GradientButtonProps) {
  return (
    <a
      className={`inline-flex items-center justify-center rounded-md bg-gradient-to-r from-[#3582ff] via-[#32adff] via-[56%] to-[#2bd8ff] to-[98%] px-[34px] py-[14px] text-xl font-medium text-primary-foreground transition duration-300 hover:brightness-110 hover:shadow-[0_0_28px_rgba(53,130,255,0.35)] ${className}`}
      {...props}
    >
      {children}
    </a>
  )
}

type OutlineButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
}

export function OutlineButton({
  children,
  className = "",
  ...props
}: OutlineButtonProps) {
  return (
    <a
      className={`inline-flex items-center justify-center rounded-[4px] border border-border-strong bg-surface-soft font-medium text-primary transition duration-300 hover:border-secondary hover:bg-[rgba(53,130,255,0.16)] hover:text-secondary ${className}`}
      {...props}
    >
      {children}
    </a>
  )
}
