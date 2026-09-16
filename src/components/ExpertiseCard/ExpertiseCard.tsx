import Link from "next/link";
import { Meteors } from "@/components/ui/meteors";
import { expertiseIcons } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { ExpertiseArea } from "@/lib/content/expertise";

export function ExpertiseCard({
  area,
  variant = "teaser",
  wide = false,
  seed = 0,
  className,
}: {
  area: ExpertiseArea;
  /**
   * `teaser` (home): an `h3`, the short summary, and a link through to the
   * detail. `detail` (/our-expertise): an `h2`, the full description, and the
   * `#slug` anchor the teaser links to.
   */
  variant?: "teaser" | "detail";
  /** Spans two columns at `lg` and carries a denser meteor shower to match. */
  wide?: boolean;
  /** Varies meteor timing so neighbouring cards don't move in lockstep. */
  seed?: number;
  className?: string;
}) {
  const Icon = expertiseIcons[area.icon];
  const detail = variant === "detail";
  const Heading = detail ? "h2" : "h3";

  return (
    <li
      id={detail ? area.slug : undefined}
      className={cn(
        "relative",
        detail && "scroll-mt-24",
        wide && "lg:col-span-2",
        className,
      )}
    >
      {/* Brand glow bleeding out from behind the card. */}
      <div
        className="bg-brand-gradient absolute inset-0 scale-[0.85] rounded-full opacity-35 blur-3xl"
        aria-hidden="true"
      />

      <div
        className={cn(
          "bg-navy relative flex h-full min-h-64 flex-col overflow-hidden rounded-2xl border border-white/10 bg-radial-[at_15%_0%] from-primary/45 to-transparent to-60% px-6 py-8 shadow-xl sm:px-8",
          // Detail copy varies in length, so it top-aligns to keep icons and
          // headings level across a row; teasers sit low under the meteors.
          detail ? "justify-start sm:py-10" : "justify-end",
        )}
      >
        <Meteors number={detail ? 16 : wide ? 20 : 12} seed={seed} />

        <div className="relative flex flex-col items-start">
          <span className="mb-5 flex size-12 items-center justify-center rounded-full border border-white/20 bg-white/5">
            <Icon className="text-highlight size-6" />
          </span>
          {/* Literal class strings, not cn(): tailwind-merge reads `text-h3`
              as a colour and would drop it next to `text-white`. */}
          <Heading
            className={
              detail
                ? "font-heading text-h3 font-semibold text-balance text-white"
                : "font-heading text-xl font-semibold text-balance text-white"
            }
          >
            {area.title}
          </Heading>
          <p
            className={
              detail
                ? "mt-3 max-w-prose leading-relaxed text-pretty text-white/75"
                : "mt-2 max-w-md text-sm leading-relaxed text-pretty text-white/75"
            }
          >
            {detail ? area.description : area.summary}
          </p>
          {!detail && (
            <Link
              href={`/our-expertise#${area.slug}`}
              className="focus-visible:ring-highlight focus-visible:ring-offset-navy mt-6 inline-flex h-9 items-center gap-1.5 rounded-full border border-white/25 px-4 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Explore<span className="sr-only"> {area.title}</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </div>
    </li>
  );
}
