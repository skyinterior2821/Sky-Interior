import { ServiceEditor } from "@/components/admin/services/ServiceEditor";
import { getAdminService } from "@/lib/admin/service-service";
import { notFound } from "next/navigation";

interface EditServicePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  const { id } = await params;
  const service = await getAdminService(id);

  if (!service) {
    notFound();
  }

  return <ServiceEditor initialData={service} />;
}
