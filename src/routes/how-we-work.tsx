import { createFileRoute, Link } from "@tanstack/react-router"
import {
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/section"
import { CtaBand } from "@/components/cta-band"
import { pageMeta, pageTitle } from "@/lib/seo"

export const Route = createFileRoute("/how-we-work")({
  head: () => ({
    meta: pageMeta({
      title: pageTitle("How We Work"),
      description:
        "Discovery, workflow design, integration, evaluation, deployment, and monitoring — how the Agentic AI Lab takes a business process from manual to reliably automated.",
    }),
  }),
  component: HowWeWorkPage,
})

const phases = [
  {
    n: "01",
    title: "Discovery",
    duration: "Week 1–2",
    body: "We sit with the people who run the process — not just the process owner. We map every step: who does what, which systems hold the data, where errors originate, what volume looks like by week, and where the hidden costs sit.",
    output:
      "A process map with volumes, error sources, and the automation-ready segments identified.",
  },
  {
    n: "02",
    title: "Workflow & agent design",
    duration: "Week 2–3",
    body: "We define exactly what the agent may do: which tools it receives, which credentials it holds, what it may write, where a human decides, and what happens when it's uncertain. The design is reviewed with your engineers and your operators before anything is built.",
    output:
      "An agent specification with permission boundaries, escalation rules, and success criteria you sign off.",
  },
  {
    n: "03",
    title: "Integration",
    duration: "Week 3–5",
    body: "The agent is connected to your systems through typed tool interfaces with least-privilege credentials. Read access first, then writes behind dry-run mode. Everything an agent does goes through audited API calls — never through undocumented side channels.",
    output:
      "A working agent in a sandbox, connected to real systems in read-only mode.",
  },
  {
    n: "04",
    title: "Evaluation",
    duration: "Week 4–6",
    body: "We replay real historical cases through the agent and measure what matters: accuracy against your ground truth, exception rates, latency, and cost per completed task. Where it fails, we fix or scope back. Nothing deploys on vibes.",
    output:
      "An evaluation report scoring the agent against agreed criteria, with failures documented.",
  },
  {
    n: "05",
    title: "Deployment",
    duration: "Week 6–8",
    body: "Production rollout starts with human approval gates on consequential steps, and a defined ramp: supervised live runs first, then partial volume, then full volume as evidence accumulates. Rollback is always available; the process never depends on the agent's sole availability.",
    output:
      "A production agent, live on a controlled ramp, with approval gates where they matter.",
  },
  {
    n: "06",
    title: "Monitoring & improvement",
    duration: "Ongoing",
    body: "After launch we track accuracy, drift, exception mix, and cost per workflow. Weekly observation during the ramp, then periodic reviews. Changes to models, prompts, or tools go through the same evaluation pipeline as the original build.",
    output:
      "Continuously measured performance, with tuning driven by data rather than anecdote.",
  },
]

const principles = [
  {
    title: "Scoping beats autonomy",
    body: "An agent with narrow tools and clear boundaries is more useful in production than an ambitious one with everything access. We design the smallest agent that solves the workflow.",
  },
  {
    title: "Evidence before autonomy",
    body: "Human approval gates shrink as measured performance justifies it — never before. The operator always knows what the agent did and why.",
  },
  {
    title: "The systems of record stay yours",
    body: "Agents work through your existing tools, APIs, and databases. Your data stays in your infrastructure under your residency rules.",
  },
  {
    title: "Honest 80/20 advice",
    body: "If part of a workflow suits a simple script, a rules engine, or a better process, we say so. Agents are reserved for the parts that genuinely need judgment.",
  },
]

const engagementModels = [
  {
    name: "Workflow assessment",
    body: "A fixed-scope engagement to map and evaluate one process. You get a candid recommendation and cost estimate — including for doing nothing.",
    best: "First engagements",
  },
  {
    name: "Pilot build",
    body: "From assessment to a sandboxed, evaluated pilot on one workflow, ready for a controlled production ramp.",
    best: "Proving feasibility",
  },
  {
    name: "Build & run",
    body: "Ongoing engineering partnership: production deployment, monitoring, evaluation pipelines, and expansion to adjacent workflows.",
    best: "Scaling automation",
  },
]

function HowWeWorkPage() {
  return (
    <main>
      <div className="border-b border-border bg-grid">
        <Container className="relative py-16 md:py-24">
          <Eyebrow label="How we work" />
          <h1 className="mt-6 max-w-2xl text-4xl leading-[1.1] font-light tracking-[-0.025em] md:text-5xl">
            From manual process to monitored system, in six deliberate phases.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            No front-loaded consulting bill, no big-bang rollout. Each phase
            ends in something concrete you can evaluate before the next one
            begins.
          </p>
        </Container>
      </div>

      <Section>
        <SectionHeading
          eyebrow="The process"
          title="Six phases"
          lead="Durations are typical for a first workflow and adjust to integration complexity and your internal review cycles."
        />
        <div className="mt-12">
          {phases.map((p) => (
            <article
              key={p.n}
              className="grid gap-4 border-t border-border py-8 md:grid-cols-[4.5rem_10rem_1fr] md:gap-8 md:py-10 lg:grid-cols-[4.5rem_12rem_1fr]"
            >
              <p className="text-2xl font-light tracking-tight text-muted-foreground/70">
                {p.n}
              </p>
              <div>
                <h2 className="text-lg font-medium tracking-tight">
                  {p.title}
                </h2>
                <p className="mt-1 text-xs tracking-[0.12em] text-muted-foreground uppercase">
                  {p.duration}
                </p>
              </div>
              <div className="max-w-2xl">
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                  {p.body}
                </p>
                <p className="mt-3 text-sm leading-relaxed">
                  <span className="font-medium">Deliverable: </span>
                  <span className="text-muted-foreground">{p.output}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border bg-muted/30">
        <SectionHeading
          eyebrow="Principles"
          title="How we make decisions in your favor"
        />
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {principles.map((pr) => (
            <div key={pr.title} className="border-t-2 border-border pt-5">
              <h3 className="text-base font-medium tracking-tight">
                {pr.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {pr.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <SectionHeading
          eyebrow="Engagement models"
          title="Three ways to work with us"
          lead="Progressively deeper scope — start where you have conviction, expand where results warrant."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
          {engagementModels.map((m) => (
            <article key={m.name} className="bg-card p-6 md:p-8">
              <p className="eyebrow">{m.best}</p>
              <h3 className="mt-3 text-lg font-medium tracking-tight">
                {m.name}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {m.body}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          The{" "}
          <Link
            to="/services"
            preload="intent"
            className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
          >
            services
          </Link>{" "}
          each map to one of these models.
        </p>
      </Section>

      <CtaBand
        title="The first meeting is a working session."
        lead="Bring the process you'd automate first. We'll map it live, name the risks, and tell you whether it's agent material."
      />
    </main>
  )
}
