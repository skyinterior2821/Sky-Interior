"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface LightboxGalleryProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export function LightboxGallery({ images, initialIndex = 0, isOpen, onClose }: LightboxGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const trapRef = useFocusTrap(isOpen);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen, initialIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={trapRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] bg-black/95 flex flex-col backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 text-white absolute top-0 left-0 right-0 z-10">
            <div className="font-sans text-xs tracking-widest uppercase">
              {currentIndex + 1} / {images.length}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:text-accent-deep transition-colors focus-visible:outline-accent-deep"
              aria-label="Close gallery"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main Image Area */}
          <div className="flex-1 relative w-full h-full flex items-center justify-center overflow-hidden touch-pan-y">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.98, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 1.02, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full max-w-7xl max-h-[85vh] mx-auto p-4 md:p-12 cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = offset.x;
                  if (swipe < -50 || velocity.x < -500) {
                    handleNext();
                  } else if (swipe > 50 || velocity.x > 500) {
                    handlePrev();
                  }
                }}
              >
                <Image
                  src={images[currentIndex]}
                  alt={`Gallery image ${currentIndex + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain pointer-events-none"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors focus-visible:outline-accent-deep"
                  aria-label="Previous image"
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors focus-visible:outline-accent-deep"
                  aria-label="Next image"
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
