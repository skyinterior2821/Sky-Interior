import { LeadTable } from "@/components/admin/leads/LeadTable";
import { getAdminLeads, getLeadKPIs } from "@/lib/admin/lead-service";

export default async function LeadsPage() {
  const [leads, kpis] = await Promise.all([
    getAdminLeads(),
    getLeadKPIs()
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[var(--text-heading-s)] font-serif text-[var(--color-ink)]">Leads</h1>
          <p className="text-[var(--text-body-s)] text-[var(--color-text-muted)] mt-1">Manage incoming enquiries and track their progress.</p>
        </div>
      </div>

      <LeadTable initialLeads={leads} kpis={kpis} />
    </div>
  );
}
