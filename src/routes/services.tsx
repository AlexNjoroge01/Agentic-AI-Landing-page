import { createFileRoute, Link } from "@tanstack/react-router"
import { Container, Eyebrow, Section } from "@/components/section"
import { CtaBand } from "@/components/cta-band"
import { pageMeta, pageTitle } from "@/lib/seo"

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: pageMeta({
      title: pageTitle("Services"),
      description:
        "Custom AI agents, workflow automation, AI integration, business intelligence agents, customer operations, and agentic systems engineering — built for business reliability.",
    }),
  }),
  component: ServicesPage,
})

const services = [
  {
    id: "custom-agents",
    name: "Custom AI agents",
    lead: "Purpose-built agents for specific business goals and workflows.",
    intro:
      "A custom agent is designed around one process and one outcome: claims processed, leads qualified, purchase orders matched, tickets resolved. It gets exactly the tools and data it needs — structured tool access against your systems, defined escalation paths, and measurable accuracy targets.",
    includes: [
      "Workflow analysis and agent design",
      "Typed tool interfaces for your APIs, databases, and internal apps",
      "Prompt, context, and memory design suited to the task",
      "Evaluation against your historical cases before launch",
      "Approval gates and escalation to your team where judgment is required",
    ],
  },
  {
    id: "workflow-automation",
    name: "Workflow automation",
    lead: "Automating multi-step operational processes across business systems.",
    intro:
      "Many expensive processes span five systems and two inboxes, breaking whenever a step deviates from the script. We automate these end to end — with the agent handling the variation that rules-based tools choke on, and workflows handling the deterministic remainder.",
    includes: [
      "End-to-end process mapping, including exception paths",
      "Agents combined with deterministic workflow rules where each fits best",
      "Document and email intake, extraction, and validation",
      "Structured handoffs between automated steps and human owners",
      "Reprocessing and correction paths for the cases automation gets wrong",
    ],
  },
  {
    id: "ai-integration",
    name: "AI integration",
    lead: "Connecting agents to the systems you already rely on.",
    intro:
      "An agent without system access is a chat box, and a chat box isn't an operational improvement. We integrate agents with your existing estate — CRMs, ERPs, ticketing, data warehouses, file stores, scheduling, and messaging — so work happens in the systems of record your business already runs.",
    includes: [
      "Connection to REST/GraphQL APIs, SQL databases, and file shares",
      "Scoped credentials with least-privilege permissions",
      "Idempotent, audited write operations where agents act on records",
      "Sandbox-first rollout and dry-run modes for every integration",
      "Integration with identity, logging, and monitoring you already use",
    ],
  },
  {
    id: "business-intelligence-agents",
    name: "Business intelligence agents",
    lead: "Turning operational data into reports, insights, and recommended actions.",
    intro:
      "Reports nobody reads are a cost with no return. BI agents compile recurring metrics from source systems, explain variances in plain language, flag anomalies worth attention, and propose concrete next steps — delivered where your team already works.",
    includes: [
      "Scheduled briefings from your operational systems",
      "Variance and anomaly analysis with stated confidence",
      "Natural-language querying of governed data sources",
      "Recommended actions with the supporting numbers attached",
      "Delivery into email, chat, or your internal tools",
    ],
  },
  {
    id: "customer-operations",
    name: "Customer operations agents",
    lead: "Support, order tracking, lead qualification, and customer-facing volume.",
    intro:
      "Customer operations consume headcount with predictable, repetitive requests. Agents handle the routine majority — answer status questions, draft responses for approval, qualify inbound leads — and hand everything non-routine to your team with the full context attached.",
    includes: [
      "Support triage and routing with priority detection",
      "Order, shipment, and billing status resolution from your systems",
      "Lead qualification, enrichment, and first-response drafting",
      "Human-in-the-loop modes: agent drafts, your team approves",
      "Escalation with complete interaction history — no repeated questions",
    ],
  },
  {
    id: "agentic-systems-engineering",
    name: "Agentic systems engineering",
    lead: "The engineering discipline behind reliable agentic applications.",
    intro:
      "Sales demos are easy; production reliability is an engineering problem. We design, evaluate, deploy, and monitor agentic systems as serious software: versioned changes, regression tests for behavior, cost budgets, and failure analysis — so the agent that went live in month one is still improving in month twelve.",
    includes: [
      "Evaluation sets built from real workload samples",
      "Automated behavior regression testing on every change",
      "Monitoring for accuracy, drift, latency, and cost per task",
      "Structured failure review and retraining/retuning loops",
      "Documentation your own engineers can maintain",
    ],
  },
]

function ServicesPage() {
  return (
    <main>
      <div className="border-b border-border bg-grid">
        <Container className="relative py-16 md:py-24">
          <Eyebrow label="Services" />
          <h1 className="mt-6 max-w-2xl text-4xl leading-[1.1] font-light tracking-[-0.025em] md:text-5xl">
            Engineering-first, engagement-specific agent systems.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Every service below exists to move manual work out of your
            operations — with the controls, integrations, and verification that
            make it trustworthy.
          </p>
        </Container>
      </div>

      <Section className="py-14 md:py-20">
        <nav
          aria-label="Services"
          className="flex flex-wrap gap-x-6 gap-y-2 border-b border-border pb-6 text-sm"
        >
          {services.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {String(i + 1).padStart(2, "0")} {s.name}
            </a>
          ))}
        </nav>
      </Section>

      <div className="border-t border-border">
        {services.map((s, i) => (
          <Section key={s.id} id={s.id} className="border-b border-border">
            <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
              <div>
                <p className="eyebrow">
                  Service {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-4 text-2xl font-light tracking-[-0.02em] md:text-3xl">
                  {s.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {s.lead}
                </p>
              </div>
              <div>
                <p className="text-sm leading-relaxed text-foreground/90 md:text-base">
                  {s.intro}
                </p>
                <h3 className="mt-8 text-sm font-medium">
                  What an engagement includes
                </h3>
                <ul className="mt-4 space-y-3">
                  {s.includes.map((item) => (
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
              </div>
            </div>
          </Section>
        ))}
      </div>

      <Section>
        <div className="max-w-xl">
          <h2 className="text-2xl font-light tracking-[-0.02em] md:text-3xl">
            Not sure which fits?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            Most engagements start with a single workflow assessment, not a
            service tier. Describe the process;{" "}
            <Link
              to="/contact"
              preload="intent"
              className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
            >
              we&rsquo;ll recommend
            </Link>{" "}
            the smallest reliable approach.
          </p>
        </div>
      </Section>

      <CtaBand
        title="Pick one workflow to start."
        lead="The first agent doesn't need to be ambitious. It needs to work, measurably, on a process you care about."
      />
    </main>
  )
}
