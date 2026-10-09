import { getAdminEstimateById } from "@/lib/admin/estimate-service";
import { notFound } from "next/navigation";
import { EstimatePageClient } from "@/components/admin/estimates/EstimatePageClient";

interface EstimateDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function EstimateDetailPage({ params }: EstimateDetailPageProps) {
  const { id } = await params;
  const estimate = await getAdminEstimateById(id);

  if (!estimate) {
    notFound();
  }

  return <EstimatePageClient estimate={estimate} />;
}
