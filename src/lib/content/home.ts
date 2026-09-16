/**
 * Phrases cycled by the hero headline's flipping span.
 *
 * The first entry is the canonical one: it is what search engines, screen
 * readers, and anyone with `prefers-reduced-motion: reduce` see, so the
 * sentence must read correctly with it in place.
 *
 * Keep every phrase plural (the sentence ends "that ship") and free of
 * hyphenated compounds — "production-ready models" broke after the hyphen at
 * common desktop widths. Phrases echo the services and expertise content so
 * the headline stays tied to what the site actually offers.
 */
export const heroFlipPhrases = [
  "intelligent systems",
  "secure AI gateways",
  "language models",
  "data pipelines",
] as const;

/** Eyebrow pill above the hero headline. */
export const heroEyebrow = "Applied AI · Blockchain · Data Intelligence";
