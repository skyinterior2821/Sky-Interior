"use client";

import Link from "next/link";
import { AdminEstimate } from "@/lib/admin/types";
import { EstimateDetail } from "@/components/admin/estimates/EstimateDetail";

interface EstimatePageClientProps {
  estimate: AdminEstimate;
}

export function EstimatePageClient({ estimate }: EstimatePageClientProps) {
  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Link href="/admin/estimates" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-ink)] flex items-center gap-1 mb-2 transition-colors">
            &larr; Back to Estimates
          </Link>
          <h1 className="text-[var(--text-heading-s)] font-serif text-[var(--color-ink)]">Estimate Details</h1>
        </div>
      </div>

      <EstimateDetail estimate={estimate} />
    </div>
  );
}
