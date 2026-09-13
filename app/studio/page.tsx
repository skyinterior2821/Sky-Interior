import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container, Button, FadeIn } from "@/components/ui";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Interior Design Studio in Ahmedabad & Banswara",
  description:
    "Meet the founders of Sky Interior, Harshit and Palak Suthar. We are a premium interior design studio serving Ahmedabad, Banswara, and surrounding areas.",
  keywords: [
    "Interior Design Studio",
    "Best Interior Designers Ahmedabad",
    "Top Interior Designers Banswara",
    "Residential Interior Architecture",
    "Harshit Suthar",
    "Palak Suthar"
  ]
};

const SERVICES = [
  {
    title: "Residential Interior Design",
    description: "Full-scale interior architecture, spatial planning, and styling for private homes.",
  },
  {
    title: "Commercial Spaces",
    description: "Designing bespoke offices, retail environments, and hospitality spaces that reflect your brand identity.",
  },
  {
    title: "Turnkey Execution",
    description: "End-to-end project management, ensuring the final build perfectly matches the approved designs.",
  },
  {
    title: "Custom Joinery & Furniture",
    description: "Designing and sourcing bespoke pieces that perfectly fit the proportions of your space.",
  }
];

export default function StudioPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 lg:pt-40 pb-24 lg:pb-32 overflow-hidden bg-bg">
        {/* Page heading */}
        <Container className="pb-16 lg:pb-32">
          <FadeIn>
            <h1 className="font-serif text-[length:var(--text-h1)] lg:text-[120px] leading-[0.9] tracking-tight text-ink drop-shadow-sm">
              A studio <br />
              <span className="italic text-accent-deep">by design.</span>
            </h1>
          </FadeIn>
        </Container>

        {/* Opening Manifesto */}
        <section className="pb-24 lg:pb-40">
          <Container>
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
              <div className="lg:col-span-4">
                <FadeIn>
                  <span className="font-sans text-xs uppercase tracking-widest text-accent-deep">Our Approach</span>
                </FadeIn>
              </div>
              <div className="lg:col-span-8">
                <FadeIn delay={0.1}>
                  <p className="font-serif text-[length:var(--text-h3)] lg:text-[40px] text-ink leading-[1.3]">
                    Sky Interior is a boutique design studio working across residential and
                    commercial spaces in Ahmedabad and Banswara. We&apos;re small by choice — every project gets
                    direct attention from the founders, not a rotating account team.
                  </p>
                  <p className="mt-8 text-[length:var(--text-lg)] text-ink-muted leading-relaxed max-w-2xl font-light">
                    Good design isn&apos;t about filling a space — it&apos;s about
                    deciding what a room is actually for, then removing everything
                    that gets in the way of that. We&apos;d rather get proportion,
                    light, and material right than chase a trend that won&apos;t hold
                    up in five years.
                  </p>
                </FadeIn>
              </div>
            </div>
          </Container>
        </section>

        {/* Full-bleed Studio Image */}
        <section className="relative w-full h-[50vh] lg:h-[70vh] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2400"
            alt="Sky Interior studio space"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />
        </section>

        {/* Pull Quote */}
        <section className="py-24 lg:py-32">
          <Container className="text-center">
            <FadeIn>
              <blockquote className="font-serif text-[length:var(--text-h2)] lg:text-[length:var(--text-hero)] italic text-ink leading-[1.2] max-w-4xl mx-auto">
                &ldquo;We design around how a family actually uses a space day to day, not just how it photographs.&rdquo;
              </blockquote>
              <p className="mt-8 text-sm text-accent-deep uppercase tracking-widest font-semibold">— Harshit &amp; Palak Suthar</p>
            </FadeIn>
          </Container>
        </section>

        {/* Services Grid */}
        <section className="py-24 lg:py-40 bg-surface">
          <Container>
            <FadeIn>
              <h2 className="font-serif text-[length:var(--text-h2)] lg:text-[length:var(--text-display)] mb-16 lg:mb-24">
                Expertise
              </h2>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-px bg-border/50 shadow-xl rounded-3xl overflow-hidden">
              {SERVICES.map((service, i) => (
                <div key={i} className="bg-surface p-12 lg:p-20 group hover:bg-bg transition-colors duration-500">
                  <FadeIn delay={i * 0.1}>
                    <span className="font-sans text-sm text-accent tracking-widest uppercase block mb-6 font-semibold">
                      0{i + 1}
                    </span>
                    <h3 className="font-serif text-[length:var(--text-h3)] mb-4 group-hover:text-accent-deep transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-ink-muted leading-relaxed font-light">
                      {service.description}
                    </p>
                  </FadeIn>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Founders */}
        <section className="py-24 lg:py-40">
          <Container>
            <FadeIn>
              <h2 className="font-serif text-[length:var(--text-h2)] lg:text-[length:var(--text-display)] mb-16 lg:mb-24 text-center lg:text-left">
                The Founders
              </h2>
            </FadeIn>

            <div className="grid lg:grid-cols-2 gap-16 lg:gap-32">
              {/* Harshit */}
              <FadeIn className="group">
                <h3 className="font-serif text-[length:var(--text-h3)]">Harshit Suthar</h3>
                <span className="block text-sm text-accent font-semibold uppercase tracking-widest mt-2 mb-6">Project Manager</span>
                <p className="text-ink-muted leading-relaxed font-light">
                  With a keen eye for execution and spatial mechanics, Harshit ensures that every design conceptualized is built to perfection. His background in project management means timelines are respected, and the unglamorous details are handled flawlessly.
                </p>
              </FadeIn>

              {/* Palak */}
              <FadeIn className="group" delay={0.2}>
                <h3 className="font-serif text-[length:var(--text-h3)]">Palak Suthar</h3>
                <span className="block text-sm text-accent font-semibold uppercase tracking-widest mt-2 mb-6">Design Manager</span>
                <p className="text-ink-muted leading-relaxed font-light">
                  Palak brings the creative vision to life. She obsessively layers textures, selects materials, and crafts the mood of a space. Her approach is rooted in timelessness—designing spaces around how a family actually lives day-to-day, rather than chasing fleeting trends.
                </p>
              </FadeIn>
            </div>
          </Container>
        </section>

        {/* Studio CTA */}
        <section className="py-24 bg-surface border-t border-border">
          <Container className="text-center">
            <FadeIn>
              <h2 className="font-serif text-[length:var(--text-h3)] mb-8">Discuss your project</h2>
              <Button href="/contact" variant="primary" className="bg-ink text-surface px-12 py-5 rounded-full hover:bg-accent transition-colors duration-500">
                Book a Consultation
              </Button>
            </FadeIn>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
