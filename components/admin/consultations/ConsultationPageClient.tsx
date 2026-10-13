"use client";

import { useState } from "react";
import Link from "next/link";
import { AdminConsultation } from "@/lib/admin/types";
import { ConsultationDetail } from "@/components/admin/consultations/ConsultationDetail";

interface ConsultationPageClientProps {
  consultation: AdminConsultation;
}

export function ConsultationPageClient({ consultation }: ConsultationPageClientProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Link href="/admin/consultations" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-ink)] flex items-center gap-1 mb-2 transition-colors">
            &larr; Back to Consultations
          </Link>
          <h1 className="text-[var(--text-heading-s)] font-serif text-[var(--color-ink)]">Consultation Details</h1>
        </div>
      </div>

      <ConsultationDetail consultation={consultation} isEditing={isEditing} onEditToggle={() => setIsEditing(!isEditing)} />
    </div>
  );
}
