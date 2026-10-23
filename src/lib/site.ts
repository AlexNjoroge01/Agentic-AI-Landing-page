/**
 * Central site configuration.
 *
 * NOTE: `contactEmail` is a placeholder — replace it with the lab's real
 * inbox before launch. It is surfaced in the footer and on every page that
 * offers direct contact, and is used as the mailto fallback when the
 * contact form's message delivery is unavailable.
 */
export const site = {
  name: "Agentic AI Lab",
  tagline: "AI agents for business workflow automation",
  description:
    "The Agentic AI Lab designs and builds AI agent systems that automate complex business workflows — connected to your tools, APIs, databases, and operations.",
  // TODO: replace with the verified production domain once known, e.g.
  // "https://agenticailab.com". Used by vite.config.ts for the sitemap.
  // Canonical URLs stay absent until a verified domain exists.
  email: "hello@agenticai-lab.com",
  foundedYear: 2025,
} as const

export type NavItem = {
  label: string
  href: string
  description?: string
}

export const primaryNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "How we work", href: "/how-we-work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Company",
    items: [
      { label: "About the lab", href: "/about" },
      { label: "How we work", href: "/how-we-work" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "Custom AI agents", href: "/services" },
      { label: "Workflow automation", href: "/services" },
      { label: "AI integration", href: "/services" },
      { label: "Agentic systems engineering", href: "/services" },
    ],
  },
  {
    title: "Legal",
    items: [{ label: "Privacy", href: "/privacy" }],
  },
]
