"use client";

import React, { useState, useTransition } from "react";
import { AdminUser, UserRole, UserStatus } from "@/lib/admin/types";
import { AdminCard } from "@/components/admin/AdminCard";
import { UserTable } from "./UserTable";
import { createUser } from "@/lib/admin/user-service";
import { useRouter } from "next/navigation";

interface UserPageClientProps {
  initialUsers: AdminUser[];
  kpis: { total: number; active: number; invited: number; suspended: number };
}

export function UserPageClient({ initialUsers, kpis }: UserPageClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "VIEWER" as UserRole,
  });

  const filteredUsers = initialUsers.filter(u => {
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    if (roleFilter !== "All" && u.role !== roleFilter) return false;
    if (statusFilter !== "All" && u.status !== statusFilter) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "Oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sortBy === "Name A-Z") return a.name.localeCompare(b.name);
    if (sortBy === "Name Z-A") return b.name.localeCompare(a.name);
    if (sortBy === "Last Active") {
      const aTime = a.lastActive ? new Date(a.lastActive).getTime() : 0;
      const bTime = b.lastActive ? new Date(b.lastActive).getTime() : 0;
      return bTime - aTime;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;
    startTransition(async () => {
      await createUser({
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        status: "INVITED" as UserStatus
      });
      setIsAddUserOpen(false);
      setNewUser({ name: "", email: "", phone: "", role: "VIEWER" });
      router.refresh();
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[var(--text-heading-s)] font-serif text-[var(--color-ink)]">Users</h1>
          <p className="text-[var(--text-body-s)] text-[var(--color-text-muted)] mt-1">Manage admin access, roles and account status.</p>
        </div>
        <button 
          onClick={() => setIsAddUserOpen(true)}
          className="px-6 py-2.5 bg-[var(--color-ink)] text-white text-xs font-medium tracking-widest uppercase rounded hover:bg-[var(--color-ink-soft)] transition-colors whitespace-nowrap"
        >
          + Add User
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AdminCard noPadding className="p-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-serif text-[var(--color-ink)]">{kpis.total}</span>
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-subtle)] font-semibold mt-1">Total Users</span>
        </AdminCard>
        <AdminCard noPadding className="p-4 flex flex-col items-center justify-center bg-[var(--color-surface-muted)]">
          <span className="text-2xl font-serif text-[var(--color-success)]">{kpis.active}</span>
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-subtle)] font-semibold mt-1">Active</span>
        </AdminCard>
        <AdminCard noPadding className="p-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-serif text-[var(--color-accent)]">{kpis.invited}</span>
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-subtle)] font-semibold mt-1">Invited</span>
        </AdminCard>
        <AdminCard noPadding className="p-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-serif text-[var(--color-error)]">{kpis.suspended}</span>
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-subtle)] font-semibold mt-1">Suspended</span>
        </AdminCard>
      </div>

      {/* Filters */}
      <AdminCard className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-64 shrink-0">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 bg-[var(--color-surface-muted)] border border-transparent focus:border-[var(--color-accent)] rounded-[var(--radius-md)] text-sm outline-none transition-all duration-200"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="bg-[var(--color-surface-muted)] text-sm py-2 px-3 rounded-[var(--radius-md)] outline-none min-w-max">
            <option value="All">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="MANAGER">Manager</option>
            <option value="EDITOR">Editor</option>
            <option value="VIEWER">Viewer</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-[var(--color-surface-muted)] text-sm py-2 px-3 rounded-[var(--radius-md)] outline-none min-w-max">
            <option value="All">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="INVITED">Invited</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-[var(--color-surface-muted)] text-sm py-2 px-3 rounded-[var(--radius-md)] outline-none min-w-max">
            <option value="Newest">Sort: Newest</option>
            <option value="Oldest">Sort: Oldest</option>
            <option value="Name A-Z">Sort: Name A-Z</option>
            <option value="Name Z-A">Sort: Name Z-A</option>
            <option value="Last Active">Sort: Last Active</option>
          </select>
        </div>
      </AdminCard>

      <AdminCard noPadding>
        <UserTable users={filteredUsers} />
      </AdminCard>

      {/* Add User Modal */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-[var(--color-surface-elevated)] rounded-[var(--radius-lg)] max-w-md w-full shadow-2xl overflow-hidden border border-[var(--color-border)]">
            <div className="p-4 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-surface-muted)]">
              <h2 className="font-serif text-lg text-[var(--color-ink)]">Add User</h2>
              <button onClick={() => setIsAddUserOpen(false)} className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-ink)] transition-colors rounded-full hover:bg-[var(--color-border)]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded-[var(--radius-md)]">
                <p className="text-xs font-medium"><strong>Prototype only</strong> — no invitation email will be sent.</p>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Full Name</label>
                <input type="text" value={newUser.name} onChange={e => setNewUser(p => ({...p, name: e.target.value}))} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-[var(--color-border)] focus:border-[var(--color-accent)] outline-none text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Email</label>
                <input type="email" value={newUser.email} onChange={e => setNewUser(p => ({...p, email: e.target.value}))} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-[var(--color-border)] focus:border-[var(--color-accent)] outline-none text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Phone (Optional)</label>
                <input type="tel" value={newUser.phone} onChange={e => setNewUser(p => ({...p, phone: e.target.value}))} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-[var(--color-border)] focus:border-[var(--color-accent)] outline-none text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Role</label>
                <select value={newUser.role} onChange={e => setNewUser(p => ({...p, role: e.target.value as UserRole}))} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-[var(--color-border)] focus:border-[var(--color-accent)] outline-none text-sm">
                  <option value="ADMIN">Admin - Full access</option>
                  <option value="MANAGER">Manager - Operational access</option>
                  <option value="EDITOR">Editor - Content editing</option>
                  <option value="VIEWER">Viewer - Read-only</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3 mt-4 border-t border-[var(--color-border)]">
                <button disabled={isPending} onClick={() => setIsAddUserOpen(false)} className="px-4 py-2 text-sm text-[var(--color-ink)] bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] hover:bg-[var(--color-border)] transition-colors">
                  Cancel
                </button>
                <button 
                  disabled={isPending || !newUser.name || !newUser.email} 
                  onClick={handleAddUser} 
                  className="px-4 py-2 text-sm text-white bg-[var(--color-ink)] rounded-[var(--radius-md)] hover:bg-[var(--color-ink-soft)] transition-colors disabled:opacity-50"
                >
                  {isPending ? "Adding..." : "Add User"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
