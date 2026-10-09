"use client";

import React from "react";
import Link from "next/link";
import { AdminUser } from "@/lib/admin/types";

interface UserTableProps {
  users: AdminUser[];
}

export function UserTable({ users }: UserTableProps) {
  if (users.length === 0) {
    return (
      <div className="py-16 text-center text-[var(--color-text-muted)]">
        No users found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="bg-[var(--color-surface-muted)] border-b border-[var(--color-border)] text-[var(--color-text-muted)]">
          <tr>
            <th className="px-4 py-3 font-medium">User</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Role</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Last Active</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-border)]">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-[var(--color-paper)] transition-colors group">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-ink)] text-white flex items-center justify-center font-serif text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-[var(--color-ink)]">{user.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-[var(--color-text-muted)]">{user.email}</td>
              <td className="px-4 py-3">
                <span className="inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-[var(--color-surface-muted)] text-[var(--color-ink)] border border-[var(--color-border)] rounded">
                  {user.role}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={`inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded ${
                  user.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                  user.status === 'INVITED' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {user.status}
                </span>
              </td>
              <td className="px-4 py-3 text-[var(--color-text-muted)] text-xs" suppressHydrationWarning>
                {user.lastActive ? user.lastActive.replace('T', ' ').substring(0, 16) : 'Never'}
              </td>
              <td className="px-4 py-3 text-right">
                <Link 
                  href={`/admin/users/${user.id}`} 
                  className="inline-flex items-center justify-center p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-ink)] transition-colors rounded hover:bg-[var(--color-surface-muted)]"
                  title="View Details"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.89 1.12l-3.122.9b-.39.112-.76-.27-.648-.648l.9-3.122a4.5 4.5 0 011.12-1.89L16.862 4.487zM16.862 4.487L19.5 7.125" /></svg>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
