"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { Magnetic } from "@/components/Magnetic";

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Studio", href: "/studio" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] bg-black/90 backdrop-blur-sm border-b border-border-light"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-[1440px] px-[var(--gutter-mobile)] lg:px-[var(--gutter-desktop)] flex items-center justify-between h-16 lg:h-20">
          {/* Brand Lockup: Emblem + Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <div className="relative w-8 h-8 md:w-10 md:h-10 mr-3 flex-shrink-0">
              <img 
                src="/logo.png" 
                alt="Sky Interior Emblem" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-serif text-[length:var(--text-lg)] lg:text-[length:var(--text-h3)] tracking-tight" style={{ color: '#DAA464' }}>
              Sky Interior
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Magnetic key={link.href}>
                <Link
                  href={link.href}
                  className="font-sans text-sm text-ink-muted hover:text-ink transition-colors tracking-wide uppercase px-2 py-1"
                >
                  {link.label}
                </Link>
              </Magnetic>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-ink"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              {menuOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          id="mobile-menu"
          className="md:hidden fixed inset-0 top-16 bg-black/95 backdrop-blur-xl z-[90] flex flex-col items-start justify-center px-[var(--gutter-mobile)] gap-8 overflow-y-auto pb-16"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-serif text-[length:var(--text-h1)] text-ink hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      )}
    </>
  );
}
