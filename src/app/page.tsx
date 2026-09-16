import Link from "next/link";
import type { Metadata } from "next";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { HeroScene } from "@/components/HeroScene";
import { ScrollHighlightText } from "@/components/ScrollHighlightText";
import { WorkCarousel } from "@/components/WorkCarousel";
import { HeroFlip } from "@/components/HeroFlip";
import { RevealSection } from "@/components/RevealSection";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBand } from "@/components/CtaBand";
import { ExpertiseCard } from "@/components/ExpertiseCard";
import { expertiseAreas } from "@/lib/content/expertise";
import { whoWeAre } from "@/lib/content/about";
import { heroEyebrow, heroFlipPhrases } from "@/lib/content/home";


export const metadata: Metadata = {
  title: "Home",
  description:
    "SpotPro Solutions builds applied AI, blockchain, and data intelligence systems — from LLMs and computer vision to secure AI gateways — engineered for production.",
};

export default function HomePage() {
  return (
    <>
      <AuroraBackground className="min-h-[88vh]">
        {/* Ambient backdrop. HeroScene renders WebGL at >=1024px and falls back
            to the HeroVisual SVG below that, so mobile gets artwork too. It is
            decoration behind the copy, hence aria-hidden. */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          <HeroScene className="w-[min(108vw,860px)] opacity-70 lg:opacity-60" />
        </div>

        {/* Scrim: keeps white copy legible where it crosses the bright nodes. */}
        <div
          className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_50%_50%,color-mix(in_oklch,var(--navy)_82%,transparent)_0%,color-mix(in_oklch,var(--navy)_55%,transparent)_45%,transparent_75%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <p className="border-white/15 bg-white/5 text-highlight mx-auto inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide backdrop-blur-sm">
            <span className="bg-highlight size-1.5 rounded-full" aria-hidden="true" />
            {heroEyebrow}
          </p>

          <h1 className="font-heading text-display mt-6 font-semibold text-balance text-white">
            {"Turn your data into "}
            <HeroFlip phrases={heroFlipPhrases} className="text-highlight" />
            {" that ship."}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-pretty text-white/80">
            SpotPro Solutions designs and builds applied AI, blockchain, and
            data intelligence systems — from LLMs to secure AI gateways —
            engineered for production, not just demos.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact-us"
              className="bg-highlight text-highlight-foreground hover:bg-highlight/90 focus-visible:ring-highlight focus-visible:ring-offset-navy inline-flex h-12 items-center justify-center rounded-full px-7 text-base font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Get Started
            </Link>
            <Link
              href="/our-work"
              className="focus-visible:ring-offset-navy inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-7 text-base font-medium text-white transition-colors hover:border-white/40 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              See Our Work <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

        </div>
      </AuroraBackground>

      <section className="bg-navy text-navy-foreground pin-track py-44">
        <div className="pin-inner">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* The section is intentionally just the paragraph, so the heading
                is visually hidden rather than dropped — the page outline and
                SEO keep it. */}
            <h2 className="sr-only">Who We Are</h2>
            <ScrollHighlightText
              text={whoWeAre.oneLine}
              variant="typewriter"
              className="font-heading text-h1 mx-auto max-w-4xl font-medium leading-[1.4]"
            />
          </div>
        </div>
      </section>

      <RevealSection as="section" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Selected Work"
          title="Systems already running in production"
          description="A sample of what we've shipped — conversational AI, document intelligence, computer vision, and blockchain platforms."
        />
        <div className="mt-12">
          <WorkCarousel />
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/our-work"
            className="text-accent-ink inline-flex items-center gap-1 text-sm font-semibold hover:underline"
          >
            See all our work &rarr;
          </Link>
        </div>
      </RevealSection>

      <RevealSection as="section" className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Expertise"
            title="Four disciplines, one integrated team"
            description="We bring machine learning, blockchain, language models, and data engineering together under one roof."
          />
          <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {expertiseAreas.map((area, index) => (
              // First and fourth run wide at lg, so four cards tile two full
              // rows of three columns with no ragged edge; md is a plain 2x2.
              <ExpertiseCard
                key={area.slug}
                area={area}
                wide={index === 0 || index === 3}
                seed={index}
              />
            ))}
          </ul>

          <div className="mt-10 text-center">
            <Link
              href="/our-expertise"
              className="text-accent-ink inline-flex items-center gap-1 text-sm font-semibold hover:underline"
            >
              Explore our expertise &rarr;
            </Link>
          </div>
        </div>
      </RevealSection>

      <CtaBand
        title="Have a problem worth solving with AI?"
        description="Tell us what you're building — we'll tell you honestly whether AI, blockchain, or plain good data engineering is the right tool."
        ctaLabel="Start the Conversation"
      />
    </>
  );
}
