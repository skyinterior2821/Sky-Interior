import { Suspense } from "react";
import { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { GuidesClient } from "./GuidesClient";

export const metadata: Metadata = {
  title: "Interior Design Guides | Sky Interior",
  description: "Expert advice on planning, materials, and budgeting your next interior design project.",
};

export default function GuidesPage() {
  return (
    <>
      <Nav />
      {/* We use a Suspense boundary because GuidesClient uses useSearchParams() */}
      <Suspense fallback={<div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center">Loading guides...</div>}>
        <GuidesClient />
      </Suspense>
      <Footer />
    </>
  );
}
