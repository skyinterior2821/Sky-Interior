"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="w-full border-y border-[var(--color-border)] divide-y divide-[var(--color-border)]">
      {items.map((item) => {
        const isOpen = openIds.has(item.id);

        return (
          <div key={item.id} className="w-full">
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between py-8 text-left focus-visible:outline-[var(--color-accent)] group"
              aria-expanded={isOpen}
              aria-controls={`content-${item.id}`}
              id={`trigger-${item.id}`}
            >
              <span className={`font-sans text-lg md:text-xl transition-colors ${isOpen ? 'text-[var(--color-ink)] font-medium' : 'text-[var(--color-ink)] group-hover:text-[var(--color-accent)]'}`}>
                {item.title}
              </span>
              <span className={`ml-6 flex-shrink-0 flex items-center justify-center w-8 h-8 text-2xl font-light transition-colors ${isOpen ? 'text-[var(--color-accent)]' : 'text-[var(--color-ink)]'}`}>
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`content-${item.id}`}
                  role="region"
                  aria-labelledby={`trigger-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 text-[var(--color-ink-muted)] font-sans font-light text-lg leading-relaxed max-w-3xl">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
