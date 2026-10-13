"use client";

import React, { useState, useTransition } from "react";
import { AdminProject } from "@/lib/admin/types";
import { createAdminProject, updateAdminProject } from "@/lib/admin/project-service";
import { useRouter } from "next/navigation";
import { AdminCard } from "@/components/admin/AdminCard";
import Link from "next/link";

interface ProjectEditorProps {
  initialData?: AdminProject;
  styles: string[];
  rooms: string[];
}

export function ProjectEditor({ initialData, styles, rooms }: ProjectEditorProps) {
  const isEditMode = !!initialData;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<Partial<AdminProject>>(
    initialData || {
      name: "", slug: "", description: "", location: "", propertyType: "",
      rooms: 1, style: "Modern", featured: false, status: "DRAFT",
      coverImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
      gallery: [], overview: "", designStory: "", materials: "", highlights: "",
      metaTitle: "", metaDescription: ""
    }
  );
  
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === "rooms") {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 1 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = (status: "DRAFT" | "PUBLISHED") => {
    startTransition(async () => {
      if (isEditMode && initialData) {
        await updateAdminProject(initialData.id, { ...formData, status });
      } else {
        await createAdminProject({ ...formData, status });
      }
      router.push("/admin/projects");
      router.refresh();
    });
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Link href="/admin/projects" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-ink)] flex items-center gap-1 mb-2 transition-colors">
            &larr; Back to Projects
          </Link>
          <h1 className="text-[var(--text-heading-s)] font-serif text-[var(--color-ink)]">
            {isEditMode ? "Edit Project" : "New Project"}
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
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Project Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Slug</label>
                  <input type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Location</label>
                  <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Short Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none resize-none" />
              </div>
            </div>
          </AdminCard>

          <AdminCard>
            <h2 className="font-serif text-lg mb-4">Project Content</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Overview</label>
                <textarea name="overview" value={formData.overview} onChange={handleChange} rows={4} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Design Story</label>
                <textarea name="designStory" value={formData.designStory} onChange={handleChange} rows={6} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Materials Used</label>
                  <input type="text" name="materials" value={formData.materials} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Highlights</label>
                  <input type="text" name="highlights" value={formData.highlights} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none" />
                </div>
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
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Property Type</label>
                <input type="text" name="propertyType" value={formData.propertyType} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none" placeholder="e.g. Villa, 3 BHK..." />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Rooms</label>
                <select name="rooms" value={formData.rooms} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none">
                  {rooms.filter(r => r !== "All").map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Style</label>
                <select name="style" value={formData.style} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none">
                  {styles.filter(s => s !== "All").map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <label className="flex items-center gap-2 mt-4 cursor-pointer">
                <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="w-4 h-4 accent-[var(--color-ink)]" />
                <span className="text-sm font-medium text-[var(--color-ink)]">Featured Project</span>
              </label>
            </div>
          </AdminCard>

          <AdminCard>
            <h2 className="font-serif text-lg mb-4">Media</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Cover Image URL</label>
                <input type="text" name="coverImage" value={formData.coverImage} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none mb-2" />
                {formData.coverImage && (
                  <div className="w-full h-32 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={formData.coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Gallery Images (Comma separated URLs)</label>
                <textarea 
                  name="gallery" 
                  value={formData.gallery?.join(", ")} 
                  onChange={(e) => setFormData(prev => ({ ...prev, gallery: e.target.value.split(",").map(s => s.trim()).filter(Boolean) }))} 
                  rows={4} 
                  className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none resize-none" 
                />
              </div>
            </div>
          </AdminCard>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-[200] bg-[var(--color-ink)]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--color-surface)] w-full max-w-5xl max-h-[90vh] rounded-[var(--radius-lg)] shadow-2xl flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-[var(--color-border)]">
              <h3 className="font-serif text-lg">Public Preview</h3>
              <button onClick={() => setShowPreview(false)} className="text-[var(--color-text-muted)] hover:text-[var(--color-ink)]">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 relative">
              {/* Mocking the public UI rendering */}
              <div className="max-w-4xl mx-auto">
                <p className="text-[var(--text-label)] text-[var(--color-accent)] tracking-widest uppercase mb-4">{formData.location} &mdash; {formData.propertyType}</p>
                <h1 className="text-[var(--text-display-m)] font-serif mb-8">{formData.name}</h1>
                {formData.coverImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={formData.coverImage} alt="Cover" className="w-full h-[60vh] object-cover rounded-sm mb-12" />
                )}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                  <div className="md:col-span-4 space-y-6 text-[var(--text-body-s)] uppercase tracking-widest text-[var(--color-text-subtle)] border-t border-[var(--color-border)] pt-6">
                    <div><span className="block mb-1 opacity-60">Style</span><span className="text-[var(--color-ink)] font-medium">{formData.style}</span></div>
                    <div><span className="block mb-1 opacity-60">Rooms</span><span className="text-[var(--color-ink)] font-medium">{formData.rooms} Rooms</span></div>
                    <div><span className="block mb-1 opacity-60">Materials</span><span className="text-[var(--color-ink)] font-medium">{formData.materials}</span></div>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-[var(--text-heading-s)] font-serif mb-6">{formData.overview}</p>
                    <p className="text-[var(--text-body-m)] text-[var(--color-text-muted)] leading-relaxed">{formData.designStory}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
