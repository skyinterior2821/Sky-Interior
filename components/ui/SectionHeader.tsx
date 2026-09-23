import React from "react";
import { Button } from "./Button";
import { FadeIn } from "./FadeIn";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  centered?: boolean;
}

export function SectionHeader({ eyebrow, title, description, ctaText, ctaHref, centered = false }: SectionHeaderProps) {
  return (
    <FadeIn>
      <div className={`flex flex-col mb-12 lg:mb-16 ${centered ? 'items-center text-center' : 'items-start text-left'}`}>
        {eyebrow && (
          <div className="flex items-center gap-4 mb-6">
            {!centered && <span className="w-8 h-px bg-[var(--color-accent)] block" />}
            <span className="font-sans text-[var(--text-xs)] tracking-widest uppercase text-[var(--color-accent)]">
              {eyebrow}
            </span>
            {!centered && <span className="hidden md:block w-8 h-px bg-[var(--color-accent)]" />}
          </div>
        )}
        
        <h2 className="font-serif text-[length:var(--text-heading-l)] lg:text-[length:var(--text-heading-xl)] text-[var(--color-text)] mb-6 max-w-3xl leading-tight">
          {title}
        </h2>
        
        {description && (
          <p className="font-sans text-[length:var(--text-body-l)] text-[var(--color-text-muted)] max-w-2xl font-light mb-8">
            {description}
          </p>
        )}
        
        {ctaText && ctaHref && (
          <Button href={ctaHref} variant="outline" className="mt-2">
            {ctaText}
          </Button>
        )}
      </div>
    </FadeIn>
  );
}
