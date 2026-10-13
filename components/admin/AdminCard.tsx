import React from "react";

interface AdminCardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function AdminCard({ children, className = "", noPadding = false }: AdminCardProps) {
  return (
    <div className={`bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-sm overflow-hidden ${className}`}>
      <div className={noPadding ? "" : "p-4 md:p-6"}>
        {children}
      </div>
    </div>
  );
}
