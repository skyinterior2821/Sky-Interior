"use client";

import React, { useState, useTransition } from "react";
import { AdminUser, UserRole, UserStatus } from "@/lib/admin/types";
import { AdminCard } from "@/components/admin/AdminCard";
import { updateUser, updateUserStatus } from "@/lib/admin/user-service";
import { useRouter } from "next/navigation";

interface UserDetailProps {
  user: AdminUser;
}

export function UserDetail({ user }: UserDetailProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || "",
    role: user.role,
    notes: user.notes || ""
  });
  
  const [suspendConfirm, setSuspendConfirm] = useState(false);
  const [activateConfirm, setActivateConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    startTransition(async () => {
      await updateUser(user.id, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role as UserRole,
        notes: formData.notes
      });
      router.refresh();
    });
  };

  const handleStatusChange = (status: UserStatus) => {
    startTransition(async () => {
      await updateUserStatus(user.id, status);
      setSuspendConfirm(false);
      setActivateConfirm(false);
      router.refresh();
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
      
      <div className="lg:col-span-2 space-y-6">
        <AdminCard>
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[var(--color-border)]">
            <div className="w-16 h-16 rounded-full bg-[var(--color-ink)] text-white flex items-center justify-center font-serif text-2xl shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-serif text-2xl text-[var(--color-ink)]">{user.name}</h2>
              <p className="text-[var(--color-text-muted)] text-sm">{user.email}</p>
            </div>
            <div className="ml-auto flex flex-col items-end gap-2">
              <span className={`inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded ${
                user.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                user.status === 'INVITED' ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
              }`}>
                {user.status}
              </span>
              <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-[var(--color-surface-muted)] text-[var(--color-ink)] border border-[var(--color-border)] rounded">
                {user.role}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-ink)] mb-3">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Role</label>
                <select name="role" value={formData.role} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm">
                  <option value="ADMIN">Admin - Full access</option>
                  <option value="MANAGER">Manager - Operational access</option>
                  <option value="EDITOR">Editor - Content editing</option>
                  <option value="VIEWER">Viewer - Read-only</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Internal Notes</label>
              <textarea name="notes" rows={3} value={formData.notes} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm resize-y" />
            </div>
            <div className="pt-4 flex justify-end">
              <button 
                onClick={handleSave}
                disabled={isPending}
                className="px-6 py-2 bg-[var(--color-ink)] text-white text-xs font-medium tracking-widest uppercase rounded hover:bg-[var(--color-ink-soft)] transition-colors disabled:opacity-50"
              >
                {isPending ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </AdminCard>
      </div>

      <div className="space-y-6">
        <AdminCard>
          <h3 className="font-serif text-lg text-[var(--color-ink)] mb-4">Activity Summary</h3>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Account Created</p>
              <p className="text-sm font-medium" suppressHydrationWarning>{user.createdAt.split('T')[0]}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Last Active (Prototype)</p>
              <p className="text-sm font-medium" suppressHydrationWarning>{user.lastActive ? user.lastActive.replace('T', ' ').substring(0, 16) : 'Never logged in'}</p>
            </div>
          </div>
        </AdminCard>

        <AdminCard>
          <h3 className="font-serif text-lg text-[var(--color-ink)] mb-4">Access Control</h3>
          {user.status === "ACTIVE" || user.status === "INVITED" ? (
            suspendConfirm ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-[var(--radius-md)]">
                <p className="text-sm text-red-800 mb-2 font-medium">Suspend this user?</p>
                <p className="text-xs text-red-700 mb-4">This is a prototype action. No real account access will be changed.</p>
                <div className="flex gap-2">
                  <button disabled={isPending} onClick={() => handleStatusChange('SUSPENDED')} className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors">Yes, Suspend</button>
                  <button disabled={isPending} onClick={() => setSuspendConfirm(false)} className="px-3 py-1.5 bg-white text-red-800 text-xs font-medium border border-red-200 rounded hover:bg-red-100 transition-colors">Cancel</button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setSuspendConfirm(true)} 
                className="w-full px-4 py-2 bg-transparent text-[var(--color-error)] text-xs font-bold tracking-widest uppercase rounded border border-[var(--color-error)] hover:bg-red-50 transition-colors"
              >
                Suspend User
              </button>
            )
          ) : (
            activateConfirm ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-[var(--radius-md)]">
                <p className="text-sm text-green-800 mb-2 font-medium">Re-activate this user?</p>
                <div className="flex gap-2">
                  <button disabled={isPending} onClick={() => handleStatusChange('ACTIVE')} className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 transition-colors">Yes, Activate</button>
                  <button disabled={isPending} onClick={() => setActivateConfirm(false)} className="px-3 py-1.5 bg-white text-green-800 text-xs font-medium border border-green-200 rounded hover:bg-green-100 transition-colors">Cancel</button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setActivateConfirm(true)} 
                className="w-full px-4 py-2 bg-[var(--color-surface-muted)] text-[var(--color-ink)] text-xs font-bold tracking-widest uppercase rounded border border-[var(--color-border)] hover:bg-[var(--color-paper)] transition-colors"
              >
                Activate User
              </button>
            )
          )}
        </AdminCard>
      </div>

    </div>
  );
}
