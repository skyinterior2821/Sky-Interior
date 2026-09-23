import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { LenisScroll } from "@/components/LenisScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { Noise } from "@/components/Noise";
import { StickyCTA } from "@/components/ui/StickyCTA";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sky Interior — Premium Interior Design Studio in Ahmedabad",
  description: "Sky Interior designs considered residential and commercial interiors in Ahmedabad and Banswara. Explore our portfolio, get an indicative estimate, and book a consultation.",
  keywords: ["Interior Design", "Ahmedabad", "Luxury Interiors", "Banswara", "Residential Design", "Commercial Design"],
  openGraph: {
    title: "Sky Interior — Interior Design Studio",
    description: "Premium residential and commercial interiors across Ahmedabad and Banswara.",
    url: "https://www.theskyinterior.com",
    siteName: "Sky Interior",
    images: [
      {
        url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Sky Interior Portfolio Snapshot",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className="bg-[var(--color-ink)] text-[var(--color-surface)] antialiased font-sans selection:bg-[var(--color-accent)] selection:text-[var(--color-ink)]">
        <Noise />
        <LenisScroll />
        <CustomCursor />
        <div className="pb-28 md:pb-0">
          {children}
        </div>
        <StickyCTA />
      </body>
    </html>
  );
}
