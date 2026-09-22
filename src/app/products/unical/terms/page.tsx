import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { terms, unical } from "@/lib/content/unical";

export const metadata: Metadata = {
  title: terms.title,
  description:
    "The terms covering your use of the Unical mobile app and the service behind it.",
  alternates: { canonical: "/products/unical/terms" },
};

export default function UnicalTermsPage() {
  return (
    <LegalPage
      title={terms.title}
      intro={terms.intro}
      lastUpdated={unical.lastUpdated}
      lastUpdatedISO={unical.lastUpdatedISO}
      currentHref="/products/unical/terms"
      sections={terms.sections}
    />
  );
}
