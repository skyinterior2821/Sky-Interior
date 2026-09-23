import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container, FadeIn } from "@/components/ui";
import { GuidedForm } from "@/components/GuidedForm";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Consultation — Sky Interior",
  description: "Start your interior design journey with a consultation.",
};

export default function ConsultationPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 lg:pt-48 pb-24 lg:pb-40 bg-[var(--color-surface)] min-h-screen">
        <Container>
          <div className="max-w-4xl mt-8 mb-20 lg:mb-32">
            <FadeIn>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-px bg-[var(--color-accent)] block" />
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent)]">Private Commission</span>
              </div>
              <h1 className="font-serif text-[clamp(3.5rem,5vw,5rem)] text-[var(--color-ink)] mb-8 leading-[1.1]">
                Let's design your space.
              </h1>
              <p className="font-sans text-[clamp(1.25rem,2vw,1.5rem)] text-[var(--color-ink-muted)] font-light max-w-2xl leading-relaxed">
                Tell us a little about your project and what you're looking for. We take on a limited number of commissions each year to ensure the highest level of detail and attention.
              </p>
            </FadeIn>
          </div>
          
          <FadeIn delay={0.2}>
            <Suspense fallback={<div className="w-full h-64 flex items-center justify-center text-[var(--color-text-muted)] tracking-widest uppercase text-xs">Loading form...</div>}>
              <GuidedForm />
            </Suspense>
          </FadeIn>
        </Container>
      </main>
      <Footer />
    </>
  );
}
