"use client";

import React, { useState, useTransition } from "react";
import { AdminConsultation, ConsultationStatus } from "@/lib/admin/types";
import { updateAdminConsultation, updateConsultationStatus, addConsultationNote } from "@/lib/admin/consultation-service";
import { AdminCard } from "@/components/admin/AdminCard";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ConsultationDetailProps {
  consultation: AdminConsultation;
  isEditing: boolean;
  onEditToggle: () => void;
}

export function ConsultationDetail({ consultation, isEditing, onEditToggle }: ConsultationDetailProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [newNote, setNewNote] = useState("");
  const [formData, setFormData] = useState<Partial<AdminConsultation>>({ ...consultation });

  const statusFlow: ConsultationStatus[] = ["REQUESTED", "CONTACTED", "SCHEDULED", "COMPLETED"];
  const isCancelled = consultation.status === "CANCELLED";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    startTransition(async () => {
      await updateAdminConsultation(consultation.id, formData);
      onEditToggle();
      router.refresh();
    });
  };

  const handleStatusChange = (status: ConsultationStatus) => {
    startTransition(async () => {
      await updateConsultationStatus(consultation.id, status);
      router.refresh();
    });
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    startTransition(async () => {
      await addConsultationNote(consultation.id, newNote);
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
            <h2 className="font-serif text-lg">Consultation Pipeline</h2>
            {isCancelled ? (
              <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold tracking-widest uppercase rounded">Cancelled</span>
            ) : (
              <button onClick={() => handleStatusChange("CANCELLED")} className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-error)]">Cancel Appointment</button>
            )}
          </div>
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-[var(--color-border)] -z-10" />
            {statusFlow.map((s, idx) => {
              const isActive = consultation.status === s;
              const isPast = statusFlow.indexOf(consultation.status) > idx;
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
            
            <h3 className="text-sm font-semibold mb-3">Scheduling</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-muted)] mb-1">Date (ISO)</label>
                <input type="text" name="preferredDate" value={formData.preferredDate} onChange={handleChange} placeholder="YYYY-MM-DDThh:mm:ssZ" className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm" />
                <p className="text-[10px] text-[var(--color-text-muted)] mt-1">Scheduled in admin prototype</p>
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-muted)] mb-1">Time</label>
                <input type="text" name="preferredTime" value={formData.preferredTime} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-muted)] mb-1">Type</label>
                <select name="consultationType" value={formData.consultationType} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm">
                  <option value="DESIGN_CONSULTATION">Design Consultation</option>
                  <option value="HOME_VISIT">Home Visit</option>
                  <option value="ONLINE_CONSULTATION">Online Consultation</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-muted)] mb-1">Contact Method</label>
                <select name="preferredContactMethod" value={formData.preferredContactMethod} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm">
                  <option value="Phone">Phone</option>
                  <option value="Email">Email</option>
                  <option value="WhatsApp">WhatsApp</option>
                </select>
              </div>
            </div>

            <h3 className="text-sm font-semibold mb-3 border-t border-[var(--color-border)] pt-4">Project Context</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-muted)] mb-1">Interested Service</label>
                <input type="text" name="service" value={formData.service} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm" />
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
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-muted)] mb-1">Additional Requirements</label>
                <textarea rows={2} name="additionalRequirements" value={formData.additionalRequirements} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm resize-none" />
              </div>
            </div>
          </AdminCard>
        ) : (
          <>
            <AdminCard>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="font-serif text-xl text-[var(--color-ink)] mb-1">{consultation.clientName}</h2>
                  <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
                    <span className="flex items-center gap-1">✉ {consultation.email}</span>
                    <span className="flex items-center gap-1">☎ {consultation.phone}</span>
                  </div>
                </div>
                <button onClick={onEditToggle} className="px-3 py-1.5 bg-[var(--color-surface-muted)] text-[var(--color-ink)] text-xs font-medium rounded hover:bg-[var(--color-border)] transition-colors">
                  Edit Details
                </button>
              </div>
              
              <h3 className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-ink)] mb-3 pb-2 border-b border-[var(--color-border)]">Consultation</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div>
                  <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Type</span>
                  <span className="text-sm font-medium">{consultation.consultationType.replace(/_/g, " ")}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Service</span>
                  <span className="text-sm font-medium">{consultation.service}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Date</span>
                  <span className="text-sm font-medium" suppressHydrationWarning>{consultation.preferredDate.split('T')[0]}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Time</span>
                  <span className="text-sm font-medium text-[var(--color-accent)]">{consultation.preferredTime}</span>
                </div>
              </div>

              <h3 className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-ink)] mb-3 pb-2 border-b border-[var(--color-border)]">Project Context</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Property</span>
                  <span className="text-sm font-medium">{consultation.propertyType || "-"}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Size</span>
                  <span className="text-sm font-medium">{consultation.homeSize || "-"}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Rooms</span>
                  <span className="text-sm font-medium">{consultation.rooms || "-"}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Budget</span>
                  <span className="text-sm font-medium">{consultation.budgetRange || "-"}</span>
                </div>
                {consultation.additionalRequirements && (
                  <div className="col-span-2 md:col-span-4">
                    <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Requirements</span>
                    <p className="text-sm font-medium text-[var(--color-text-muted)]">{consultation.additionalRequirements}</p>
                  </div>
                )}
              </div>
            </AdminCard>
          </>
        )}
      </div>

      {/* Sidebar: Relations, Notes & Activity */}
      <div className="space-y-6">
        <AdminCard>
          <h2 className="font-serif text-lg mb-2">Related Lead</h2>
          {consultation.relatedLeadId ? (
            <Link href={`/admin/leads/${consultation.relatedLeadId}`} className="flex items-center gap-2 p-3 bg-[var(--color-surface-muted)] rounded border border-transparent hover:border-[var(--color-accent)] transition-colors group">
              <span className="text-sm font-medium text-[var(--color-ink)] flex-1">View Originating Lead</span>
              <span className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)]">&rarr;</span>
            </Link>
          ) : (
            <p className="text-sm text-[var(--color-text-muted)]">No related lead</p>
          )}
        </AdminCard>

        <AdminCard>
          <h2 className="font-serif text-lg mb-4">Notes</h2>
          <div className="space-y-4 mb-4 max-h-64 overflow-y-auto pr-2">
            {consultation.notes.map((note) => (
              <div key={note.id} className="bg-[var(--color-surface-muted)] p-3 rounded-[var(--radius-md)] text-sm">
                <p className="text-[var(--color-ink)] mb-2">{note.text}</p>
                <p className="text-[10px] text-[var(--color-text-subtle)]" suppressHydrationWarning>{note.createdAt.replace('T', ' ').substring(0, 16)}</p>
              </div>
            ))}
            {consultation.notes.length === 0 && <p className="text-xs text-[var(--color-text-muted)] italic">No notes added.</p>}
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
            {consultation.activity.map((act, idx) => (
              <div key={act.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] mt-1.5" />
                  {idx !== consultation.activity.length - 1 && <div className="w-px h-full bg-[var(--color-border)] my-1" />}
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
