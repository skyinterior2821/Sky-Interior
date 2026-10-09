"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { AdminConsultation, ConsultationStatus } from "@/lib/admin/types";
import { AdminCard } from "@/components/admin/AdminCard";
import { archiveAdminConsultation, updateConsultationStatus } from "@/lib/admin/consultation-service";
import { useRouter } from "next/navigation";

interface ConsultationTableProps {
  initialConsultations: AdminConsultation[];
  kpis: { total: number; new: number; scheduled: number; completed: number; cancelled: number };
}

export function ConsultationTable({ initialConsultations, kpis }: ConsultationTableProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [consultations, setConsultations] = useState<AdminConsultation[]>(initialConsultations);
  const [archiveConfirmId, setArchiveConfirmId] = useState<string | null>(null);

  const filteredConsultations = consultations.filter((c) => {
    if (search && !c.clientName.toLowerCase().includes(search.toLowerCase()) && !c.email.toLowerCase().includes(search.toLowerCase()) && !c.service.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "All" && c.status !== statusFilter) return false;
    if (typeFilter !== "All" && c.consultationType !== typeFilter) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "Oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sortBy === "Preferred Date") return new Date(a.preferredDate).getTime() - new Date(b.preferredDate).getTime();
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleArchive = (id: string) => {
    startTransition(async () => {
      await archiveAdminConsultation(id);
      setConsultations((prev) => prev.filter((c) => c.id !== id));
      setArchiveConfirmId(null);
      router.refresh();
    });
  };

  const handleStatusChange = (id: string, newStatus: ConsultationStatus) => {
    startTransition(async () => {
      await updateConsultationStatus(id, newStatus);
      setConsultations((prev) => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
      router.refresh();
    });
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <AdminCard noPadding className="p-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-serif text-[var(--color-ink)]">{kpis.total}</span>
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-subtle)] font-semibold mt-1">Total Requests</span>
        </AdminCard>
        <AdminCard noPadding className="p-4 flex flex-col items-center justify-center bg-[var(--color-surface-muted)]">
          <span className="text-2xl font-serif text-[var(--color-accent)]">{kpis.new}</span>
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-subtle)] font-semibold mt-1">New</span>
        </AdminCard>
        <AdminCard noPadding className="p-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-serif text-[var(--color-ink)]">{kpis.scheduled}</span>
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-subtle)] font-semibold mt-1">Scheduled</span>
        </AdminCard>
        <AdminCard noPadding className="p-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-serif text-[var(--color-success)]">{kpis.completed}</span>
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-subtle)] font-semibold mt-1">Completed</span>
        </AdminCard>
        <AdminCard noPadding className="p-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-serif text-[var(--color-error)]">{kpis.cancelled}</span>
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-subtle)] font-semibold mt-1">Cancelled</span>
        </AdminCard>
      </div>

      {/* Filters & Search */}
      <AdminCard className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-64 shrink-0">
          <input
            type="text"
            placeholder="Search consultations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 bg-[var(--color-surface-muted)] border border-transparent focus:border-[var(--color-accent)] rounded-[var(--radius-md)] text-sm outline-none transition-all duration-200"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-[var(--color-surface-muted)] text-sm py-2 px-3 rounded-[var(--radius-md)] outline-none min-w-max">
            <option value="All">All Status</option>
            <option value="REQUESTED">Requested</option>
            <option value="CONTACTED">Contacted</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="bg-[var(--color-surface-muted)] text-sm py-2 px-3 rounded-[var(--radius-md)] outline-none min-w-max">
            <option value="All">All Types</option>
            <option value="DESIGN_CONSULTATION">Design Consultation</option>
            <option value="HOME_VISIT">Home Visit</option>
            <option value="ONLINE_CONSULTATION">Online Consultation</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-[var(--color-surface-muted)] text-sm py-2 px-3 rounded-[var(--radius-md)] outline-none min-w-max">
            <option value="Newest">Sort: Newest First</option>
            <option value="Oldest">Sort: Oldest First</option>
            <option value="Preferred Date">Sort: Preferred Date</option>
          </select>
        </div>
      </AdminCard>

      {/* Table */}
      <AdminCard noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[var(--color-surface-muted)] border-b border-[var(--color-border)] text-[var(--color-text-muted)]">
              <tr>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Preferred Date</th>
                <th className="px-4 py-3 font-medium">Time</th>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filteredConsultations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-[var(--color-text-muted)]">
                    No consultation requests found.
                  </td>
                </tr>
              ) : (
                filteredConsultations.map((consultation) => (
                  <tr key={consultation.id} className="hover:bg-[var(--color-paper)] transition-colors group">
                    <td className="px-4 py-3 font-medium text-[var(--color-ink)]">{consultation.clientName}</td>
                    <td className="px-4 py-3 text-[var(--color-text-muted)] text-xs">
                      {consultation.consultationType.replace(/_/g, " ")}
                    </td>
                    <td className="px-4 py-3 text-[var(--color-ink)]" suppressHydrationWarning>
                      {consultation.preferredDate.split('T')[0]}
                    </td>
                    <td className="px-4 py-3 text-[var(--color-text-muted)] text-xs">
                      {consultation.preferredTime}
                    </td>
                    <td className="px-4 py-3 text-[var(--color-text-muted)] truncate max-w-[150px]" title={consultation.service}>
                      {consultation.service}
                    </td>
                    <td className="px-4 py-3">
                      <select 
                        value={consultation.status} 
                        onChange={(e) => handleStatusChange(consultation.id, e.target.value as ConsultationStatus)}
                        disabled={isPending}
                        className="text-xs bg-[var(--color-surface)] border border-[var(--color-border)] rounded py-1 px-2 outline-none"
                      >
                        <option value="REQUESTED">REQUESTED</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="SCHEDULED">SCHEDULED</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/consultations/${consultation.id}`} className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-ink)]" title="View Details">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </Link>
                        <button onClick={() => setArchiveConfirmId(consultation.id)} className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-error)]" title="Archive">
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
            <h3 className="text-lg font-serif mb-2">Archive Consultation</h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">Are you sure you want to archive this consultation? It will be removed from active views.</p>
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
