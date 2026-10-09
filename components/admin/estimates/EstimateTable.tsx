"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { AdminEstimate, EstimateStatus } from "@/lib/admin/types";
import { AdminCard } from "@/components/admin/AdminCard";
import { archiveAdminEstimate, updateEstimateStatus } from "@/lib/admin/estimate-service";
import { useRouter } from "next/navigation";

interface EstimateTableProps {
  initialEstimates: AdminEstimate[];
  kpis: { total: number; new: number; reviewed: number; consultationRequested: number; archived: number };
}

export function EstimateTable({ initialEstimates, kpis }: EstimateTableProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [propertyFilter, setPropertyFilter] = useState("All");
  const [finishFilter, setFinishFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [estimates, setEstimates] = useState<AdminEstimate[]>(initialEstimates);
  const [archiveConfirmId, setArchiveConfirmId] = useState<string | null>(null);

  const filteredEstimates = estimates.filter((e) => {
    if (search && !e.reference.toLowerCase().includes(search.toLowerCase()) && !e.clientName.toLowerCase().includes(search.toLowerCase()) && !e.email.toLowerCase().includes(search.toLowerCase())) return false;
    if (propertyFilter !== "All" && e.propertyType !== propertyFilter) return false;
    if (finishFilter !== "All" && e.finishLevel !== finishFilter) return false;
    if (statusFilter !== "All" && e.status !== statusFilter) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "Oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sortBy === "Highest Estimate") return parseInt(b.indicativeAmount.replace(/[^\d]/g, ''), 10) - parseInt(a.indicativeAmount.replace(/[^\d]/g, ''), 10);
    if (sortBy === "Lowest Estimate") return parseInt(a.indicativeAmount.replace(/[^\d]/g, ''), 10) - parseInt(b.indicativeAmount.replace(/[^\d]/g, ''), 10);
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleArchive = (id: string) => {
    startTransition(async () => {
      await archiveAdminEstimate(id);
      setEstimates((prev) => prev.filter((e) => e.id !== id));
      setArchiveConfirmId(null);
      router.refresh();
    });
  };

  const handleStatusChange = (id: string, newStatus: EstimateStatus) => {
    startTransition(async () => {
      await updateEstimateStatus(id, newStatus);
      setEstimates((prev) => prev.map(e => e.id === id ? { ...e, status: newStatus } : e));
      router.refresh();
    });
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <AdminCard noPadding className="p-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-serif text-[var(--color-ink)]">{kpis.total}</span>
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-subtle)] font-semibold mt-1 text-center">Total Estimates</span>
        </AdminCard>
        <AdminCard noPadding className="p-4 flex flex-col items-center justify-center bg-[var(--color-surface-muted)]">
          <span className="text-2xl font-serif text-[var(--color-accent)]">{kpis.new}</span>
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-subtle)] font-semibold mt-1 text-center">New</span>
        </AdminCard>
        <AdminCard noPadding className="p-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-serif text-[var(--color-ink)]">{kpis.reviewed}</span>
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-subtle)] font-semibold mt-1 text-center">Reviewed</span>
        </AdminCard>
        <AdminCard noPadding className="p-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-serif text-[var(--color-success)]">{kpis.consultationRequested}</span>
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-subtle)] font-semibold mt-1 text-center">Consultations</span>
        </AdminCard>
        <AdminCard noPadding className="p-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-serif text-[var(--color-text-subtle)]">{kpis.archived}</span>
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-subtle)] font-semibold mt-1 text-center">Archived</span>
        </AdminCard>
      </div>

      {/* Filters & Search */}
      <AdminCard className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-64 shrink-0">
          <input
            type="text"
            placeholder="Search estimates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 bg-[var(--color-surface-muted)] border border-transparent focus:border-[var(--color-accent)] rounded-[var(--radius-md)] text-sm outline-none transition-all duration-200"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
          <select value={propertyFilter} onChange={(e) => setPropertyFilter(e.target.value)} className="bg-[var(--color-surface-muted)] text-sm py-2 px-3 rounded-[var(--radius-md)] outline-none min-w-max">
            <option value="All">All Properties</option>
            <option value="FULL_HOME">Full Home</option>
            <option value="KITCHEN">Kitchen</option>
            <option value="BEDROOM">Bedroom</option>
            <option value="LIVING_ROOM">Living Room</option>
            <option value="OTHER">Other</option>
          </select>
          <select value={finishFilter} onChange={(e) => setFinishFilter(e.target.value)} className="bg-[var(--color-surface-muted)] text-sm py-2 px-3 rounded-[var(--radius-md)] outline-none min-w-max">
            <option value="All">All Finishes</option>
            <option value="STANDARD">Standard</option>
            <option value="PREMIUM">Premium</option>
            <option value="LUXURY">Luxury</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-[var(--color-surface-muted)] text-sm py-2 px-3 rounded-[var(--radius-md)] outline-none min-w-max">
            <option value="All">All Status</option>
            <option value="NEW">New</option>
            <option value="REVIEWED">Reviewed</option>
            <option value="CONSULTATION_REQUESTED">Consultation Requested</option>
            <option value="ARCHIVED">Archived</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-[var(--color-surface-muted)] text-sm py-2 px-3 rounded-[var(--radius-md)] outline-none min-w-max">
            <option value="Newest">Sort: Newest First</option>
            <option value="Oldest">Sort: Oldest First</option>
            <option value="Highest Estimate">Sort: Highest Estimate</option>
            <option value="Lowest Estimate">Sort: Lowest Estimate</option>
          </select>
        </div>
      </AdminCard>

      {/* Table */}
      <AdminCard noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[var(--color-surface-muted)] border-b border-[var(--color-border)] text-[var(--color-text-muted)]">
              <tr>
                <th className="px-4 py-3 font-medium">Reference</th>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Property</th>
                <th className="px-4 py-3 font-medium">Size</th>
                <th className="px-4 py-3 font-medium">Finish</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filteredEstimates.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-[var(--color-text-muted)]">
                    No estimates found.
                  </td>
                </tr>
              ) : (
                filteredEstimates.map((estimate) => (
                  <tr key={estimate.id} className="hover:bg-[var(--color-paper)] transition-colors group">
                    <td className="px-4 py-3 font-mono text-xs text-[var(--color-text-muted)]">{estimate.reference}</td>
                    <td className="px-4 py-3 font-medium text-[var(--color-ink)]">{estimate.clientName}</td>
                    <td className="px-4 py-3 text-[var(--color-text-muted)] text-xs">
                      {estimate.propertyType.replace(/_/g, " ")}
                    </td>
                    <td className="px-4 py-3 text-[var(--color-text-muted)] text-xs">{estimate.homeSize}</td>
                    <td className="px-4 py-3 text-[var(--color-text-muted)] text-xs">{estimate.finishLevel}</td>
                    <td className="px-4 py-3 text-[var(--color-ink)] font-medium">{estimate.indicativeAmount}</td>
                    <td className="px-4 py-3">
                      <select 
                        value={estimate.status} 
                        onChange={(e) => handleStatusChange(estimate.id, e.target.value as EstimateStatus)}
                        disabled={isPending}
                        className="text-[10px] font-bold tracking-widest uppercase bg-[var(--color-surface)] border border-[var(--color-border)] rounded py-1 px-2 outline-none"
                      >
                        <option value="NEW">NEW</option>
                        <option value="REVIEWED">REVIEWED</option>
                        <option value="CONSULTATION_REQUESTED">CONSULTATION REQ</option>
                        <option value="ARCHIVED">ARCHIVED</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/estimates/${estimate.id}`} className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-ink)]" title="View Details">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </Link>
                        <button onClick={() => setArchiveConfirmId(estimate.id)} className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-error)]" title="Archive">
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
            <h3 className="text-lg font-serif mb-2">Archive Estimate</h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">Are you sure you want to archive this indicative estimate? It will be removed from active views.</p>
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
