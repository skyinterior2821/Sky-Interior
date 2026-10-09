"use client";

import React, { useState, useTransition } from "react";
import { AdminLead, LeadStatus } from "@/lib/admin/types";
import { updateAdminLead, updateLeadStatus, addLeadNote } from "@/lib/admin/lead-service";
import { AdminCard } from "@/components/admin/AdminCard";
import { useRouter } from "next/navigation";

interface LeadDetailProps {
  lead: AdminLead;
  isEditing: boolean;
  onEditToggle: () => void;
}

export function LeadDetail({ lead, isEditing, onEditToggle }: LeadDetailProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [newNote, setNewNote] = useState("");
  const [formData, setFormData] = useState<Partial<AdminLead>>({ ...lead });

  const statusFlow: LeadStatus[] = ["NEW", "CONTACTED", "QUALIFIED", "IN_PROGRESS", "CONVERTED"];
  const isLost = lead.status === "LOST";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    startTransition(async () => {
      await updateAdminLead(lead.id, formData);
      onEditToggle();
      router.refresh();
    });
  };

  const handleStatusChange = (status: LeadStatus) => {
    startTransition(async () => {
      await updateLeadStatus(lead.id, status);
      router.refresh();
    });
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    startTransition(async () => {
      await addLeadNote(lead.id, newNote);
      setNewNote("");
      router.refresh();
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
      {/* Main Info Column */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Status Pipeline */}
        <AdminCard noPadding className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-lg">Lead Pipeline</h2>
            {isLost ? (
              <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold tracking-widest uppercase rounded">Lost</span>
            ) : (
              <button onClick={() => handleStatusChange("LOST")} className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-error)]">Mark as Lost</button>
            )}
          </div>
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-[var(--color-border)] -z-10" />
            {statusFlow.map((s, idx) => {
              const isActive = lead.status === s;
              const isPast = statusFlow.indexOf(lead.status) > idx;
              return (
                <div key={s} className="flex flex-col items-center gap-2 bg-[var(--color-surface)] px-2">
                  <button 
                    disabled={isPending}
                    onClick={() => handleStatusChange(s)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isActive ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white" : 
                      isPast ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white" : "border-[var(--color-border)] bg-[var(--color-surface)]"
                    }`}
                  >
                    {(isActive || isPast) && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" /></svg>}
                  </button>
                  <span className={`text-[10px] font-bold tracking-widest uppercase ${isActive ? "text-[var(--color-accent)]" : "text-[var(--color-text-subtle)]"}`}>
                    {s.replace("_", " ")}
                  </span>
                </div>
              );
            })}
          </div>
        </AdminCard>

        {isEditing ? (
          <AdminCard>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-lg">Edit Details</h2>
              <div className="flex gap-2">
                <button onClick={onEditToggle} className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-ink)]">Cancel</button>
                <button onClick={handleSave} disabled={isPending} className="px-4 py-1.5 bg-[var(--color-ink)] text-white text-xs rounded hover:bg-[var(--color-ink-soft)] transition-colors">Save</button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-muted)] mb-1">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-muted)] mb-1">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-muted)] mb-1">Phone</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-muted)] mb-1">Contact Method</label>
                <select name="preferredContactMethod" value={formData.preferredContactMethod} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm">
                  <option value="Phone">Phone</option>
                  <option value="Email">Email</option>
                  <option value="WhatsApp">WhatsApp</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-muted)] mb-1">Interested Service</label>
                <input type="text" name="interestedService" value={formData.interestedService} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-muted)] mb-1">Property Type</label>
                <input type="text" name="propertyType" value={formData.propertyType} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-muted)] mb-1">Home Size</label>
                <input type="text" name="homeSize" value={formData.homeSize} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-muted)] mb-1">Rooms</label>
                <input type="text" name="rooms" value={formData.rooms} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-muted)] mb-1">Budget Range</label>
                <input type="text" name="budgetRange" value={formData.budgetRange} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-muted)] mb-1">Priority</label>
                <select name="priority" value={formData.priority} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm">
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>
            </div>
          </AdminCard>
        ) : (
          <>
            <AdminCard>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="font-serif text-xl text-[var(--color-ink)] mb-1">{lead.name}</h2>
                  <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
                    <span className="flex items-center gap-1">✉ {lead.email}</span>
                    <span className="flex items-center gap-1">☎ {lead.phone}</span>
                  </div>
                </div>
                <button onClick={onEditToggle} className="px-3 py-1.5 bg-[var(--color-surface-muted)] text-[var(--color-ink)] text-xs font-medium rounded hover:bg-[var(--color-border)] transition-colors">
                  Edit Details
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-[var(--color-border)]">
                <div>
                  <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Contact Method</span>
                  <span className="text-sm font-medium">{lead.preferredContactMethod || "-"}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Source</span>
                  <span className="text-sm font-medium">{lead.source}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Priority</span>
                  <span className={`text-sm font-bold ${lead.priority === 'HIGH' ? 'text-red-600' : lead.priority === 'MEDIUM' ? 'text-orange-600' : 'text-[var(--color-ink)]'}`}>{lead.priority}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Created</span>
                  <span className="text-sm font-medium" suppressHydrationWarning>{lead.createdAt.split('T')[0]}</span>
                </div>
              </div>
            </AdminCard>

            <AdminCard>
              <h2 className="font-serif text-lg mb-6">Requirement Context</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Interested Service</span>
                  <span className="text-sm font-medium">{lead.interestedService || "-"}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Property Type</span>
                  <span className="text-sm font-medium">{lead.propertyType || "-"}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Home Size</span>
                  <span className="text-sm font-medium">{lead.homeSize || "-"}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Rooms</span>
                  <span className="text-sm font-medium">{lead.rooms || "-"}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Budget Range</span>
                  <span className="text-sm font-medium text-[var(--color-accent)]">{lead.budgetRange || "-"}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Timeline</span>
                  <span className="text-sm font-medium">{lead.preferredTimeline || "-"}</span>
                </div>
              </div>
            </AdminCard>
          </>
        )}
      </div>

      {/* Sidebar: Notes & Activity */}
      <div className="space-y-6">
        <AdminCard>
          <h2 className="font-serif text-lg mb-4">Notes</h2>
          <div className="space-y-4 mb-4 max-h-64 overflow-y-auto pr-2">
            {lead.notes.map((note) => (
              <div key={note.id} className="bg-[var(--color-surface-muted)] p-3 rounded-[var(--radius-md)] text-sm">
                <p className="text-[var(--color-ink)] mb-2">{note.text}</p>
                <p className="text-[10px] text-[var(--color-text-subtle)]" suppressHydrationWarning>{note.createdAt.replace('T', ' ').substring(0, 16)}</p>
              </div>
            ))}
            {lead.notes.length === 0 && <p className="text-xs text-[var(--color-text-muted)] italic">No notes added.</p>}
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
            {lead.activity.map((act, idx) => (
              <div key={act.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] mt-1.5" />
                  {idx !== lead.activity.length - 1 && <div className="w-px h-full bg-[var(--color-border)] my-1" />}
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
