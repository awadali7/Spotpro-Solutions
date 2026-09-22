import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/content/site";
import { support, unical } from "@/lib/content/unical";

export const metadata: Metadata = {
  title: support.title,
  description:
    "Help with Unical — connecting calendars, work accounts that need admin approval, passwords, and account deletion.",
  alternates: { canonical: "/products/unical/support" },
};

export default function UnicalSupportPage() {
  return (
    <LegalPage
      title={support.title}
      intro={support.intro}
      lastUpdated={unical.lastUpdated}
      lastUpdatedISO={unical.lastUpdatedISO}
      currentHref="/products/unical/support"
    >
      <section className="border-border bg-muted mt-10 rounded-2xl border p-6">
        <h2 className="font-heading text-foreground text-xl font-semibold">
          Contact us
        </h2>
        <dl className="mt-4 space-y-4 text-sm">
          <div>
            <dt className="text-muted-foreground font-semibold tracking-wide uppercase">
              Email
            </dt>
            <dd className="mt-1">
              <a
                href={`mailto:${site.email}?subject=Unical%20support`}
                className="text-accent-ink focus-visible:ring-ring rounded font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:outline-none"
              >
                {site.email}
              </a>
              {site.emailIsPlaceholder && (
                <span className="text-muted-foreground mt-1 block text-sm italic">
                  Placeholder — to be confirmed before launch
                </span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground font-semibold tracking-wide uppercase">
              Phone
            </dt>
            <dd className="mt-1">
              <a
                href={site.phoneHref}
                className="text-accent-ink focus-visible:ring-ring rounded font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:outline-none"
              >
                {site.phone}
              </a>
            </dd>
          </div>
        </dl>
      </section>

      <div className="mt-10 space-y-8">
        <h2 className="font-heading text-foreground text-xl font-semibold">
          Common questions
        </h2>
        {support.topics.map((topic) => (
          <section key={topic.heading}>
            <h3 className="font-heading text-foreground font-semibold">
              {topic.heading}
            </h3>
            <p className="text-muted-foreground mt-2 leading-relaxed text-pretty">
              {topic.body}
            </p>
          </section>
        ))}
      </div>
    </LegalPage>
  );
}
