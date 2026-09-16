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
