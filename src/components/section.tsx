import type { ReactNode } from "react"
import { cn } from "cn"

export function Container({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn("mx-auto w-full max-w-5xl px-5 sm:px-8", className)}>
      {children}
    </div>
  )
}

export function Section({
  id,
  className,
  children,
}: {
  id?: string
  className?: string
  children: ReactNode
}) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <Container>{children}</Container>
    </section>
  )
}

export function Eyebrow({
  label,
  className,
}: {
  label: string
  className?: string
}) {
  return (
    <p className={cn("flex items-center gap-3 eyebrow", className)}>
      {label}
      <span aria-hidden="true" className="h-px w-10 bg-border" />
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  as: Tag = "h2",
  align = "start",
  className,
}: {
  eyebrow?: string
  title: string
  lead?: string
  as?: "h1" | "h2" | "h3"
  align?: "start" | "center"
  className?: string
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Eyebrow
          label={eyebrow}
          className={cn(align === "center" && "justify-center")}
        />
      )}
      <Tag
        className={cn(
          "mt-4 text-3xl font-light tracking-[-0.02em] md:text-4xl",
          Tag === "h1" && "md:text-5xl"
        )}
      >
        {title}
      </Tag>
      {lead && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed text-muted-foreground md:text-lg"
          )}
        >
          {lead}
        </p>
      )}
    </div>
  )
}
