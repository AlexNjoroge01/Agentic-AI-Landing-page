import { useEffect, useState } from "react"
import { Link, useRouterState } from "@tanstack/react-router"
import { primaryNav, site } from "@/lib/site"
import { SiteLogo } from "./site-logo"
import { cn } from "cn"

/**
 * Site chrome. The header is server-rendered; only the open/close state of
 * the mobile panel is client-side. The menu closes automatically whenever
 * navigation occurs.
 */
export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const linkClass = (isActive: boolean) =>
    cn(
      "px-3 py-2 text-sm transition-colors hover:text-foreground",
      isActive ? "font-medium text-foreground" : "text-muted-foreground"
    )

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          to="/"
          className="rounded-sm outline-offset-2"
          preload="intent"
          aria-label={`${site.name} — home`}
        >
          <SiteLogo />
        </Link>

        <nav aria-label="Main" className="hidden items-center md:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              preload="intent"
              className={cn(linkClass(pathname.startsWith(item.href)))}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            preload="intent"
            className="hidden rounded-md border border-border px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:inline-flex"
          >
            Discuss a workflow
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-9 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:hidden"
          >
            {open ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-4"
                fill="none"
              >
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-4"
                fill="none"
              >
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-border bg-background md:hidden"
        >
          <ul className="mx-auto w-full max-w-5xl px-5 py-3 sm:px-8">
            {primaryNav.map((item) => (
              <li
                key={item.href}
                className="border-b border-border/70 last:border-b-0"
              >
                <Link
                  to={item.href}
                  preload="intent"
                  className={cn(
                    "block py-3 text-base",
                    pathname.startsWith(item.href)
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Link
                to="/contact"
                preload="intent"
                className="block rounded-md border border-border px-3.5 py-2.5 text-center text-sm font-medium text-foreground"
              >
                Discuss a workflow
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
