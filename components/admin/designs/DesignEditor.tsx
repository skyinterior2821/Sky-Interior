"use client";

import React, { useState, useTransition } from "react";
import { AdminDesign } from "@/lib/admin/types";
import { createAdminDesign, updateAdminDesign } from "@/lib/admin/design-service";
import { useRouter } from "next/navigation";
import { AdminCard } from "@/components/admin/AdminCard";
import Link from "next/link";

interface DesignEditorProps {
  initialData?: AdminDesign;
  styles: string[];
  rooms: string[];
}

export function DesignEditor({ initialData, styles, rooms }: DesignEditorProps) {
  const isEditMode = !!initialData;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<Partial<AdminDesign>>(
    initialData || {
      title: "", slug: "", description: "", room: "Living Room", style: "Modern",
      tags: [], featured: false, status: "DRAFT",
      mainImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
      additionalImages: [], metaTitle: "", metaDescription: ""
    }
  );
  
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = (status: "DRAFT" | "PUBLISHED") => {
    startTransition(async () => {
      if (isEditMode && initialData) {
        await updateAdminDesign(initialData.id, { ...formData, status });
      } else {
        await createAdminDesign({ ...formData, status });
      }
      router.push("/admin/designs");
      router.refresh();
    });
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Link href="/admin/designs" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-ink)] flex items-center gap-1 mb-2 transition-colors">
            &larr; Back to Designs
          </Link>
          <h1 className="text-[var(--text-heading-s)] font-serif text-[var(--color-ink)]">
            {isEditMode ? "Edit Design" : "New Design"}
          </h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowPreview(true)} className="px-4 py-2 bg-transparent border border-[var(--color-border)] text-[var(--color-ink)] rounded-[var(--radius-md)] text-sm font-medium hover:bg-[var(--color-surface-elevated)] transition-colors">
            Preview
          </button>
          <button onClick={() => handleSave("DRAFT")} disabled={isPending} className="px-4 py-2 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-ink)] rounded-[var(--radius-md)] text-sm font-medium hover:bg-[var(--color-surface-muted)] transition-colors disabled:opacity-50">
            {isPending ? "Saving..." : "Save Draft"}
          </button>
          <button onClick={() => handleSave("PUBLISHED")} disabled={isPending} className="px-4 py-2 bg-[var(--color-ink)] text-[var(--color-surface)] rounded-[var(--radius-md)] text-sm font-medium hover:bg-[var(--color-ink-soft)] transition-colors disabled:opacity-50">
            Publish
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Main Content (Left 2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          <AdminCard>
            <h2 className="font-serif text-lg mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Design Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Slug</label>
                <input type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none resize-none" />
              </div>
            </div>
          </AdminCard>

          <AdminCard>
            <h2 className="font-serif text-lg mb-4">SEO</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Meta Title</label>
                <input type="text" name="metaTitle" value={formData.metaTitle} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Meta Description</label>
                <textarea name="metaDescription" value={formData.metaDescription} onChange={handleChange} rows={2} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none resize-none" />
              </div>
            </div>
          </AdminCard>
        </div>

        {/* Sidebar (Right Column) */}
        <div className="space-y-6">
          <AdminCard>
            <h2 className="font-serif text-lg mb-4">Classification</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none">
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Room</label>
                <select name="room" value={formData.room} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none">
                  {rooms.filter(r => r !== "All").map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Style</label>
                <select name="style" value={formData.style} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none">
                  {styles.filter(s => s !== "All").map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Tags (Comma separated)</label>
                <input 
                  type="text" 
                  value={formData.tags?.join(", ")} 
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) }))} 
                  className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none" 
                  placeholder="modern, bright, island" 
                />
              </div>
              <label className="flex items-center gap-2 mt-4 cursor-pointer">
                <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="w-4 h-4 accent-[var(--color-ink)]" />
                <span className="text-sm font-medium text-[var(--color-ink)]">Featured Design</span>
              </label>
            </div>
          </AdminCard>

          <AdminCard>
            <h2 className="font-serif text-lg mb-4">Media</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Main Image URL</label>
                <input type="text" name="mainImage" value={formData.mainImage} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none mb-2" />
                {formData.mainImage && (
                  <div className="w-full h-32 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={formData.mainImage} alt="Cover Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          </AdminCard>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-[200] bg-[var(--color-ink)]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--color-surface)] w-full max-w-lg rounded-[var(--radius-lg)] shadow-2xl flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-[var(--color-border)]">
              <h3 className="font-serif text-lg">Card Preview</h3>
              <button onClick={() => setShowPreview(false)} className="text-[var(--color-text-muted)] hover:text-[var(--color-ink)]">✕</button>
            </div>
            <div className="p-8 bg-[var(--color-paper)]">
              {/* Mock Design Card */}
              <div className="group cursor-pointer block relative rounded-[var(--radius-sm)] overflow-hidden">
                <div className="aspect-[3/4] md:aspect-[4/5] bg-[var(--color-surface-muted)] relative overflow-hidden">
                  {formData.mainImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={formData.mainImage} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105" />
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-medium tracking-widest uppercase text-white/90">
                      {formData.room}
                    </span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-medium tracking-widest uppercase text-white/90">
                      {formData.style}
                    </span>
                  </div>
                  <h3 className="text-[var(--text-heading-s)] font-serif text-white">{formData.title}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
