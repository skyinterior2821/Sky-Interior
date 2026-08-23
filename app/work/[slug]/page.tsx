import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CTABand } from "@/components/CTABand";
import { Container, Button, FadeIn } from "@/components/ui";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import Image from "next/image";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.name} — Sky Interiors`,
    description: project.brief,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Nav />
      <main className="pt-24 lg:pt-32">
        {/* Header block — content.md §3 */}
        <Container className="pb-16 lg:pb-24">
          <FadeIn>
            <h1 className="font-serif text-[length:var(--text-h1)] lg:text-[length:var(--text-display)]">
              {project.name}
            </h1>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div>
                <p className="text-ink-muted uppercase tracking-widest text-xs mb-1">Category</p>
                <p>{project.category}</p>
              </div>
              <div>
                <p className="text-ink-muted uppercase tracking-widest text-xs mb-1">Location</p>
                <p>{project.city}</p>
              </div>
              <div>
                <p className="text-ink-muted uppercase tracking-widest text-xs mb-1">Size</p>
                <p>{project.size}</p>
              </div>
              <div>
                <p className="text-ink-muted uppercase tracking-widest text-xs mb-1">Timeline</p>
                <p>{project.timeline}</p>
              </div>
            </div>
          </FadeIn>
        </Container>

        {/* Hero image */}
        <FadeIn delay={0.2}>
          <div className="w-full relative aspect-[16/9] bg-border-light">
            <Image
              src={project.heroImage}
              alt={project.name}
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
          </div>
        </FadeIn>

        {/* Brief */}
        <Container narrow className="py-16 lg:py-24">
          <FadeIn>
            <p className="font-serif text-[length:var(--text-lg)] lg:text-[length:var(--text-h3)] text-ink leading-relaxed">
              {project.brief}
            </p>
          </FadeIn>
        </Container>

        {/* Section labels: Before/After, Layout, Materials & Palette, Gallery — content.md §3 */}
        <Container className="pb-16 lg:pb-24">
          <div className="space-y-16">
            {["Before / After", "Layout", "Materials & Palette", "Gallery"].map(
              (section, i) => (
                <FadeIn key={section} delay={i * 0.1}>
                  <h2 className="font-serif text-[length:var(--text-h3)] mb-6">
                    {section}
                  </h2>
                  <div className="relative aspect-[3/2] bg-border-light">
                    <Image
                      src={project.images[i % project.images.length] || project.heroImage}
                      alt={`${project.name} - ${section}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      className="object-cover"
                    />
                  </div>
                </FadeIn>
              )
            )}
          </div>

          {/* Closing line — content.md §3 */}
          {project.closingLine && (
            <FadeIn>
              <p className="mt-16 font-serif text-[length:var(--text-lg)] text-ink-muted italic">
                &ldquo;{project.closingLine}&rdquo;
              </p>
            </FadeIn>
          )}
        </Container>

        {/* Bottom CTA — content.md §3 */}
        <section className="py-16 lg:py-24 border-t border-border-light">
          <Container className="text-center">
            <p className="font-serif text-[length:var(--text-h3)] mb-6">
              Want something similar for your space?
            </p>
            <Button href="/contact">Book a Consultation</Button>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
