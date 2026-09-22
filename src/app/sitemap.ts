import type { MetadataRoute } from "next";
import { nav, productRoutes, site } from "@/lib/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...nav.map((item) => ({
      url: `${site.url}${item.href === "/" ? "" : item.href}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: item.href === "/" ? 1 : 0.8,
    })),
    // Unical is not in `nav`, but its pages still have to be crawlable —
    // Apple, Play and Google's OAuth review all check they load publicly.
    ...productRoutes.map((item) => ({
      url: `${site.url}${item.href}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: item.href === "/products/unical" ? 0.8 : 0.5,
    })),
  ];
}
