import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { RevealSection } from "@/components/RevealSection";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBand } from "@/components/CtaBand";
import { FeatureGrid } from "@/components/FeatureGrid";
import { DataHandlingTable } from "@/components/DataHandlingTable";
import { isoModels } from "@/components/IsoModel";
import { productRoutes } from "@/lib/content/site";
import { unical, unicalFeatures, unicalRoadmap } from "@/lib/content/unical";

export const metadata: Metadata = {
  title: unical.name,
  description:
    "Unical brings every Google and Microsoft calendar onto your phone in one place, with two-way sync back to both. Built by SpotPro Solutions for iOS and Android.",
  alternates: { canonical: "/products/unical" },
};

const Calendar = isoModels.calendar;

export default function UnicalPage() {
  const legalLinks = productRoutes.filter(
    (route) => route.href !== "/products/unical",
  );

  return (
    <>
      <PageHero
        eyebrow="Our Product"
        title={unical.heroTitle}
        description={unical.summary}
      />

      {/* Availability band. The isometric model stands in for product imagery:
          drop real device screenshots in beside it when they exist — this grid
          is already the two-column shape they want. */}
      <section className="bg-navy text-navy-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="mx-auto w-full max-w-sm" aria-hidden="true">
            <Calendar />
          </div>
          <div>
            <h2 className="font-heading text-h3 font-semibold text-balance text-white">
              Built, tested, and heading for the stores
            </h2>
            <dl className="mt-6 space-y-5">
              <div>
                <dt className="text-sm font-semibold tracking-wide text-white/60 uppercase">
                  Platforms
                </dt>
                <dd className="mt-1 text-white/85">{unical.platforms}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold tracking-wide text-white/60 uppercase">
                  Status
                </dt>
                <dd className="mt-1 text-white/85">{unical.status}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold tracking-wide text-white/60 uppercase">
                  Works with
                </dt>
                <dd className="mt-1 text-white/85">
                  Google Calendar and Microsoft Outlook, as many accounts as you
                  have
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <RevealSection
        as="section"
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
      >
        <SectionHeading
          eyebrow="What It Does"
          title="A calendar you can work in, not just look at"
          description="Everything below is in the first release. Nothing here is coming soon."
        />
        <div className="mt-12">
          <FeatureGrid features={unicalFeatures} />
        </div>
      </RevealSection>

      <RevealSection as="section" className="bg-muted py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Your Data"
            title="Your events are never copied to us"
            description="Unical reads your Google and Microsoft events when you open a view and discards them after. Here is everything the app handles, in full."
          />
          <div className="mt-10">
            <DataHandlingTable caption="What Unical handles, why, and where it is kept" />
          </div>
          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-center text-sm text-pretty">
            The same list appears in the{" "}
            <Link
              href="/products/unical/privacy"
              className="text-accent-ink focus-visible:ring-ring rounded font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:outline-none"
            >
              privacy policy
            </Link>
            . Deleting your account removes all of it and revokes our access at
            Google, from inside the app.
          </p>
        </div>
      </RevealSection>

      <RevealSection
        as="section"
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
      >
        <SectionHeading
          eyebrow="What's Next"
          title="Not in this release"
          description="Left out on purpose, so the first version does what it says rather than half-doing more."
        />
        <ul className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {unicalRoadmap.map((item) => (
            <li
              key={item.title}
              className="border-accent/40 bg-card/60 rounded-2xl border border-dashed p-6"
            >
              <h3 className="font-heading text-foreground text-lg font-semibold">
                {item.title}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm text-pretty">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </RevealSection>

      {/* Google's OAuth review checks that a product page links visibly to the
          policy and terms. These sit above the fold of the footer for that. */}
      <RevealSection as="section" className="bg-muted py-14">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-foreground text-xl font-semibold">
            The details
          </h2>
          <ul className="mt-5 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {legalLinks.map((route) => (
              <li key={route.href}>
                <Link
                  href={route.href}
                  className="text-accent-ink focus-visible:ring-ring rounded font-medium underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
                >
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </RevealSection>

      <CtaBand
        title="Want something like this built?"
        description="Unical is ours. The same team designs, builds and ships products for clients — tell us what you need."
        ctaLabel="Get In Touch"
      />
    </>
  );
}
