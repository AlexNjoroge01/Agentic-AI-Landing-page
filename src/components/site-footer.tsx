import { Link } from "@tanstack/react-router"
import { footerNav, site } from "@/lib/site"
import { SiteLogo } from "./site-logo"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <SiteLogo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              We design and build AI agent systems that automate complex
              business workflows — connected to your tools, APIs, databases, and
              operations.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-block text-sm text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
            >
              {site.email}
            </a>
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="text-sm font-medium text-foreground">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      preload="intent"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>{site.tagline.charAt(0).toUpperCase() + site.tagline.slice(1)}</p>
        </div>
      </div>
    </footer>
  )
}
