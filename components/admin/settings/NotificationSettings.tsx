"use client";

import React from "react";

interface NotificationSettingsProps {
  data: {
    newLead: boolean;
    newConsultation: boolean;
    newEstimate: boolean;
    newMessage: boolean;
  };
  onChange: (field: string, value: boolean) => void;
}

export function NotificationSettings({ data, onChange }: NotificationSettingsProps) {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded-[var(--radius-md)] mb-6">
        <p className="text-xs font-medium"><strong>Prototype:</strong> Notification delivery is not connected in this frontend prototype. These toggles simulate settings state only.</p>
      </div>

      <div className="space-y-4">
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative flex items-center justify-center mt-0.5">
            <input 
              type="checkbox" 
              className="peer sr-only"
              checked={data.newLead}
              onChange={e => onChange("newLead", e.target.checked)}
            />
            <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-ink)]"></div>
          </div>
          <div>
            <span className="block text-sm font-medium text-[var(--color-ink)]">New Lead Notifications</span>
            <span className="block text-xs text-[var(--color-text-muted)]">Receive an email when a new lead is captured.</span>
          </div>
        </label>
        
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative flex items-center justify-center mt-0.5">
            <input 
              type="checkbox" 
              className="peer sr-only"
              checked={data.newConsultation}
              onChange={e => onChange("newConsultation", e.target.checked)}
            />
            <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-ink)]"></div>
          </div>
          <div>
            <span className="block text-sm font-medium text-[var(--color-ink)]">New Consultation Notifications</span>
            <span className="block text-xs text-[var(--color-text-muted)]">Receive an email when a user requests a consultation.</span>
          </div>
        </label>

        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative flex items-center justify-center mt-0.5">
            <input 
              type="checkbox" 
              className="peer sr-only"
              checked={data.newEstimate}
              onChange={e => onChange("newEstimate", e.target.checked)}
            />
            <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-ink)]"></div>
          </div>
          <div>
            <span className="block text-sm font-medium text-[var(--color-ink)]">New Estimate Notifications</span>
            <span className="block text-xs text-[var(--color-text-muted)]">Receive an email when a user generates an indicative estimate.</span>
          </div>
        </label>

        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative flex items-center justify-center mt-0.5">
            <input 
              type="checkbox" 
              className="peer sr-only"
              checked={data.newMessage}
              onChange={e => onChange("newMessage", e.target.checked)}
            />
            <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-ink)]"></div>
          </div>
          <div>
            <span className="block text-sm font-medium text-[var(--color-ink)]">New Message Notifications</span>
            <span className="block text-xs text-[var(--color-text-muted)]">Receive an email when a user submits a contact form message.</span>
          </div>
        </label>
      </div>
    </div>
  );
}
