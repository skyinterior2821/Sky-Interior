import React from "react";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-[var(--text-label)] font-sans tracking-widest uppercase">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center">
              {isLast || !item.href ? (
                <span className="text-[var(--color-text)] font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors focus-visible:outline-[var(--color-accent)]"
                  >
                    {item.label}
                  </Link>
                  <span className="mx-2 text-[var(--color-border-strong)]" aria-hidden="true">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
