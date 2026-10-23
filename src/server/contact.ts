import { createServerFn } from "@tanstack/react-start"

export type ContactInput = {
  name: string
  email: string
  company?: string
  workflow: string
  /** Honeypot field — bots fill it, humans never see it. Must stay empty. */
  website?: string
}

export type ContactFieldErrors = Partial<Record<keyof ContactInput, string>>

export type ContactResult =
  | { ok: true }
  | {
      ok: false
      /** Field-level validation messages, keyed by form field name. */
      errors: ContactFieldErrors
      /** Set when submission failed after validation (e.g. storage error). */
      deliveryFailed?: boolean
    }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Defensive extration: server functions can be called with arbitrary data. */
function asText(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

function validate(data: Record<string, unknown> | null): ContactFieldErrors {
  const errors: ContactFieldErrors = {}
  const name = data ? asText(data.name) : ""
  const email = data ? asText(data.email) : ""
  const workflow = data ? asText(data.workflow) : ""

  if (name.length < 2) errors.name = "Please enter your name."
  if (!EMAIL_RE.test(email))
    errors.email = "Please enter a valid email address."
  if (workflow.length < 20)
    errors.workflow =
      "Please describe the workflow in at least a sentence or two."
  return errors
}

/**
 * Receives the "discuss a workflow" form.
 *
 * Validation runs on the server; messages are persisted on the server's
 * storage (`CONTACT_LOG_DIR`, defaults to `.data/`) as newline-delimited
 * JSON. There is deliberately no fake outbound email: when persistence
 * fails, the caller gets `deliveryFailed` and the UI offers a mailto
 * fallback instead of pretending the message was sent.
 */
export const submitContact = createServerFn({ method: "POST" })
  .validator((data: unknown) => data)
  .handler(async ({ data }): Promise<ContactResult> => {
    const body =
      typeof data === "object" && data !== null
        ? (data as Record<string, unknown>)
        : null

    // Honeypot: quietly "succeed" for naive bots so they do not retry.
    if (body && asText(body.website)) return { ok: true }

    const errors = validate(body)
    if (Object.keys(errors).length > 0 || !body) return { ok: false, errors }

    const record = {
      receivedAt: new Date().toISOString(),
      name: asText(body.name),
      email: asText(body.email),
      company: asText(body.company) || undefined,
      workflow: asText(body.workflow),
    }

    try {
      const { mkdir, appendFile } = await import("node:fs/promises")
      const path = await import("node:path")
      const dir =
        process.env.CONTACT_LOG_DIR ?? path.join(process.cwd(), ".data")
      await mkdir(dir, { recursive: true })
      await appendFile(
        path.join(dir, "contact-submissions.jsonl"),
        JSON.stringify(record) + "\n",
        "utf8"
      )
      return { ok: true }
    } catch {
      return { ok: false, errors: {}, deliveryFailed: true }
    }
  })
