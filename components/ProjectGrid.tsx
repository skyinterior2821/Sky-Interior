import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui";
import { ProjectCard } from "@/components/ProjectCard";
import { getFeaturedProjects } from "@/lib/projects";

export function ProjectGrid() {
  const projects = getFeaturedProjects();

  return (
    <section className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          heading="Selected work"
          subheading="A few recent projects, start to finish."
        />

        {/* Asymmetric grid per design.md §4 — mix full-width + 2-up layouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {projects.map((project, i) => (
            <div
              key={project.slug}
              className={i === 0 ? "md:col-span-2" : ""}
            >
              <ProjectCard project={project} large={i === 0} />
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/work"
            className="font-sans text-sm uppercase tracking-widest text-accent hover:text-accent-deep transition-colors"
          >
            View all projects →
          </Link>
        </div>
      </Container>
    </section>
  );
}
