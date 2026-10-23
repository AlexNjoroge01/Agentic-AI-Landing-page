import { createFileRoute, Link } from "@tanstack/react-router"
import {
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/section"
import { AgentLoopDiagram } from "@/components/agent-loop-diagram"
import { CtaBand } from "@/components/cta-band"
import { pageMeta, pageTitle } from "@/lib/seo"

export const Route = createFileRoute("/")({
  head: () => ({
    meta: pageMeta({
      title: pageTitle("AI Agents for Business Workflow Automation"),
      description:
        "The Agentic AI Lab designs and builds AI agents that automate complex business workflows — connected to your tools, APIs, databases, and operations.",
    }),
  }),
  component: HomePage,
})

const capabilities = [
  {
    number: "01",
    title: "Custom AI agents",
    body: "Purpose-built agents for specific business goals — order handling, claims intake, invoice processing, internal research, vendor follow-up — designed around your actual process rather than a generic template.",
  },
  {
    number: "02",
    title: "Workflow automation",
    body: "Multi-step operational processes spanning email, ERPs, CRMs, document stores, and internal APIs: automated end to end, with clear handling for the edge cases that break naive automations.",
  },
  {
    number: "03",
    title: "AI integration",
    body: "Agents connected to the systems you already run — REST APIs, SQL databases, CRMs, ERPs, file shares, ticketing tools — with scoped credentials, typed tool interfaces, and audit trails.",
  },
  {
    number: "04",
    title: "Business intelligence agents",
    body: "Agents that turn operational data into recurring reports, anomaly alerts, and recommended actions — so the numbers get read, not just produced.",
  },
  {
    number: "05",
    title: "Customer operations",
    body: "Support triage, order-status answers, lead qualification, and follow-up drafting — agents that handle the routine volume and route the rest to your team with full context attached.",
  },
  {
    number: "06",
    title: "Agentic systems engineering",
    body: "Evaluation sets, tool-use design, deployment pipelines, monitoring, and cost control for agent applications — the engineering discipline that separates a demo from a system you can rely on.",
  },
]

const useCases = [
  {
    problem: "Back-office document handling",
    body: "Invoices, PODs, contracts, and claims arrive by email and portal — then someone retypes them into the ERP. An agent reads, extracts, validates, and posts the structured data, flagging only genuine exceptions.",
  },
  {
    problem: "Lead triage and qualification",
    body: "Web forms, inbound emails, and events produce more leads than anyone triages promptly. An agent enriches against your CRM, scores against your criteria, drafts the first response, and books them in.",
  },
  {
    problem: "Customer order & status support",
    body: "“Where is my order?” consumes a support team. An agent looks up the order, the shipment, and the returns policy, answers the routine majority, and hands complex cases to a human with the full thread.",
  },
  {
    problem: "Operations reporting",
    body: "Reporting lives in six dashboards nobody reconciles. An agent compiles the numbers from source systems on schedule, explains variances, and proposes what to look at first.",
  },
]

const process = [
  {
    step: "Discovery",
    body: "Walk the actual process with the people who run it. Where does time go, where do errors start, which steps are judgment calls.",
  },
  {
    step: "Workflow design",
    body: "Define the agent's scope: what it reads, what it may change, which tools it gets, where a human decides. No autonomous system without boundaries.",
  },
  {
    step: "Integration",
    body: "Wire the agent to your systems with scoped credentials and typed interfaces — read where it can only read, write only where it should.",
  },
  {
    step: "Evaluation",
    body: "Test against real historical cases before anything touches production. Measure accuracy, failure modes, and cost per task.",
  },
  {
    step: "Deployment",
    body: "Ship behind human approval gates first. Entirely reversible by design: agents act through audited tool call, not side doors.",
  },
  {
    step: "Monitoring & improvement",
    body: "Track accuracy, drift, exceptions handled, and cost per completed workflow. Tune continuously as the process evolves.",
  },
]

function HomePage() {
  return (
    <main>
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border bg-grid">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60rem_28rem_at_50%_0%,black_30%,transparent)]"
        />
        <Container className="relative reveal py-20 md:py-28">
          <Eyebrow label="Agentic AI Lab" />
          <h1 className="mt-6 max-w-3xl text-4xl leading-[1.08] font-light tracking-[-0.025em] md:text-6xl">
            AI agents for the workflows
            <br className="hidden md:block" /> that run your business.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            We design and build agent systems that work through real business
            processes — reading documents, using your tools and APIs, updating
            systems — under defined controls. Built for reliability, not for the
            demo.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/contact"
              preload="intent"
              className="rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
            >
              Discuss a workflow
            </Link>
            <Link
              to="/services"
              preload="intent"
              className="rounded-md border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-background/70"
            >
              What we build
            </Link>
          </div>
          <p className="mt-8 text-xs text-muted-foreground">
            First step: a 30-minute walkthrough of one manual workflow — its
            steps, its systems, its bottlenecks. Free of charge, no deck.
          </p>
        </Container>
      </div>

      {/* Capabilities */}
      <Section id="capabilities">
        <SectionHeading
          eyebrow="01 — Capabilities"
          title="What we build"
          lead="Six areas of practice. Most engagements start in one and expand as the first workflow proves itself."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
          {capabilities.map((c) => (
            <article key={c.number} className="bg-card p-6 md:p-8">
              <p className="eyebrow">{c.number}</p>
              <h3 className="mt-3 text-lg font-medium tracking-tight">
                {c.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {c.body}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          See each service in detail on the{" "}
          <Link
            to="/services"
            preload="intent"
            className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
          >
            services page
          </Link>
          .
        </p>
      </Section>

      {/* Use cases */}
      <Section id="use-cases" className="border-t border-border">
        <SectionHeading
          eyebrow="02 — Use cases"
          title="Problems you’ll recognize"
          lead="The patterns below repeat across organizations of every size. If one of these costs you hours or headcount, it is a candidate for an agent."
        />
        <div className="mt-12 divide-y divide-border border-y border-border">
          {useCases.map((u) => (
            <article
              key={u.problem}
              className="grid gap-2 py-7 md:grid-cols-[0.38fr_0.62fr] md:gap-10"
            >
              <h3 className="text-base font-medium tracking-tight">
                {u.problem}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {u.body}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Your workflow may look different — that&rsquo;s fine.{" "}
          <Link
            to="/contact"
            preload="intent"
            className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
          >
            Describe it
          </Link>{" "}
          and we&rsquo;ll tell you straight whether an agent is the right tool.
        </p>
      </Section>

      {/* How it works */}
      <Section id="how-it-works" className="border-t border-border">
        <SectionHeading
          eyebrow="03 — Method"
          title="How an engagement works"
          lead="From a first conversation to a monitored production workflow. Each phase ends in something concrete you can evaluate."
        />
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((p, i) => (
            <li key={p.step} className="border-t-2 border-border pt-5">
              <p className="eyebrow">Step {String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2.5 text-base font-medium tracking-tight">
                {p.step}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Engineering credibility */}
      <Section id="engineering" className="border-t border-border bg-muted/30">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="04 — Engineering"
              title="An agent you can put in production"
              lead="Autonomy without applicability is a liability. Every system we ship is engineered around the questions auditors, operators, and engineers actually ask."
            />
            <ul className="mt-8 space-y-5">
              {[
                [
                  "Controlled tool use",
                  "Agents act through typed tool interfaces with scoped credentials — never through ad-hoc shell access or side doors.",
                ],
                [
                  "Human approval gates",
                  "High-consequence steps route through explicit human review. Automation expands as evidence justifies trust.",
                ],
                [
                  "Evaluation before deployment",
                  "Agents are scored against real historical cases — accuracy, exception rates, cost per task — before and after launch.",
                ],
                [
                  "Observability & audit",
                  "Every tool call, decision, and correction is logged. Behavior is reproducible when reviewed after the fact.",
                ],
                [
                  "Graceful failure",
                  "When the agent is uncertain, it says so and hands the case to a person — with the context to decide quickly.",
                ],
                [
                  "Runs where you operate",
                  "Your systems, your cloud or ours, under your data-residency requirements. No data trips to unnecessary destinations.",
                ],
              ].map(([title, body]) => (
                <li
                  key={title}
                  className="grid gap-1.5 md:grid-cols-[11rem_1fr] md:gap-6"
                >
                  <p className="text-sm font-medium">{title}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-5 md:p-7">
            <p className="text-sm font-medium">One action cycle</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Schematic of how a deployed agent operates — every step logged,
              judgment gated, executed through audited tools.
            </p>
            <div className="mt-4">
              <AgentLoopDiagram />
            </div>
          </div>
        </div>
      </Section>

      {/* Engagement */}
      <Section id="engagement" className="border-t border-border">
        <SectionHeading
          eyebrow="05 — Engagement"
          title="Starting with one workflow"
          lead="We begin small and specific: a single painful, repetitive workflow with measurable effort behind it. If an agent isn’t the right solution, we will say so — and often recommend the simpler automations first."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
          {[
            {
              name: "Workflow assessment",
              body: "A structured walkthrough of one process: steps, systems, volumes, error sources, and an honest recommendation — automation, agent, or nothing.",
            },
            {
              name: "Pilot build",
              body: "A scoped agent built around one workflow, evaluated against historical cases, deployed behind approval gates with agreed success measures.",
            },
            {
              name: "Build & run",
              body: "Ongoing engineering for agentic systems in production: monitoring, evaluation, expansion to adjacent workflows, and continuous tuning.",
            },
          ].map((e) => (
            <article key={e.name} className="bg-card p-6 md:p-8">
              <h3 className="text-lg font-medium tracking-tight">{e.name}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {e.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Have a workflow in mind?"
        lead="Tell us about one manual process — steps, systems, and the hours it consumes. We’ll respond with a candid assessment of what an agent could and couldn’t do."
      />
    </main>
  )
}
