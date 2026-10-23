import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"

import appCss from "../styles.css?url"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Container, Eyebrow } from "@/components/section"
import { site } from "@/lib/site"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title: `${site.name} — ${site.tagline}`,
      },
      {
        name: "description",
        content:
          "We design and build AI agent systems that automate complex business workflows — connected to your tools, APIs, databases, and operations.",
      },
      { name: "theme-color", content: "#f9f9f7" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "mask-icon", href: "/favicon.svg", color: "#0f1017" },
      { rel: "manifest", href: "/manifest.json" },
    ],
  }),
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
})

function NotFound() {
  return (
    <main>
      <Container className="flex min-h-[60svh] flex-col justify-center py-24">
        <Eyebrow label="404" />
        <h1 className="mt-5 text-4xl font-light tracking-[-0.02em] md:text-5xl">
          This page doesn&rsquo;t exist.
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
          The address may be mistyped, or the page may have moved. Start from
          the homepage, or tell us about the workflow you&rsquo;re trying to
          automate.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/"
            className="rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
          >
            Back to homepage
          </Link>
          <Link
            to="/contact"
            className="rounded-md border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Discuss a workflow
          </Link>
        </div>
      </Container>
    </main>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-svh flex-col">
        <div className="flex flex-1 flex-col">
          <SiteHeader />
          {children}
        </div>
        <SiteFooter />
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
