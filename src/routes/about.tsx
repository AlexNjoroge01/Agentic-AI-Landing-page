import { createFileRoute, Link } from "@tanstack/react-router"
import {
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/section"
import { CtaBand } from "@/components/cta-band"
import { pageMeta, pageTitle } from "@/lib/seo"

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: pageMeta({
      title: pageTitle("About the Lab"),
      description:
        "The Agentic AI Lab is an engineering-focused lab that designs and builds AI agent systems for business automation — with controlled tool use, evaluation, and human oversight at the core.",
    }),
  }),
  component: AboutPage,
})

const beliefs = [
  {
    title: "Agents earn autonomy with evidence",
    body: "The question isn't how much the agent can do, but how much it has proven it can do reliably. Autonomy expands on measured performance.",
  },
  {
    title: "Business value lives in the process, not the model",
    body: "The same model can be a toy or a production worker depending on integration, scoping, and evaluation. That engineering is the product.",
  },
  {
    title: "Simple beats clever, system beats demo",
    body: "If a plain script or a process fix solves it, that's the answer. When only a genuine agent will do, it gets built like infrastructure: tested, monitored, and reversible.",
  },
  {
    title: "Operators are colleagues, not casualties",
    body: "The people running a process today know where it breaks. The agent learns from them, and they are first in line to supervise and benefit from it.",
  },
]

function AboutPage() {
  return (
    <main>
      <div className="border-b border-border bg-grid">
        <Container className="relative py-16 md:py-24">
          <Eyebrow label="About" />
          <h1 className="mt-6 max-w-2xl text-4xl leading-[1.1] font-light tracking-[-0.025em] md:text-5xl">
            A lab, not an agency. Engineering, not hand-waving.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            The Agentic AI Lab exists for one purpose: design and build AI
            agents that reliably work through real business workflows — and keep
            working when you&rsquo;re not watching.
          </p>
        </Container>
      </div>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.5fr_0.5fr] lg:gap-16">
          <div>
            <h2 className="text-2xl font-light tracking-[-0.02em] md:text-3xl">
              What the lab does
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>
                We work at the point where language models become operational:
                agents that read documents, query systems, call your tools,
                draft work for review, and execute well-defined steps inside the
                processes your business already runs.
              </p>
              <p>
                Engagements are narrow and concrete. One workflow, one success
                criterion, one integration surface at a time — then measured
                expansion where the evidence supports it. We don&rsquo;t sell
                transformation roadmaps; we build working systems and document
                them so your own team can operate them.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-light tracking-[-0.02em] md:text-3xl">
              What the lab doesn&rsquo;t do
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>
                We don&rsquo;t rebrand third-party automation tools as custom
                agents, promise fully autonomous employees, or deploy
                unsupervised write access to your systems of record because it
                demos well.
              </p>
              <p>
                We also don&rsquo;t pretend a workflow is agent material when it
                isn&rsquo;t. Roughly half our assessments end with a
                recommendation for simpler tooling first — which is exactly the
                recommendation a partner should give.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-t border-border bg-muted/30">
        <SectionHeading
          eyebrow="Beliefs"
          title="Principles behind the builds"
          lead="These aren't marketing values — they're engineering biases you'll notice in every design decision."
        />
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {beliefs.map((b) => (
            <div key={b.title} className="border-t-2 border-border pt-5">
              <h3 className="text-base font-medium tracking-tight">
                {b.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="grid gap-10 lg:grid-cols-[0.55fr_0.45fr] lg:gap-16">
          <div>
            <h2 className="text-2xl font-light tracking-[-0.02em] md:text-3xl">
              How the lab is put together
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>
                A deliberately small engineering team: workflow design, agent
                engineering, and systems integration under one roof. Fewer
                handoffs, faster feedback loops, and direct access to the people
                actually building your system.
              </p>
              <p>
                We publish what we learn — evaluation methods, agent patterns,
                integration notes — as it stabilizes, in the spirit of a lab
                that shares its findings.
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-sm font-medium">Working with us</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Start with a{" "}
              <Link
                to="/how-we-work"
                preload="intent"
                className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
              >
                workflow assessment
              </Link>
              : two weeks, one process, a candid recommendation. If the answer
              is a build, the assessment work feeds directly into it.
            </p>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Talk to the people who would build it."
        lead="No sales layer — the assessment itself is done with the engineers who would deliver the work."
      />
    </main>
  )
}
