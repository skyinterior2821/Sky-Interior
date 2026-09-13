import type { Metadata } from "next";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LenisScroll } from "@/components/LenisScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { Noise } from "@/components/Noise";
import "./globals.css";

const bubblegum = localFont({
  src: "../public/fonts/BubblegumSans-Regular.ttf",
  variable: "--font-bubblegum",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sky Interior — Interior Design Studio in Ahmedabad",
  description:
    "Sky Interior designs considered residential and commercial interiors in Ahmedabad and Banswara, from first concept through execution.",
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
      </body>
    </html>
  );
}
