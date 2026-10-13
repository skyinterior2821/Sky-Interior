"use client";

import React, { useState } from "react";
import { AdminMedia } from "@/lib/admin/types";
import { AdminCard } from "@/components/admin/AdminCard";
import { MediaGrid } from "@/components/admin/media/MediaGrid";
import { MediaTable } from "@/components/admin/media/MediaTable";
import { MediaInspector } from "@/components/admin/media/MediaInspector";
import { MediaUploader } from "@/components/admin/media/MediaUploader";

interface MediaPageClientProps {
  initialMedia: AdminMedia[];
  kpis: { total: number; images: number; used: number; unused: number; archived: number };
}

export function MediaPageClient({ initialMedia, kpis }: MediaPageClientProps) {
  const [viewMode, setViewMode] = useState<"GRID" | "LIST">("GRID");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [usageFilter, setUsageFilter] = useState("All");
  const [folderFilter, setFolderFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  
  const [selectedMedia, setSelectedMedia] = useState<AdminMedia | null>(null);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);

  // Client-side filtering and sorting for mock prototype
  const filteredMedia = initialMedia.filter((m) => {
    if (search && !m.filename.toLowerCase().includes(search.toLowerCase()) && !m.altText.toLowerCase().includes(search.toLowerCase()) && !m.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))) return false;
    if (typeFilter !== "All" && m.type !== typeFilter) return false;
    if (usageFilter !== "All") {
      if (usageFilter === "ARCHIVED") {
        if (m.status !== "ARCHIVED") return false;
      } else {
        if (m.status === "ARCHIVED") return false;
        if (m.usage !== usageFilter) return false;
      }
    } else if (m.status === "ARCHIVED") {
      return false; // Default hide archived
    }
    if (folderFilter !== "All" && m.folder !== folderFilter) return false;
    return true;
  }).sort((a, b) => {
    const parseSize = (sizeStr: string) => {
      const num = parseFloat(sizeStr);
      if (sizeStr.includes("MB")) return num * 1024 * 1024;
      if (sizeStr.includes("KB")) return num * 1024;
      return num;
    };

    if (sortBy === "Oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sortBy === "Filename A-Z") return a.filename.localeCompare(b.filename);
    if (sortBy === "Filename Z-A") return b.filename.localeCompare(a.filename);
    if (sortBy === "Largest") return parseSize(b.size) - parseSize(a.size);
    if (sortBy === "Smallest") return parseSize(a.size) - parseSize(b.size);
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Newest
  });

  // Re-sync selected media if it updates
  const currentSelectedMedia = selectedMedia ? initialMedia.find(m => m.id === selectedMedia.id) || null : null;

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[var(--text-heading-s)] font-serif text-[var(--color-ink)]">Media Library</h1>
          <p className="text-[var(--text-body-s)] text-[var(--color-text-muted)] mt-1">Manage images and visual assets used across the Sky Interior platform.</p>
        </div>
        <button 
          onClick={() => setIsUploaderOpen(true)}
          className="px-6 py-2.5 bg-[var(--color-ink)] text-white text-xs font-medium tracking-widest uppercase rounded hover:bg-[var(--color-ink-soft)] transition-colors whitespace-nowrap"
        >
          + Add Media
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <AdminCard noPadding className="p-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-serif text-[var(--color-ink)]">{kpis.total}</span>
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-subtle)] font-semibold mt-1">Total Assets</span>
        </AdminCard>
        <AdminCard noPadding className="p-4 flex flex-col items-center justify-center bg-[var(--color-surface-muted)]">
          <span className="text-2xl font-serif text-[var(--color-accent)]">{kpis.images}</span>
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-subtle)] font-semibold mt-1">Images</span>
        </AdminCard>
        <AdminCard noPadding className="p-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-serif text-[var(--color-success)]">{kpis.used}</span>
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-subtle)] font-semibold mt-1">Used</span>
        </AdminCard>
        <AdminCard noPadding className="p-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-serif text-orange-600">{kpis.unused}</span>
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-subtle)] font-semibold mt-1">Unused</span>
        </AdminCard>
        <AdminCard noPadding className="p-4 flex flex-col items-center justify-center">
          <span className="text-2xl font-serif text-[var(--color-text-subtle)]">{kpis.archived}</span>
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-subtle)] font-semibold mt-1">Archived</span>
        </AdminCard>
      </div>

      {/* Filters & Controls */}
      <AdminCard className="flex flex-col xl:flex-row gap-4 justify-between items-center">
        <div className="relative w-full xl:w-64 shrink-0">
          <input
            type="text"
            placeholder="Search media..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 bg-[var(--color-surface-muted)] border border-transparent focus:border-[var(--color-accent)] rounded-[var(--radius-md)] text-sm outline-none transition-all duration-200"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto w-full xl:w-auto pb-2 xl:pb-0 hide-scrollbar items-center">
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="bg-[var(--color-surface-muted)] text-sm py-2 px-3 rounded-[var(--radius-md)] outline-none min-w-max">
            <option value="All">All Types</option>
            <option value="IMAGE">Image</option>
            <option value="VIDEO">Video</option>
            <option value="DOCUMENT">Document</option>
          </select>
          <select value={usageFilter} onChange={(e) => setUsageFilter(e.target.value)} className="bg-[var(--color-surface-muted)] text-sm py-2 px-3 rounded-[var(--radius-md)] outline-none min-w-max">
            <option value="All">Active Media</option>
            <option value="USED">Used</option>
            <option value="UNUSED">Unused</option>
            <option value="ARCHIVED">Archived Only</option>
          </select>
          <select value={folderFilter} onChange={(e) => setFolderFilter(e.target.value)} className="bg-[var(--color-surface-muted)] text-sm py-2 px-3 rounded-[var(--radius-md)] outline-none min-w-max">
            <option value="All">All Folders</option>
            <option value="PROJECTS">Projects</option>
            <option value="DESIGNS">Designs</option>
            <option value="SERVICES">Services</option>
            <option value="GUIDES">Guides</option>
            <option value="GENERAL">General</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-[var(--color-surface-muted)] text-sm py-2 px-3 rounded-[var(--radius-md)] outline-none min-w-max">
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
            <option value="Filename A-Z">Filename A-Z</option>
            <option value="Filename Z-A">Filename Z-A</option>
            <option value="Largest">Largest First</option>
            <option value="Smallest">Smallest First</option>
          </select>
          <div className="flex bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] p-1 shrink-0 ml-auto xl:ml-2">
            <button 
              onClick={() => setViewMode("GRID")} 
              className={`p-1.5 rounded ${viewMode === 'GRID' ? 'bg-[var(--color-surface)] shadow-sm text-[var(--color-ink)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-ink)]'}`}
              aria-label="Grid View"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
            </button>
            <button 
              onClick={() => setViewMode("LIST")} 
              className={`p-1.5 rounded ${viewMode === 'LIST' ? 'bg-[var(--color-surface)] shadow-sm text-[var(--color-ink)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-ink)]'}`}
              aria-label="List View"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
            </button>
          </div>
        </div>
      </AdminCard>

      {/* Library View */}
      {viewMode === "GRID" ? (
        <MediaGrid media={filteredMedia} onSelect={setSelectedMedia} />
      ) : (
        <MediaTable media={filteredMedia} onSelect={setSelectedMedia} />
      )}

      {/* Overlays */}
      {currentSelectedMedia && (
        <>
          <div className="fixed inset-0 bg-black/20 z-[190] backdrop-blur-[1px]" onClick={() => setSelectedMedia(null)} />
          <MediaInspector media={currentSelectedMedia} onClose={() => setSelectedMedia(null)} />
        </>
      )}

      {isUploaderOpen && (
        <MediaUploader onClose={() => setIsUploaderOpen(false)} />
      )}
    </div>
  );
}
