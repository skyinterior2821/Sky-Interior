import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container, FadeIn } from "@/components/ui";
import { DesignGrid } from "@/components/DesignGrid";
import { getAllDesigns } from "@/lib/designs";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Discovery — Sky Interior",
  description: "Explore our curated interior design ideas and inspiration.",
};

export default function DesignsPage() {
  const designs = getAllDesigns();

  return (
    <>
      <Nav />
      <main className="pt-32 lg:pt-48 pb-24 lg:pb-40 bg-[var(--color-surface)] min-h-screen">
        <Container>
          <FadeIn>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-sans text-xs tracking-widest uppercase text-[var(--color-text-muted)]">Home</span>
              <span className="text-[var(--color-text-muted)]">/</span>
              <span className="font-sans text-xs tracking-widest uppercase text-[var(--color-text-muted)]">Ideas</span>
              <span className="text-[var(--color-text-muted)]">/</span>
              <span className="font-sans text-xs tracking-widest uppercase text-[var(--color-accent)]">Designs</span>
            </div>
            
            <h1 className="font-serif text-[length:var(--text-heading-xl)] lg:text-[length:var(--text-display-m)] text-[var(--color-ink)] mb-6">
              Design Discovery
            </h1>
            <p className="text-[length:var(--text-body-l)] text-[var(--color-text-muted)] max-w-2xl font-light mb-16 lg:mb-24">
              Explore a curated selection of interior layouts, palettes, and finishes to inspire your next project.
            </p>
          </FadeIn>
          
          <Suspense fallback={<div className="h-96 w-full animate-pulse bg-[var(--color-surface-muted)] border border-[var(--color-border)]" />}>
            <DesignGrid initialDesigns={designs} filterMode="all" />
          </Suspense>
        </Container>
      </main>
      <Footer />
    </>
  );
}
