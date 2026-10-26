"use client";

import Link from "next/link";
import { Project } from "@/lib/types";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

interface ProjectCardProps {
  project: Project;
  large?: boolean;
}

export function ProjectCard({ project, large = false }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block w-full focus-visible:outline-[#9C5B3F]"
      aria-label={`View project: ${project.name}, a ${project.category} in ${project.city}`}
    >
      {/* Image container - sharp architectural edges, restrained hover */}
      <div className="relative overflow-hidden border border-[#E5DFD5] bg-[#EBE7DF]">
        <ImagePlaceholder
          label={project.name}
          sublabel={`${project.category} · ${project.city}`}
          aspect={large ? "aspect-[4/5] lg:aspect-[3/4]" : "aspect-[4/5]"}
          src={project.heroImage}
          alt={`Interior view of ${project.name} in ${project.city}`}
          className="group-hover:scale-[1.02] transition-transform duration-500 ease-out"
        />
      </div>

      {/* Info below image */}
      <div className="mt-4 flex items-start justify-between gap-4 border-t border-[#E5DFD5] pt-3">
        <div className="flex-1">
          <h3 className="font-serif text-xl text-[#1C1B19] group-hover:text-[#9C5B3F] transition-colors duration-300 leading-snug">
            {project.name}
          </h3>
          <p className="font-sans text-xs text-[#736F69] mt-0.5">
            {project.scope}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-sans text-[11px] text-[#736F69] uppercase tracking-wider">
            {project.category}
          </p>
          <p className="font-sans text-xs text-[#1C1B19] font-medium mt-0.5">
            {project.city}
          </p>
        </div>
      </div>
    </Link>
  );
}
