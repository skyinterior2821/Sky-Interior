"use client";

import React from "react";

interface GeneralSettingsProps {
  data: {
    siteName: string;
    adminDisplayName: string;
    defaultContactEmail: string;
    defaultCountry: string;
    defaultCurrency: string;
    timezone: string;
  };
  onChange: (field: string, value: string) => void;
}

export function GeneralSettings({ data, onChange }: GeneralSettingsProps) {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Site Name</label>
          <input 
            type="text" 
            value={data.siteName} 
            onChange={e => onChange("siteName", e.target.value)} 
            className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm transition-colors" 
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Admin Display Name</label>
          <input 
            type="text" 
            value={data.adminDisplayName} 
            onChange={e => onChange("adminDisplayName", e.target.value)} 
            className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm transition-colors" 
          />
        </div>
      </div>
      <div>
        <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Default Contact Email</label>
        <input 
          type="email" 
          value={data.defaultContactEmail} 
          onChange={e => onChange("defaultContactEmail", e.target.value)} 
          className="w-full max-w-md px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm transition-colors" 
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Default Country</label>
          <select 
            value={data.defaultCountry} 
            onChange={e => onChange("defaultCountry", e.target.value)} 
            className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm transition-colors"
          >
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Default Currency</label>
          <select 
            value={data.defaultCurrency} 
            onChange={e => onChange("defaultCurrency", e.target.value)} 
            className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm transition-colors"
          >
            <option value="INR">INR (₹)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-1">Timezone</label>
          <select 
            value={data.timezone} 
            onChange={e => onChange("timezone", e.target.value)} 
            className="w-full px-3 py-2 bg-[var(--color-surface-muted)] rounded border border-transparent focus:border-[var(--color-accent)] outline-none text-sm transition-colors"
          >
            <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
            <option value="America/New_York">America/New_York (EST)</option>
            <option value="Europe/London">Europe/London (GMT)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
