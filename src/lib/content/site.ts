export const site = {
  name: "SpotPro Solutions",
  tagline: "AI, Blockchain & Data Intelligence Solutions",
  url: "https://www.spotprosolutions.com",
  phone: "+91 8921938495",
  phoneHref: "tel:+918921938495",
  /** TODO(client): replace placeholder before launch */
  email: "hello@spotprosolutions.com",
  emailIsPlaceholder: true,
  /** TODO(client): replace placeholder before launch */
  address: "Address to be confirmed",
  addressIsPlaceholder: true,
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/our-expertise", label: "Our Expertise" },
  { href: "/our-work", label: "Our Work" },
  { href: "/our-services", label: "Our Services" },
  { href: "/contact-us", label: "Contact Us" },
] as const;

/**
 * Unical's pages. Deliberately not in `nav` — Unical is a product, not a
 * section of the agency site — but they must still be crawlable and publicly
 * reachable, because Apple, Google Play and Google's OAuth review each check
 * that some of these URLs load without a login. Listed once here so the
 * sitemap, the footer and the in-page cross-links can never disagree.
 */
export const productRoutes = [
  { href: "/products/unical", label: "Unical" },
  { href: "/products/unical/privacy", label: "Privacy Policy" },
  { href: "/products/unical/terms", label: "Terms & Conditions" },
  { href: "/products/unical/delete-account", label: "Delete Your Account" },
  { href: "/products/unical/support", label: "Support" },
] as const;
