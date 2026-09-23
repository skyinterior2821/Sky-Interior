"use client";

import Link from "next/link";
import { Container, FadeIn } from "@/components/ui";
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

  const yRight = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={container} className="py-24 lg:py-40 bg-[var(--color-paper)] border-y border-[var(--color-border)]">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 lg:mb-32">
          <FadeIn>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-px bg-[var(--color-accent-deep)] block" />
              <h2 className="font-sans text-xs tracking-widest uppercase text-[var(--color-accent-deep)]">Selected Work</h2>
            </div>
            <h3 className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] text-[var(--color-ink)] leading-[1.1] max-w-2xl">
              A curation of our finest residential and commercial spaces.
            </h3>
          </FadeIn>
          <FadeIn delay={0.2} className="md:pb-2">
            <Link
              href="/work"
              className="group inline-flex items-center gap-4 text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--color-ink)] hover:text-[var(--color-accent-deep)] transition-colors duration-300 pb-2 border-b border-[var(--color-border)] hover:border-[var(--color-accent-deep)]"
            >
              <span>View Portfolio</span>
              <span className="transform transition-transform duration-500 group-hover:translate-x-2">→</span>
            </Link>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-24 gap-y-16 lg:gap-y-32">
          {/* Left Column */}
          <div className="flex flex-col gap-16 lg:gap-32">
            {leftColumn.map((project, i) => (
              <FadeIn key={project.slug} delay={i * 0.1}>
                <ProjectCard project={project} large={true} />
              </FadeIn>
            ))}
          </div>

          {/* Right Column (parallax staggered) */}
          <motion.div 
            className="flex flex-col gap-16 lg:gap-32 md:pt-48"
            style={{ y: (shouldReduceMotion || isMobile) ? 0 : yRight }}
          >
            {rightColumn.map((project, i) => (
              <FadeIn key={project.slug} delay={i * 0.1 + 0.1}>
                <ProjectCard project={project} large={true} />
              </FadeIn>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
