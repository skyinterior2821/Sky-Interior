import { getAdminConsultation } from "@/lib/admin/consultation-service";
import { notFound } from "next/navigation";
import { ConsultationPageClient } from "@/components/admin/consultations/ConsultationPageClient";

interface ConsultationDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ConsultationDetailPage({ params }: ConsultationDetailPageProps) {
  const { id } = await params;
  const consultation = await getAdminConsultation(id);

  if (!consultation) {
    notFound();
  }

  return <ConsultationPageClient consultation={consultation} />;
}
