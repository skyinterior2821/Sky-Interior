"use client";

import React, { useState, useTransition } from "react";
import { AdminMedia } from "@/lib/admin/types";

interface MediaGridProps {
  media: AdminMedia[];
  onSelect: (media: AdminMedia) => void;
}

export function MediaGrid({ media, onSelect }: MediaGridProps) {
  if (media.length === 0) {
    return (
      <div className="py-16 text-center text-[var(--color-text-muted)] border-2 border-dashed border-[var(--color-border)] rounded-[var(--radius-lg)]">
        No media found matching your criteria.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {media.map((asset) => (
        <button 
          key={asset.id} 
          onClick={() => onSelect(asset)}
          className="group flex flex-col text-left bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] overflow-hidden hover:border-[var(--color-accent)] hover:shadow-md transition-all duration-200"
        >
          <div className="relative w-full aspect-square bg-[var(--color-surface-muted)] overflow-hidden flex items-center justify-center">
            {asset.type === "IMAGE" ? (
              <img 
                src={asset.url} 
                alt={asset.altText || asset.filename} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
                  (e.target as HTMLImageElement).className = "w-1/2 h-1/2 object-contain opacity-20";
                }}
              />
            ) : (
              <span className="text-[var(--color-text-muted)] text-sm font-medium">{asset.type}</span>
            )}
            
            {/* Status indicators */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {asset.usage === 'UNUSED' && (
                <span className="px-1.5 py-0.5 bg-orange-100 text-orange-800 text-[8px] font-bold tracking-widest uppercase rounded shadow-sm">Unused</span>
              )}
              {asset.status === 'ARCHIVED' && (
                <span className="px-1.5 py-0.5 bg-gray-200 text-gray-800 text-[8px] font-bold tracking-widest uppercase rounded shadow-sm">Archived</span>
              )}
            </div>
            
            <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[9px] font-mono px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {asset.dimensions}
            </div>
          </div>
          
          <div className="p-3 flex-1 flex flex-col">
            <h3 className="text-xs font-medium text-[var(--color-ink)] truncate w-full" title={asset.filename}>{asset.filename}</h3>
            <div className="flex justify-between items-center mt-1">
              <span className="text-[10px] text-[var(--color-text-subtle)] font-mono uppercase">{asset.type} · {asset.size}</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
