"use client";

import { useState } from "react";
import { LightboxGallery } from "./LightboxGallery";

export function ProjectGalleryViewer({ images }: { images: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="font-sans text-xs tracking-widest uppercase text-ink hover:text-accent-deep transition-colors flex items-center gap-3 border border-border px-8 py-4 hover:border-accent-deep focus-visible:outline-accent-deep bg-surface"
        aria-label="View Full Gallery"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
        View Full Gallery ({images.length})
      </button>

      <LightboxGallery 
        images={images}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
