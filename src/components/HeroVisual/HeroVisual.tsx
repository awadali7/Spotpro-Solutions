import { cn } from "@/lib/utils";

const CENTER = 230;
const RINGS = [190, 140, 92] as const;

/**
 * Rounded because this SVG is server-rendered: V8 and JavaScriptCore disagree on
 * the last bits of Math.cos, which produced 184.00000000000003 vs 184 and made
 * React bail out of hydration in Safari.
 */
function polar(radius: number, degrees: number) {
  const rad = (degrees * Math.PI) / 180;
  const round = (n: number) => Math.round(n * 1000) / 1000;
  return {
    x: round(CENTER + radius * Math.cos(rad)),
    y: round(CENTER - radius * Math.sin(rad)),
  };
}

const outer = [90, 210, 330].map((d) => polar(RINGS[0], d));
const mid = [30, 150, 270].map((d) => polar(RINGS[1], d));
const inner = [0, 120, 240].map((d) => polar(RINGS[2], d));

const nodes = [
  ...outer.map((p) => ({ ...p, r: 5 })),
  ...mid.map((p) => ({ ...p, r: 6.5 })),
  ...inner.map((p) => ({ ...p, r: 5.5 })),
];

const hub = { x: CENTER, y: CENTER };

const edges = [
  // hub out to the inner ring
  ...inner.map((p) => ({ from: hub, to: p })),
  // inner ring to mid ring
  { from: inner[0], to: mid[0] },
  { from: inner[1], to: mid[1] },
  { from: inner[2], to: mid[2] },
  { from: inner[0], to: mid[2] },
  // mid ring to outer ring
  { from: mid[0], to: outer[0] },
  { from: mid[1], to: outer[1] },
  { from: mid[2], to: outer[2] },
  { from: mid[0], to: outer[2] },
  { from: mid[1], to: outer[0] },
];

export function HeroVisual({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 460 460"
      className={cn("overflow-visible", className)}
      role="img"
      aria-label="Abstract illustration of a neural network radiating from a central hub"
    >
      <defs>
        <linearGradient id="hv-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--highlight)" stopOpacity="0.35" />
        </linearGradient>
        <radialGradient id="hv-node">
          <stop offset="0%" stopColor="var(--highlight)" />
          <stop offset="100%" stopColor="var(--secondary)" />
        </radialGradient>
        <radialGradient id="hv-glow">
          <stop offset="0%" stopColor="var(--highlight)" stopOpacity="0.28" />
          <stop offset="65%" stopColor="var(--highlight)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={CENTER} cy={CENTER} r={210} fill="url(#hv-glow)" />

      {RINGS.map((r, i) => (
        <circle
          key={r}
          cx={CENTER}
          cy={CENTER}
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeOpacity={0.28}
          strokeWidth={1}
          strokeDasharray={i === 1 ? "2 10" : "3 9"}
          className={cn("hero-orbit", i === 1 && "hero-orbit-reverse")}
          style={{ animationDuration: `${38 + i * 14}s` }}
        />
      ))}

      {edges.map((edge, i) => (
        <line
          key={i}
          x1={edge.from.x}
          y1={edge.from.y}
          x2={edge.to.x}
          y2={edge.to.y}
          stroke="url(#hv-edge)"
          strokeWidth={1.25}
        />
      ))}

      {nodes.map((node, i) => (
        <g key={i} className="hero-node" style={{ animationDelay: `${i * 0.45}s` }}>
          <circle cx={node.x} cy={node.y} r={node.r * 2.6} fill="var(--highlight)" opacity={0.12} />
          <circle cx={node.x} cy={node.y} r={node.r} fill="url(#hv-node)" />
        </g>
      ))}

      <circle cx={hub.x} cy={hub.y} r={26} fill="var(--highlight)" opacity={0.16} />
      <circle cx={hub.x} cy={hub.y} r={13} fill="url(#hv-node)" />
    </svg>
  );
}
