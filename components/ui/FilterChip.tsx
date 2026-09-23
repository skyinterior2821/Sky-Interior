import React from "react";

export interface FilterChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isActive?: boolean;
  count?: number;
}

export function FilterChip({ label, isActive = false, count, className = "", ...props }: FilterChipProps) {
  return (
    <button
      className={`inline-flex items-center px-4 py-2 rounded-[var(--radius-full)] font-sans text-xs tracking-widest uppercase transition-all duration-300 focus-visible:outline-[var(--color-accent)] ${
        isActive
          ? "bg-[var(--color-text)] text-[var(--color-surface)] shadow-md"
          : "bg-transparent text-[var(--color-text-muted)] border border-[var(--color-border)] hover:border-[var(--color-text)] hover:text-[var(--color-text)]"
      } ${className}`}
      aria-pressed={isActive}
      {...props}
    >
      {label}
      {count !== undefined && (
        <span className={`ml-2 text-[10px] ${isActive ? "text-[var(--color-surface-muted)]" : "text-[var(--color-text-subtle)]"}`}>
          ({count})
        </span>
      )}
    </button>
  );
}
