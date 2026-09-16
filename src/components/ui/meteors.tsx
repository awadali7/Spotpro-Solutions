import { cn } from "@/lib/utils";

/*
 * Aceternity "Meteors", adapted for this repo:
 * - Server Component. Upstream wrapped the shower in a `motion.div` just to
 *   fade it in; the meteors already start hidden above the container, so the
 *   wrapper bought nothing and cost a client bundle.
 * - Deterministic timing. Upstream called Math.random() during render, which
 *   differs between server and client and breaks hydration. `seed` lets two
 *   showers of the same size still look different.
 * - Positions are percentages of the container, not a fixed 800px spread, so
 *   wide and narrow cards are covered evenly.
 * - Motion lives in `.meteor` in globals.css, gated on reduced motion (and the
 *   `?motion=on` override). Under reduce the meteors never appear.
 */

// Integer hash in [0, 1). Integer maths keeps output identical across JS engines.
const hash = (n: number) => ((Math.imul(n + 1, 2654435761) >>> 16) % 1000) / 1000;

export const Meteors = ({
  number = 20,
  seed = 0,
  className,
}: {
  number?: number;
  seed?: number;
  className?: string;
}) => {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {Array.from({ length: number }, (_, idx) => {
        const key = seed * 97 + idx * 2;
        // Spread starts from -50% to 90%: meteors travel down and to the right,
        // so starting left of the container is what fills its left edge.
        const left = Math.round((idx / number) * 1400 - 500) / 10;

        return (
          <span
            key={idx}
            className={cn(
              "meteor absolute h-0.5 w-0.5 rounded-full bg-white/80 shadow-[0_0_0_1px_#ffffff10]",
              "before:absolute before:top-1/2 before:h-px before:w-[50px] before:-translate-y-1/2 before:bg-linear-to-r before:from-accent before:to-transparent before:content-['']",
              className,
            )}
            style={{
              top: "-40px",
              left: `${left}%`,
              animationDelay: `${Math.round(hash(key) * 50) / 10}s`,
              animationDuration: `${5 + Math.floor(hash(key + 1) * 5)}s`,
            }}
          />
        );
      })}
    </div>
  );
};
