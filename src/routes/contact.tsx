import { createFileRoute } from "@tanstack/react-router"
import { Container, Eyebrow } from "@/components/section"
import { ContactForm } from "@/components/contact-form"
import { site } from "@/lib/site"
import { pageMeta, pageTitle } from "@/lib/seo"

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: pageMeta({
      title: pageTitle("Contact — Discuss a Workflow"),
      description:
        "Tell the Agentic AI Lab about a manual, repetitive, or expensive workflow. We'll respond with a candid assessment of whether an AI agent system is the right fit.",
    }),
  }),
  component: ContactPage,
})

const checklist = [
  "What the process does today, step by step",
  "The systems it touches (tools, APIs, databases, documents)",
  "Who runs it and roughly how many hours it takes per week",
  "Where it breaks: errors, delays, handoffs that go missing",
]

function ContactPage() {
  return (
    <main>
      <div className="border-b border-border bg-grid">
        <Container className="relative py-16 md:py-20">
          <Eyebrow label="Contact" />
          <h1 className="mt-6 max-w-2xl text-4xl leading-[1.1] font-light tracking-[-0.025em] md:text-5xl">
            Tell us about one workflow.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            One process is enough. You&rsquo;ll get a candid assessment —
            including if the honest answer is that an agent isn&rsquo;t the
            right tool yet.
          </p>
        </Container>
      </div>

      <Container className="grid gap-12 py-16 md:py-20 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
        <div>
          <h2 className="text-lg font-medium tracking-tight">
            Useful to include
          </h2>
          <ul className="mt-4 space-y-3">
            {checklist.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 size-1 shrink-0 rounded-full bg-primary"
                />
                {item}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-lg font-medium tracking-tight">
            Prefer email?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Write to us directly at{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
            >
              {site.email}
            </a>
            . Include the same details from the checklist and mention anything
            relevant about your systems and constraints.
          </p>

          <div className="mt-10 rounded-lg border border-border bg-muted/40 p-5">
            <h3 className="text-sm font-medium">What happens next</h3>
            <ol className="mt-3 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">1.</span> We read
                your brief and reply with questions or a first take (typically
                within a few business days).
              </li>
              <li>
                <span className="font-medium text-foreground">2.</span> A short
                call to walk the process together.
              </li>
              <li>
                <span className="font-medium text-foreground">3.</span> A
                written assessment: candidate automations, controls required,
                and a rough effort estimate.
              </li>
            </ol>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 md:p-8">
          <ContactForm />
        </div>
      </Container>
    </main>
  )
}
