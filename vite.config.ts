import { defineConfig } from "vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

/**
 * Production origin used for sitemap generation and prerendering.
 * Set SITE_URL (e.g. https://agenticailab.com) at build time once the
 * verified domain exists; the default keeps local builds working.
 * Canonical link tags remain absent until the domain is set.
 */
const siteUrl = (process.env.SITE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  ""
)

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackStart({
      sitemap: { host: siteUrl },
      prerender: { enabled: true, autoStaticPathsDiscovery: true },
    }),
    viteReact(),
  ],
})

export default config
