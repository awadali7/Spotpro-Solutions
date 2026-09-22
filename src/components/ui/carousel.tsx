"use client";
import Image from "next/image";
import {
  IconArrowNarrowRight,
  IconPlayerPause,
  IconPlayerPlay,
} from "@tabler/icons-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

export interface SlideData {
  image?: string;
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
}

/**
 * The slide set is rendered three times and the track starts scrolled into the
 * middle copy, so there is always a full set of cards in both directions. When
 * scrolling leaves the middle copy the track is silently moved back by one set
 * width — the content either side is identical, so the jump is invisible.
 * Two copies would not do: you cannot both start in the middle and wrap at one
 * set width.
 */
const COPIES = 3;
const AUTOPLAY_MS = 3500;
/** Matches the track's `gap-6`. */
const GAP = 24;

/** Width of one set, measured rather than derived from card widths + gaps. */
const measureSet = (track: HTMLUListElement, count: number) => {
  const first = track.children[0];
  const second = track.children[count];
  if (!(first instanceof HTMLElement) || !(second instanceof HTMLElement)) return 0;
  return second.offsetLeft - first.offsetLeft;
};

/**
 * Move the track without animating. The element carries `scroll-smooth`, so
 * assigning `scrollLeft` would otherwise glide across a whole set and show the
 * seam that the duplication exists to hide.
 */
const jump = (track: HTMLUListElement, delta: number) => {
  const previous = track.style.scrollBehavior;
  track.style.scrollBehavior = "auto";
  track.scrollLeft += delta;
  track.style.scrollBehavior = previous;
};

const recentre = (track: HTMLUListElement, setWidth: number) => {
  if (setWidth <= 0) return;
  if (track.scrollLeft >= setWidth * 2) jump(track, -setWidth);
  else if (track.scrollLeft <= 0) jump(track, setWidth);
};

const CarouselControl = ({
  type,
  title,
  handleClick,
}: {
  type: "previous" | "next";
  title: string;
  handleClick: () => void;
}) => (
  <button
    type="button"
    className={cn(
      "border-border bg-card hover:border-accent focus-visible:ring-ring flex h-11 w-11 items-center justify-center rounded-full border transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:outline-none active:translate-y-0",
      type === "previous" && "rotate-180",
    )}
    title={title}
    aria-label={title}
    onClick={handleClick}
  >
    <IconArrowNarrowRight className="text-foreground size-5" />
  </button>
);

export default function Carousel({ slides }: { slides: SlideData[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const reduced = useReducedMotion();
  /** Explicit user choice, via the toggle. */
  const [paused, setPaused] = useState(false);
  /** Hovering, keyboard focus inside, or mid-drag. */
  const [interacting, setInteracting] = useState(false);
  /** Scrolled out of view, or the tab is in the background. */
  const [dormant, setDormant] = useState(false);

  const autoplaying = !reduced && !paused && !interacting && !dormant;

  const scrollByCard = useCallback(
    (direction: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      // Wrap while the track is stationary, so the smooth scroll below is
      // never interrupted part-way through by a silent jump.
      recentre(track, measureSet(track, slides.length));
      const card = track.querySelector("li");
      const amount = card ? card.getBoundingClientRect().width + GAP : track.clientWidth;
      track.scrollBy({ left: amount * direction, behavior: "smooth" });
    },
    [slides.length],
  );

  // Start in the middle copy.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const setWidth = measureSet(track, slides.length);
    if (setWidth > 0) jump(track, setWidth - track.scrollLeft);
  }, [slides.length]);

  // Wrap after user-driven scrolling settles. Doing this on every scroll event
  // would cut momentum scrolling dead half way through a flick.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let timer = 0;
    const onScroll = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(
        () => recentre(track, measureSet(track, slides.length)),
        140,
      );
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, [slides.length]);

  // Don't animate a carousel nobody is looking at.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let onscreen = true;
    const sync = () => setDormant(document.hidden || !onscreen);
    const observer = new IntersectionObserver(
      ([entry]) => {
        onscreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0.2 },
    );
    observer.observe(root);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  useEffect(() => {
    if (!autoplaying) return;
    const id = window.setInterval(() => scrollByCard(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [autoplaying, scrollByCard]);

  /**
   * Pointer parallax for the project models. One delegated listener for the
   * whole list rather than one per card, coalesced into a single rAF, writing
   * only two custom properties — so the work per frame is a compositor-only
   * transform, not layout.
   */
  useEffect(() => {
    const list = trackRef.current;
    if (!list || reduced) return;

    let frame = 0;
    let next: { card: HTMLElement; x: number; y: number } | null = null;
    let active: HTMLElement | null = null;

    const flush = () => {
      frame = 0;
      if (!next) return;
      next.card.style.setProperty("--px", next.x.toFixed(3));
      next.card.style.setProperty("--py", next.y.toFixed(3));
    };

    const onMove = (event: PointerEvent) => {
      const card = (event.target as HTMLElement).closest("li");
      if (!(card instanceof HTMLElement)) return;
      if (active && active !== card) {
        active.style.removeProperty("--px");
        active.style.removeProperty("--py");
      }
      active = card;
      const rect = card.getBoundingClientRect();
      next = {
        card,
        x: (event.clientX - rect.left) / rect.width - 0.5,
        y: (event.clientY - rect.top) / rect.height - 0.5,
      };
      if (!frame) frame = requestAnimationFrame(flush);
    };

    const onLeave = () => {
      if (active) {
        active.style.removeProperty("--px");
        active.style.removeProperty("--py");
        active = null;
      }
      next = null;
    };

    list.addEventListener("pointermove", onMove);
    list.addEventListener("pointerleave", onLeave);
    return () => {
      list.removeEventListener("pointermove", onMove);
      list.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={() => setInteracting(false)}
      onPointerDown={() => setInteracting(true)}
      onPointerUp={() => setInteracting(false)}
      onPointerCancel={() => setInteracting(false)}
    >
      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:thin]"
      >
        {Array.from({ length: COPIES }).flatMap((_, copy) =>
          slides.map(({ title, category, description, icon, image }) => (
            <li
              key={`${title}-${copy}`}
              /* Only the first set is exposed; the duplicates exist purely to
                 make the loop seamless and would otherwise be read out three
                 times over. */
              aria-hidden={copy > 0 || undefined}
              className="group bg-navy relative flex min-h-[24rem] w-[85%] shrink-0 snap-start flex-col overflow-hidden rounded-3xl sm:w-[47%] lg:w-[31.5%]"
            >
              <div className="bg-brand-gradient-radial absolute inset-0" aria-hidden="true" />
              <div
                className="bg-navy/25 absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
                aria-hidden="true"
              />
              {image ? (
                /* Decorative topic imagery: the heading and description already
                   say what the project is, so an alt description would only add
                   noise for screen readers. */
                /* The image is masked away toward its base rather than covered
                   by a scrim. A scrim has to fade to one flat colour, but the
                   card body is a radial gradient — so the two never matched and
                   left a seam. Dissolving the image lets the card's own
                   background carry straight through. */
                <div className="relative -mb-16 h-60 w-full [mask-image:linear-gradient(to_bottom,black_0%,black_42%,transparent_92%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_42%,transparent_92%)]">
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 47vw, 32vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div
                  className="iso-parallax pointer-events-none absolute -top-5 -right-5 w-[58%]"
                  aria-hidden="true"
                >
                  {icon}
                </div>
              )}
              <article className="relative flex flex-1 flex-col justify-end p-7">
                <p className="text-xs font-semibold tracking-wide text-white/70 uppercase">
                  {category}
                </p>
                <h3 className="font-heading mt-2 text-xl font-semibold text-balance text-white">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-pretty text-white/80">
                  {description}
                </p>
              </article>
            </li>
          )),
        )}
      </ul>

      <div className="mt-6 flex justify-center gap-3">
        <CarouselControl
          type="previous"
          title="Scroll to previous projects"
          handleClick={() => scrollByCard(-1)}
        />
        <CarouselControl
          type="next"
          title="Scroll to next projects"
          handleClick={() => scrollByCard(1)}
        />
        {/* WCAG 2.2.2: motion that starts on its own and runs past five seconds
            needs a way to stop it. Hidden in CSS rather than unmounted when
            there is no autoplay to stop, so the row does not reflow on
            hydration — see `.autoplay-toggle` in globals.css. */}
        <button
          type="button"
          className="autoplay-toggle border-border bg-card hover:border-accent focus-visible:ring-ring flex h-11 w-11 items-center justify-center rounded-full border transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:outline-none active:translate-y-0"
          aria-pressed={paused}
          title={paused ? "Resume automatic scrolling" : "Pause automatic scrolling"}
          aria-label={paused ? "Resume automatic scrolling" : "Pause automatic scrolling"}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? (
            <IconPlayerPlay className="text-foreground size-5" />
          ) : (
            <IconPlayerPause className="text-foreground size-5" />
          )}
        </button>
      </div>
    </div>
  );
}
