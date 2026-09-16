"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { serviceIcons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { services } from "@/lib/content/services";

export function ServicesTabs() {
  return (
    <Tabs defaultValue={services[0].slug} className="gap-8">
      <TabsList
        variant="line"
        className={cn(
          // The vendor list is fixed at h-8 through a group variant, which a
          // plain `h-auto` can't beat — and with overflow set, anything past
          // 32px was clipped out of sight.
          "w-auto justify-start gap-2 p-1 group-data-horizontal/tabs:h-auto",
          // Below md: one swipeable row bleeding to the screen edge, so the
          // cut-off pill signals there is more.
          "-mx-4 overflow-x-auto scroll-px-4 px-4 [scrollbar-width:thin] sm:-mx-6 sm:scroll-px-6 sm:px-6",
          // md–lg: an even 3x2 grid. xl: one centred row under the heading.
          "md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-1 xl:flex xl:flex-wrap xl:justify-center",
        )}
      >
        {services.map((service) => {
          const Icon = serviceIcons[service.icon];
          return (
            <TabsTrigger
              key={service.slug}
              value={service.slug}
              // Browsers leave a partly visible element where it is when it
              // takes focus, so arrowing or tapping to an edge pill left it
              // cut off in the mobile strip. `nearest` is a no-op when the
              // pill is already fully in view (always, from md up). The strip
              // deliberately has no scroll-snap: snapping overrode this
              // scroll and pulled the pill back off-screen.
              onFocus={(event) =>
                event.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" })
              }
              // after:hidden drops the line variant's underline bar, which sat
              // 5px under the active pill.
              className="border-border data-active:border-accent data-active:text-accent-ink h-auto flex-none gap-2 rounded-full border px-4 py-2 after:hidden"
            >
              <Icon className="h-4 w-4" />
              {service.title}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {services.map((service) => {
        const Icon = serviceIcons[service.icon];
        return (
          <TabsContent key={service.slug} value={service.slug}>
            <article className="border-border bg-card grid gap-8 rounded-2xl border p-8 md:grid-cols-[1.2fr_1fr] md:p-10">
              <div>
                <div className="bg-accent/10 text-accent-ink flex h-12 w-12 items-center justify-center rounded-xl">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-h3 mt-5 font-semibold">{service.title}</h3>
                <p className="text-accent-ink mt-2 font-medium">{service.summary}</p>
                <p className="text-muted-foreground mt-4 text-base text-pretty">
                  {service.description}
                </p>
                <Button asChild className="bg-brand-gradient text-primary-foreground mt-7 h-10 px-5 hover:opacity-90">
                  <Link href="/contact-us">Discuss this service</Link>
                </Button>
              </div>

              <div className="bg-muted/50 rounded-xl p-6">
                <h4 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
                  What&apos;s included
                </h4>
                <ul className="mt-4 space-y-3">
                  {service.capabilities.map((capability) => (
                    <li key={capability} className="flex gap-3 text-sm">
                      <Check
                        className="text-highlight-ink mt-0.5 size-4 shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-pretty">{capability}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
