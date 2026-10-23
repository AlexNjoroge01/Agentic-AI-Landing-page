import { createFileRoute } from "@tanstack/react-router"
import { Container, Eyebrow, Section } from "@/components/section"
import { site } from "@/lib/site"
import { pageMeta, pageTitle } from "@/lib/seo"

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: pageMeta({
      title: pageTitle("Privacy"),
      description:
        "What the Agentic AI Lab website collects through its contact form, how it is stored, and how long it is kept.",
    }),
  }),
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <main>
      <div className="border-b border-border">
        <Container className="py-16 md:py-20">
          <Eyebrow label="Privacy" />
          <h1 className="mt-6 text-4xl font-light tracking-[-0.025em] md:text-5xl">
            What this site collects — and what it doesn&rsquo;t.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            This summary describes data handling for this website honestly and
            in plain language. A formal privacy policy will replace it as the
            business details are finalized.
          </p>
        </Container>
      </div>

      <Section className="py-12 md:py-16">
        <div className="max-w-2xl space-y-10">
          <section>
            <h2 className="text-lg font-medium tracking-tight">Contact form</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              When you submit the contact form, we record the name, email
              address, optional company name, and workflow description you
              provide, together with the submission time. This information is
              stored only to respond to your inquiry and is not used for any
              other purpose, not sold, not shared with third parties, and not
              used to train machine-learning models.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium tracking-tight">
              Analytics & tracking
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              This website sets no advertising cookies, loads no third-party
              analytics, and embeds no tracking scripts. If that ever changes,
              this page will be updated first.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium tracking-tight">Retention</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Contact submissions are kept only as long as needed for the
              conversation they start. Write to{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
              >
                {site.email}
              </a>{" "}
              to request deletion of a submission at any time.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium tracking-tight">Contact</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Questions about any of the above:{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
              >
                {site.email}
              </a>
              .
            </p>
          </section>
        </div>
      </Section>
    </main>
  )
}
