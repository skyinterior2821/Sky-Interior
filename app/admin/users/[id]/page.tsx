import { getUserById } from "@/lib/admin/user-service";
import { notFound } from "next/navigation";
import { UserDetail } from "@/components/admin/users/UserDetail";
import Link from "next/link";

interface UserDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Link href="/admin/users" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-ink)] flex items-center gap-1 mb-2 transition-colors">
            &larr; Back to Users
          </Link>
          <h1 className="text-[var(--text-heading-s)] font-serif text-[var(--color-ink)]">User Details</h1>
        </div>
      </div>
      <UserDetail user={user} />
    </div>
  );
}
