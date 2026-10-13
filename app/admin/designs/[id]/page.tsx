import { DesignEditor } from "@/components/admin/designs/DesignEditor";
import { getAdminDesign, getDesignStyles, getDesignRooms } from "@/lib/admin/design-service";
import { notFound } from "next/navigation";

interface EditDesignPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditDesignPage({ params }: EditDesignPageProps) {
  const { id } = await params;
  
  const [design, styles, rooms] = await Promise.all([
    getAdminDesign(id),
    getDesignStyles(),
    getDesignRooms(),
  ]);

  if (!design) {
    notFound();
  }

  return <DesignEditor initialData={design} styles={styles} rooms={rooms} />;
}
