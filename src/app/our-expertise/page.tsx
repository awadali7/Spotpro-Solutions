import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { RevealSection } from "@/components/RevealSection";
import { CtaBand } from "@/components/CtaBand";
import { ExpertiseCard } from "@/components/ExpertiseCard";
import { Button } from "@/components/ui/button";
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
        {/* Four areas: a 2x2 grid, so no card is left orphaned on its own row. */}
        <ul className="grid gap-6 md:grid-cols-2">
          {expertiseAreas.map((area, index) => (
            <ExpertiseCard key={area.slug} area={area} variant="detail" seed={index} />
          ))}
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
