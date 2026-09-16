"use client";
import Image from "next/image";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

export interface SlideData {
  image?: string;
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
}

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

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("li");
    const amount = card ? card.getBoundingClientRect().width + 24 : track.clientWidth;
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  const reduced = useReducedMotion();

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
    <div className="relative">
      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:thin]"
      >
        {slides.map(({ title, category, description, icon, image }) => (
          <li
            key={title}
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
        ))}
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
      </div>
    </div>
  );
}
