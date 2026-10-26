import type { Metadata } from "next";
import { Newsreader, Hanken_Grotesk } from "next/font/google";
import { FloatingActionButtons } from "@/components/FloatingActionButtons";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const newsreader = Newsreader({ 
  subsets: ["latin"], 
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Sky Interior | Interior Design Studio Ahmedabad & Banswara",
    template: "%s | Sky Interior"
  },
  description:
    "Sky Interior is a boutique interior design studio based in Ahmedabad and Banswara run by Harshit Suthar and Palak Suthar. Designing spaces around how people actually live.",
  keywords: [
    "Interior Designer Ahmedabad",
    "Interior Designer Banswara",
    "Boutique Design Studio",
    "Modular Kitchens",
    "Turnkey Interior Execution",
    "Residential Interiors",
    "Commercial Interiors",
    "Sky Interior",
    "Harshit Suthar",
    "Palak Suthar"
  ],
  authors: [{ name: "Harshit Suthar" }, { name: "Palak Suthar" }],
  creator: "Sky Interior",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: "Sky Interior | Interior Design Studio",
    description: "Designing spaces around how people actually live. Ahmedabad & Banswara.",
    siteName: "Sky Interior",
  },
  twitter: {
    card: "summary",
    title: "Sky Interior | Interior Design Studio",
    description: "Designing spaces around how people actually live. Ahmedabad & Banswara.",
  },
  alternates: {
    canonical: `${siteConfig.url}/`,
  },
  robots: siteConfig.indexable
    ? {
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
    : {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${newsreader.variable}`}
    >
      <body className="bg-[#F5F2EC] text-[#1C1B19] antialiased font-sans selection:bg-[#9C5B3F] selection:text-[#F5F2EC]">
        <FloatingActionButtons />
        <main>
          {children}
        </main>
        
        {/* LocalBusiness JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "InteriorDesignBusiness",
              name: siteConfig.name,
              image: `${siteConfig.url}/logo.png`,
              "@id": `${siteConfig.url}/`,
              url: `${siteConfig.url}/`,
              telephone: siteConfig.contact.phoneTel,
              email: siteConfig.contact.email,
              address: siteConfig.locations.map(loc => ({
                "@type": "PostalAddress",
                addressLocality: loc.addressLocality,
                addressRegion: loc.addressRegion,
                addressCountry: loc.country,
                postalCode: loc.postalCode
              })),
              geo: {
                "@type": "GeoCoordinates",
                latitude: 23.0225,
                longitude: 72.5714
              },
              founders: siteConfig.founders.map(f => ({
                "@type": "Person",
                name: f.name
              })),
              sameAs: [
                siteConfig.contact.instagram
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
