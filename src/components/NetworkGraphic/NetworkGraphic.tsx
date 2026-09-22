import { Cuboid } from "@/components/IsoModel";

/**
 * The Who We Are artwork on `/about-us`. Replaced a flat 8-node / 10-edge
 * line graph, which read as a generic network diagram and sat thin next to
 * the column of copy beside it.
 *
 * It composes from `IsoModel`'s `Cuboid` so projection, glass tones and edge
 * lighting stay identical to the work-card models. Those tones are translucent
 * and tuned for a navy surface — on the light page background they would all
 * but disappear — so the panel carries its own `--navy` plate and brand glow,
 * the same treatment `ExpertiseCard` uses to sit a dark card on a light page.
 *
 * Block positions are derived from the plate's top face rather than eyeballed
 * (`cx + 0.866(u - v)`, `cy + (u + v) / 2 - h` for a block standing at grid
 * coordinates u, v), so every block sits *on* the platform instead of floating
 * above it, and they are ordered back-to-front by `u + v` so the overlaps
 * resolve correctly. The group transform recentres the computed bounding box
 * (x 19.9..224.3, y 71..215) inside the 360x300 panel.
 */
export function NetworkGraphic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 300"
      className={className}
      role="img"
      aria-label="Isometric illustration of separate systems built on one shared platform"
    >
      <defs>
        <radialGradient id="ng-glow" cx="18%" cy="2%" r="90%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ng-shadow">
          <stop offset="0%" stopColor="#041020" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#041020" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="360" height="300" rx="20" fill="var(--navy)" />
      <rect width="360" height="300" rx="20" fill="url(#ng-glow)" />

      <g transform="translate(5.52 -54.31) scale(1.4287)">
        <ellipse
          cx={122.1}
          cy={211}
          rx={98.1}
          ry={26.6}
          fill="url(#ng-shadow)"
        />

        {/* The platform everything stands on. */}
        <Cuboid cx={110} cy={90} w={132} d={104} h={7} tone="dim" />

        {/* Modules, ordered back to front by u + v so overlaps resolve. */}
        <Cuboid cx={111.73} cy={71} w={18} d={18} h={32} tone="accent" />
        <Cuboid cx={137.71} cy={76} w={18} d={18} h={48} tone="light" />
        <Cuboid cx={80.56} cy={87} w={18} d={18} h={38} tone="light" />
        <Cuboid cx={174.08} cy={115} w={18} d={18} h={24} tone="dim" />
        <Cuboid cx={108.27} cy={129} w={18} d={18} h={18} tone="accent" />
        <Cuboid cx={146.37} cy={133} w={18} d={18} h={28} tone="dim" />
      </g>
    </svg>
  );
}
