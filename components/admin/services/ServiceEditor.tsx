"use client";

import React, { useState, useTransition } from "react";
import { AdminService } from "@/lib/admin/types";
import { createAdminService, updateAdminService } from "@/lib/admin/service-service";
import { useRouter } from "next/navigation";
import { AdminCard } from "@/components/admin/AdminCard";
import Link from "next/link";

interface ServiceEditorProps {
  initialData?: AdminService;
}

export function ServiceEditor({ initialData }: ServiceEditorProps) {
  const isEditMode = !!initialData;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<Partial<AdminService>>(
    initialData || {
      name: "", slug: "", shortDescription: "", fullDescription: "",
      heroImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
      imageAlt: "", status: "DRAFT", featured: false,
      features: [], process: [], faqs: [],
      ctaHeading: "", ctaDescription: "", ctaLabel: "Book Consultation", ctaDestination: "/consultation",
      metaTitle: "", metaDescription: ""
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
        await updateAdminService(initialData.id, { ...formData, status });
      } else {
        await createAdminService({ ...formData, status });
      }
      router.push("/admin/services");
      router.refresh();
    });
  };

  // Dynamic lists handlers
  const updateFeature = (index: number, val: string) => {
    const newF = [...(formData.features || [])];
    newF[index] = val;
    setFormData(prev => ({ ...prev, features: newF }));
  };
  const addFeature = () => setFormData(prev => ({ ...prev, features: [...(prev.features || []), ""] }));
  const removeFeature = (index: number) => {
    const newF = [...(formData.features || [])];
    newF.splice(index, 1);
    setFormData(prev => ({ ...prev, features: newF }));
  };

  const updateProcess = (index: number, key: "step" | "title" | "description", val: string) => {
    const newP = [...(formData.process || [])];
    newP[index] = { ...newP[index], [key]: val };
    setFormData(prev => ({ ...prev, process: newP }));
  };
  const addProcess = () => setFormData(prev => ({ ...prev, process: [...(prev.process || []), { step: "", title: "", description: "" }] }));
  const removeProcess = (index: number) => {
    const newP = [...(formData.process || [])];
    newP.splice(index, 1);
    setFormData(prev => ({ ...prev, process: newP }));
  };

  const updateFaq = (index: number, key: "question" | "answer", val: string) => {
    const newF = [...(formData.faqs || [])];
    newF[index] = { ...newF[index], [key]: val };
    setFormData(prev => ({ ...prev, faqs: newF }));
  };
  const addFaq = () => setFormData(prev => ({ ...prev, faqs: [...(prev.faqs || []), { question: "", answer: "" }] }));
  const removeFaq = (index: number) => {
    const newF = [...(formData.faqs || [])];
    newF.splice(index, 1);
    setFormData(prev => ({ ...prev, faqs: newF }));
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Link href="/admin/services" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-ink)] flex items-center gap-1 mb-2 transition-colors">
            &larr; Back to Services
          </Link>
          <h1 className="text-[var(--text-heading-s)] font-serif text-[var(--color-ink)]">
            {isEditMode ? "Edit Service" : "New Service"}
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
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Service Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Slug</label>
                <input type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none" required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Short Description</label>
                <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} rows={2} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none resize-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Full Description (Overview)</label>
                <textarea name="fullDescription" value={formData.fullDescription} onChange={handleChange} rows={5} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none resize-none" />
              </div>
            </div>
          </AdminCard>

          <AdminCard>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-serif text-lg">Features</h2>
              <button onClick={addFeature} className="text-xs font-medium text-[var(--color-accent)]">+ Add Feature</button>
            </div>
            <div className="space-y-3">
              {formData.features?.map((feat, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input type="text" value={feat} onChange={(e) => updateFeature(idx, e.target.value)} className="flex-1 px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none" placeholder="Feature description..." />
                  <button onClick={() => removeFeature(idx)} className="text-[var(--color-text-muted)] hover:text-[var(--color-error)]">✕</button>
                </div>
              ))}
              {(!formData.features || formData.features.length === 0) && <p className="text-xs text-[var(--color-text-muted)] italic">No features added.</p>}
            </div>
          </AdminCard>

          <AdminCard>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-serif text-lg">Process Steps</h2>
              <button onClick={addProcess} className="text-xs font-medium text-[var(--color-accent)]">+ Add Step</button>
            </div>
            <div className="space-y-4">
              {formData.process?.map((proc, idx) => (
                <div key={idx} className="p-4 border border-[var(--color-border)] rounded-[var(--radius-md)] bg-[var(--color-surface-muted)] relative">
                  <button onClick={() => removeProcess(idx)} className="absolute top-2 right-2 text-[var(--color-text-muted)] hover:text-[var(--color-error)]">✕</button>
                  <div className="grid grid-cols-4 gap-4 mb-2">
                    <div className="col-span-1">
                      <label className="block text-[10px] uppercase text-[var(--color-text-muted)] mb-1">Step #</label>
                      <input type="text" value={proc.step} onChange={(e) => updateProcess(idx, "step", e.target.value)} className="w-full px-2 py-1 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded" />
                    </div>
                    <div className="col-span-3">
                      <label className="block text-[10px] uppercase text-[var(--color-text-muted)] mb-1">Title</label>
                      <input type="text" value={proc.title} onChange={(e) => updateProcess(idx, "title", e.target.value)} className="w-full px-2 py-1 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-[var(--color-text-muted)] mb-1">Description</label>
                    <textarea rows={2} value={proc.description} onChange={(e) => updateProcess(idx, "description", e.target.value)} className="w-full px-2 py-1 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded resize-none" />
                  </div>
                </div>
              ))}
              {(!formData.process || formData.process.length === 0) && <p className="text-xs text-[var(--color-text-muted)] italic">No process steps added.</p>}
            </div>
          </AdminCard>

          <AdminCard>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-serif text-lg">FAQs</h2>
              <button onClick={addFaq} className="text-xs font-medium text-[var(--color-accent)]">+ Add FAQ</button>
            </div>
            <div className="space-y-4">
              {formData.faqs?.map((faq, idx) => (
                <div key={idx} className="p-4 border border-[var(--color-border)] rounded-[var(--radius-md)] bg-[var(--color-surface-muted)] relative">
                  <button onClick={() => removeFaq(idx)} className="absolute top-2 right-2 text-[var(--color-text-muted)] hover:text-[var(--color-error)]">✕</button>
                  <div className="mb-2">
                    <label className="block text-[10px] uppercase text-[var(--color-text-muted)] mb-1">Question</label>
                    <input type="text" value={faq.question} onChange={(e) => updateFaq(idx, "question", e.target.value)} className="w-full px-2 py-1 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-[var(--color-text-muted)] mb-1">Answer</label>
                    <textarea rows={2} value={faq.answer} onChange={(e) => updateFaq(idx, "answer", e.target.value)} className="w-full px-2 py-1 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded resize-none" />
                  </div>
                </div>
              ))}
              {(!formData.faqs || formData.faqs.length === 0) && <p className="text-xs text-[var(--color-text-muted)] italic">No FAQs added.</p>}
            </div>
          </AdminCard>

          <AdminCard>
            <h2 className="font-serif text-lg mb-4">Call to Action (CTA)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">CTA Heading</label>
                <input type="text" name="ctaHeading" value={formData.ctaHeading} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">CTA Label</label>
                <input type="text" name="ctaLabel" value={formData.ctaLabel} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">CTA Description</label>
                <input type="text" name="ctaDescription" value={formData.ctaDescription} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">CTA Destination (URL)</label>
                <input type="text" name="ctaDestination" value={formData.ctaDestination} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none" />
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
              <label className="flex items-center gap-2 mt-4 cursor-pointer">
                <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="w-4 h-4 accent-[var(--color-ink)]" />
                <span className="text-sm font-medium text-[var(--color-ink)]">Featured Service</span>
              </label>
            </div>
          </AdminCard>

          <AdminCard>
            <h2 className="font-serif text-lg mb-4">Hero Image</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Image URL</label>
                <input type="text" name="heroImage" value={formData.heroImage} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none mb-2" />
                {formData.heroImage && (
                  <div className="w-full h-32 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={formData.heroImage} alt="Hero Preview" className="w-full h-full object-cover" />
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
                <input type="text" name="metaTitle" value={formData.metaTitle} onChange={handleChange} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Meta Description</label>
                <textarea name="metaDescription" value={formData.metaDescription} onChange={handleChange} rows={3} className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] text-sm border border-transparent focus:border-[var(--color-accent)] outline-none resize-none" />
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
              <h3 className="font-serif text-lg">Public Service Preview</h3>
              <button onClick={() => setShowPreview(false)} className="text-[var(--color-text-muted)] hover:text-[var(--color-ink)]">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 relative">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-[var(--text-display-m)] font-serif mb-6">{formData.name}</h1>
                <p className="text-[var(--text-body-l)] text-[var(--color-text-muted)] mb-12 max-w-2xl">{formData.fullDescription}</p>
                
                {formData.heroImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={formData.heroImage} alt="Cover" className="w-full h-[50vh] object-cover rounded-sm mb-12" />
                )}

                {formData.features && formData.features.length > 0 && (
                  <div className="mb-12">
                    <h3 className="text-xl font-serif mb-4">What we do</h3>
                    <ul className="list-disc pl-5 space-y-2 text-[var(--color-text-muted)]">
                      {formData.features.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
