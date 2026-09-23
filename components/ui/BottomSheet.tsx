"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { createPortal } from "react-dom";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export function BottomSheet({ isOpen, onClose, children, title }: BottomSheetProps) {
  const containerRef = useFocusTrap(isOpen);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.body.style.overflow = "unset";
        document.removeEventListener("keydown", handleEscape);
      };
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Use portal to avoid z-index/overflow issues from parent containers
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Sheet */}
          <motion.div
            ref={containerRef as React.RefObject<HTMLDivElement>}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-h-[85vh] bg-surface rounded-t-2xl shadow-2xl flex flex-col pt-safe-top pb-safe-bottom"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "sheet-title" : undefined}
          >
            {/* Handle for visual dragging cue (though not drag-enabled yet) */}
            <div className="w-full flex justify-center py-4 cursor-pointer shrink-0" onClick={onClose}>
              <div className="w-12 h-1.5 bg-border rounded-full" />
            </div>

            {/* Header */}
            {title && (
              <div className="px-6 pb-4 border-b border-border flex items-center justify-between shrink-0">
                <h2 id="sheet-title" className="font-serif text-xl text-ink">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 text-ink-muted hover:text-ink transition-colors"
                  aria-label="Close filters"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            {/* Content (scrollable) */}
            <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
