"use client";

import React, { useState, useTransition } from "react";
import { AdminMessage, MessageStatus } from "@/lib/admin/types";
import { updateMessageStatus, addMessageNote, simulateMessageReply } from "@/lib/admin/message-service";
import { AdminCard } from "@/components/admin/AdminCard";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface MessageDetailProps {
  message: AdminMessage;
}

export function MessageDetail({ message }: MessageDetailProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [newNote, setNewNote] = useState("");
  const [replySubject, setReplySubject] = useState(`Re: ${message.subject}`);
  const [replyBody, setReplyBody] = useState("");

  const handleStatusChange = (status: MessageStatus) => {
    startTransition(async () => {
      await updateMessageStatus(message.id, status);
      router.refresh();
    });
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    startTransition(async () => {
      await addMessageNote(message.id, newNote);
      setNewNote("");
      router.refresh();
    });
  };

  const handleSimulateReply = () => {
    if (!replyBody.trim()) return;
    startTransition(async () => {
      await simulateMessageReply(message.id, replySubject, replyBody);
      setReplySubject(`Re: ${message.subject}`);
      setReplyBody("");
      router.refresh();
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
      {/* Main Info Column */}
      <div className="lg:col-span-2 space-y-6">
        
        <AdminCard>
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Message Context</p>
              <h2 className="font-serif text-2xl text-[var(--color-ink)] mb-1">{message.subject}</h2>
            </div>
            <div className="flex gap-2">
              <select 
                value={message.status} 
                onChange={(e) => handleStatusChange(e.target.value as MessageStatus)}
                disabled={isPending}
                className="text-xs font-bold tracking-widest uppercase bg-[var(--color-surface-muted)] border border-[var(--color-border)] rounded py-1.5 px-3 outline-none"
              >
                <option value="UNREAD">UNREAD</option>
                <option value="OPEN">OPEN</option>
                <option value="REPLIED">REPLIED</option>
                <option value="CLOSED">CLOSED</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 pt-4 border-t border-[var(--color-border)]">
            <div>
              <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Sender</span>
              <span className="text-sm font-medium">{message.senderName}</span>
            </div>
            <div>
              <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Email</span>
              <span className="text-sm font-medium">{message.email}</span>
            </div>
            <div>
              <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Source</span>
              <span className="text-sm font-medium">{message.source}</span>
            </div>
            <div>
              <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Received At</span>
              <span className="text-sm font-medium" suppressHydrationWarning>{message.createdAt.split('T')[0]}</span>
            </div>
          </div>
        </AdminCard>

        <AdminCard noPadding className="p-6">
          <h3 className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-ink)] mb-4">Message Body</h3>
          <div className="bg-[var(--color-surface-muted)] p-6 rounded-[var(--radius-md)] whitespace-pre-wrap text-sm text-[var(--color-ink)] font-medium leading-relaxed">
            {message.body}
          </div>
        </AdminCard>

        {/* Reply Prototype Section */}
        <AdminCard noPadding className="border-[var(--color-accent)]/30 border-2">
          <div className="p-6 border-b border-[var(--color-border)] bg-[var(--color-surface-muted)] flex justify-between items-center">
            <h2 className="font-serif text-lg">Reply</h2>
            <span className="text-[10px] font-bold tracking-widest uppercase text-orange-600 bg-orange-100 px-2 py-1 rounded">Simulation Only</span>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-xs text-[var(--color-text-muted)]">Email sending is not connected in the frontend prototype. Submitting a reply will add it to the internal notes and update the status.</p>
            <div>
              <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Recipient</label>
              <input type="text" readOnly value={`${message.senderName} <${message.email}>`} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] text-[var(--color-text-muted)] rounded border border-transparent outline-none text-sm cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Subject</label>
              <input type="text" value={replySubject} onChange={(e) => setReplySubject(e.target.value)} className="w-full px-3 py-2 bg-[var(--color-surface)] rounded border border-[var(--color-border)] focus:border-[var(--color-accent)] outline-none text-sm" />
            </div>
            <div>
              <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Message</label>
              <textarea rows={6} value={replyBody} onChange={(e) => setReplyBody(e.target.value)} placeholder="Type your reply here..." className="w-full px-3 py-2 bg-[var(--color-surface)] rounded border border-[var(--color-border)] focus:border-[var(--color-accent)] outline-none text-sm resize-y" />
            </div>
            <div className="flex justify-end">
              <button 
                onClick={handleSimulateReply}
                disabled={isPending || !replyBody.trim()}
                className="px-6 py-2 bg-[var(--color-ink)] text-white text-xs font-medium rounded hover:bg-[var(--color-ink-soft)] transition-colors disabled:opacity-50"
              >
                Simulate Reply
              </button>
            </div>
          </div>
        </AdminCard>
      </div>

      {/* Sidebar: Relations, Notes & Activity */}
      <div className="space-y-6">
        <AdminCard>
          <h2 className="font-serif text-lg mb-4">Client Context</h2>
          <div className="space-y-3">
            {message.relatedLeadId ? (
              <Link href={`/admin/leads/${message.relatedLeadId}`} className="flex justify-between items-center p-3 bg-[var(--color-surface-muted)] rounded border border-transparent hover:border-[var(--color-accent)] transition-colors group">
                <span className="text-sm font-medium text-[var(--color-ink)]">Related Lead</span>
                <span className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)]">&rarr;</span>
              </Link>
            ) : (
              <p className="text-sm text-[var(--color-text-muted)]">No related lead</p>
            )}
            
            {message.relatedConsultationId ? (
              <Link href={`/admin/consultations/${message.relatedConsultationId}`} className="flex justify-between items-center p-3 bg-[var(--color-surface-muted)] rounded border border-transparent hover:border-[var(--color-accent)] transition-colors group">
                <span className="text-sm font-medium text-[var(--color-ink)]">Related Consultation</span>
                <span className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)]">&rarr;</span>
              </Link>
            ) : (
              <p className="text-sm text-[var(--color-text-muted)]">No related consultation</p>
            )}
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="font-serif text-lg mb-4">Internal Notes</h2>
          <div className="space-y-4 mb-4 max-h-64 overflow-y-auto pr-2">
            {message.notes.map((note) => (
              <div key={note.id} className="bg-[var(--color-surface-muted)] p-3 rounded-[var(--radius-md)] text-sm relative">
                {note.text.startsWith("SIMULATED REPLY:") ? (
                  <>
                    <span className="absolute top-3 right-3 text-[10px] font-bold tracking-widest text-orange-600 bg-orange-100 px-2 py-0.5 rounded">REPLY</span>
                    <p className="text-[var(--color-ink)] mb-2 whitespace-pre-wrap pr-16">{note.text.replace("SIMULATED REPLY:\n", "")}</p>
                  </>
                ) : (
                  <>
                    <span className="absolute top-3 right-3 text-[10px] font-bold tracking-widest text-[var(--color-text-subtle)] bg-[var(--color-border)] px-2 py-0.5 rounded">INTERNAL NOTE</span>
                    <p className="text-[var(--color-ink)] mb-2 whitespace-pre-wrap pr-24">{note.text}</p>
                  </>
                )}
                <p className="text-[10px] text-[var(--color-text-subtle)]" suppressHydrationWarning>{note.createdAt.replace('T', ' ').substring(0, 16)}</p>
              </div>
            ))}
            {message.notes.length === 0 && <p className="text-xs text-[var(--color-text-muted)] italic">No notes added.</p>}
          </div>
          <div className="pt-4 border-t border-[var(--color-border)]">
            <textarea 
              rows={2} 
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add an internal note..."
              className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm mb-2 resize-none"
            />
            <button 
              onClick={handleAddNote} 
              disabled={isPending || !newNote.trim()} 
              className="w-full px-4 py-2 bg-[var(--color-ink)] text-white text-xs font-medium rounded hover:bg-[var(--color-ink-soft)] transition-colors disabled:opacity-50"
            >
              Save Internal Note
            </button>
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="font-serif text-lg mb-4">Activity Timeline</h2>
          <div className="space-y-4">
            {message.activity.map((act, idx) => (
              <div key={act.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] mt-1.5" />
                  {idx !== message.activity.length - 1 && <div className="w-px h-full bg-[var(--color-border)] my-1" />}
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
