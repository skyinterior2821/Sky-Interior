"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { DesignIdea } from "@/lib/designs";
import Link from "next/link";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface DesignQuickViewProps {
  design: DesignIdea | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DesignQuickView({ design, isOpen, onClose }: DesignQuickViewProps) {
  const trapRef = useFocusTrap(isOpen);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && design && (
        <div 
          className="fixed inset-0 z-[150] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm"
          ref={overlayRef}
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-view-title"
        >
          <motion.div
            ref={trapRef}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full md:w-[90vw] md:max-w-5xl h-[90vh] md:h-[80vh] bg-[var(--color-surface)] flex flex-col md:flex-row overflow-hidden shadow-2xl relative"
          >
            {/* Close Button Mobile (Absolute Top Right) */}
            <button 
              onClick={onClose}
              className="md:hidden absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-md"
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>

            {/* Image Area */}
            <div className="w-full md:w-3/5 h-[40vh] md:h-full relative bg-[var(--color-border)] flex-shrink-0">
              <Image
                src={design.image}
                alt={design.title}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
                priority
              />
            </div>

            {/* Content Area */}
            <div className="w-full md:w-2/5 h-[50vh] md:h-full overflow-y-auto p-6 md:p-12 flex flex-col relative bg-[var(--color-paper)]">
              <button 
                onClick={onClose}
                className="hidden md:flex absolute top-6 right-6 w-10 h-10 items-center justify-center text-[var(--color-ink-muted)] hover:text-[var(--color-accent-deep)] transition-colors"
                aria-label="Close"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>

              <div className="flex gap-2 mb-6">
                <span className="font-sans text-[10px] tracking-widest uppercase border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-[var(--color-ink)]">{design.room}</span>
                <span className="font-sans text-[10px] tracking-widest uppercase border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-[var(--color-accent-deep)]">{design.style}</span>
              </div>

              <h2 id="quick-view-title" className="font-serif text-[clamp(2rem,3vw,2.5rem)] text-[var(--color-ink)] mb-6 leading-tight">
                {design.title}
              </h2>
              
              <p className="font-sans text-sm text-[var(--color-ink-muted)] leading-relaxed font-light mb-8">
                {design.description}
              </p>

              <div className="space-y-6 mb-12">
                <div>
                  <h4 className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-3">Suggested Materials</h4>
                  <p className="font-serif text-[var(--color-ink)]">Oak Wood, Matte Steel, Linen</p>
                </div>
                <div>
                  <h4 className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-3">Color Palette</h4>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-none bg-[#EAE8E3] border border-[var(--color-border)] shadow-sm" />
                    <div className="w-8 h-8 rounded-none bg-[#8E7E70] border border-[var(--color-border)] shadow-sm" />
                    <div className="w-8 h-8 rounded-none bg-[#2C2F33] border border-[var(--color-border)] shadow-sm" />
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-8 flex flex-col gap-3">
                <Link 
                  href={`/estimate?room=${encodeURIComponent(design.room)}&style=${encodeURIComponent(design.style)}`}
                  className="w-full text-center bg-[var(--color-ink)] text-[var(--color-surface)] py-5 font-sans text-[10px] tracking-[0.2em] uppercase hover:bg-[var(--color-accent-deep)] transition-colors focus-visible:outline-[var(--color-accent-deep)]"
                >
                  Get Estimate for this Style
                </Link>
                <Link 
                  href={`/consultation?style=${encodeURIComponent(design.style)}`}
                  className="w-full text-center bg-transparent border border-[var(--color-border)] text-[var(--color-ink)] py-5 font-sans text-[10px] tracking-[0.2em] uppercase hover:border-[var(--color-accent-deep)] hover:text-[var(--color-accent-deep)] transition-colors focus-visible:outline-[var(--color-accent-deep)]"
                >
                  Discuss with a Designer
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
