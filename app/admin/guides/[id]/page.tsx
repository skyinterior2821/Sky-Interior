import { GuideEditor } from "@/components/admin/guides/GuideEditor";
import { getAdminGuide, getGuideCategories } from "@/lib/admin/guide-service";
import { notFound } from "next/navigation";

interface EditGuidePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditGuidePage({ params }: EditGuidePageProps) {
  const { id } = await params;
  const [guide, categories] = await Promise.all([
    getAdminGuide(id),
    getGuideCategories(),
  ]);

  if (!guide) {
    notFound();
  }

  return <GuideEditor initialData={guide} categories={categories} />;
}
