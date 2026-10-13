"use client";

import React, { useState, useTransition } from "react";
import { AdminSettings } from "@/lib/admin/types";
import { SettingsSection } from "./SettingsSection";
import { GeneralSettings } from "./GeneralSettings";
import { ContentSettings } from "./ContentSettings";
import { NotificationSettings } from "./NotificationSettings";
import { AppearanceSettings } from "./AppearanceSettings";
import { updateSettings } from "@/lib/admin/settings-service";
import { useRouter } from "next/navigation";

interface SettingsPageClientProps {
  initialSettings: AdminSettings;
}

export function SettingsPageClient({ initialSettings }: SettingsPageClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [settings, setSettings] = useState<AdminSettings>(initialSettings);
  const [isDirty, setIsDirty] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleGeneralChange = (field: string, value: string) => {
    setSettings(prev => ({ ...prev, general: { ...prev.general, [field]: value } }));
    setIsDirty(true);
    setShowSuccess(false);
  };

  const handleContentChange = (field: string, value: string) => {
    setSettings(prev => ({ ...prev, content: { ...prev.content, [field]: value } }));
    setIsDirty(true);
    setShowSuccess(false);
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setSettings(prev => ({ ...prev, notifications: { ...prev.notifications, [field]: value } }));
    setIsDirty(true);
    setShowSuccess(false);
  };

  const handleAppearanceChange = (field: string, value: string) => {
    setSettings(prev => ({ ...prev, appearance: { ...prev.appearance, [field]: value as any } }));
    setIsDirty(true);
    setShowSuccess(false);
  };

  const handleDiscard = () => {
    setSettings(initialSettings);
    setIsDirty(false);
    setShowSuccess(false);
  };

  const handleSave = () => {
    startTransition(async () => {
      await updateSettings(settings);
      setIsDirty(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      router.refresh();
    });
  };

  const navItems = [
    { id: "general", label: "General" },
    { id: "content", label: "Content" },
    { id: "notifications", label: "Notifications" },
    { id: "appearance", label: "Appearance" },
  ];

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 relative pb-24">
      
      {/* Sticky Sidebar Navigation */}
      <div className="hidden lg:block w-48 shrink-0">
        <nav className="sticky top-24 space-y-1">
          <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-subtle)] mb-4 px-3">Sections</p>
          {navItems.map(item => (
            <a 
              key={item.id} 
              href={`#${item.id}`}
              className="block px-3 py-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface-muted)] rounded transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex-1 space-y-8">
        <div>
          <h1 className="text-[var(--text-heading-s)] font-serif text-[var(--color-ink)]">Settings</h1>
          <p className="text-[var(--text-body-s)] text-[var(--color-text-muted)] mt-1">Configure the Admin Dashboard experience and content preferences.</p>
        </div>

        <SettingsSection 
          id="general" 
          title="General Settings" 
          description="Basic platform configuration."
        >
          <GeneralSettings data={settings.general} onChange={handleGeneralChange} />
        </SettingsSection>

        <SettingsSection 
          id="content" 
          title="Content Preferences" 
          description="Default statuses and limits for platform content."
        >
          <ContentSettings data={settings.content} onChange={handleContentChange} />
        </SettingsSection>

        <SettingsSection 
          id="notifications" 
          title="Notifications" 
          description="Configure which events trigger administrative emails."
        >
          <NotificationSettings data={settings.notifications} onChange={handleNotificationChange} />
        </SettingsSection>

        <SettingsSection 
          id="appearance" 
          title="Admin Appearance" 
          description="Customize how the Admin Dashboard looks and feels."
        >
          <AppearanceSettings data={settings.appearance} onChange={handleAppearanceChange} />
        </SettingsSection>

      </div>

      {/* Floating Save Bar */}
      <div className={`fixed bottom-0 left-0 lg:left-64 right-0 bg-[var(--color-surface-elevated)] border-t border-[var(--color-border)] p-4 flex justify-between items-center z-[100] transform transition-transform duration-300 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] ${isDirty || showSuccess ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex items-center gap-3 ml-4 lg:ml-8 max-w-7xl mx-auto w-full justify-between">
          <div>
            {isDirty && <span className="text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded">Unsaved changes</span>}
            {showSuccess && <span className="text-sm font-medium text-green-700 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg> Settings saved successfully</span>}
          </div>
          <div className="flex gap-3">
            {isDirty && (
              <button 
                onClick={handleDiscard}
                disabled={isPending}
                className="px-4 py-2 text-sm font-medium text-[var(--color-text-muted)] bg-[var(--color-surface-muted)] hover:bg-[var(--color-border)] rounded transition-colors"
              >
                Discard
              </button>
            )}
            <button 
              onClick={handleSave}
              disabled={isPending || (!isDirty && !showSuccess)}
              className="px-6 py-2 bg-[var(--color-ink)] text-white text-xs font-medium tracking-widest uppercase rounded hover:bg-[var(--color-ink-soft)] transition-colors disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
