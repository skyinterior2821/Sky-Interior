"use client";

import Link from "next/link";
import { Container, FadeIn } from "@/components/ui";
import { ProjectCard } from "@/components/ProjectCard";
import { getFeaturedProjects } from "@/lib/projects";

export function ProjectGrid() {
  const projects = getFeaturedProjects();

  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#E5DFD5]">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <FadeIn>
            <span className="font-sans text-xs tracking-wider uppercase text-[#736F69] block mb-3">
              Portfolio
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl text-[#1C1B19]">
              Selected work
            </h2>
          </FadeIn>
          {projects.length > 0 && (
            <FadeIn delay={0.1}>
              <Link
                href="/work"
                className="font-sans text-xs tracking-wider uppercase text-[#1C1B19] hover:text-[#9C5B3F] transition-colors border-b border-[#1C1B19] hover:border-[#9C5B3F] pb-1 inline-flex items-center gap-2"
              >
                <span>View all projects</span>
                <span>&rarr;</span>
              </Link>
            </FadeIn>
          )}
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
            {projects.map((project, i) => (
              <FadeIn key={project.slug} delay={i * 0.1}>
                <ProjectCard project={project} large={i === 0 || i === 3} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="py-16 px-8 text-center bg-[#F5F2EC] border border-dashed border-[#E5DFD5] rounded-sm max-w-2xl mx-auto space-y-3">
            <h3 className="font-serif text-2xl text-[#1C1B19]">
              Portfolio Documentation in Progress
            </h3>
            <p className="font-sans text-sm text-[#736F69] font-light leading-relaxed">
              We are currently photographing and documenting recent residential and commercial projects across Ahmedabad and Banswara. Contact our studio directly to review project portfolios.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-block px-6 py-2.5 bg-[#1C1B19] text-[#F5F2EC] hover:bg-[#9C5B3F] transition-colors text-xs uppercase tracking-wider rounded-sm font-medium"
              >
                Inquire With Studio
              </Link>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
