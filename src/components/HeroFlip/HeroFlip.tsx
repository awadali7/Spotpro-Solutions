"use client";

import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * The flipping phrase in the home hero's `h1`.
 *
 * Two things the vendor component doesn't handle on its own:
 *
 * 1. Reduced motion — under `reduce` there is no interval and no animation at
 *    all, just the canonical phrase rendered as static text.
 * 2. Assistive tech — the animated copy splits the phrase into one span per
 *    letter and swaps it on a timer, which screen readers either spell out or
 *    re-announce mid-sentence. It is hidden, and a stable `sr-only` copy of
 *    the canonical phrase carries the heading's accessible name instead.
 */
export function HeroFlip({
  phrases,
  className,
}: {
  phrases: readonly string[];
  className?: string;
}) {
  const reduced = useReducedMotion();
  const canonical = phrases[0];

  if (reduced) {
    return <span className={cn("hyphens-none", className)}>{canonical}</span>;
  }

  return (
    <>
      <span className="sr-only">{canonical}</span>
      <span aria-hidden="true">
        <ContainerTextFlip
          words={[...phrases]}
          interval={2600}
          animationDuration={600}
          className={cn("align-baseline hyphens-none", className)}
        />
      </span>
    </>
  );
}
