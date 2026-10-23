# Agentic AI Lab

Marketing website for Agentic AI Lab, built with [TanStack Start](https://tanstack.com/start), React 19, TypeScript, Tailwind CSS v4, and shadcn/ui. Pages are prerendered at build time and a sitemap is generated automatically based on the configured site URL.

## Prerequisites

- **Node.js** 20.19+ (22 is recommended)
- **pnpm** 10+ (`corepack enable` gets you pnpm if you have Node installed)

## Getting started

Install dependencies:

```bash
pnpm install
```

Start the dev server on [http://localhost:3000](http://localhost:3000):

```bash
pnpm dev
```

## Production build

Build the site (prerenders pages and generates a sitemap):

```bash
pnpm build
```

Then preview the production build locally:

```bash
pnpm preview
```

To generate the sitemap against a real domain, set `SITE_URL` at build time:

```bash
SITE_URL=https://your-domain.com pnpm build
```

## Available scripts

| Script                | Description                                      |
| --------------------- | ------------------------------------------------ |
| `pnpm dev`            | Start the dev server on port 3000                |
| `pnpm build`          | Production build with prerendering and sitemap   |
| `pnpm preview`        | Preview the production build                     |
| `pnpm lint`           | Run ESLint                                       |
| `pnpm typecheck`      | Run TypeScript with no emit                      |
| `pnpm format`         | Format code with Prettier                        |
| `pnpm check`          | Check formatting without writing changes         |
| `pnpm generate-routes`| Regenerate the TanStack Router route tree        |

## Project structure

- `src/routes/` — File-based routes (home, about, services, how-we-work, contact, privacy) via TanStack Router
- `src/components/` — Shared components (site header/footer, CTA band, contact form, diagrams)
- `src/components/ui/` — shadcn/ui primitives
- `src/server/` — Server functions (e.g. contact form handling)
- `src/lib/` — Utilities, site config, and SEO helpers
- `public/` — Static assets

## Adding shadcn/ui components

To add a new component, run:

```bash
pnpx shadcn@latest add button
```

This places components in `src/components/ui/`. Import them like:

```tsx
import { Button } from "@/components/ui/button";
```
