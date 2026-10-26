import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CTABand } from "@/components/CTABand";
import { Container, FadeIn } from "@/components/ui";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import type { Metadata } from "next";
import Link from "next/link";

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
    title: `${project.name} | Sky Interior`,
    description: project.brief,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <>
      <Nav />
      <main className="pt-28 lg:pt-36 bg-[#F5F2EC] text-[#1C1B19]">
        {/* Breadcrumb & Header */}
        <Container className="pb-12 border-b border-[#E5DFD5]">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <Link href="/work" className="font-sans text-xs tracking-wider uppercase text-[#736F69] hover:text-[#9C5B3F]">
                Work
              </Link>
              <span className="text-[#736F69] text-xs">/</span>
              <span className="font-sans text-xs tracking-wider uppercase text-[#9C5B3F]">
                {project.category}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1B19] leading-tight mb-8">
              {project.name}
            </h1>

            {/* Facts Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-[#E5DFD5]">
              <div>
                <p className="font-sans text-[11px] uppercase tracking-wider text-[#736F69] mb-1">Location</p>
                <p className="font-serif text-base text-[#1C1B19] font-medium">{project.city}</p>
              </div>
              <div>
                <p className="font-sans text-[11px] uppercase tracking-wider text-[#736F69] mb-1">Scale</p>
                <p className="font-serif text-base text-[#1C1B19] font-medium">{project.size}</p>
              </div>
              <div>
                <p className="font-sans text-[11px] uppercase tracking-wider text-[#736F69] mb-1">Scope</p>
                <p className="font-serif text-base text-[#1C1B19] font-medium">{project.scope}</p>
              </div>
              <div>
                <p className="font-sans text-[11px] uppercase tracking-wider text-[#736F69] mb-1">Timeline</p>
                <p className="font-serif text-base text-[#1C1B19] font-medium">{project.timeline}</p>
              </div>
            </div>
          </FadeIn>
        </Container>

        {/* Hero Visual Block */}
        <Container className="py-12 lg:py-16">
          <FadeIn>
            <div className="border border-[#E5DFD5] bg-[#EBE7DF]">
              <ImagePlaceholder
                label={project.name}
                sublabel={`Primary Elevation · ${project.city}`}
                aspect="aspect-[16/10] lg:aspect-[21/10]"
                src={project.heroImage}
                alt={project.name}
              />
            </div>
          </FadeIn>
        </Container>

        {/* Project Brief */}
        <section className="py-12 lg:py-20 border-y border-[#E5DFD5] bg-[#FAF8F5]">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16">
              <div className="md:col-span-4">
                <span className="font-sans text-xs tracking-wider uppercase text-[#736F69] block mb-2">
                  The Brief
                </span>
                <p className="font-serif text-xl text-[#1C1B19]">
                  Approach &amp; Intent
                </p>
              </div>
              <div className="md:col-span-8">
                <p className="font-sans text-base lg:text-lg text-[#1C1B19] leading-relaxed font-light">
                  {project.brief}
                </p>
                {project.closingLine && (
                  <p className="font-serif italic text-lg text-[#9C5B3F] mt-6">
                    &ldquo;{project.closingLine}&rdquo;
                  </p>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* Project Spatial Gallery Views */}
        <section className="py-20 lg:py-28">
          <Container>
            <div className="max-w-2xl mb-12">
              <span className="font-sans text-xs tracking-wider uppercase text-[#736F69] block mb-2">
                Project Gallery
              </span>
              <h2 className="font-serif text-2xl lg:text-3xl text-[#1C1B19]">
                Spatial details &amp; cabinetry
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <div className="border border-[#E5DFD5]">
                <ImagePlaceholder
                  label="Living &amp; Spatial Flow"
                  sublabel={`${project.name} · View 01`}
                  aspect="aspect-[4/3]"
                  src={project.images[0] || ""}
                  alt={`${project.name} living space`}
                />
              </div>

              <div className="border border-[#E5DFD5]">
                <ImagePlaceholder
                  label="Custom Joinery &amp; Millwork"
                  sublabel={`${project.name} · View 02`}
                  aspect="aspect-[4/3]"
                  src={project.images[1] || ""}
                  alt={`${project.name} custom millwork`}
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Next Project Link */}
        <section className="py-16 bg-[#FAF8F5] border-t border-[#E5DFD5]">
          <Container>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="font-sans text-xs uppercase tracking-wider text-[#736F69] block mb-1">
                  Next Project
                </span>
                <Link
                  href={`/work/${nextProject.slug}`}
                  className="font-serif text-2xl lg:text-3xl text-[#1C1B19] hover:text-[#9C5B3F] transition-colors"
                >
                  {nextProject.name} &rarr;
                </Link>
                <p className="font-sans text-xs text-[#736F69] mt-1">
                  {nextProject.category} &middot; {nextProject.city}
                </p>
              </div>

              <Link
                href="/work"
                className="px-6 py-3 border border-[#1C1B19] text-[#1C1B19] text-xs uppercase tracking-wider rounded-sm hover:bg-[#1C1B19] hover:text-[#F5F2EC] transition-colors"
              >
                Back to All Work
              </Link>
            </div>
          </Container>
        </section>

        <CTABand />
      </main>
      <Footer />
    </>
  );
}
