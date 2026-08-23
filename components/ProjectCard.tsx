import Link from "next/link";
import { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  large?: boolean;
}

export function ProjectCard({ project, large = false }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block relative overflow-hidden"
    >
      {/* Image container with fixed aspect ratio per design.md §5 */}
      <div
        className={`relative overflow-hidden bg-border ${
          large ? "aspect-[16/9]" : "aspect-[4/3]"
        }`}
      >
        {/* TODO: Replace with next/image once real project photography is supplied */}
        <div className="w-full h-full bg-border-light flex items-center justify-center">
          <p className="text-ink-muted text-xs uppercase tracking-widest">
            [Project image]
          </p>
        </div>
      </div>

      {/* Caption — content.md pattern: Project Name — Space Type — City */}
      <div className="mt-4 flex items-baseline justify-between">
        <p className="font-sans text-sm text-ink">
          {project.name} — {project.category} — {project.city}
        </p>
      </div>
    </Link>
  );
}
