import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/content/site";
import { deleteAccount, unical } from "@/lib/content/unical";

export const metadata: Metadata = {
  title: deleteAccount.title,
  description:
    "How to delete your Unical account and exactly what gets removed — from inside the app, or by asking us if you have already uninstalled it.",
  alternates: { canonical: "/products/unical/delete-account" },
};

export default function UnicalDeleteAccountPage() {
  return (
    <LegalPage
      title={deleteAccount.title}
      intro={deleteAccount.intro}
      lastUpdated={unical.lastUpdated}
      lastUpdatedISO={unical.lastUpdatedISO}
      currentHref="/products/unical/delete-account"
    >
      <div className="mt-10 space-y-10">
        <section>
          <h2 className="font-heading text-foreground text-xl font-semibold">
            Delete it from inside the app
          </h2>
          <ol className="text-muted-foreground mt-4 space-y-3">
            {deleteAccount.inAppSteps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span
                  className="bg-muted text-accent-ink mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <span className="text-pretty">{step}</span>
              </li>
            ))}
          </ol>
          <p className="text-muted-foreground mt-4 text-sm text-pretty">
            The path is {unical.inAppDeletePath}.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-foreground text-xl font-semibold">
            What gets removed
          </h2>
          <ul className="text-muted-foreground mt-4 space-y-2">
            {deleteAccount.removed.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span
                  className="bg-highlight-ink mt-2.5 size-1.5 shrink-0 rounded-full"
                  aria-hidden="true"
                />
                <span className="text-pretty">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-foreground text-xl font-semibold">
            What stays where it is
          </h2>
          <ul className="text-muted-foreground mt-4 space-y-2">
            {deleteAccount.notRemoved.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span
                  className="bg-border mt-2.5 size-1.5 shrink-0 rounded-full"
                  aria-hidden="true"
                />
                <span className="text-pretty">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-foreground text-xl font-semibold">
            {deleteAccount.uninstalled.heading}
          </h2>
          <p className="text-muted-foreground mt-3 leading-relaxed text-pretty">
            {deleteAccount.uninstalled.body}
          </p>
          <p className="mt-4">
            <a
              href={`mailto:${site.email}?subject=Delete%20my%20Unical%20account`}
              className="text-accent-ink focus-visible:ring-ring rounded font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:outline-none"
            >
              {site.email}
            </a>
          </p>
          {site.emailIsPlaceholder && (
            <p className="text-muted-foreground mt-1 text-sm italic">
              Placeholder — to be confirmed before launch
            </p>
          )}
        </section>

        <section>
          <h2 className="font-heading text-foreground text-xl font-semibold">
            How long it takes
          </h2>
          <p className="text-muted-foreground mt-3 leading-relaxed text-pretty">
            {deleteAccount.retention}
          </p>
        </section>
      </div>
    </LegalPage>
  );
}
