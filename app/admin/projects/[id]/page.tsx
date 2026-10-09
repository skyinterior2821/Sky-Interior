import { ProjectEditor } from "@/components/admin/projects/ProjectEditor";
import { getAdminProject, getProjectStyles, getProjectRooms } from "@/lib/admin/project-service";
import { notFound } from "next/navigation";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  
  const [project, styles, rooms] = await Promise.all([
    getAdminProject(id),
    getProjectStyles(),
    getProjectRooms(),
  ]);

  if (!project) {
    notFound();
  }

  return <ProjectEditor initialData={project} styles={styles} rooms={rooms} />;
}
