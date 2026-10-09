"use client";

import React, { useState, useTransition } from "react";
import { AdminEstimate, EstimateStatus } from "@/lib/admin/types";
import { updateEstimateStatus, addEstimateNote } from "@/lib/admin/estimate-service";
import { AdminCard } from "@/components/admin/AdminCard";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface EstimateDetailProps {
  estimate: AdminEstimate;
}

export function EstimateDetail({ estimate }: EstimateDetailProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [newNote, setNewNote] = useState("");

  const handleStatusChange = (status: EstimateStatus) => {
    startTransition(async () => {
      await updateEstimateStatus(estimate.id, status);
      router.refresh();
    });
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    startTransition(async () => {
      await addEstimateNote(estimate.id, newNote);
      setNewNote("");
      router.refresh();
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
      {/* Main Info Column */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Important Disclaimer */}
        <div className="bg-orange-50 border border-orange-200 text-orange-800 p-4 rounded-[var(--radius-md)]">
          <p className="text-sm font-medium"><strong>Disclaimer:</strong> Prices are purely indicative and for planning purposes only. This is not a final quotation.</p>
        </div>

        <AdminCard>
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Indicative Estimate</p>
              <h2 className="font-serif text-2xl text-[var(--color-ink)] mb-1">{estimate.reference}</h2>
            </div>
            <select 
              value={estimate.status} 
              onChange={(e) => handleStatusChange(e.target.value as EstimateStatus)}
              disabled={isPending}
              className="text-xs font-bold tracking-widest uppercase bg-[var(--color-surface-muted)] border border-[var(--color-border)] rounded py-1.5 px-3 outline-none"
            >
              <option value="NEW">NEW</option>
              <option value="REVIEWED">REVIEWED</option>
              <option value="CONSULTATION_REQUESTED">CONSULTATION REQ</option>
              <option value="ARCHIVED">ARCHIVED</option>
            </select>
          </div>
          
          <h3 className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-ink)] mb-3 pb-2 border-b border-[var(--color-border)]">Client Request</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div>
              <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Name</span>
              <span className="text-sm font-medium">{estimate.clientName}</span>
            </div>
            <div>
              <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Email</span>
              <span className="text-sm font-medium">{estimate.email}</span>
            </div>
            <div>
              <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Phone</span>
              <span className="text-sm font-medium">{estimate.phone}</span>
            </div>
            <div>
              <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Generated Date</span>
              <span className="text-sm font-medium" suppressHydrationWarning>{estimate.createdAt.split('T')[0]}</span>
            </div>
          </div>

          <h3 className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-ink)] mb-3 pb-2 border-b border-[var(--color-border)]">Property Scope</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            <div>
              <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Property Type</span>
              <span className="text-sm font-medium">{estimate.propertyType.replace(/_/g, " ")}</span>
            </div>
            <div>
              <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Home Size</span>
              <span className="text-sm font-medium">{estimate.homeSize}</span>
            </div>
            <div>
              <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Finish Level</span>
              <span className="text-sm font-medium">{estimate.finishLevel}</span>
            </div>
          </div>
        </AdminCard>

        <AdminCard noPadding>
          <div className="p-6 border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]">
            <h2 className="font-serif text-lg">Planning Breakdown</h2>
          </div>
          <div className="p-6">
            <div className="flex justify-between py-3 border-b border-[var(--color-border)] border-dashed">
              <span className="text-sm text-[var(--color-ink)]">Base Scope</span>
              <span className="text-sm font-mono text-[var(--color-text-muted)]">{estimate.baseAmount}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-[var(--color-border)] border-dashed">
              <span className="text-sm text-[var(--color-ink)]">{estimate.finishLevel} Finish Adjustment</span>
              <span className="text-sm font-mono text-[var(--color-text-muted)]">{estimate.finishAdjustmentAmount}</span>
            </div>
            {estimate.addons.map((addon, idx) => (
              <div key={idx} className="flex justify-between py-3 border-b border-[var(--color-border)] border-dashed">
                <span className="text-sm text-[var(--color-ink)]">+ {addon.name}</span>
                <span className="text-sm font-mono text-[var(--color-text-muted)]">{addon.amount}</span>
              </div>
            ))}
            <div className="flex justify-between py-4 mt-2">
              <span className="font-serif text-lg text-[var(--color-ink)]">Indicative Estimate</span>
              <span className="font-serif text-lg text-[var(--color-ink)]">{estimate.indicativeAmount}</span>
            </div>
          </div>
        </AdminCard>
      </div>

      {/* Sidebar: Relations, Notes & Activity */}
      <div className="space-y-6">
        <AdminCard>
          <h2 className="font-serif text-lg mb-4">Client Context</h2>
          <div className="space-y-3">
            {estimate.relatedLeadId ? (
              <Link href={`/admin/leads/${estimate.relatedLeadId}`} className="flex justify-between items-center p-3 bg-[var(--color-surface-muted)] rounded border border-transparent hover:border-[var(--color-accent)] transition-colors group">
                <span className="text-sm font-medium text-[var(--color-ink)]">Related Lead</span>
                <span className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)]">&rarr;</span>
              </Link>
            ) : (
              <p className="text-sm text-[var(--color-text-muted)]">No related lead</p>
            )}
            
            {estimate.relatedConsultationId ? (
              <Link href={`/admin/consultations/${estimate.relatedConsultationId}`} className="flex justify-between items-center p-3 bg-[var(--color-surface-muted)] rounded border border-transparent hover:border-[var(--color-accent)] transition-colors group">
                <span className="text-sm font-medium text-[var(--color-ink)]">Consultation Request</span>
                <span className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)]">&rarr;</span>
              </Link>
            ) : (
              <p className="text-sm text-[var(--color-text-muted)]">No consultation request</p>
            )}
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="font-serif text-lg mb-4">Internal Notes</h2>
          <div className="space-y-4 mb-4 max-h-64 overflow-y-auto pr-2">
            {estimate.notes.map((note) => (
              <div key={note.id} className="bg-[var(--color-surface-muted)] p-3 rounded-[var(--radius-md)] text-sm">
                <p className="text-[var(--color-ink)] mb-2">{note.text}</p>
                <p className="text-[10px] text-[var(--color-text-subtle)]" suppressHydrationWarning>{note.createdAt.replace('T', ' ').substring(0, 16)}</p>
              </div>
            ))}
            {estimate.notes.length === 0 && <p className="text-xs text-[var(--color-text-muted)] italic">No notes added.</p>}
          </div>
          <div className="pt-4 border-t border-[var(--color-border)]">
            <textarea 
              rows={2} 
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add a new note..."
              className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm mb-2 resize-none"
            />
            <button 
              onClick={handleAddNote} 
              disabled={isPending || !newNote.trim()} 
              className="w-full px-4 py-2 bg-[var(--color-ink)] text-white text-xs font-medium rounded hover:bg-[var(--color-ink-soft)] transition-colors disabled:opacity-50"
            >
              Save Note
            </button>
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="font-serif text-lg mb-4">Activity Timeline</h2>
          <div className="space-y-4">
            {estimate.activity.map((act, idx) => (
              <div key={act.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] mt-1.5" />
                  {idx !== estimate.activity.length - 1 && <div className="w-px h-full bg-[var(--color-border)] my-1" />}
                </div>
                <div className="pb-4">
                  <p className="text-sm font-medium text-[var(--color-ink)]">{act.action}</p>
                  <p className="text-[10px] text-[var(--color-text-subtle)] mt-0.5" suppressHydrationWarning>{act.createdAt.replace('T', ' ').substring(0, 16)}</p>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
