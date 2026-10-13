"use client";

import { useState } from "react";
import Link from "next/link";
import { AdminLead } from "@/lib/admin/types";
import { LeadDetail } from "@/components/admin/leads/LeadDetail";

interface LeadPageClientProps {
  lead: AdminLead;
}

export function LeadPageClient({ lead }: LeadPageClientProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Link href="/admin/leads" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-ink)] flex items-center gap-1 mb-2 transition-colors">
            &larr; Back to Leads
          </Link>
          <h1 className="text-[var(--text-heading-s)] font-serif text-[var(--color-ink)]">Lead Details</h1>
        </div>
      </div>

      <LeadDetail lead={lead} isEditing={isEditing} onEditToggle={() => setIsEditing(!isEditing)} />
    </div>
  );
}
