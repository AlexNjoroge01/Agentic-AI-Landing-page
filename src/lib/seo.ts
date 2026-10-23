import type { JSX } from "react"
import { site } from "./site"

export type MetaTag = JSX.IntrinsicElements["meta"]

export type PageMetaOptions = {
  /** Human-readable page title, suffixed with the site name. */
  title: string
  /** Plain-language meta description (150–165 characters is a good target). */
  description: string
  /** Set to true for pages that must not be indexed (e.g. 404). */
  noindex?: boolean
}

/**
 * Builds the `head()` metadata for a route: title, description, Open Graph
 * and Twitter card tags. Canonical URLs are intentionally omitted until a
 * verified production domain is configured — see `site.ts`.
 */
export function pageMeta({
  title,
  description,
  noindex,
}: PageMetaOptions): MetaTag[] {
  const tags: MetaTag[] = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: site.name },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ]
  if (noindex) {
    tags.push({ name: "robots", content: "noindex, nofollow" })
  }
  return tags
}

export const pageTitle = (page: string) => `${page} — ${site.name}`
