import type { Metadata } from "next";
import Link from "next/link";
import { FlaskConical, Hammer } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { RevealSection } from "@/components/RevealSection";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBand } from "@/components/CtaBand";
import { WorkCarousel } from "@/components/WorkCarousel";
import { Badge } from "@/components/ui/badge";
import { Grid } from "@/components/ui/grid-pattern";
import { expertiseIcons, serviceIcons } from "@/components/icons";
import { experimentalProjects, wipProjects } from "@/lib/content/work";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Completed AI, chatbot, computer vision, and blockchain projects from SpotPro Solutions — plus experimental R&D trials and work currently in progress.",
};

const allIcons = { ...expertiseIcons, ...serviceIcons };

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="What we've shipped, what we're testing"
        description="Delivered client systems, R&D experiments, and work currently in the build — kept honestly separate."
      />

      <RevealSection as="section" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Completed Projects"
          title="Systems delivered and running"
          description="Eight client systems across conversational AI, computer vision, data analytics, and blockchain — plus Unical, our own calendar product."
        />
        <div className="mt-14">
          <WorkCarousel />
        </div>
        <p className="text-muted-foreground mt-10 text-center text-sm text-pretty">
          Unical is the one we built for ourselves.{" "}
          <Link
            href="/products/unical"
            className="text-accent-ink focus-visible:ring-ring rounded font-semibold underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
          >
            See what it does &rarr;
          </Link>
        </p>
      </RevealSection>

      <RevealSection as="section" className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Experimental Trials"
            title="Work from the lab"
            description="R&D we're running to test approaches before they reach client projects. These are trials, not shipped products."
          />
          <ul className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            {experimentalProjects.map((project, index) => {
              const Icon = allIcons[project.icon];
              return (
                <li
                  key={project.title}
                  className="border-accent/40 from-muted to-card relative overflow-hidden rounded-3xl border border-dashed bg-gradient-to-b p-7"
                >
                  {/* Same backdrop as the Core Values cards. The dashed border
                      stays: it is what separates a trial from shipped work. */}
                  <Grid id={`experimental-${index}`} seed={index + 11} size={20} />
                  <div className="relative z-20 flex items-start justify-between gap-4">
                    <div className="bg-accent/10 text-accent-ink flex h-11 w-11 items-center justify-center rounded-xl">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="outline" className="border-accent/50 text-accent-ink bg-card/80 gap-1">
                      <FlaskConical className="size-3" aria-hidden="true" />
                      Experimental
                    </Badge>
                  </div>
                  <h3 className="font-heading relative z-20 mt-5 text-lg font-semibold">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground relative z-20 mt-2 text-sm text-pretty">
                    {project.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </RevealSection>

      <RevealSection as="section" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Work In Progress"
          title="Currently in the build"
          description="Active development — not yet released."
        />
        <ul className="mx-auto mt-12 grid max-w-2xl gap-6">
          {wipProjects.map((project, index) => {
            const Icon = allIcons[project.icon];
            return (
              <li
                key={project.title}
                className="border-border from-muted to-card relative overflow-hidden rounded-3xl border bg-gradient-to-b p-7"
              >
                {/* Same backdrop as Core Values and the trial cards. The
                    gradient bar keeps its own stacking context above it —
                    it is the signal that this one is still being built. */}
                <Grid id={`wip-${index}`} seed={index + 21} size={20} />
                <span
                  className="bg-brand-gradient absolute inset-y-0 left-0 z-20 w-1"
                  aria-hidden="true"
                />
                <div className="relative z-20 flex items-start justify-between gap-4">
                  <div className="bg-primary/10 text-primary flex h-11 w-11 items-center justify-center rounded-xl">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge className="bg-highlight text-highlight-foreground gap-1">
                    <Hammer className="size-3" aria-hidden="true" />
                    In Progress
                  </Badge>
                </div>
                <h3 className="font-heading relative z-20 mt-5 text-lg font-semibold">
                  {project.title}
                </h3>
                <p className="text-muted-foreground relative z-20 mt-2 text-sm text-pretty">
                  {project.description}
                </p>
              </li>
            );
          })}
        </ul>
      </RevealSection>

      <CtaBand
        title="Think your project belongs on this page?"
        description="We'd like to hear about it. Tell us what you're trying to build."
      />
    </>
  );
}
