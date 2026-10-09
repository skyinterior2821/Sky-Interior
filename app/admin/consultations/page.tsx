import { ConsultationTable } from "@/components/admin/consultations/ConsultationTable";
import { getAdminConsultations, getConsultationKPIs } from "@/lib/admin/consultation-service";

export default async function ConsultationsPage() {
  const [consultations, kpis] = await Promise.all([
    getAdminConsultations(),
    getConsultationKPIs()
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[var(--text-heading-s)] font-serif text-[var(--color-ink)]">Consultations</h1>
          <p className="text-[var(--text-body-s)] text-[var(--color-text-muted)] mt-1">Manage consultation requests and scheduling information.</p>
        </div>
      </div>

      <ConsultationTable initialConsultations={consultations} kpis={kpis} />
    </div>
  );
}
