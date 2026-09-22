/**
 * Aceternity's features-section grid backdrop, adapted for this repo.
 *
 * Four changes from the source, each for a reason already recorded in
 * `PROJECT-STATE.md`:
 *
 * 1. **No `Math.random()` in render.** The original picks five random squares
 *    every render, so the server and client markup disagree and hydration
 *    breaks — the same bug that was fixed in `meteors`. Squares now come from a
 *    deterministic integer hash of a `seed`.
 * 2. **No `useId`, so it stays a Server Component.** `useId` is a hook and
 *    would force `"use client"` on every card. The caller passes a stable `id`
 *    instead, which also keeps the SVG `<pattern>` ids unique — several inline
 *    SVGs in one document share an id space and would otherwise collide.
 * 3. **No `any`.** The original types `GridPattern`'s props and its `squares`
 *    entries as `any`, which strict mode and eslint both reject.
 * 4. **Brand tokens, not `neutral`/`zinc`.** Light mode is this site's shipped
 *    default; the source is written dark-mode-first.
 */

type Square = [column: number, row: number];

/** Deterministic 32-bit integer hash — same output on server and client. */
const hash = (value: number) => {
  let h = (value ^ 0x9e3779b9) >>> 0;
  h = Math.imul(h ^ (h >>> 16), 0x85ebca6b) >>> 0;
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35) >>> 0;
  return (h ^ (h >>> 16)) >>> 0;
};

/** Five squares in the source's ranges: column 7–10, row 1–6. */
const squaresFor = (seed: number): Square[] =>
  Array.from({ length: 5 }, (_, i) => [
    (hash(seed * 97 + i * 31) % 4) + 7,
    (hash(seed * 131 + i * 17) % 6) + 1,
  ]);

export function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  id,
  className,
}: {
  width: number;
  height: number;
  x: string;
  y: string;
  squares: Square[];
  /** Must be unique per instance — SVG ids are document-global. */
  id: string;
  className?: string;
}) {
  return (
    <svg aria-hidden="true" className={className}>
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(([column, row]) => (
          <rect
            key={`${column}-${row}`}
            strokeWidth="0"
            width={width + 1}
            height={height + 1}
            x={column * width}
            y={row * height}
          />
        ))}
      </svg>
    </svg>
  );
}

export function Grid({
  id,
  seed = 0,
  size = 20,
  pattern,
}: {
  id: string;
  /** Varies the square placement so neighbouring cards don't match. */
  seed?: number;
  size?: number;
  pattern?: Square[];
}) {
  return (
    <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)] [-webkit-mask-image:linear-gradient(white,transparent)]">
      <div className="from-muted/40 to-muted/40 absolute inset-0 bg-gradient-to-r opacity-100 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] [-webkit-mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
        <GridPattern
          id={id}
          width={size}
          height={size}
          x="-12"
          y="4"
          squares={pattern ?? squaresFor(seed)}
          className="fill-primary/10 stroke-primary/10 absolute inset-0 h-full w-full mix-blend-multiply"
        />
      </div>
    </div>
  );
}
