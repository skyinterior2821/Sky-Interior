import React from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/site";

export interface ImagePlaceholderProps {
  label: string;
  sublabel?: string;
  aspect?: string;
  className?: string;
  src?: string;
  alt?: string;
  priority?: boolean;
  sizes?: string;
}

export function ImagePlaceholder({
  label,
  sublabel,
  aspect = "aspect-[4/5]",
  className = "",
  src,
  alt,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: ImagePlaceholderProps) {
  // If a real local image exists and is not empty or remote
  const hasRealImage = Boolean(src && src.trim().length > 0 && !src.includes("unsplash.com"));

  if (hasRealImage && src) {
    return (
      <div className={`relative overflow-hidden ${aspect} ${className}`}>
        <Image
          src={src}
          alt={alt || label}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  // Placeholder badge only shows when in development OR when siteConfig.showPlaceholders is true
  const showBadge = siteConfig.showPlaceholders || process.env.NODE_ENV !== "production";

  // Neutral Architectural Placeholder Block
  return (
    <div
      role="img"
      aria-label={alt || `${label} - photography in preparation`}
      className={`relative w-full ${aspect} bg-[#EBE7DF] border border-[#DDD7CD] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden ${className}`}
    >
      {/* Architectural corner crosshairs */}
      <span className="absolute top-3 left-3 text-[#B8B1A5] text-xs font-mono select-none" aria-hidden="true">+</span>
      <span className="absolute top-3 right-3 text-[#B8B1A5] text-xs font-mono select-none" aria-hidden="true">+</span>
      <span className="absolute bottom-3 left-3 text-[#B8B1A5] text-xs font-mono select-none" aria-hidden="true">+</span>
      <span className="absolute bottom-3 right-3 text-[#B8B1A5] text-xs font-mono select-none" aria-hidden="true">+</span>

      <div className="max-w-xs space-y-2 z-10 px-4">
        <p className="font-serif text-lg lg:text-xl text-[#1C1B19] leading-snug">
          {label}
        </p>
        {sublabel && (
          <p className="font-sans text-xs uppercase tracking-widest text-[#736F69]">
            {sublabel}
          </p>
        )}
        {showBadge && (
          <div className="pt-2">
            <span className="inline-block font-sans text-[10px] uppercase tracking-wider text-[#9C5B3F] bg-[#FAF8F5]/80 px-2.5 py-1 border border-[#DDD7CD] rounded-sm">
              Photography in progress
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
