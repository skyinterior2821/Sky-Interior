import { EstimateTable } from "@/components/admin/estimates/EstimateTable";
import { getAdminEstimates, getEstimateKPIs } from "@/lib/admin/estimate-service";

export default async function EstimatesPage() {
  const [estimates, kpis] = await Promise.all([
    getAdminEstimates(),
    getEstimateKPIs()
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[var(--text-heading-s)] font-serif text-[var(--color-ink)]">Estimates</h1>
          <p className="text-[var(--text-body-s)] text-[var(--color-text-muted)] mt-1">Review indicative estimates generated through the planning calculator.</p>
        </div>
      </div>

      <EstimateTable initialEstimates={estimates} kpis={kpis} />
    </div>
  );
}
