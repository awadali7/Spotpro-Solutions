import Link from "next/link";

export function CtaBand({
  title,
  description,
  ctaLabel = "Get In Touch",
  ctaHref = "/contact-us",
}: {
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="bg-brand-gradient relative overflow-hidden">
      {/* The gradient's teal end left white text at 3.02:1 — fine for the
          heading but under AA for body copy. This scrim brings the whole band
          into range at any text size. */}
      <div className="bg-navy/35 absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-h2 font-semibold text-white">{title}</h2>
        {description && (
          <p className="mx-auto mt-3 max-w-2xl text-white/85">{description}</p>
        )}
        <div className="mt-8 flex justify-center">
          <Link
            href={ctaHref}
            className="bg-highlight text-highlight-foreground hover:bg-highlight/90 focus-visible:ring-highlight focus-visible:ring-offset-navy inline-flex h-12 items-center justify-center rounded-full px-7 text-base font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
