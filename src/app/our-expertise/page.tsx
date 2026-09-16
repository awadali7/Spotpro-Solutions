import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { RevealSection } from "@/components/RevealSection";
import { CtaBand } from "@/components/CtaBand";
import { Button } from "@/components/ui/button";
import { expertiseIcons } from "@/components/icons";
import { expertiseAreas } from "@/lib/content/expertise";

export const metadata: Metadata = {
  title: "Our Expertise",
  description:
    "AI and machine learning, blockchain, large language models, and data analytics — the four disciplines SpotPro Solutions builds with.",
};

export default function ExpertisePage() {
  return (
    <>
      <PageHero
        eyebrow="Our Expertise"
        title="Four disciplines, one integrated team"
        description="We pick the right tool for the problem rather than forcing every project through the same technology."
      />

      <RevealSection as="section" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {expertiseAreas.map((area) => {
            const Icon = expertiseIcons[area.icon];
            return (
              <li
                key={area.slug}
                id={area.slug}
                className="group border-border bg-card hover:border-accent/60 relative scroll-mt-24 overflow-hidden rounded-2xl border p-7 transition-all hover:shadow-lg"
              >
                <span
                  className="bg-brand-gradient absolute inset-x-0 top-0 h-1 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                  aria-hidden="true"
                />
                <div className="bg-accent/10 text-accent-ink flex h-12 w-12 items-center justify-center rounded-xl">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="font-heading text-h3 mt-5 font-semibold">{area.title}</h2>
                <p className="text-muted-foreground mt-3 text-pretty">{area.description}</p>
              </li>
            );
          })}
        </ul>

        <div className="mt-14 text-center">
          <Button asChild size="lg" className="bg-brand-gradient text-primary-foreground h-11 px-6 text-sm font-semibold tracking-wide uppercase hover:opacity-90">
            <Link href="/contact-us">Talk With an Expert</Link>
          </Button>
        </div>
      </RevealSection>

      <CtaBand
        title="Not sure which of these you need?"
        description="That's a normal place to start. Tell us the problem and we'll tell you which approach actually fits."
      />
    </>
  );
}
