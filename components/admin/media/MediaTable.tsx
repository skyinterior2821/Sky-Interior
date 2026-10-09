"use client";

import React from "react";
import { AdminMedia } from "@/lib/admin/types";

interface MediaTableProps {
  media: AdminMedia[];
  onSelect: (media: AdminMedia) => void;
}

export function MediaTable({ media, onSelect }: MediaTableProps) {
  if (media.length === 0) {
    return (
      <div className="py-16 text-center text-[var(--color-text-muted)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
        No media found matching your criteria.
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[var(--color-surface-muted)] border-b border-[var(--color-border)] text-[var(--color-text-muted)]">
            <tr>
              <th className="px-4 py-3 font-medium w-16">Preview</th>
              <th className="px-4 py-3 font-medium">Filename</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Dimensions</th>
              <th className="px-4 py-3 font-medium">Size</th>
              <th className="px-4 py-3 font-medium">Usage</th>
              <th className="px-4 py-3 font-medium">Folder</th>
              <th className="px-4 py-3 font-medium text-right">Added</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {media.map((asset) => (
              <tr 
                key={asset.id} 
                onClick={() => onSelect(asset)}
                className="hover:bg-[var(--color-paper)] transition-colors cursor-pointer group"
              >
                <td className="px-4 py-3">
                  <div className="w-10 h-10 bg-[var(--color-surface-muted)] rounded overflow-hidden flex items-center justify-center border border-[var(--color-border)] group-hover:border-[var(--color-accent)] transition-colors">
                    {asset.type === "IMAGE" ? (
                      <img 
                        src={asset.url} 
                        alt={asset.altText || asset.filename} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
                          (e.target as HTMLImageElement).className = "w-1/2 h-1/2 object-contain opacity-20";
                        }}
                      />
                    ) : (
                      <span className="text-[8px] text-[var(--color-text-muted)] font-bold">{asset.type.substring(0,3)}</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-[var(--color-ink)] truncate max-w-[200px]" title={asset.filename}>{asset.filename}</div>
                  {asset.status === 'ARCHIVED' && <span className="text-[9px] font-bold uppercase tracking-widest text-red-600">Archived</span>}
                </td>
                <td className="px-4 py-3 text-[var(--color-text-muted)] text-xs font-mono">{asset.type}</td>
                <td className="px-4 py-3 text-[var(--color-text-muted)] text-xs font-mono">{asset.dimensions}</td>
                <td className="px-4 py-3 text-[var(--color-text-muted)] text-xs font-mono">{asset.size}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded ${
                    asset.usage === 'USED' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {asset.usage}
                  </span>
                </td>
                <td className="px-4 py-3 text-[var(--color-text-muted)] text-xs">{asset.folder}</td>
                <td className="px-4 py-3 text-right text-[var(--color-text-muted)] text-xs" suppressHydrationWarning>
                  {asset.createdAt.split('T')[0]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
