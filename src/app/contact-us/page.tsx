import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { RevealSection } from "@/components/RevealSection";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with SpotPro Solutions about AI, blockchain, or data intelligence projects. Call +91 8921938495 or send us a message.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="We'd love to hear from you!"
        description="Tell us what you're building — or what's not working — and we'll come back with a straight answer."
      />

      <RevealSection as="section" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-heading text-h3 font-semibold">Send us a message</h2>
            <p className="text-muted-foreground mt-2">
              Fill in the form and we&apos;ll get back to you as soon as we can.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside className="bg-muted/40 border-border h-fit rounded-2xl border p-8">
            <h2 className="font-heading text-h3 font-semibold">Reach us directly</h2>
            <ul className="mt-6 space-y-6">
              <li className="flex gap-4">
                <span className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <Phone className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold">Phone</h3>
                  <a
                    href={site.phoneHref}
                    className="text-accent-ink mt-1 block hover:underline"
                  >
                    {site.phone}
                  </a>
                  <p className="text-muted-foreground mt-1 text-sm">Sales &amp; Marketing</p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-accent/15 text-accent-ink flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <Mail className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold">Email</h3>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-accent-ink mt-1 block hover:underline"
                  >
                    {site.email}
                  </a>
                  {site.emailIsPlaceholder && (
                    <p className="text-muted-foreground mt-1 text-sm italic">
                      Placeholder — to be confirmed before launch
                    </p>
                  )}
                </div>
              </li>

              <li className="flex gap-4">
                <span className="bg-highlight/15 text-highlight-ink flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <MapPin className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold">Address</h3>
                  <p className="text-muted-foreground mt-1">{site.address}</p>
                  {site.addressIsPlaceholder && (
                    <p className="text-muted-foreground mt-1 text-sm italic">
                      Placeholder — to be confirmed before launch
                    </p>
                  )}
                </div>
              </li>
            </ul>
          </aside>
        </div>
      </RevealSection>
    </>
  );
}
