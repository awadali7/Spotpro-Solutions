import type { Metadata } from "next";
import { Compass, Target } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { RevealSection } from "@/components/RevealSection";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBand } from "@/components/CtaBand";
import { NetworkGraphic } from "@/components/NetworkGraphic";
import { coreValues, mission, vision, whoWeAre } from "@/lib/content/about";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "SpotPro Solutions is an applied AI, blockchain, and data intelligence studio. Learn about our vision, mission, and the core values behind how we build.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="We build AI systems that hold up in production"
        description="A team spanning machine learning, language models, computer vision, blockchain, and data engineering — working on problems, not buzzwords."
      />

      <RevealSection as="section" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="text-accent-ink text-sm font-semibold tracking-wide uppercase">
              Who We Are
            </p>
            <h2 className="font-heading text-h2 mt-2 font-semibold text-balance">
              An applied AI &amp; data intelligence studio
            </h2>
            {whoWeAre.long.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-muted-foreground mt-5 text-pretty">
                {paragraph}
              </p>
            ))}
          </div>
          <NetworkGraphic className="mx-auto h-auto w-full max-w-md" />
        </div>
      </RevealSection>

      <RevealSection as="section" className="bg-muted/40 py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <article className="bg-card border-border rounded-2xl border p-8">
            <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-xl">
              <Compass className="size-6" aria-hidden="true" />
            </div>
            <h2 className="font-heading text-h3 mt-5 font-semibold">Our Vision</h2>
            <p className="text-muted-foreground mt-3 text-pretty">{vision}</p>
          </article>
          <article className="bg-card border-border rounded-2xl border p-8">
            <div className="bg-accent/15 text-accent-ink flex h-12 w-12 items-center justify-center rounded-xl">
              <Target className="size-6" aria-hidden="true" />
            </div>
            <h2 className="font-heading text-h3 mt-5 font-semibold">Our Mission</h2>
            <p className="text-muted-foreground mt-3 text-pretty">{mission}</p>
          </article>
        </div>
      </RevealSection>

      <RevealSection as="section" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Core Values"
          title="What we hold ourselves to"
          description="Six principles that shape how we scope, build, and hand over every project."
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((value, index) => (
            <li
              key={value.title}
              className="border-border bg-card hover:border-accent/50 rounded-2xl border p-6 transition-colors"
            >
              <span
                className="bg-brand-gradient font-heading inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold text-white"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-heading mt-4 text-lg font-semibold">{value.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm text-pretty">
                {value.description}
              </p>
            </li>
          ))}
        </ul>
      </RevealSection>

      <CtaBand
        title="Want to know how we'd approach your problem?"
        description="Tell us what you're working on and we'll walk you through how we'd scope it."
      />
    </>
  );
}
