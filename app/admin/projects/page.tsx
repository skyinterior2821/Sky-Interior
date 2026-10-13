import { ProjectTable } from "@/components/admin/projects/ProjectTable";
import { getAdminProjects, getProjectStyles, getProjectRooms } from "@/lib/admin/project-service";
import Link from "next/link";

export default async function ProjectsPage() {
  const [projects, styles, rooms] = await Promise.all([
    getAdminProjects(),
    getProjectStyles(),
    getProjectRooms(),
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[var(--text-heading-s)] font-serif text-[var(--color-ink)]">Projects</h1>
          <p className="text-[var(--text-body-s)] text-[var(--color-text-muted)] mt-1">Manage your interior projects and portfolio content.</p>
        </div>
        <div>
          <Link href="/admin/projects/new" className="px-4 py-2 bg-[var(--color-ink)] text-[var(--color-surface)] rounded-[var(--radius-md)] text-sm font-medium hover:bg-[var(--color-ink-soft)] transition-colors inline-block">
            + Add Project
          </Link>
        </div>
      </div>

      <ProjectTable initialProjects={projects} styles={styles} rooms={rooms} />
    </div>
  );
}
