import { getUsers, getUserKPIs } from "@/lib/admin/user-service";
import { UserPageClient } from "@/components/admin/users/UserPageClient";

export default async function UsersPage() {
  const [users, kpis] = await Promise.all([
    getUsers(),
    getUserKPIs()
  ]);

  return <UserPageClient initialUsers={users} kpis={kpis} />;
}
