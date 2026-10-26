/**
 * Sky Interior - Single Source of Truth for Site & Contact Details
 * Used across Nav, Footer, Contact Page, Floating WhatsApp Button, and JSON-LD metadata.
 */

export const siteConfig = {
  name: "Sky Interior",
  tagline: "Interior Design Studio",
  description:
    "A boutique interior design studio based in Ahmedabad & Banswara run by Harshit Suthar and Palak Suthar. Designing spaces around how people actually live.",
  url: "https://www.theskyinterior.com",

  /**
   * Pre-launch indexing control.
   * When false: sets robots noindex/nofollow and robots.txt Disallow: /
   * Flip to true when launching with verified real content and photographs.
   */
  indexable: false,

  /**
   * Placeholder badge control.
   * When true (or in development): displays subtle "Photography in progress" badge.
   */
  showPlaceholders: true,

  founders: [
    { name: "Harshit Suthar", role: "Principal Designer" },
    { name: "Palak Suthar", role: "Design Director" },
  ],

  locations: [
    {
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      postalCode: "380058",
    },
    {
      city: "Banswara",
      state: "Rajasthan",
      country: "India",
      addressLocality: "Banswara",
      addressRegion: "Rajasthan",
      postalCode: "327001",
    },
  ],

  contact: {
    email: "skyinteriordesign08@gmail.com",
    instagram: "https://www.instagram.com/skyinterior.design",
    instagramHandle: "@skyinterior.design",

    // Confirmed contact numbers
    phonePrimary: "+91 7726837091",
    phoneDisplay: "+91 77268 37091",
    phoneTel: "+917726837091",

    whatsappNumber: "919328414008",
    whatsappDisplay: "+91 93284 14008",
    whatsappLink: "https://wa.me/919328414008?text=Hello%20Sky%20Interior%2C%20I%20would%20like%20to%20discuss%20a%20project.",
  },
} as const;
