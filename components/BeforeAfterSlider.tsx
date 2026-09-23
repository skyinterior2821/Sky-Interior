"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfterSlider({ 
  beforeImage, 
  afterImage, 
  beforeLabel = "Before", 
  afterLabel = "After" 
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      className="relative w-full aspect-[4/3] lg:aspect-video overflow-hidden bg-surface cursor-ew-resize select-none"
      ref={containerRef}
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      role="slider"
      aria-valuenow={sliderPosition}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Image comparison slider"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setSliderPosition(p => Math.max(0, p - 5));
        if (e.key === "ArrowRight") setSliderPosition(p => Math.min(100, p + 5));
      }}
    >
      {/* Before Image (Base) */}
      <Image
        src={beforeImage}
        alt={beforeLabel}
        fill
        className="object-cover pointer-events-none"
        sizes="(max-width: 1200px) 100vw, 80vw"
      />
      <div className="absolute top-6 left-6 z-10 px-4 py-2 bg-black/50 backdrop-blur-md text-white font-sans text-xs tracking-widest uppercase rounded-sm shadow-sm pointer-events-none">
        {beforeLabel}
      </div>

      {/* After Image (Clipped) */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`, transition: (isDragging || shouldReduceMotion) ? 'none' : 'clip-path 0.1s ease-out' }}
      >
        <Image
          src={afterImage}
          alt={afterLabel}
          fill
          className="object-cover pointer-events-none"
          sizes="(max-width: 1200px) 100vw, 80vw"
        />
        <div className="absolute top-6 right-6 z-10 px-4 py-2 bg-white/90 backdrop-blur-md text-ink font-sans text-xs tracking-widest uppercase rounded-sm shadow-sm pointer-events-none">
          {afterLabel}
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize transform -translate-x-1/2 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
        style={{ left: `${sliderPosition}%`, transition: (isDragging || shouldReduceMotion) ? 'none' : 'left 0.1s ease-out' }}
      >
        <div className="w-8 h-12 bg-white rounded-sm shadow-lg flex items-center justify-center gap-1 border border-border/20">
          <div className="w-0.5 h-4 bg-ink/30 rounded-full" />
          <div className="w-0.5 h-4 bg-ink/30 rounded-full" />
        </div>
      </div>
    </div>
  );
}
