import React from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export const metadata = {
  title: "Admin Dashboard — Sky Interior",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Override the public site's dark theme base by enforcing light mode
  // The global body is text-[var(--color-surface)] bg-[var(--color-ink)]
  // We use fixed positioning to act as our own viewport surface over the body
  return (
    <div className="fixed inset-0 z-[100] bg-[var(--color-surface)] text-[var(--color-ink)] flex overflow-hidden font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[var(--color-surface-muted)]">
          {children}
        </main>
      </div>
    </div>
  );
}
