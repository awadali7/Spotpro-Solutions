import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { nav, site } from "@/lib/content/site";

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Logo onDark size="lg" />
            <p className="mt-4 max-w-sm text-sm text-white/70">
              {site.tagline} — applied AI, blockchain, and data intelligence
              systems built for production.
            </p>
            <Button asChild className="bg-highlight text-highlight-foreground mt-6 rounded-full hover:bg-highlight/90">
              <Link href="/contact-us">Get In Touch</Link>
            </Button>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-wide text-white/60 uppercase">
              Sitemap
            </h2>
            <ul className="mt-4 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="focus-visible:ring-ring rounded text-sm text-white/80 transition-colors hover:text-highlight focus-visible:ring-2 focus-visible:outline-none"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-wide text-white/60 uppercase">
              Contact
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 size-4 shrink-0 text-highlight" aria-hidden="true" />
                <a href={site.phoneHref} className="hover:text-highlight">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 size-4 shrink-0 text-highlight" aria-hidden="true" />
                <a href={`mailto:${site.email}`} className="hover:text-highlight">
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-highlight" aria-hidden="true" />
                <span>{site.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/60">
          &copy; {new Date().getFullYear()} SpotPro Solutions. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
