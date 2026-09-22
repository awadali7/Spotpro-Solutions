import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { privacyPolicy, unical } from "@/lib/content/unical";

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description:
    "What the Unical app handles, why, where it is kept, who it is shared with, and how to delete it — including our Google API Limited Use commitment.",
  alternates: { canonical: "/products/unical/privacy" },
};

export default function UnicalPrivacyPage() {
  return (
    <LegalPage
      title={privacyPolicy.title}
      intro={privacyPolicy.intro}
      lastUpdated={unical.lastUpdated}
      lastUpdatedISO={unical.lastUpdatedISO}
      currentHref="/products/unical/privacy"
      sections={privacyPolicy.sections}
    />
  );
}
