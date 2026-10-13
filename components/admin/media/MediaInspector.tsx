"use client";

import React, { useState, useTransition } from "react";
import { AdminMedia } from "@/lib/admin/types";
import { AdminCard } from "@/components/admin/AdminCard";
import { archiveMedia, updateMediaMetadata } from "@/lib/admin/media-service";
import Link from "next/link";
import Image from "next/image";

interface MediaInspectorProps {
  media: AdminMedia;
  onClose: () => void;
}

export function MediaInspector({ media, onClose }: MediaInspectorProps) {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    filename: media.filename,
    altText: media.altText,
    folder: media.folder,
    tags: media.tags.join(", ")
  });
  const [archiveConfirm, setArchiveConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    startTransition(async () => {
      const tagsArray = formData.tags.split(",").map(t => t.trim()).filter(t => t);
      await updateMediaMetadata(media.id, {
        filename: formData.filename,
        altText: formData.altText,
        folder: formData.folder as any,
        tags: tagsArray
      });
      onClose();
    });
  };

  const handleArchive = () => {
    startTransition(async () => {
      await archiveMedia(media.id);
      onClose();
    });
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-[400px] z-[200] bg-[var(--color-surface-elevated)] border-l border-[var(--color-border)] shadow-2xl flex flex-col transform transition-transform duration-300">
      <div className="p-4 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-surface-muted)]">
        <h2 className="font-serif text-lg text-[var(--color-ink)]">Asset Details</h2>
        <button onClick={onClose} className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-ink)] transition-colors rounded-full hover:bg-[var(--color-border)]" aria-label="Close Inspector">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* Preview */}
        <div className="relative w-full aspect-video bg-[var(--color-surface-muted)] rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-border)] group flex items-center justify-center">
          {media.type === "IMAGE" ? (
            <img src={media.url} alt={media.altText || media.filename} className="w-full h-full object-cover" />
          ) : (
            <span className="text-[var(--color-text-muted)] text-sm font-medium">{media.type}</span>
          )}
          <a href={media.url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-bold tracking-widest uppercase">
            Open File &nearr;
          </a>
        </div>

        {/* Basic Info */}
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Status</p>
              <span className={`inline-block px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase rounded ${media.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-800'}`}>{media.status}</span>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Usage</p>
              <span className={`inline-block px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase rounded ${media.usage === 'USED' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>{media.usage}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 border-t border-[var(--color-border)] pt-4">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Dimensions</p>
              <p className="text-sm text-[var(--color-ink)] font-medium">{media.dimensions}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Size</p>
              <p className="text-sm text-[var(--color-ink)] font-medium">{media.size}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Type</p>
              <p className="text-sm text-[var(--color-ink)] font-medium">{media.type}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Added</p>
              <p className="text-sm text-[var(--color-ink)] font-medium" suppressHydrationWarning>{media.createdAt.split('T')[0]}</p>
            </div>
          </div>
        </div>

        {/* Edit Metadata */}
        <div className="space-y-4 pt-4 border-t border-[var(--color-border)]">
          <h3 className="font-serif text-lg text-[var(--color-ink)] mb-2">Metadata</h3>
          <div>
            <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Filename</label>
            <input type="text" name="filename" value={formData.filename} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm" />
          </div>
          <div>
            <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Alt Text</label>
            <input type="text" name="altText" value={formData.altText} onChange={handleChange} placeholder="Describe the image for accessibility" className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm" />
            <p className="text-[10px] text-[var(--color-text-subtle)] mt-1">Describe the image for accessibility. Do not use SEO spam.</p>
          </div>
          <div>
            <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Folder</label>
            <select name="folder" value={formData.folder} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm">
              <option value="PROJECTS">Projects</option>
              <option value="DESIGNS">Designs</option>
              <option value="SERVICES">Services</option>
              <option value="GUIDES">Guides</option>
              <option value="GENERAL">General</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Tags (comma separated)</label>
            <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="e.g. kitchen, modern, wood" className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm" />
          </div>
          <button 
            onClick={handleSave} 
            disabled={isPending}
            className="w-full px-4 py-2 bg-[var(--color-ink)] text-white text-xs font-medium rounded hover:bg-[var(--color-ink-soft)] transition-colors disabled:opacity-50"
          >
            Save Metadata
          </button>
        </div>

        {/* Usage Context */}
        <div className="pt-4 border-t border-[var(--color-border)]">
          <h3 className="font-serif text-lg text-[var(--color-ink)] mb-3">Usage Context</h3>
          {media.relations.length > 0 ? (
            <div className="space-y-2">
              {media.relations.map((rel, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-[var(--color-surface-muted)] rounded border border-[var(--color-border)]">
                  <div>
                    <span className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-0.5">{rel.type}</span>
                    <span className="text-sm font-medium text-[var(--color-ink)]">{rel.name}</span>
                  </div>
                  {rel.type === "PROJECT" && <Link href={`/admin/projects/${rel.id}`} className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)]">View &rarr;</Link>}
                  {rel.type === "DESIGN" && <Link href={`/admin/designs/${rel.id}`} className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)]">View &rarr;</Link>}
                  {rel.type === "SERVICE" && <Link href={`/admin/services/${rel.id}`} className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)]">View &rarr;</Link>}
                  {rel.type === "GUIDE" && <Link href={`/admin/guides/${rel.id}`} className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)]">View &rarr;</Link>}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--color-text-muted)] bg-[var(--color-surface-muted)] p-3 rounded">This asset is not currently used in any content.</p>
          )}
        </div>

        {/* Danger Zone */}
        {media.status !== "ARCHIVED" && (
          <div className="pt-4 border-t border-[var(--color-border)] pb-8">
            {archiveConfirm ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-[var(--radius-md)]">
                <p className="text-sm text-red-800 mb-3 font-medium">Archive this media asset?</p>
                <div className="flex gap-2">
                  <button disabled={isPending} onClick={handleArchive} className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition-colors">Yes, Archive</button>
                  <button disabled={isPending} onClick={() => setArchiveConfirm(false)} className="px-3 py-1.5 bg-white text-red-800 text-xs font-medium border border-red-200 rounded hover:bg-red-100 transition-colors">Cancel</button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setArchiveConfirm(true)} 
                className="w-full px-4 py-2 bg-transparent text-[var(--color-error)] text-xs font-bold tracking-widest uppercase rounded border border-[var(--color-error)] hover:bg-red-50 transition-colors"
              >
                Archive Asset
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
