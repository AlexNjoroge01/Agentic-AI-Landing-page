import { Link } from "@tanstack/react-router"
import { Container } from "./section"

export function CtaBand({ title, lead }: { title: string; lead: string }) {
  return (
    <section className="border-t border-border bg-muted/40">
      <Container className="flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
        <div className="max-w-xl">
          <h2 className="text-2xl font-light tracking-[-0.02em] md:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {lead}
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            to="/contact"
            preload="intent"
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Discuss a workflow
          </Link>
          <Link
            to="/how-we-work"
            preload="intent"
            className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            How we work
          </Link>
        </div>
      </Container>
    </section>
  )
}
