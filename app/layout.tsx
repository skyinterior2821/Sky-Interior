import type { Metadata } from "next";
import localFont from "next/font/local";
import { LenisScroll } from "@/components/LenisScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { Noise } from "@/components/Noise";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const bubblegum = localFont({
  src: "../public/fonts/BubblegumSans-Regular.ttf",
  variable: "--font-bubblegum",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sky Interior | Premium Interior Designers in Ahmedabad & Banswara",
    template: "%s | Sky Interior"
  },
  description:
    "Sky Interior is a top-rated boutique interior design studio offering premium residential and commercial interior design, turnkey execution, and custom architecture in Ahmedabad and Banswara.",
  keywords: [
    "Interior Designer in Ahmedabad",
    "Best Interior Designer in Banswara",
    "Luxury Interior Design Ahmedabad",
    "Residential Interior Designer",
    "Commercial Interior Design",
    "Turnkey Interior Execution",
    "Boutique Design Studio",
    "Architectural Planning",
    "Home Interiors Ahmedabad",
    "Office Interior Design Banswara",
    "Sky Interior"
  ],
  authors: [{ name: "Harshit Suthar" }, { name: "Palak Suthar" }],
  creator: "Sky Interior",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.theskyinterior.com/",
    title: "Sky Interior | Premium Interior Designers in Ahmedabad & Banswara",
    description: "Premium residential and commercial interior design studio in Ahmedabad and Banswara.",
    siteName: "Sky Interior",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sky Interior | Interior Design Studio",
    description: "Premium residential and commercial interior design studio in Ahmedabad and Banswara.",
  },
  alternates: {
    canonical: "https://www.theskyinterior.com/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bubblegum.variable}`}
    >
      <body className="bg-bg text-ink antialiased selection:bg-accent selection:text-bg">
        <Noise />
        <LenisScroll />
        <CustomCursor />
        {children}
        <SpeedInsights />
        
        {/* LocalBusiness JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "InteriorDesignBusiness",
              name: "Sky Interior",
              image: "https://www.theskyinterior.com/logo.png",
              "@id": "https://www.theskyinterior.com/",
              url: "https://www.theskyinterior.com/",
              telephone: "+917802967720",
              email: "skyinteriordesign08@gmail.com",
              address: [
                {
                  "@type": "PostalAddress",
                  addressLocality: "Ahmedabad",
                  addressRegion: "Gujarat",
                  addressCountry: "IN"
                },
                {
                  "@type": "PostalAddress",
                  addressLocality: "Banswara",
                  addressRegion: "Rajasthan",
                  addressCountry: "IN"
                }
              ],
              geo: {
                "@type": "GeoCoordinates",
                latitude: 23.0225,
                longitude: 72.5714
              },
              founders: [
                {
                  "@type": "Person",
                  name: "Harshit Suthar"
                },
                {
                  "@type": "Person",
                  name: "Palak Suthar"
                }
              ],
              sameAs: [
                "https://www.instagram.com/skyinterior.design"
              ],
              priceRange: "$$$"
            })
          }}
        />
      </body>
    </html>
  );
}
