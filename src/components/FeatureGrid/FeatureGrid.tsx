import {
  BellRing,
  CalendarClock,
  Layers,
  LayoutGrid,
  Palette,
  RefreshCw,
  Search,
  Smartphone,
} from "lucide-react";
import type { UnicalFeature, UnicalFeatureIcon } from "@/lib/content/unical";

/**
 * Icons are mapped here rather than in the content file so the copy stays
 * plain data — same split the expertise and service content already use.
 */
const featureIcons: Record<
  UnicalFeatureIcon,
  React.ComponentType<{ className?: string }>
> = {
  accounts: Layers,
  views: LayoutGrid,
  sync: RefreshCw,
  events: CalendarClock,
  reminders: BellRing,
  calendars: Palette,
  restore: Smartphone,
  search: Search,
};

export function FeatureGrid({ features }: { features: UnicalFeature[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => {
        const Icon = featureIcons[feature.icon];

        return (
          <li
            key={feature.title}
            className="bg-card border-border flex flex-col rounded-2xl border p-6 shadow-sm"
          >
            <span className="bg-muted flex size-11 items-center justify-center rounded-full">
              <Icon className="text-accent-ink size-5" />
            </span>
            <h3 className="font-heading text-foreground mt-5 text-lg font-semibold text-balance">
              {feature.title}
            </h3>
            {feature.summary && (
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed text-pretty">
                {feature.summary}
              </p>
            )}
            {feature.points && (
              <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
                {feature.points.map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <span
                      className="bg-highlight-ink mt-2 size-1.5 shrink-0 rounded-full"
                      aria-hidden="true"
                    />
                    <span className="text-pretty">{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
