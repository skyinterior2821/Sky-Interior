"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { siteConfig } from "@/lib/site";

const NAV_ITEMS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Studio", href: "/studio" },
  { label: "Contact", href: "/contact" },
];

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const trapRef = useFocusTrap(mobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-colors duration-200 ${
          isScrolled
            ? "bg-[#F5F2EC]/95 backdrop-blur-sm border-b border-[#E5DFD5]"
            : "bg-[#F5F2EC] border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-[#9C5B3F]"
            aria-label="Sky Interior - Home"
          >
            <div className="relative w-8 h-8 shrink-0">
              <Image
                src="/logo.png"
                alt="Sky Interior logo"
                width={32}
                height={32}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-tight text-[#1C1B19] leading-none">
                Sky Interior
              </span>
              <span className="font-sans text-[10px] tracking-wider uppercase text-[#736F69] mt-0.5">
                Ahmedabad · Banswara
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-sans tracking-wide transition-colors min-h-[44px] inline-flex items-center ${
                    isActive
                      ? "text-[#1C1B19] font-medium border-b border-[#1C1B19]"
                      : "text-[#736F69] hover:text-[#1C1B19]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Small WhatsApp Action */}
            <a
              href={siteConfig.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-sans tracking-wider uppercase px-4 py-2 min-h-[44px] inline-flex items-center border border-[#1C1B19] text-[#1C1B19] hover:bg-[#1C1B19] hover:text-[#F5F2EC] transition-colors rounded-sm"
            >
              WhatsApp
            </a>
          </nav>

          {/* Mobile Menu Button (44x44px tap target) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center text-[#1C1B19] focus-visible:outline-2 focus-visible:outline-[#9C5B3F]"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6h16.5" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Menu */}
      {mobileMenuOpen && (
        <div
          ref={trapRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 top-20 z-40 bg-[#F5F2EC] md:hidden flex flex-col justify-between p-8 overflow-y-auto"
        >
          <nav className="flex flex-col gap-6 pt-6" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-serif text-3xl tracking-tight transition-colors py-2 min-h-[44px] flex items-center ${
                    isActive ? "text-[#9C5B3F]" : "text-[#1C1B19]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-8 border-t border-[#E5DFD5] space-y-4">
            <p className="font-sans text-xs tracking-wider uppercase text-[#736F69]">
              Ahmedabad & Banswara
            </p>
            <div className="flex flex-col gap-2 font-sans text-sm text-[#1C1B19]">
              <a href={`tel:${siteConfig.contact.phoneTel}`} className="hover:text-[#9C5B3F]">
                {siteConfig.contact.phoneDisplay}
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#9C5B3F]">
                {siteConfig.contact.email}
              </a>
            </div>
            <a
              href={siteConfig.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full py-3 bg-[#1C1B19] text-[#F5F2EC] text-xs font-sans tracking-wider uppercase rounded-sm mt-4"
            >
              Message on WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}
