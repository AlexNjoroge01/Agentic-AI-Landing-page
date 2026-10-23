import { site } from "@/lib/site"
import { cn } from "cn"

/**
 * The lab's mark: a small node-with-loop glyph — an agent collecting
 * signals from the systems around it. Pure inline SVG so it renders with
 * zero network cost and inherits `currentColor`.
 */
export function SiteLogo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className="size-6 text-primary"
      >
        <path
          d="M12 21a9 9 0 1 1 0-18"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M12 5.5h6.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H12"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M8.5 9.5h7v5h-7z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M2.75 6h2.5M2.75 18h2.5M12 2.75v2.5M12 18.75v2.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-[0.9375rem] font-medium tracking-tight text-foreground">
        {site.name}
      </span>
    </span>
  )
}
