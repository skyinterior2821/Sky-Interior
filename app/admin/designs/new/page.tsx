import { DesignEditor } from "@/components/admin/designs/DesignEditor";
import { getDesignStyles, getDesignRooms } from "@/lib/admin/design-service";

export default async function NewDesignPage() {
  const [styles, rooms] = await Promise.all([
    getDesignStyles(),
    getDesignRooms(),
  ]);

  return <DesignEditor styles={styles} rooms={rooms} />;
}
