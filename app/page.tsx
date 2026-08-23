import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Testimonials } from "@/components/Testimonials";
import { CTABand } from "@/components/CTABand";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        {/* Studio intro — content.md §1 */}
        <section className="py-24 lg:py-32">
          <Container narrow>
            <p className="font-serif text-[length:var(--text-lg)] lg:text-[length:var(--text-h3)] text-ink leading-relaxed">
              We design interiors that hold up after the excitement of a
              renovation fades — rooms that still make sense five years in.
              Every project starts with how you live, not with a mood board.
            </p>
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
