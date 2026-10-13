"use client";

import React from "react";

interface ContentSettingsProps {
  data: {
    defaultProjectStatus: string;
    defaultDesignStatus: string;
    defaultServiceStatus: string;
    defaultGuideStatus: string;
    itemsPerPage: string;
  };
  onChange: (field: string, value: string) => void;
}

export function ContentSettings({ data, onChange }: ContentSettingsProps) {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Default Project Status</label>
          <select 
            value={data.defaultProjectStatus} 
            onChange={e => onChange("defaultProjectStatus", e.target.value)} 
            className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm transition-colors"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Default Design Status</label>
          <select 
            value={data.defaultDesignStatus} 
            onChange={e => onChange("defaultDesignStatus", e.target.value)} 
            className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm transition-colors"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Default Service Status</label>
          <select 
            value={data.defaultServiceStatus} 
            onChange={e => onChange("defaultServiceStatus", e.target.value)} 
            className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm transition-colors"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Default Guide Status</label>
          <select 
            value={data.defaultGuideStatus} 
            onChange={e => onChange("defaultGuideStatus", e.target.value)} 
            className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm transition-colors"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>
      </div>
      
      <div className="pt-4 border-t border-[var(--color-border)]">
        <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Items Per Page (Admin Tables)</label>
        <select 
          value={data.itemsPerPage} 
          onChange={e => onChange("itemsPerPage", e.target.value)} 
          className="w-full max-w-xs px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm transition-colors"
        >
          <option value="10">10 items</option>
          <option value="20">20 items</option>
          <option value="50">50 items</option>
        </select>
      </div>
    </div>
  );
}
