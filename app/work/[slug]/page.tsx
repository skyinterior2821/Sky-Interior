import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CTABand } from "@/components/CTABand";
import { ProjectCard } from "@/components/ProjectCard";
import { Container, FadeIn } from "@/components/ui";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { ProjectGalleryViewer } from "@/components/ProjectGalleryViewer";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import servicesData from "@/content/services.json";

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

  // Get related projects
  const allProjects = getAllProjects();
  const relatedProjects = allProjects.filter(p => p.slug !== slug).slice(0, 2);

  // Get related service
  const relatedService = servicesData.find(s => s.relatedProjects?.includes(slug));

  return (
    <>
      <Nav />
      <main className="pt-24 lg:pt-32 bg-bg">
        {/* Hero block - Asymmetric Case Study Layout */}
        <div className="w-full border-b border-[var(--color-border)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[70vh] lg:min-h-[85vh]">
            <div className="lg:col-span-7 relative h-[50vh] lg:h-auto bg-[var(--color-border)]">
              <Image
                src={project.heroImage}
                alt={project.name}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
                className="object-cover"
              />
              <div className="absolute bottom-6 right-6 z-10">
                <ProjectGalleryViewer images={[project.heroImage, ...project.images]} />
              </div>
            </div>
            
            <div className="lg:col-span-5 flex flex-col justify-center px-6 py-16 lg:p-24 bg-[var(--color-ink)] text-[var(--color-surface)] relative">
              <FadeIn>
                <div className="flex items-center gap-4 mb-12">
                  <Link href="/" className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-surface)]/60 hover:text-[var(--color-accent-deep)] transition-colors">
                    Home
                  </Link>
                  <span className="text-[var(--color-surface)]/60">/</span>
                  <Link href="/work" className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-surface)]/60 hover:text-[var(--color-accent-deep)] transition-colors">
                    Work
                  </Link>
                  <span className="text-[var(--color-surface)]/60">/</span>
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-surface)]">
                    {project.name}
                  </span>
                </div>
                
                <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-[var(--color-surface)] mb-12">
                  {project.name}
                </h1>

                <div className="grid grid-cols-2 gap-y-10 gap-x-6">
                  <div>
                    <p className="font-sans uppercase tracking-[0.2em] text-[10px] text-[var(--color-surface)]/60 mb-2">Category</p>
                    <p className="font-serif text-xl text-[var(--color-surface)]">{project.category}</p>
                  </div>
                  <div>
                    <p className="font-sans uppercase tracking-[0.2em] text-[10px] text-[var(--color-surface)]/60 mb-2">Location</p>
                    <p className="font-serif text-xl text-[var(--color-surface)]">{project.city}</p>
                  </div>
                  <div>
                    <p className="font-sans uppercase tracking-[0.2em] text-[10px] text-[var(--color-surface)]/60 mb-2">Size</p>
                    <p className="font-serif text-xl text-[var(--color-surface)]">{project.size}</p>
                  </div>
                  <div>
                    <p className="font-sans uppercase tracking-[0.2em] text-[10px] text-[var(--color-surface)]/60 mb-2">Timeline</p>
                    <p className="font-serif text-xl text-[var(--color-surface)]">{project.timeline}</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* Brief & Scope */}
        <Container className="py-24 lg:py-40 border-b border-[var(--color-border)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
            <div className="md:col-span-4">
              <FadeIn>
                <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent-deep)] mb-8">
                  The Brief
                </h2>
                <div className="border-t border-[var(--color-border)] pt-8">
                  <span className="block font-sans text-xs tracking-widest uppercase text-[var(--color-ink)] mb-4">Scope of Work</span>
                  <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed font-light">
                    {project.scope}
                  </p>
                </div>
              </FadeIn>
            </div>
            <div className="md:col-span-8">
              <FadeIn>
                <p className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] text-[var(--color-ink)] leading-tight">
                  {project.brief}
                </p>
              </FadeIn>
            </div>
          </div>
        </Container>

        {/* Magazine-style gallery and sections */}
        <div className="py-24 lg:py-40 bg-[var(--color-paper)]">
          <Container>
            <div className="space-y-24 lg:space-y-40">
              
              {/* Split section: Layout */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-24 items-center">
                <FadeIn className="md:col-span-5 order-2 md:order-1">
                  <div className="relative aspect-[4/5] bg-[var(--color-border)] overflow-hidden">
                    <Image
                      src={project.images[0] || project.heroImage}
                      alt={`${project.name} - Spatial Layout`}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover hover:scale-105 transition-transform duration-[2s] ease-out"
                    />
                  </div>
                </FadeIn>
                <FadeIn className="md:col-span-7 order-1 md:order-2">
                  <h3 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-[var(--color-ink)] mb-8 leading-[1.1]">Spatial Flow</h3>
                  <p className="text-[var(--color-ink-muted)] text-lg lg:text-xl font-light leading-relaxed max-w-xl">
                    We focused on creating seamless transitions between living areas, optimizing natural light, and defining zones without rigid barriers. The result is a space that breathes.
                  </p>
                </FadeIn>
              </div>

              {/* Full width gallery image */}
              <FadeIn>
                <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full bg-[var(--color-border)] overflow-hidden">
                  <Image
                    src={project.images[1] || project.images[0] || project.heroImage}
                    alt={`${project.name} - Details`}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              </FadeIn>

              {/* Split section: Materials */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-24 items-center">
                <FadeIn className="md:col-span-6">
                  <h3 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-[var(--color-ink)] mb-8 leading-[1.1]">Materials & Palette</h3>
                  <p className="text-[var(--color-ink-muted)] text-lg lg:text-xl font-light leading-relaxed mb-12 max-w-xl">
                    A carefully curated selection of tactile materials forms the foundation of this space. Natural textures, muted tones, and thoughtful metal accents combine to create understated luxury.
                  </p>
                  <div className="flex gap-6">
                    {/* Mock material swatches */}
                    <div className="w-20 h-20 bg-[#EAE8E3] shadow-sm flex items-end p-2" title="Plaster"><span className="text-[8px] font-sans uppercase tracking-widest text-black/50">Plaster</span></div>
                    <div className="w-20 h-20 bg-[#8E7E70] shadow-sm flex items-end p-2" title="Oak Wood"><span className="text-[8px] font-sans uppercase tracking-widest text-white/50">Oak</span></div>
                    <div className="w-20 h-20 bg-[#2C2F33] shadow-sm flex items-end p-2" title="Matte Steel"><span className="text-[8px] font-sans uppercase tracking-widest text-white/50">Steel</span></div>
                    <div className="w-20 h-20 bg-[#C9A25E] shadow-sm flex items-end p-2" title="Brushed Brass"><span className="text-[8px] font-sans uppercase tracking-widest text-black/50">Brass</span></div>
                  </div>
                </FadeIn>
                <FadeIn className="md:col-span-6">
                  <div className="relative aspect-square bg-[var(--color-border)] overflow-hidden">
                    <Image
                      src={project.images[2] || project.images[1] || project.heroImage}
                      alt={`${project.name} - Materials`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover hover:scale-105 transition-transform duration-[2s] ease-out"
                    />
                  </div>
                </FadeIn>
              </div>
            </div>

            {/* Closing line */}
            {project.closingLine && (
              <FadeIn className="mt-32 lg:mt-48 text-center max-w-4xl mx-auto border-t border-[var(--color-border)] pt-24">
                <span className="text-[var(--color-accent-deep)] text-6xl block mb-8 font-serif" aria-hidden="true">"</span>
                <p className="font-serif text-[clamp(2rem,4vw,3rem)] text-[var(--color-ink)] leading-tight">
                  {project.closingLine}
                </p>
              </FadeIn>
            )}
          </Container>
        </div>

        {/* Related Projects */}
        <section className="py-24 bg-[var(--color-surface)]">
          <Container>
            <FadeIn>
              <div className="flex items-center gap-4 mb-16">
                <span className="w-8 h-px bg-[var(--color-accent-deep)]" />
                <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent-deep)]">
                  More Projects
                </h2>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
              {relatedProjects.map((rp, i) => (
                <FadeIn key={rp.slug} delay={i * 0.1}>
                  <ProjectCard project={rp} />
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>

        {/* Related Services */}
        {relatedService && (
          <section className="py-24 bg-[var(--color-paper)] border-t border-[var(--color-border)]">
            <Container>
              <FadeIn>
                <div className="flex items-center gap-4 mb-16">
                  <span className="w-8 h-px bg-[var(--color-accent-deep)]" />
                  <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent-deep)]">
                    Related Services
                  </h2>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden">
                  <div className="md:col-span-5 relative aspect-square md:aspect-auto md:h-full">
                    <Image
                      src={relatedService.heroImage}
                      alt={relatedService.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover grayscale-[0.2]"
                    />
                  </div>
                  <div className="md:col-span-7 p-12 lg:p-16">
                    <h3 className="font-serif text-[clamp(2rem,3vw,2.5rem)] text-[var(--color-ink)] mb-6">{relatedService.title}</h3>
                    <p className="text-[var(--color-ink-muted)] text-[length:var(--text-lg)] font-light leading-relaxed mb-10">
                      {relatedService.description}
                    </p>
                    <Link 
                      href={`/services/${relatedService.slug}`}
                      className="inline-block bg-[var(--color-ink)] text-[var(--color-surface)] hover:bg-[var(--color-accent-deep)] transition-colors px-8 py-5 uppercase tracking-[0.2em] text-[10px] font-medium focus-visible:outline-[var(--color-accent-deep)]"
                    >
                      Explore Service
                    </Link>
                  </div>
                </div>
              </FadeIn>
            </Container>
          </section>
        )}

        <CTABand />
      </main>
      <Footer />
    </>
  );
}
