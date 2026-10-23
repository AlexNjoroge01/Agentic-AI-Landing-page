import { cn } from "cn"

/**
 * A restrained schematic of one agent action cycle:
 * process → agent → tools/systems → human review → logged execution.
 * Pure inline SVG — no animation, no layout shift, works without JS.
 */
export function AgentLoopDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 300"
      role="img"
      aria-label="Diagram of an agent workflow: a business process feeds an agent, which calls scoped tools across business systems, proposes an action, and a human approves before execution — with results monitored and logged."
      className={cn("w-full text-muted-foreground", className)}
    >
      {/* hairline background grid */}
      <defs>
        <pattern
          id="diag-grid"
          width="28"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M28 0H0v28"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.14"
            strokeWidth="0.5"
          />
        </pattern>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0L10 5L0 10z" fill="currentColor" />
        </marker>
      </defs>
      <rect
        width="560"
        height="300"
        fill="url(#diag-grid)"
        fillOpacity="0.35"
      />

      <g
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* 1. business systems / workflow */}
        <rect x="24" y="40" width="150" height="64" rx="8" />
        <text
          x="99"
          y="68"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          fontSize="12"
          fontWeight="500"
          className="fill-foreground"
        >
          Your workflow
        </text>
        <text
          x="99"
          y="86"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          fontSize="10.5"
          opacity="0.75"
        >
          in your systems
        </text>

        {/* 2. agent */}
        <rect
          x="248"
          y="34"
          width="128"
          height="76"
          rx="10"
          strokeOpacity="0.9"
        />
        <circle cx="312" cy="58" r="9" />
        <text
          x="312"
          y="86"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          fontSize="12"
          fontWeight="500"
          className="fill-foreground"
        >
          Agent
        </text>

        {/* 3. scoped tools */}
        <rect x="452" y="24" width="84" height="34" rx="6" />
        <rect x="452" y="66" width="84" height="34" rx="6" />
        <rect x="452" y="108" width="84" height="34" rx="6" />
        <text
          x="494"
          y="45"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          fontSize="10.5"
          opacity="0.85"
        >
          APIs
        </text>
        <text
          x="494"
          y="87"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          fontSize="10.5"
          opacity="0.85"
        >
          Databases
        </text>
        <text
          x="494"
          y="129"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          fontSize="10.5"
          opacity="0.85"
        >
          Internal tools
        </text>

        {/* 4. human approval */}
        <rect x="330" y="188" width="128" height="52" rx="8" />
        <text
          x="394"
          y="210"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          fontSize="10.5"
          opacity="0.85"
        >
          Human
        </text>
        <text
          x="394"
          y="226"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          fontSize="12"
          fontWeight="500"
          className="fill-foreground"
        >
          approval
        </text>

        {/* 5. executed step */}
        <rect x="24" y="196" width="150" height="52" rx="8" />
        <text
          x="99"
          y="218"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          fontSize="10.5"
          opacity="0.85"
        >
          Executed step,
        </text>
        <text
          x="99"
          y="234"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          fontSize="12"
          fontWeight="500"
          className="fill-foreground"
        >
          fully logged
        </text>

        {/* arrows: workflow -> agent */}
        <path d="M174 66 C 210 66, 214 70, 244 70" markerEnd="url(#arrow)" />
        {/* agent <-> tools */}
        <path d="M376 60 L 448 40" markerEnd="url(#arrow)" />
        <path d="M376 72 L 448 82" markerEnd="url(#arrow)" />
        <path
          d="M376 84 L 446 124"
          markerEnd="url(#arrow)"
          strokeOpacity="0.7"
        />
        {/* agent -> approval */}
        <path
          d="M340 110 C 356 148, 380 168, 392 184"
          markerEnd="url(#arrow)"
        />
        {/* approval -> executed */}
        <path
          d="M326 216 C 280 232, 226 228, 178 222"
          markerEnd="url(#arrow)"
        />
        {/* executed -> agent (feedback) */}
        <path
          d="M99 192 C 99 120, 180 88, 244 80"
          markerEnd="url(#arrow)"
          strokeDasharray="4 4"
          strokeOpacity="0.7"
        />
      </g>

      {/* step labels */}
      <g
        fill="currentColor"
        fontSize="9.5"
        opacity="0.6"
        style={{ letterSpacing: "0.08em" }}
      >
        <text x="24" y="24">
          01 · SENSE
        </text>
        <text x="248" y="18">
          02 · DECIDE
        </text>
        <text x="330" y="178">
          03 · CHECK
        </text>
        <text x="24" y="184">
          04 · ACT
        </text>
      </g>
    </svg>
  )
}
