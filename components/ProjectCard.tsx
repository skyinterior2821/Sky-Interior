"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/types";
import { useReducedMotion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  large?: boolean;
}

export function ProjectCard({ project, large = false }: ProjectCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block w-full focus-visible:outline-[var(--color-accent-deep)]"
      aria-label={`View project: ${project.name}, a ${project.category} in ${project.city}`}
    >
      {/* Image container - sharp architectural edges */}
      <div
        className={`relative overflow-hidden bg-[var(--color-border)] ${
          large ? "aspect-[4/5] lg:aspect-[3/4]" : "aspect-[4/5]"
        }`}
      >
        <Image
          src={project.heroImage}
          alt={`Interior view of ${project.name} located in ${project.city}`}
          fill
          sizes={large ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
          className={`object-cover ${shouldReduceMotion ? '' : 'transform group-hover:scale-105 transition-all duration-[2s] ease-out grayscale-[0.2] group-hover:grayscale-0'} ${isLoaded ? 'opacity-90 group-hover:opacity-100 blur-0' : 'opacity-0 blur-lg'}`}
          onLoad={() => setIsLoaded(true)}
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out flex flex-col justify-end p-6 md:p-8" aria-hidden="true">
            <span className={`self-end flex items-center justify-center w-12 h-12 rounded-full border border-[var(--color-surface)]/30 text-[var(--color-surface)] ${shouldReduceMotion ? '' : 'transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out group-hover:rotate-45'}`}>
              ↗
            </span>
        </div>
      </div>

      {/* Info below image */}
      <div className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-start justify-between gap-4 border-t border-[var(--color-border)] pt-4">
        <div className="flex-1">
          <h3 className="font-serif text-[length:var(--text-h3)] text-[var(--color-ink)] group-hover:text-[var(--color-accent-deep)] transition-colors duration-500 leading-tight mb-2 flex items-center gap-4">
            {project.name}
          </h3>
        </div>
        <div className="text-left md:text-right flex flex-col items-start md:items-end">
          <p className="font-sans text-[10px] text-[var(--color-ink-muted)] tracking-[0.2em] uppercase mb-1 flex items-center gap-2">
            {project.category} <span className="w-4 h-px bg-[var(--color-border)] inline-block"></span>
          </p>
          <p className="font-sans text-sm text-[var(--color-ink-muted)] font-light">
            {project.city}
          </p>
        </div>
      </div>
    </Link>
  );
}
