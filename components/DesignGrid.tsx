"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { DesignIdea, ROOM_CATEGORIES, STYLE_CATEGORIES } from "@/lib/designs";
import { FadeIn, BottomSheet } from "@/components/ui";
import { DesignQuickView } from "./DesignQuickView";

interface DesignGridProps {
  initialDesigns: DesignIdea[];
  showFilters?: boolean;
  filterMode?: "all" | "rooms" | "styles";
}

export function DesignGrid({ initialDesigns, showFilters = true, filterMode = "all" }: DesignGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL state
  const activeRoom = searchParams.get("room") || "All";
  const activeStyle = searchParams.get("style") || "All";
  const searchQuery = searchParams.get("search") || "";

  // Local state
  const [selectedDesign, setSelectedDesign] = useState<DesignIdea | null>(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  const updateUrlParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "All" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  
  const shouldReduceMotion = useReducedMotion();

  const filteredDesigns = useMemo(() => {
    return initialDesigns.filter((d) => {
      const matchRoom = filterMode === "styles" || activeRoom === "All" || d.room === activeRoom;
      const matchStyle = filterMode === "rooms" || activeStyle === "All" || d.style === activeStyle;
      const matchSearch = searchQuery === "" || 
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        d.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchRoom && matchStyle && matchSearch;
    });
  }, [initialDesigns, activeRoom, activeStyle, searchQuery, filterMode]);

  const clearFilters = () => {
    router.push(pathname, { scroll: false });
    setIsMobileFiltersOpen(false);
  };

  return (
    <div className="w-full">
      {showFilters && (
        <FadeIn delay={0.2} className="mb-12 lg:mb-16 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            {/* Search (Desktop) */}
            <div className="relative w-full md:w-72 hidden md:block">
              <input 
                type="text" 
                placeholder="Search designs..." 
                value={searchQuery}
                onChange={(e) => updateUrlParams("search", e.target.value)}
                className="w-full bg-transparent border-b border-border py-2 pl-8 text-sm text-ink focus:outline-none focus:border-accent-deep transition-colors"
                aria-label="Search designs"
              />
              <svg className="absolute left-0 top-2.5 w-4 h-4 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* Mobile Filter Toggle */}
            <button 
              className="md:hidden w-full flex items-center justify-between border border-border bg-surface px-4 py-3 text-xs tracking-widest uppercase font-sans focus-visible:outline-accent-deep"
              onClick={() => setIsMobileFiltersOpen(true)}
            >
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters & Search
              </div>
              {(activeRoom !== "All" || activeStyle !== "All" || searchQuery !== "") && (
                <span className="bg-accent-deep text-surface w-5 h-5 flex items-center justify-center rounded-full text-[10px]">
                  {Number(activeRoom !== "All") + Number(activeStyle !== "All") + Number(searchQuery !== "")}
                </span>
              )}
            </button>

            {/* Results Count */}
            <div className="text-xs font-sans tracking-widest text-ink-muted uppercase hidden md:block">
              Showing {filteredDesigns.length} design{filteredDesigns.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Desktop Filter Chips */}
          <div className="hidden md:flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[var(--color-border)] pb-6">
            <div className="flex gap-12">
              {(filterMode === "all" || filterMode === "rooms") && (
                <div className="flex items-center gap-6 flex-wrap">
                  <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">Room:</span>
                  <div className="flex flex-wrap gap-4">
                    {ROOM_CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => updateUrlParams("room", cat)}
                        className={`text-[10px] font-sans uppercase tracking-widest pb-1 border-b transition-colors focus-visible:outline-[var(--color-accent-deep)] ${
                          activeRoom === cat 
                            ? "border-[var(--color-ink)] text-[var(--color-ink)]" 
                            : "border-transparent text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {(filterMode === "all" || filterMode === "styles") && (
                <div className="flex items-center gap-6 flex-wrap">
                  <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">Style:</span>
                  <div className="flex flex-wrap gap-4">
                    {STYLE_CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => updateUrlParams("style", cat)}
                        className={`text-[10px] font-sans uppercase tracking-widest pb-1 border-b transition-colors focus-visible:outline-[var(--color-accent-deep)] ${
                          activeStyle === cat 
                            ? "border-[var(--color-ink)] text-[var(--color-ink)]" 
                            : "border-transparent text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {(activeRoom !== "All" || activeStyle !== "All" || searchQuery !== "") && (
              <button 
                onClick={clearFilters}
                className="text-[10px] font-sans uppercase tracking-[0.2em] text-[var(--color-ink)] hover:text-[var(--color-accent-deep)] transition-colors border border-[var(--color-border)] px-4 py-2"
              >
                Clear All
              </button>
            )}
          </div>
        </FadeIn>
      )}

      <motion.div layout={!shouldReduceMotion} className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-start" role="region" aria-live="polite">
        <AnimatePresence mode="popLayout">
          {filteredDesigns.map((design, i) => {
            let colSpan = "md:col-span-4";
            let aspect = "aspect-[4/5]";
            const patternIndex = i % 6;
            
            if (patternIndex === 0) { colSpan = "md:col-span-8"; aspect = "aspect-[4/3] lg:aspect-[16/9]"; }
            else if (patternIndex === 1) { colSpan = "md:col-span-4 md:mt-24"; }
            else if (patternIndex === 2) { colSpan = "md:col-span-5"; aspect = "aspect-square"; }
            else if (patternIndex === 3) { colSpan = "md:col-span-7 md:mt-16"; aspect = "aspect-[4/3]"; }
            else if (patternIndex === 4) { colSpan = "md:col-span-6"; }
            else if (patternIndex === 5) { colSpan = "md:col-span-6"; }

            return (
              <motion.div
                layout={!shouldReduceMotion}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                key={design.id}
                className={`group cursor-pointer block focus-visible:outline-[var(--color-accent-deep)] ${colSpan}`}
                tabIndex={0}
                role="button"
                onClick={() => setSelectedDesign(design)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedDesign(design);
                  }
                }}
              >
                <div className={`relative overflow-hidden bg-[var(--color-border)] mb-6 ${aspect}`}>
                  <Image
                    src={design.image}
                    alt={`Interior design of a ${design.style} ${design.room}: ${design.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transform group-hover:scale-105 transition-all duration-[2s] ease-out opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" aria-hidden="true" />
                  
                  {/* View Details Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="bg-[var(--color-surface)]/90 backdrop-blur-md text-[var(--color-ink)] font-sans text-[10px] tracking-widest uppercase px-6 py-3 border border-[var(--color-border)] translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      Quick View
                    </span>
                  </div>

                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="font-sans text-[10px] tracking-widest uppercase bg-[var(--color-surface)]/90 backdrop-blur-md text-[var(--color-ink)] px-3 py-1.5 shadow-sm" aria-label={`Room: ${design.room}`}>
                      {design.room}
                    </span>
                    <span className="font-sans text-[10px] tracking-widest uppercase bg-[var(--color-surface)]/90 backdrop-blur-md text-[var(--color-accent-deep)] px-3 py-1.5 shadow-sm" aria-label={`Style: ${design.style}`}>
                      {design.style}
                    </span>
                  </div>
                </div>
                <h3 className="font-serif text-[length:var(--text-h3)] text-[var(--color-ink)] group-hover:text-[var(--color-accent-deep)] transition-colors duration-300">
                  {design.title}
                </h3>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
      
      {filteredDesigns.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="py-32 text-center flex flex-col items-center justify-center border border-dashed border-border/50 bg-surface mt-8"
        >
          <span className="text-4xl mb-4" aria-hidden="true">🔍</span>
          <h3 className="font-serif text-[length:var(--text-h3)] text-ink mb-2">No designs found</h3>
          <p className="font-sans text-ink-muted max-w-md mx-auto text-sm font-light">
            We couldn't find any designs matching your criteria. Try expanding your search or clearing the filters.
          </p>
          <button 
            onClick={clearFilters}
            className="mt-8 px-6 py-3 font-sans text-xs tracking-widest uppercase bg-accent-deep text-surface hover:text-ink transition-colors focus-visible:outline-accent-deep"
          >
            Clear Filters
          </button>
        </motion.div>
      )}

      {/* Quick View Modal */}
      <DesignQuickView 
        design={selectedDesign} 
        isOpen={!!selectedDesign} 
        onClose={() => setSelectedDesign(null)} 
      />

      {/* Mobile Filter Bottom Sheet */}
      <BottomSheet 
        isOpen={isMobileFiltersOpen} 
        onClose={() => setIsMobileFiltersOpen(false)}
        title="Filters"
      >
        <div className="space-y-8">
          <div>
            <label className="text-[10px] font-sans uppercase tracking-widest text-ink-muted mb-4 block">Search</label>
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search designs..." 
                value={searchQuery}
                onChange={(e) => updateUrlParams("search", e.target.value)}
                className="w-full bg-transparent border-b border-border py-2 pl-8 text-sm text-ink focus:outline-none focus:border-accent-deep transition-colors"
              />
              <svg className="absolute left-0 top-2.5 w-4 h-4 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {(filterMode === "all" || filterMode === "rooms") && (
            <div>
              <label className="text-[10px] font-sans uppercase tracking-widest text-[var(--color-ink-muted)] mb-4 block">Room</label>
              <div className="flex flex-wrap gap-2">
                {ROOM_CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      updateUrlParams("room", cat);
                    }}
                    className={`text-[10px] font-sans uppercase tracking-widest px-4 py-2 transition-colors border ${
                      activeRoom === cat 
                        ? "bg-[var(--color-ink)] text-[var(--color-surface)] border-[var(--color-ink)]" 
                        : "bg-transparent text-[var(--color-ink-muted)] border-[var(--color-border)] hover:text-[var(--color-ink)] hover:border-[var(--color-ink)]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {(filterMode === "all" || filterMode === "styles") && (
            <div>
              <label className="text-[10px] font-sans uppercase tracking-widest text-[var(--color-ink-muted)] mb-4 block">Style</label>
              <div className="flex flex-wrap gap-2">
                {STYLE_CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      updateUrlParams("style", cat);
                    }}
                    className={`text-[10px] font-sans uppercase tracking-widest px-4 py-2 transition-colors border ${
                      activeStyle === cat 
                        ? "bg-[var(--color-ink)] text-[var(--color-surface)] border-[var(--color-ink)]" 
                        : "bg-transparent text-[var(--color-ink-muted)] border-[var(--color-border)] hover:text-[var(--color-ink)] hover:border-[var(--color-ink)]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pt-8 border-t border-border flex gap-4">
            <button 
              onClick={clearFilters}
              className="flex-1 py-4 text-xs font-sans uppercase tracking-widest text-ink border border-border hover:bg-bg transition-colors"
            >
              Clear
            </button>
            <button 
              onClick={() => setIsMobileFiltersOpen(false)}
              className="flex-1 py-4 text-xs font-sans uppercase tracking-widest text-surface bg-ink hover:bg-accent-deep transition-colors"
            >
              Apply ({filteredDesigns.length})
            </button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}
