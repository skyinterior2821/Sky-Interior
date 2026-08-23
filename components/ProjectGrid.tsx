"use client";

import Link from "next/link";
import { Container, SectionHeading, FadeIn } from "@/components/ui";
import { ProjectCard } from "@/components/ProjectCard";
import { getFeaturedProjects } from "@/lib/projects";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export function ProjectGrid() {
  const projects = getFeaturedProjects();
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  const leftColumn = projects.filter((_, i) => i % 2 === 0);
  const rightColumn = projects.filter((_, i) => i % 2 !== 0);

  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const yRight = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={container} className="py-24 lg:py-40 bg-surface">
      <Container>
        <FadeIn>
          <SectionHeading
            heading="Selected work"
            subheading="A few recent projects, start to finish."
          />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mt-16 lg:mt-24">
          {/* Left Column */}
          <div className="flex flex-col gap-8 lg:gap-32">
            {leftColumn.map((project, i) => (
              <FadeIn key={project.slug} delay={i * 0.1}>
                <ProjectCard project={project} large={true} />
              </FadeIn>
            ))}
          </div>

          {/* Right Column (parallax) */}
          <motion.div 
            className="flex flex-col gap-8 lg:gap-32 md:pt-40"
            style={{ y: (shouldReduceMotion || isMobile) ? 0 : yRight }}
          >
            {rightColumn.map((project, i) => (
              <FadeIn key={project.slug} delay={i * 0.1 + 0.1}>
                <ProjectCard project={project} large={true} />
              </FadeIn>
            ))}
          </motion.div>
        </div>

        <div className="mt-24 lg:mt-40 flex justify-center">
          <Link
            href="/work"
            className="group relative font-sans text-sm tracking-[0.2em] uppercase text-ink overflow-hidden inline-flex items-center gap-4 py-4 px-8 border border-border/50 rounded-full hover:border-accent transition-colors duration-500"
          >
            <span className="relative z-10">View all projects</span>
            <span className="relative z-10 transform transition-transform group-hover:translate-x-2">→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
