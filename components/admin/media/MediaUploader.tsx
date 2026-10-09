"use client";

import React, { useState, useTransition } from "react";
import { createMockMedia } from "@/lib/admin/media-service";
import { MediaFolder } from "@/lib/admin/types";
import { useRouter } from "next/navigation";

interface MediaUploaderProps {
  onClose: () => void;
}

export function MediaUploader({ onClose }: MediaUploaderProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [filename, setFilename] = useState("");
  const [altText, setAltText] = useState("");
  const [folder, setFolder] = useState<MediaFolder>("GENERAL");
  const [tags, setTags] = useState("");

  const handleSimulateUpload = () => {
    if (!filename) return;
    startTransition(async () => {
      const tagsArray = tags.split(",").map(t => t.trim()).filter(t => t);
      await createMockMedia({
        filename: filename + (filename.includes('.') ? '' : '.jpg'), // Auto extension for mock
        altText,
        folder,
        tags: tagsArray
      });
      router.refresh();
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 z-[300] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-[var(--color-surface-elevated)] rounded-[var(--radius-lg)] max-w-md w-full shadow-2xl overflow-hidden border border-[var(--color-border)]">
        <div className="p-4 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-surface-muted)]">
          <h2 className="font-serif text-lg text-[var(--color-ink)]">Upload Media</h2>
          <button onClick={onClose} className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-ink)] transition-colors rounded-full hover:bg-[var(--color-border)]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded-[var(--radius-md)]">
            <p className="text-xs font-medium"><strong>Prototype Upload</strong> — files are not permanently persisted to a cloud server in this version.</p>
          </div>

          <div>
            <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">File Name</label>
            <input 
              type="text" 
              value={filename} 
              onChange={(e) => setFilename(e.target.value)} 
              placeholder="e.g. hero-banner.jpg" 
              className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-[var(--color-border)] focus:border-[var(--color-accent)] outline-none text-sm" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Alt Text</label>
            <input 
              type="text" 
              value={altText} 
              onChange={(e) => setAltText(e.target.value)} 
              placeholder="Describe image for accessibility" 
              className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-[var(--color-border)] focus:border-[var(--color-accent)] outline-none text-sm" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Folder</label>
              <select value={folder} onChange={(e) => setFolder(e.target.value as MediaFolder)} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-[var(--color-border)] focus:border-[var(--color-accent)] outline-none text-sm">
                <option value="PROJECTS">Projects</option>
                <option value="DESIGNS">Designs</option>
                <option value="SERVICES">Services</option>
                <option value="GUIDES">Guides</option>
                <option value="GENERAL">General</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Tags</label>
              <input 
                type="text" 
                value={tags} 
                onChange={(e) => setTags(e.target.value)} 
                placeholder="Comma separated" 
                className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-[var(--color-border)] focus:border-[var(--color-accent)] outline-none text-sm" 
              />
            </div>
          </div>
          
          <div className="pt-4 border-t border-[var(--color-border)] flex justify-end gap-3 mt-4">
            <button disabled={isPending} onClick={onClose} className="px-4 py-2 text-sm text-[var(--color-ink)] bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] hover:bg-[var(--color-border)] transition-colors">
              Cancel
            </button>
            <button 
              disabled={isPending || !filename} 
              onClick={handleSimulateUpload} 
              className="px-4 py-2 text-sm text-white bg-[var(--color-ink)] rounded-[var(--radius-md)] hover:bg-[var(--color-ink-soft)] transition-colors disabled:opacity-50"
            >
              {isPending ? "Uploading..." : "Simulate Upload"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
