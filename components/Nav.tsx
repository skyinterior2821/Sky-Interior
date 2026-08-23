"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui";

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Studio", href: "/studio" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/contact" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur-sm border-b border-border-light"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-[1440px] px-[var(--gutter-mobile)] lg:px-[var(--gutter-desktop)] flex items-center justify-between h-16 lg:h-20">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-serif text-[length:var(--text-lg)] lg:text-[length:var(--text-h3)] text-ink tracking-tight"
        >
          Sky Interiors
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-sm text-ink-muted hover:text-ink transition-colors tracking-wide uppercase"
            >
              {link.label}
            </Link>
          ))}
          <Button href="/contact" className="ml-4">
            Book a Consultation
          </Button>
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

      {/* Mobile full-screen overlay menu — editorial tone, large type per design.md §9 */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden fixed inset-0 top-16 bg-bg z-40 flex flex-col items-start justify-center px-[var(--gutter-mobile)] gap-8"
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
          <Button
            href="/contact"
            className="mt-8"
            onClick={() => setMenuOpen(false)}
          >
            Book a Consultation
          </Button>
        </div>
      )}
    </nav>
  );
}
