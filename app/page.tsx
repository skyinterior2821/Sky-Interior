import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Testimonials } from "@/components/Testimonials";
import { CTABand } from "@/components/CTABand";
import { Footer } from "@/components/Footer";
import { Container, FadeIn } from "@/components/ui";
import { ValuePillars } from "@/components/ValuePillars";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        {/* Elegant Services Showcase */}
        <ValuePillars />

        {/* Studio intro — Premium Statement */}
        <section className="py-32 lg:py-48 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-border" />
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn>
                <span className="font-sans text-xs uppercase tracking-widest text-accent-deep mb-8 block">
                  Our Philosophy
                </span>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="font-serif text-[length:var(--text-h2)] lg:text-[length:var(--text-display)] text-ink leading-[1.2] mb-10">
                  We design interiors that hold up after the excitement of a renovation fades.
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="font-sans text-[length:var(--text-lg)] text-ink-muted leading-relaxed max-w-2xl mx-auto font-light">
                  Rooms that still make sense five years in. Every project starts with how you live, not with a mood board. We focus on proportion, light, and material.
                </p>
              </FadeIn>
            </div>
          </Container>
        </section>

        <ProjectGrid />
        <ProcessSteps />
        <Testimonials />
        <CTABand />
      </main>
      <Footer />
    </>
  );
}
