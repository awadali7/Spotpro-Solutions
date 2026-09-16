"use client";

import { useEffect } from "react";
import { resolveMotionOverride } from "@/lib/use-reduced-motion";

/**
 * Bridges the `?motion=on` preview override into CSS.
 *
 * The WebGL hero reads `useReducedMotion` directly, but the scroll-driven
 * animations are gated in CSS behind `prefers-reduced-motion`, which no amount
 * of JavaScript can override from inside a media query. This stamps
 * `data-motion="on"` on the document element so those rules can opt in via
 * `:root[data-motion="on"]`.
 *
 * Renders nothing, and does nothing at all unless the override is set.
 */
export function MotionOverride() {
  useEffect(() => {
    if (resolveMotionOverride()) {
      document.documentElement.dataset.motion = "on";
    } else {
      delete document.documentElement.dataset.motion;
    }
  }, []);

  return null;
}
