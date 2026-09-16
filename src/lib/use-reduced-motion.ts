"use client";

import { useEffect, useState } from "react";

export const MOTION_OVERRIDE_KEY = "spotpro:motion-override";

/**
 * Resolves the `?motion=on` / `?motion=off` preview override, persisting it for
 * the browser session. Returns whether motion is being forced on.
 */
export function resolveMotionOverride() {
  const param = new URLSearchParams(window.location.search).get("motion");
  try {
    if (param === "on") window.sessionStorage.setItem(MOTION_OVERRIDE_KEY, "on");
    if (param === "off") window.sessionStorage.removeItem(MOTION_OVERRIDE_KEY);
    return param === "on" || window.sessionStorage.getItem(MOTION_OVERRIDE_KEY) === "on";
  } catch {
    // private browsing — the param alone still works for this page view
    return param === "on";
  }
}

/**
 * `prefers-reduced-motion`, with a preview escape hatch.
 *
 * macOS exposes "Reduce motion" to every browser at once and Safari/Chrome
 * offer no way to override it, so a developer with the OS setting on cannot
 * see any of this site's motion. Loading any page with `?motion=on` forces
 * motion for the rest of the browser session; `?motion=off` clears it.
 *
 * With no override stored this returns the media query verbatim, so visitors
 * who genuinely asked for reduced motion are unaffected.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const forced = resolveMotionOverride();
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(!forced && mq.matches);

    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
}
