import { useState } from "react"
import { Link } from "@tanstack/react-router"
import {
  submitContact,
  type ContactInput,
  type ContactResult,
} from "@/server/contact"
import { site } from "@/lib/site"
import { cn } from "cn"

type Status = "idle" | "submitting" | "success" | "error"

const fieldClasses =
  "w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none aria-[invalid=true]:border-destructive"

/**
 * Client-side surface for the contact server function. Validation runs on
 * the client for immediate feedback and again on the server on submit.
 *
 * On success the message is stored on the server (see src/server/contact.ts).
 * If storage is unavailable, the form switches to an honest fallback: it
 * tells the visitor the submission could not be delivered and opens a
 * prefilled email instead of showing a fake confirmation.
 */
export function ContactForm() {
  const [values, setValues] = useState<ContactInput>({
    name: "",
    email: "",
    company: "",
    workflow: "",
  })
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ContactInput, string>>
  >({})
  const [status, setStatus] = useState<Status>("idle")
  const [formError, setFormError] = useState<string | null>(null)

  const set =
    (key: keyof ContactInput) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }))
    }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === "submitting") return
    setStatus("submitting")
    setFormError(null)

    // Honeypot: quietly accept and discard bot submissions.
    if (values.website) {
      setStatus("success")
      return
    }

    let result: ContactResult
    try {
      result = await submitContact({ data: { ...values } })
    } catch {
      setFormError("Something went wrong while sending your message.")
      setStatus("error")
      return
    }

    if (result.ok) {
      setStatus("success")
      return
    }

    if (result.deliveryFailed) {
      setFormError(
        "Your message could not be delivered from this deployment. " +
          "Please email us directly so we don\u2019t miss it."
      )
      setStatus("error")
      return
    }

    setFieldErrors(result.errors)
    setFormError("Please review the highlighted fields.")
    setStatus("error")
  }

  const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
    "Workflow inquiry"
  )}&body=${encodeURIComponent(
    `Name: ${values.name}\nEmail: ${values.email}\nCompany: ${values.company}\n\nWorkflow:\n${values.workflow}`
  )}`

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-lg border border-border bg-card p-6 md:p-8"
      >
        <h3 className="text-lg font-medium">Thank you — your message is in.</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          It has been recorded and routed to the lab inbox. If you don&rsquo;t
          hear back within a few business days, or you&rsquo;d like to add more
          detail sooner, email us directly at{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
          >
            {site.email}
          </a>
          .
        </p>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground/80">
          What we do with it: your details are used solely to respond to this
          inquiry (see the{" "}
          <Link
            to="/privacy"
            className="underline underline-offset-2"
            preload="intent"
          >
            privacy note
          </Link>
          ).
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="contact-name" error={fieldErrors.name}>
          <input
            id="contact-name"
            type="text"
            name="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={set("name")}
            aria-invalid={fieldErrors.name ? true : undefined}
            className={fieldClasses}
          />
        </Field>
        <Field
          label="Work email"
          htmlFor="contact-email"
          error={fieldErrors.email}
        >
          <input
            id="contact-email"
            type="email"
            name="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={set("email")}
            aria-invalid={fieldErrors.email ? true : undefined}
            className={fieldClasses}
          />
        </Field>
        <Field
          label="Company (optional)"
          htmlFor="contact-company"
          className="sm:col-span-2"
        >
          <input
            id="contact-company"
            type="text"
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={set("company")}
            className={fieldClasses}
          />
        </Field>
      </div>

      <Field
        label="The workflow you’d like to automate"
        htmlFor="contact-workflow"
        hint="What happens today, which systems are involved, where the manual effort sits."
        error={fieldErrors.workflow}
      >
        <textarea
          id="contact-workflow"
          name="workflow"
          required
          rows={6}
          value={values.workflow}
          onChange={set("workflow")}
          aria-invalid={fieldErrors.workflow ? true : undefined}
          className={cn(fieldClasses, "resize-y")}
        />
      </Field>

      {/* Honeypot — hidden from humans, filled by naive bots. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] size-px overflow-hidden"
      >
        <label htmlFor="contact-website">Leave empty</label>
        <input
          id="contact-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={set("website")}
        />
      </div>

      <div className="flex flex-col gap-4 pt-1">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="size-4 animate-spin"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeOpacity="0.25"
                  strokeWidth="2.5"
                />
                <path
                  d="M21 12a9 9 0 0 0-9-9"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              Sending…
            </>
          ) : (
            "Send the workflow brief"
          )}
        </button>

        <p aria-live="polite" className="min-h-5 text-sm text-destructive">
          {status === "error" && formError ? formError : ""}
        </p>
      </div>

      {status === "error" && (
        <p className="text-sm text-muted-foreground">
          <a
            href={mailtoHref}
            className="text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
          >
            Email this brief instead
          </a>
          {" — opens your email client with everything prefilled."}
        </p>
      )}
    </form>
  )
}

function Field({
  label,
  htmlFor,
  hint,
  error,
  className,
  children,
}: {
  label: string
  htmlFor: string
  hint?: string
  error?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="block text-sm font-medium">
        {label}
      </label>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      <div className="mt-2">{children}</div>
      <p className="mt-1.5 min-h-4 text-xs text-destructive">{error ?? ""}</p>
    </div>
  )
}
