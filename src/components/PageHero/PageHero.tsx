export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="bg-navy relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_20%_0%,color-mix(in_oklch,var(--primary)_55%,transparent),transparent_60%),radial-gradient(ellipse_at_85%_30%,color-mix(in_oklch,var(--highlight)_20%,transparent),transparent_55%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-highlight text-sm font-semibold tracking-wide uppercase">
          {eyebrow}
        </p>
        <h1 className="font-heading text-display mt-3 font-semibold text-balance text-white">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-lg text-pretty text-white/80">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
