import React from "react";

export interface PageShellProps {
  children: React.ReactNode;
  className?: string;
}

export function PageShell({ children, className = "" }: PageShellProps) {
  return (
    <main className={`min-h-screen bg-[var(--color-surface)] pt-24 lg:pt-32 pb-16 flex flex-col ${className}`}>
      {children}
    </main>
  );
}

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  spacing?: "sm" | "md" | "lg" | "none";
  surface?: "default" | "elevated" | "muted" | "paper" | "ink";
}

export function Section({ children, spacing = "lg", surface = "default", className = "", ...props }: SectionProps) {
  const spacingStyles = {
    none: "",
    sm: "py-12 lg:py-16",
    md: "py-16 lg:py-24",
    lg: "py-24 lg:py-32",
  };

  const surfaceStyles = {
    default: "bg-[var(--color-surface)]",
    elevated: "bg-[var(--color-surface-elevated)]",
    muted: "bg-[var(--color-surface-muted)]",
    paper: "bg-[var(--color-paper)] text-[var(--color-ink)]",
    ink: "bg-[var(--color-ink)] text-[var(--color-surface)]",
  };

  return (
    <section className={`${spacingStyles[spacing]} ${surfaceStyles[surface]} ${className}`} {...props}>
      {children}
    </section>
  );
}
