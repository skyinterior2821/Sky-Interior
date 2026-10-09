import { DesignTable } from "@/components/admin/designs/DesignTable";
import { getAdminDesigns, getDesignStyles, getDesignRooms } from "@/lib/admin/design-service";
import Link from "next/link";

export default async function DesignsPage() {
  const [designs, styles, rooms] = await Promise.all([
    getAdminDesigns(),
    getDesignStyles(),
    getDesignRooms(),
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[var(--text-heading-s)] font-serif text-[var(--color-ink)]">Designs</h1>
          <p className="text-[var(--text-body-s)] text-[var(--color-text-muted)] mt-1">Manage the design discovery library.</p>
        </div>
        <div>
          <Link href="/admin/designs/new" className="px-4 py-2 bg-[var(--color-ink)] text-[var(--color-surface)] rounded-[var(--radius-md)] text-sm font-medium hover:bg-[var(--color-ink-soft)] transition-colors inline-block">
            + Add Design
          </Link>
        </div>
      </div>

      <DesignTable initialDesigns={designs} styles={styles} rooms={rooms} />
    </div>
  );
}
