import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container, FadeIn } from "@/components/ui";
import { Estimator } from "@/components/Estimator";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Get an Estimate — Sky Interior",
  description: "Calculate an indicative estimate for your interior design project.",
};

export default function EstimatePage() {
  return (
    <>
      <Nav />
      <main className="pt-32 lg:pt-48 pb-24 lg:pb-40 bg-[var(--color-surface)] min-h-screen flex flex-col justify-center">
        <Container>
          <div className="max-w-4xl mt-8 mb-20 lg:mb-32">
            <FadeIn>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-px bg-[var(--color-accent)] block" />
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent)]">Project Calculator</span>
              </div>
              <h1 className="font-serif text-[clamp(3.5rem,5vw,5rem)] text-[var(--color-ink)] mb-8 leading-[1.1]">
                Configure your estimate.
              </h1>
              <p className="font-sans text-[clamp(1.25rem,2vw,1.5rem)] text-[var(--color-ink-muted)] font-light max-w-2xl leading-relaxed">
                Answer a few quick questions to receive an indicative estimate tailored to your requirements and finish level.
              </p>
            </FadeIn>
          </div>
          
          <FadeIn delay={0.2}>
            <Suspense fallback={<div className="min-h-[500px] flex items-center justify-center text-[var(--color-text-muted)]">Loading calculator...</div>}>
              <Estimator />
            </Suspense>
          </FadeIn>
        </Container>
      </main>
      <Footer />
    </>
  );
}
