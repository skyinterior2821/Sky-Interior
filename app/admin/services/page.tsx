import { ServiceTable } from "@/components/admin/services/ServiceTable";
import { getAdminServices } from "@/lib/admin/service-service";
import Link from "next/link";

export default async function ServicesPage() {
  const services = await getAdminServices();

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[var(--text-heading-s)] font-serif text-[var(--color-ink)]">Services</h1>
          <p className="text-[var(--text-body-s)] text-[var(--color-text-muted)] mt-1">Manage the services presented across the Sky Interior website.</p>
        </div>
        <div>
          <Link href="/admin/services/new" className="px-4 py-2 bg-[var(--color-ink)] text-[var(--color-surface)] rounded-[var(--radius-md)] text-sm font-medium hover:bg-[var(--color-ink-soft)] transition-colors inline-block">
            + Add Service
          </Link>
        </div>
      </div>

      <ServiceTable initialServices={services} />
    </div>
  );
}
