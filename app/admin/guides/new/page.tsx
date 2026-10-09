import { GuideEditor } from "@/components/admin/guides/GuideEditor";
import { getGuideCategories } from "@/lib/admin/guide-service";

export default async function NewGuidePage() {
  const categories = await getGuideCategories();
  return <GuideEditor categories={categories} />;
}
