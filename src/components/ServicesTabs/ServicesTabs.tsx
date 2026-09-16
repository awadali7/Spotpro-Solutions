"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { serviceIcons } from "@/components/icons";
import { services } from "@/lib/content/services";

export function ServicesTabs() {
  return (
    <Tabs defaultValue={services[0].slug} className="gap-8">
      <TabsList
        variant="line"
        className="h-auto w-full flex-wrap justify-start gap-2 overflow-x-auto p-0"
      >
        {services.map((service) => {
          const Icon = serviceIcons[service.icon];
          return (
            <TabsTrigger
              key={service.slug}
              value={service.slug}
              className="border-border data-active:border-accent data-active:text-accent-ink h-auto flex-none gap-2 rounded-full border px-4 py-2"
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
