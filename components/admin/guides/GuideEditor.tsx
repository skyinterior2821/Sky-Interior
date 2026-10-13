"use client";

import React, { useState, useTransition } from "react";
import { AdminGuide } from "@/lib/admin/types";
import { createAdminGuide, updateAdminGuide } from "@/lib/admin/guide-service";
import { useRouter } from "next/navigation";
import { AdminCard } from "@/components/admin/AdminCard";
import Link from "next/link";

interface GuideEditorProps {
  initialData?: AdminGuide;
  categories: string[];
}

export function GuideEditor({ initialData, categories }: GuideEditorProps) {
  const isEditMode = !!initialData;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<Partial<AdminGuide>>(
    initialData || {
      title: "", slug: "", excerpt: "", category: "PLANNING", tags: [],
      author: "Sky Interior Editorial", readingTime: "5 min read", featured: false, status: "DRAFT",
      coverImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
      imageAlt: "", content: [], metaTitle: "", metaDescription: "", ogImage: "", canonicalUrl: ""
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
        await updateAdminGuide(initialData.id, { ...formData, status });
      } else {
        await createAdminGuide({ ...formData, status });
      }
      router.push("/admin/guides");
      router.refresh();
    });
  };

  // Content block logic
  const addBlock = (type: "heading" | "paragraph" | "image" | "quote" | "tip") => {
    setFormData(prev => ({
      ...prev,
      content: [...(prev.content || []), { id: `b-${Date.now()}`, type, content: "" }]
    }));
  };
  const updateBlock = (index: number, content: string) => {
    const newC = [...(formData.content || [])];
    newC[index] = { ...newC[index], content };
    setFormData(prev => ({ ...prev, content: newC }));
  };
  const removeBlock = (index: number) => {
    const newC = [...(formData.content || [])];
    newC.splice(index, 1);
    setFormData(prev => ({ ...prev, content: newC }));
  };
  const moveBlock = (index: number, dir: -1 | 1) => {
    const newC = [...(formData.content || [])];
    if (index + dir < 0 || index + dir >= newC.length) return;
    const temp = newC[index];
    newC[index] = newC[index + dir];
    newC[index + dir] = temp;
    setFormData(prev => ({ ...prev, content: newC }));
  };

  const tocPreview = (formData.content || []).filter(b => b.type === "heading");

  return (
    <div className="space-y-6 md:space-y-8 pb-20">
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Link href="/admin/guides" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-ink)] flex items-center gap-1 mb-2 transition-colors">
            &larr; Back to Guides
          </Link>
          <h1 className="text-[var(--text-heading-s)] font-serif text-[var(--color-ink)]">
            {isEditMode ? "Edit Guide" : "New Guide"}
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
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Slug</label>
                <input type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Excerpt</label>
                <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} rows={3} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Author</label>
                  <input type="text" name="author" value={formData.author} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Reading Time</label>
                  <input type="text" name="readingTime" value={formData.readingTime} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none" placeholder="e.g. 5 min read" />
                </div>
              </div>
            </div>
          </AdminCard>

          <AdminCard>
            <h2 className="font-serif text-lg mb-4">Editorial Content</h2>
            <div className="space-y-4 mb-6">
              {formData.content?.map((block, idx) => (
                <div key={block.id} className="border border-[var(--color-border)] rounded-[var(--radius-md)] bg-[var(--color-surface-muted)] p-4 relative group">
                  <div className="flex justify-between items-center mb-2 border-b border-[var(--color-border)] pb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] bg-[var(--color-surface)] px-2 py-1 rounded">
                      {block.type}
                    </span>
                    <div className="flex gap-2">
                      <button onClick={() => moveBlock(idx, -1)} disabled={idx === 0} className="text-[var(--color-text-muted)] hover:text-[var(--color-ink)] disabled:opacity-30">↑</button>
                      <button onClick={() => moveBlock(idx, 1)} disabled={idx === formData.content!.length - 1} className="text-[var(--color-text-muted)] hover:text-[var(--color-ink)] disabled:opacity-30">↓</button>
                      <button onClick={() => removeBlock(idx)} className="text-[var(--color-text-muted)] hover:text-[var(--color-error)] ml-2">✕</button>
                    </div>
                  </div>
                  {block.type === "heading" && (
                    <input type="text" value={block.content} onChange={e => updateBlock(idx, e.target.value)} className="w-full bg-transparent outline-none font-serif text-lg" placeholder="Heading text..." />
                  )}
                  {block.type === "paragraph" && (
                    <textarea rows={4} value={block.content} onChange={e => updateBlock(idx, e.target.value)} className="w-full bg-transparent outline-none text-sm resize-none" placeholder="Paragraph text..." />
                  )}
                  {block.type === "image" && (
                    <div className="space-y-2">
                      <input type="text" value={block.content} onChange={e => updateBlock(idx, e.target.value)} className="w-full px-2 py-1 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded" placeholder="Image URL..." />
                      {block.content && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={block.content} alt="Preview" className="h-32 object-cover rounded" />
                      )}
                    </div>
                  )}
                  {block.type === "quote" && (
                    <textarea rows={2} value={block.content} onChange={e => updateBlock(idx, e.target.value)} className="w-full bg-transparent outline-none text-sm italic border-l-2 border-[var(--color-accent)] pl-3 resize-none" placeholder="Quote text..." />
                  )}
                  {block.type === "tip" && (
                    <div className="bg-[var(--color-surface-elevated)] p-3 rounded">
                      <span className="text-[10px] uppercase font-bold text-[var(--color-accent)] block mb-1">Tip</span>
                      <input type="text" value={block.content} onChange={e => updateBlock(idx, e.target.value)} className="w-full bg-transparent outline-none text-sm" placeholder="Callout text..." />
                    </div>
                  )}
                </div>
              ))}
              {(!formData.content || formData.content.length === 0) && (
                <div className="text-center py-8 border border-dashed border-[var(--color-border)] rounded-[var(--radius-md)] text-[var(--color-text-subtle)] text-sm">
                  Start building your guide content by adding blocks below.
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--color-border)]">
              <span className="text-xs text-[var(--color-text-muted)] py-1 pr-2">Add block:</span>
              <button onClick={() => addBlock("heading")} className="px-3 py-1 bg-[var(--color-surface-muted)] hover:bg-[var(--color-paper)] border border-[var(--color-border)] rounded text-xs font-medium">+ Heading</button>
              <button onClick={() => addBlock("paragraph")} className="px-3 py-1 bg-[var(--color-surface-muted)] hover:bg-[var(--color-paper)] border border-[var(--color-border)] rounded text-xs font-medium">+ Paragraph</button>
              <button onClick={() => addBlock("image")} className="px-3 py-1 bg-[var(--color-surface-muted)] hover:bg-[var(--color-paper)] border border-[var(--color-border)] rounded text-xs font-medium">+ Image</button>
              <button onClick={() => addBlock("quote")} className="px-3 py-1 bg-[var(--color-surface-muted)] hover:bg-[var(--color-paper)] border border-[var(--color-border)] rounded text-xs font-medium">+ Quote</button>
              <button onClick={() => addBlock("tip")} className="px-3 py-1 bg-[var(--color-surface-muted)] hover:bg-[var(--color-paper)] border border-[var(--color-border)] rounded text-xs font-medium">+ Tip</button>
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
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none">
                  {categories.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Tags (Comma separated)</label>
                <input 
                  type="text" 
                  value={formData.tags?.join(", ")} 
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) }))} 
                  className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none" 
                  placeholder="budget, planning..." 
                />
              </div>
              <label className="flex items-center gap-2 mt-4 cursor-pointer">
                <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="w-4 h-4 accent-[var(--color-ink)]" />
                <span className="text-sm font-medium text-[var(--color-ink)]">Featured Guide</span>
              </label>
            </div>
          </AdminCard>

          {tocPreview.length > 0 && (
            <AdminCard>
              <h2 className="font-serif text-lg mb-4">Table of Contents Preview</h2>
              <ul className="space-y-2">
                {tocPreview.map((h, i) => (
                  <li key={i} className="text-sm text-[var(--color-text-muted)]">• {h.content}</li>
                ))}
              </ul>
            </AdminCard>
          )}

          <AdminCard>
            <h2 className="font-serif text-lg mb-4">Cover Image</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Image URL</label>
                <input type="text" name="coverImage" value={formData.coverImage} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none mb-2" />
                {formData.coverImage && (
                  <div className="w-full h-32 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={formData.coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Alt Text</label>
                <input type="text" name="imageAlt" value={formData.imageAlt} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none" />
              </div>
            </div>
          </AdminCard>
          
          <AdminCard>
            <h2 className="font-serif text-lg mb-4">SEO</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Meta Title</label>
                <div className="flex justify-between items-center"><span className="text-[10px] text-[var(--color-text-subtle)]">{(formData.metaTitle || "").length} / 60</span></div>
                <input type="text" name="metaTitle" value={formData.metaTitle} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Meta Description</label>
                <div className="flex justify-between items-center"><span className="text-[10px] text-[var(--color-text-subtle)]">{(formData.metaDescription || "").length} / 160</span></div>
                <textarea name="metaDescription" value={formData.metaDescription} onChange={handleChange} rows={3} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none resize-none" />
              </div>
            </div>
          </AdminCard>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-[200] bg-[var(--color-ink)]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--color-surface)] w-full max-w-4xl max-h-[90vh] rounded-[var(--radius-lg)] shadow-2xl flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-[var(--color-border)]">
              <h3 className="font-serif text-lg">Public Guide Preview</h3>
              <button onClick={() => setShowPreview(false)} className="text-[var(--color-text-muted)] hover:text-[var(--color-ink)]">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 relative">
              <div className="max-w-2xl mx-auto">
                <p className="text-[var(--text-label)] text-[var(--color-accent)] uppercase mb-4">{formData.category}</p>
                <h1 className="text-[var(--text-display-m)] font-serif mb-6">{formData.title}</h1>
                <div className="flex items-center gap-4 text-[var(--text-body-s)] text-[var(--color-text-muted)] mb-12">
                  <span>{formData.author}</span>
                  <span>&bull;</span>
                  <span>{formData.readingTime}</span>
                </div>
                
                {formData.coverImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={formData.coverImage} alt="Cover" className="w-full aspect-[16/9] object-cover rounded-sm mb-12" />
                )}

                <div className="space-y-8 text-[var(--text-body-m)] leading-relaxed">
                  {formData.content?.map((b, i) => {
                    if (b.type === "heading") return <h2 key={i} className="text-2xl font-serif mt-12 mb-4">{b.content}</h2>;
                    if (b.type === "paragraph") return <p key={i} className="text-[var(--color-text-muted)]">{b.content}</p>;
                    if (b.type === "image") return <img key={i} src={b.content} alt="" className="w-full rounded-sm my-8" />;
                    if (b.type === "quote") return <blockquote key={i} className="border-l-2 border-[var(--color-accent)] pl-6 py-2 my-8 italic text-xl font-serif text-[var(--color-ink)]">{b.content}</blockquote>;
                    if (b.type === "tip") return <div key={i} className="bg-[var(--color-surface-muted)] p-6 my-8 rounded-[var(--radius-sm)] border border-[var(--color-border)]"><span className="block text-[var(--text-label)] uppercase text-[var(--color-accent)] mb-2">Tip</span><p className="text-sm">{b.content}</p></div>;
                    return null;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
