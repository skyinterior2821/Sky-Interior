"use client";

import React from "react";
import { AdminCard } from "@/components/admin/AdminCard";

interface SettingsSectionProps {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function SettingsSection({ id, title, description, children }: SettingsSectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <AdminCard noPadding>
        <div className="p-6 border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]">
          <h2 className="font-serif text-lg text-[var(--color-ink)]">{title}</h2>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">{description}</p>
        </div>
        <div className="p-6 space-y-6">
          {children}
        </div>
      </AdminCard>
    </section>
  );
}
