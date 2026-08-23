import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  large?: boolean;
}

export function ProjectCard({ project, large = false }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block"
    >
      {/* Image container */}
      <div
        className={`relative overflow-hidden bg-surface rounded-2xl lg:rounded-3xl border border-border/30 ${
          large ? "aspect-[16/9]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={project.heroImage}
          alt={project.name}
          fill
          sizes={large ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
          className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out flex items-end p-6 lg:p-8">
          <span className="font-sans text-sm text-white/90 tracking-widest uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">View project →</span>
        </div>
      </div>

      {/* Info below image — always visible */}
      <div className="mt-4 lg:mt-6">
        <h3 className="font-serif text-[length:var(--text-h3)] text-ink group-hover:text-accent-deep transition-colors duration-300">{project.name}</h3>
        <p className="font-sans text-sm text-ink-muted tracking-wide mt-1">
          {project.category} — {project.city}
        </p>
      </div>
    </Link>
  );
}

