"use client";

import React from "react";

interface AppearanceSettingsProps {
  data: {
    density: "Comfortable" | "Compact";
    sidebar: "Expanded" | "Collapsed";
    tableRows: "Default" | "Compact";
  };
  onChange: (field: string, value: string) => void;
}

export function AppearanceSettings({ data, onChange }: AppearanceSettingsProps) {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Density</label>
          <select 
            value={data.density} 
            onChange={e => onChange("density", e.target.value)} 
            className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm transition-colors"
          >
            <option value="Comfortable">Comfortable (Default)</option>
            <option value="Compact">Compact</option>
          </select>
          <p className="text-[10px] text-[var(--color-text-subtle)] mt-1">Adjusts spacing across cards and forms.</p>
        </div>
        
        <div>
          <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Table Rows</label>
          <select 
            value={data.tableRows} 
            onChange={e => onChange("tableRows", e.target.value)} 
            className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm transition-colors"
          >
            <option value="Default">Default</option>
            <option value="Compact">Compact</option>
          </select>
          <p className="text-[10px] text-[var(--color-text-subtle)] mt-1">Adjusts vertical padding inside data tables.</p>
        </div>

        <div>
          <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Default Sidebar State</label>
          <select 
            value={data.sidebar} 
            onChange={e => onChange("sidebar", e.target.value)} 
            className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm transition-colors"
          >
            <option value="Expanded">Expanded</option>
            <option value="Collapsed">Collapsed</option>
          </select>
          <p className="text-[10px] text-[var(--color-text-subtle)] mt-1">Sidebar state on desktop load.</p>
        </div>
      </div>
    </div>
  );
}
