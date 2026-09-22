import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { RevealSection } from "@/components/RevealSection";
import { DataHandlingTable } from "@/components/DataHandlingTable";
import { productRoutes } from "@/lib/content/site";
import type { LegalSection } from "@/lib/content/unical";

/**
 * Shared shell for Unical's four required pages. They differ in content but
 * not in shape, and a reviewer moving between them should not have to work
 * out that they belong together — hence the shared cross-links at the foot.
 */
export function LegalPage({
  title,
  intro,
  lastUpdated,
  lastUpdatedISO,
  currentHref,
  sections,
  children,
}: {
  title: string;
  intro: string;
  lastUpdated: string;
  /** ISO form of `lastUpdated` — a <time> dateTime must be machine-readable. */
  lastUpdatedISO: string;
  /** Omitted from the cross-links, since it is the page you are on. */
  currentHref: string;
  sections?: LegalSection[];
  children?: React.ReactNode;
}) {
  const related = productRoutes.filter((route) => route.href !== currentHref);

  return (
    <>
      <PageHero eyebrow="Unical" title={title} description={intro} />

      <RevealSection
        as="section"
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl">
          <p className="text-muted-foreground text-sm">
            Last updated <time dateTime={lastUpdatedISO}>{lastUpdated}</time>
          </p>

          {sections && (
            <div className="mt-10 space-y-10">
              {sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-heading text-foreground text-xl font-semibold text-balance">
                    {section.heading}
                  </h2>
                  {section.body?.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-muted-foreground mt-3 leading-relaxed text-pretty"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="text-muted-foreground mt-4 space-y-2">
                      {section.list.map((item) => (
                        <li key={item} className="flex gap-2.5">
                          <span
                            className="bg-highlight-ink mt-2.5 size-1.5 shrink-0 rounded-full"
                            aria-hidden="true"
                          />
                          <span className="text-pretty">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.quote && (
                    <blockquote className="border-accent-ink bg-muted text-foreground mt-4 rounded-r-lg border-l-4 px-5 py-4 leading-relaxed text-pretty">
                      {section.quote}
                    </blockquote>
                  )}
                  {section.table && (
                    <div className="mt-5">
                      <DataHandlingTable caption="What Unical handles, why, and where it is kept" />
                    </div>
                  )}
                </section>
              ))}
            </div>
          )}

          {children}

          <nav
            aria-label="Other Unical pages"
            className="border-border mt-14 border-t pt-8"
          >
            <h2 className="text-muted-foreground text-sm font-semibold tracking-wide uppercase">
              More about Unical
            </h2>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {related.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className="text-accent-ink focus-visible:ring-ring rounded text-sm font-medium underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </RevealSection>
    </>
  );
}
