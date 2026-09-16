"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { HeroVisual } from "@/components/HeroVisual";
import { cn } from "@/lib/utils";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <HeroVisual className="h-full w-full" />,
});

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

/**
 * Only mounts the WebGL canvas on large viewports with WebGL available;
 * everything else keeps the static SVG so no 3D payload is fetched.
 */
export function HeroScene({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [idle, setIdle] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setEnabled(mq.matches && supportsWebGL());
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Initialising WebGL costs a few hundred ms of main thread. This is a
  // decorative visual, so let it wait until the page is interactive.
  useEffect(() => {
    if (!enabled) return;
    if (typeof window.requestIdleCallback !== "function") {
      const id = window.setTimeout(() => setIdle(true), 600);
      return () => window.clearTimeout(id);
    }
    const id = window.requestIdleCallback(() => setIdle(true), { timeout: 2500 });
    return () => window.cancelIdleCallback(id);
  }, [enabled]);

  // Don't burn frames on a scene nobody is looking at.
  useEffect(() => {
    if (!enabled || !idle || !containerRef.current) return;

    const onVisibility = () => setActive(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting && !document.hidden),
      { threshold: 0.05 },
    );
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled, idle]);

  return (
    <div ref={containerRef} className={cn("relative aspect-square", className)}>
      {enabled && idle ? (
        <Scene active={active} />
      ) : (
        <HeroVisual className="h-full w-full" />
      )}
    </div>
  );
}
