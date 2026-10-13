import { ProjectEditor } from "@/components/admin/projects/ProjectEditor";
import { getProjectStyles, getProjectRooms } from "@/lib/admin/project-service";

export default async function NewProjectPage() {
  const [styles, rooms] = await Promise.all([
    getProjectStyles(),
    getProjectRooms(),
  ]);

  return <ProjectEditor styles={styles} rooms={rooms} />;
}
