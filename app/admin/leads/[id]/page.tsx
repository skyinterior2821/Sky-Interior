import { getAdminLead } from "@/lib/admin/lead-service";
import { notFound } from "next/navigation";
import { LeadPageClient } from "@/components/admin/leads/LeadPageClient";

interface LeadDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
  const { id } = await params;
  const lead = await getAdminLead(id);

  if (!lead) {
    notFound();
  }

  return <LeadPageClient lead={lead} />;
}
