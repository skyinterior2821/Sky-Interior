import { GuideTable } from "@/components/admin/guides/GuideTable";
import { getAdminGuides, getGuideCategories } from "@/lib/admin/guide-service";
import Link from "next/link";

export default async function GuidesPage() {
  const [guides, categories] = await Promise.all([
    getAdminGuides(),
    getGuideCategories(),
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[var(--text-heading-s)] font-serif text-[var(--color-ink)]">Guides</h1>
          <p className="text-[var(--text-body-s)] text-[var(--color-text-muted)] mt-1">Manage the Sky Interior design journal and educational content.</p>
        </div>
        <div>
          <Link href="/admin/guides/new" className="px-4 py-2 bg-[var(--color-ink)] text-[var(--color-surface)] rounded-[var(--radius-md)] text-sm font-medium hover:bg-[var(--color-ink-soft)] transition-colors inline-block">
            + New Guide
          </Link>
        </div>
      </div>

      <GuideTable initialGuides={guides} categories={categories} />
    </div>
  );
}
