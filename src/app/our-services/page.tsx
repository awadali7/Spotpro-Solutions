import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { RevealSection } from "@/components/RevealSection";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBand } from "@/components/CtaBand";
import { ServicesTabs } from "@/components/ServicesTabs";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Conversational AI, computer vision, AI agents and automation, document AI, AI gateway and security, and blockchain & Web3 services from SpotPro Solutions.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Six ways we put AI to work"
        description="From conversational systems to secure AI infrastructure — scoped, built, and handed over ready to run."
      />

      <RevealSection as="section" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title="Pick a service to see what's involved"
          description="Each one covers scoping, build, deployment, and the handover documentation your team needs to own it."
        />
        <div className="mt-12">
          <ServicesTabs />
        </div>
      </RevealSection>

      <CtaBand
        title="Let's build the future together"
        description="Tell us what you need and we'll come back with a scope, a timeline, and an honest view of the tradeoffs."
        ctaLabel="Get In Touch"
      />
    </>
  );
}
