"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { AdminMessage, MessageStatus } from "@/lib/admin/types";
import { AdminCard } from "@/components/admin/AdminCard";
import { archiveAdminMessage, updateMessageStatus } from "@/lib/admin/message-service";
import { useRouter } from "next/navigation";

interface MessageTableProps {
  initialMessages: AdminMessage[];
  kpis: { total: number; unread: number; open: number; replied: number; archived: number };
}

export function MessageTable({ initialMessages, kpis }: MessageTableProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [messages, setMessages] = useState<AdminMessage[]>(initialMessages);
  const [archiveConfirmId, setArchiveConfirmId] = useState<string | null>(null);

  const filteredMessages = messages.filter((m) => {
    if (search && !m.senderName.toLowerCase().includes(search.toLowerCase()) && !m.email.toLowerCase().includes(search.toLowerCase()) && !m.subject.toLowerCase().includes(search.toLowerCase()) && !m.body.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "All" && m.status !== statusFilter) return false;
    if (sourceFilter !== "All" && m.source !== sourceFilter) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "Oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleArchive = (id: string) => {
    startTransition(async () => {
      await archiveAdminMessage(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      setArchiveConfirmId(null);
      router.refresh();
    });
  };

  const handleStatusChange = (id: string, newStatus: MessageStatus) => {
    startTransition(async () => {
      await updateMessageStatus(id, newStatus);
      setMessages((prev) => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
      router.refresh();
    });
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <AdminCard noPadding className="p-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-serif text-[var(--color-ink)]">{kpis.total}</span>
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-subtle)] font-semibold mt-1">Total Messages</span>
        </AdminCard>
        <AdminCard noPadding className="p-4 flex flex-col items-center justify-center bg-[var(--color-surface-muted)]">
          <span className="text-2xl font-serif text-[var(--color-accent)]">{kpis.unread}</span>
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-subtle)] font-semibold mt-1">Unread</span>
        </AdminCard>
        <AdminCard noPadding className="p-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-serif text-[var(--color-ink)]">{kpis.open}</span>
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-subtle)] font-semibold mt-1">Open</span>
        </AdminCard>
        <AdminCard noPadding className="p-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-serif text-[var(--color-success)]">{kpis.replied}</span>
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-subtle)] font-semibold mt-1">Replied</span>
        </AdminCard>
        <AdminCard noPadding className="p-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-serif text-[var(--color-text-subtle)]">{kpis.archived}</span>
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-subtle)] font-semibold mt-1">Archived</span>
        </AdminCard>
      </div>

      {/* Filters & Search */}
      <AdminCard className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-64 shrink-0">
          <input
            type="text"
            placeholder="Search messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 bg-[var(--color-surface-muted)] border border-transparent focus:border-[var(--color-accent)] rounded-[var(--radius-md)] text-sm outline-none transition-all duration-200"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-[var(--color-surface-muted)] text-sm py-2 px-3 rounded-[var(--radius-md)] outline-none min-w-max">
            <option value="All">All Status</option>
            <option value="UNREAD">Unread</option>
            <option value="OPEN">Open</option>
            <option value="REPLIED">Replied</option>
            <option value="CLOSED">Closed</option>
            <option value="ARCHIVED">Archived</option>
          </select>
          <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)} className="bg-[var(--color-surface-muted)] text-sm py-2 px-3 rounded-[var(--radius-md)] outline-none min-w-max">
            <option value="All">All Sources</option>
            <option value="CONTACT">Contact Form</option>
            <option value="CONSULTATION">Consultation</option>
            <option value="ESTIMATE">Estimate</option>
            <option value="OTHER">Other</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-[var(--color-surface-muted)] text-sm py-2 px-3 rounded-[var(--radius-md)] outline-none min-w-max">
            <option value="Newest">Sort: Newest First</option>
            <option value="Oldest">Sort: Oldest First</option>
          </select>
        </div>
      </AdminCard>

      {/* Table */}
      <AdminCard noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[var(--color-surface-muted)] border-b border-[var(--color-border)] text-[var(--color-text-muted)]">
              <tr>
                <th className="px-4 py-3 font-medium">Sender</th>
                <th className="px-4 py-3 font-medium">Subject</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Received</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-[var(--color-text-muted)]">
                    No messages found.
                  </td>
                </tr>
              ) : (
                filteredMessages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-[var(--color-paper)] transition-colors group">
                    <td className="px-4 py-3">
                      <div className="font-medium text-[var(--color-ink)]">{msg.senderName}</div>
                      <div className="text-[var(--color-text-muted)] text-xs">{msg.email}</div>
                    </td>
                    <td className="px-4 py-3 font-medium text-[var(--color-ink)] truncate max-w-[200px]" title={msg.subject}>{msg.subject}</td>
                    <td className="px-4 py-3 text-[var(--color-text-muted)] text-xs">{msg.source}</td>
                    <td className="px-4 py-3">
                      <select 
                        value={msg.status} 
                        onChange={(e) => handleStatusChange(msg.id, e.target.value as MessageStatus)}
                        disabled={isPending}
                        className={`text-[10px] font-bold tracking-widest uppercase bg-[var(--color-surface)] border border-[var(--color-border)] rounded py-1 px-2 outline-none ${msg.status === 'UNREAD' ? 'text-[var(--color-accent)] font-bold' : ''}`}
                      >
                        <option value="UNREAD">UNREAD</option>
                        <option value="OPEN">OPEN</option>
                        <option value="REPLIED">REPLIED</option>
                        <option value="CLOSED">CLOSED</option>
                        <option value="ARCHIVED">ARCHIVED</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-[var(--color-text-muted)] text-xs" suppressHydrationWarning>
                      {msg.createdAt.split('T')[0]}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/messages/${msg.id}`} className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-ink)]" title="View Details">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </Link>
                        <button onClick={() => setArchiveConfirmId(msg.id)} className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-error)]" title="Archive">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </AdminCard>

      {/* Delete Confirmation Modal */}
      {archiveConfirmId && (
        <div className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-[var(--color-surface-elevated)] p-6 rounded-[var(--radius-lg)] max-w-sm w-full shadow-lg border border-[var(--color-border)]">
            <h3 className="text-lg font-serif mb-2">Archive Message</h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">Are you sure you want to archive this message? It will be removed from active views.</p>
            <div className="flex justify-end gap-3">
              <button disabled={isPending} onClick={() => setArchiveConfirmId(null)} className="px-4 py-2 text-sm text-[var(--color-ink)] bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] hover:bg-[var(--color-border)] transition-colors">
                Cancel
              </button>
              <button disabled={isPending} onClick={() => handleArchive(archiveConfirmId)} className="px-4 py-2 text-sm text-white bg-[var(--color-error)] rounded-[var(--radius-md)] hover:opacity-90 transition-opacity">
                {isPending ? "Archiving..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
