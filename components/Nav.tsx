"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { Button } from "./ui/Button";
import { Accordion } from "./ui/Accordion";
import projectsData from "@/content/projects.json";

// Filter to check if link exists
const exists = (href: string) => {
  const existingRoutes = ["/designs", "/rooms", "/styles", "/inspiration", "/work", "/studio", "/process", "/contact", "/estimate", "/consultation"];
  return existingRoutes.includes(href);
};

const IDEAS_LINKS = {
  rooms: [
    { label: "Living Room", href: "/designs?room=Living Room", comingSoon: false },
    { label: "Kitchen", href: "/designs?room=Kitchen", comingSoon: false },
    { label: "Bedroom", href: "/designs?room=Bedroom", comingSoon: false },
    { label: "Master Bedroom", href: "/designs?room=Bedroom", comingSoon: false },
    { label: "Kids Bedroom", href: "/designs?room=Kids Room", comingSoon: false },
    { label: "Study", href: "/designs?room=Home Office", comingSoon: false },
    { label: "Bathroom", href: "/designs?room=Bathroom", comingSoon: false },
    { label: "Wardrobe", href: "/designs?room=Wardrobe", comingSoon: false },
  ],
  styles: [
    { label: "Modern", href: "/designs?style=Modern", comingSoon: false },
    { label: "Minimal", href: "/designs?style=Minimal", comingSoon: false },
    { label: "Contemporary", href: "/designs?style=Contemporary", comingSoon: false },
    { label: "Japandi", href: "/designs?style=Japandi", comingSoon: false },
    { label: "Luxury", href: "/designs?style=Luxury", comingSoon: false },
    { label: "Classic", href: "/designs?style=Modern Classic", comingSoon: false },
    { label: "Industrial", href: "/designs?style=Industrial", comingSoon: false },
  ],
  explore: [
    { label: "All Designs", href: "/designs", comingSoon: false },
    { label: "By Room", href: "/rooms", comingSoon: false },
    { label: "By Style", href: "/styles", comingSoon: false },
    { label: "Inspiration", href: "/inspiration", comingSoon: false },
    { label: "All Projects", href: "/work", comingSoon: false },
  ]
};

const SERVICES_LINKS = {
  core: [
    { label: "Modular Kitchens", href: "/services/modular-kitchens", comingSoon: false },
    { label: "Wardrobes & Storage", href: "/services/wardrobes-storage", comingSoon: false },
    { label: "Full Home Interiors", href: "/services/full-home-interiors", comingSoon: false },
    { label: "Renovation", href: "/services/renovation", comingSoon: false },
    { label: "Commercial & Office Spaces", href: "/services/commercial-office-spaces", comingSoon: false },
  ],
  packages: [
    { label: "1 BHK", href: "/services/packages/1bhk", comingSoon: true },
    { label: "2 BHK", href: "/services/packages/2bhk", comingSoon: true },
    { label: "3 BHK", href: "/services/packages/3bhk", comingSoon: true },
    { label: "Full Home", href: "/services/packages/full-home", comingSoon: true },
  ]
};

const GUIDES_LINKS = {
  planning: [
    { label: "Budget & Cost", href: "/guides/budget-cost", comingSoon: false },
    { label: "Interior Timeline", href: "/guides/timeline", comingSoon: true },
    { label: "How to Plan Interiors", href: "/guides/how-to-plan", comingSoon: true },
    { label: "Design Checklist", href: "/guides/checklist", comingSoon: true },
  ],
  materials: [
    { label: "Laminates", href: "/guides/laminates", comingSoon: false },
    { label: "Acrylic", href: "/guides/materials/acrylic", comingSoon: true },
    { label: "Veneer", href: "/guides/materials/veneer", comingSoon: true },
    { label: "Wood", href: "/guides/materials/wood", comingSoon: true },
    { label: "Hardware", href: "/guides/materials/hardware", comingSoon: true },
    { label: "Lighting", href: "/guides/materials/lighting", comingSoon: true },
    { label: "Colours", href: "/guides/materials/colours", comingSoon: true },
  ],
  rooms: [
    { label: "Kitchen Guide", href: "/guides/kitchen", comingSoon: false },
    { label: "Bedroom Guide", href: "/guides/bedroom", comingSoon: true },
    { label: "Living Room Guide", href: "/guides/living-room", comingSoon: true },
    { label: "Wardrobe Guide", href: "/guides/wardrobe", comingSoon: true },
  ]
};

const STUDIO_LINKS = [
  { label: "About", href: "/studio", comingSoon: false },
  { label: "Process", href: "/process", comingSoon: false },
  { label: "Contact", href: "/contact", comingSoon: false },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const trapRef = useFocusTrap(menuOpen);
  
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const featuredProject = projectsData[0] || projectsData.find((p) => p.featured); // Safely get first project

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll for mobile menu
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Handle escape key to close menus and outside clicks
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMegaMenu(null);
        setMenuOpen(false);
        // Return focus if possible
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMegaMenu(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navTransition: any = shouldReduceMotion ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] };

  // Helper to determine active state
  const isActive = (paths: string[]) => paths.some(p => pathname?.startsWith(p));
  
  const renderNavLink = (link: any, onClickAction: () => void, className: string) => {
    // Strip out 'block' from className if we are switching to flex
    const baseClassName = className.replace(/\bblock\b/, "");
    
    if (link.comingSoon) {
      return (
        <span className={`${baseClassName} opacity-50 cursor-not-allowed flex items-center justify-between`} title="Coming Soon" aria-disabled="true">
          {link.label}
          <span className="text-[9px] uppercase tracking-widest bg-[var(--color-surface-muted)] text-[var(--color-text-muted)] px-1.5 py-0.5 rounded">Soon</span>
        </span>
      );
    }
    return (
      <Link href={link.href} onClick={onClickAction} className={`${baseClassName} group flex items-center justify-between overflow-hidden`}>
        <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">{link.label}</span>
        <span className="opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0 text-[var(--color-accent)] font-serif text-sm">→</span>
      </Link>
    );
  };

  const mobileAccordionItems = [
    {
      id: "ideas",
      title: "Ideas",
      content: (
        <div className="flex flex-col gap-6 pt-4">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-3 block">By Room</span>
            <div className="flex flex-col gap-3">
              {IDEAS_LINKS.rooms.map(link => (
                <div key={link.href}>{renderNavLink(link, () => setMenuOpen(false), "block text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors py-1")}</div>
              ))}
            </div>
          </div>
          <div>
            <span className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-3 block">By Style</span>
            <div className="flex flex-col gap-3">
              {IDEAS_LINKS.styles.map(link => (
                <div key={link.href}>{renderNavLink(link, () => setMenuOpen(false), "block text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors py-1")}</div>
              ))}
            </div>
          </div>
          <div>
            <span className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-3 block">Explore</span>
            <div className="flex flex-col gap-3">
              {IDEAS_LINKS.explore.map(link => (
                <div key={link.href}>{renderNavLink(link, () => setMenuOpen(false), "block text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors py-1")}</div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: "services",
      title: "Services",
      content: (
        <div className="flex flex-col gap-6 pt-4">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-3 block">Core Services</span>
            <div className="flex flex-col gap-3">
              {SERVICES_LINKS.core.map(link => (
                <div key={link.href}>{renderNavLink(link, () => setMenuOpen(false), "block text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors py-1")}</div>
              ))}
            </div>
          </div>
          <div>
            <span className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-3 block">By Home</span>
            <div className="flex flex-col gap-3">
              {SERVICES_LINKS.packages.map(link => (
                <div key={link.href}>{renderNavLink(link, () => setMenuOpen(false), "block text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors py-1")}</div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: "guides",
      title: "Guides",
      content: (
        <div className="flex flex-col gap-6 pt-4">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-3 block">Planning</span>
            <div className="flex flex-col gap-3">
              {GUIDES_LINKS.planning.map(link => (
                <div key={link.href}>{renderNavLink(link, () => setMenuOpen(false), "block text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors py-1")}</div>
              ))}
            </div>
          </div>
          <div>
            <span className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-3 block">Materials</span>
            <div className="flex flex-col gap-3">
              {GUIDES_LINKS.materials.map(link => (
                <div key={link.href}>{renderNavLink(link, () => setMenuOpen(false), "block text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors py-1")}</div>
              ))}
            </div>
          </div>
          <div>
            <span className="font-sans text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-3 block">Room Guides</span>
            <div className="flex flex-col gap-3">
              {GUIDES_LINKS.rooms.map(link => (
                <div key={link.href}>{renderNavLink(link, () => setMenuOpen(false), "block text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors py-1")}</div>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ];

  const toggleMegaMenu = (menuId: string) => {
    setActiveMegaMenu(prev => prev === menuId ? null : menuId);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-out border-b bg-[var(--color-surface)]/95 backdrop-blur-md ${scrolled || activeMegaMenu ? 'border-[var(--color-border)] py-4 shadow-sm' : 'border-transparent py-6'}`}
        role="navigation"
        aria-label="Main navigation"
        onMouseLeave={() => setActiveMegaMenu(null)}
      >
        <div className="mx-auto max-w-[var(--container-wide)] px-[var(--gutter-mobile)] lg:px-[var(--gutter-desktop)] flex items-center justify-between relative z-[110]">
          
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-4 group focus-visible:outline-[var(--color-accent)]"
            onClick={() => { setMenuOpen(false); setActiveMegaMenu(null); }}
          >
            <div className="relative w-8 h-8 md:w-10 md:h-10 flex-shrink-0 transition-transform duration-700 ease-out group-hover:scale-105">
              <img src="/logo.png" alt="Sky Interior Logo" className="w-full h-full object-contain mix-blend-difference" />
            </div>
            <span className={`font-serif text-[length:var(--text-heading-s)] tracking-tight transition-colors text-[var(--color-text)]`}>
              Sky Interior
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            
            {/* IDEAS */}
            <div className="h-full py-2" onMouseEnter={() => setActiveMegaMenu("ideas")}>
              <button 
                onClick={() => toggleMegaMenu("ideas")}
                className={`font-sans text-[10px] tracking-widest uppercase flex items-center gap-2 transition-colors ${isActive(["/designs", "/rooms", "/styles", "/work", "/inspiration"]) ? 'text-[var(--color-accent)]' : 'text-[var(--color-text)] hover:text-[var(--color-accent)]'}`}
                aria-expanded={activeMegaMenu === "ideas"}
                aria-controls="ideas-menu"
              >
                Ideas
              </button>
            </div>

            {/* SERVICES */}
            <div className="h-full py-2" onMouseEnter={() => setActiveMegaMenu("services")}>
              <button 
                onClick={() => toggleMegaMenu("services")}
                className={`font-sans text-[10px] tracking-widest uppercase flex items-center gap-2 transition-colors ${isActive(["/services"]) ? 'text-[var(--color-accent)]' : 'text-[var(--color-text)] hover:text-[var(--color-accent)]'}`}
                aria-expanded={activeMegaMenu === "services"}
                aria-controls="services-menu"
              >
                Services
              </button>
            </div>

            {/* GUIDES */}
            <div className="h-full py-2" onMouseEnter={() => setActiveMegaMenu("guides")}>
              <button 
                onClick={() => toggleMegaMenu("guides")}
                className={`font-sans text-[10px] tracking-widest uppercase flex items-center gap-2 transition-colors ${isActive(["/guides"]) ? 'text-[var(--color-accent)]' : 'text-[var(--color-text)] hover:text-[var(--color-accent)]'}`}
                aria-expanded={activeMegaMenu === "guides"}
                aria-controls="guides-menu"
              >
                Guides
              </button>
            </div>

            {/* STUDIO Dropdown */}
            <div className="relative py-2" onMouseEnter={() => setActiveMegaMenu("studio")}>
              <button 
                onClick={() => toggleMegaMenu("studio")}
                className={`font-sans text-[10px] tracking-widest uppercase flex items-center gap-2 transition-colors ${isActive(["/studio", "/process", "/contact"]) ? 'text-[var(--color-accent)]' : 'text-[var(--color-text)] hover:text-[var(--color-accent)]'}`}
                aria-expanded={activeMegaMenu === "studio"}
                aria-controls="studio-menu"
              >
                Studio
              </button>
              
              <AnimatePresence>
                {activeMegaMenu === "studio" && (
                  <motion.div 
                    id="studio-menu"
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                    animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                    transition={navTransition}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg p-2 rounded-[var(--radius-md)]"
                  >
                    {STUDIO_LINKS.map(link => (
                      <div key={link.href}>
                        {renderNavLink(link, () => setActiveMegaMenu(null), "block font-sans text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-muted)] px-4 py-3 transition-colors tracking-widest uppercase rounded-[var(--radius-sm)] focus-visible:outline-[var(--color-accent)]")}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className={`w-px h-4 bg-[var(--color-border)]`} aria-hidden="true" />
            
            {/* UTILITIES */}
            <Link 
              href="/estimate" 
              className={`font-sans text-[10px] tracking-widest uppercase transition-colors focus-visible:outline-[var(--color-accent)] ${isActive(["/estimate"]) ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`}
            >
              Cost Calculator
            </Link>
            
            <Button href="/consultation" variant="primary" size="sm">
              Book Consultation
            </Button>
          </div>

          <button
            className={`lg:hidden p-2 -mr-2 z-[110] relative focus-visible:outline-[var(--color-accent)] transition-colors text-[var(--color-text)]`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-6 h-5 flex flex-col justify-between" aria-hidden="true">
              <span className={`block h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 w-full bg-current transition duration-300 ease-in-out ${menuOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`block h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
            </div>
          </button>
        </div>

        {/* ========================================================
            DESKTOP MEGA MENUS
            ======================================================== */}
        <div className="hidden lg:block absolute top-full left-0 right-0 z-[105]">
          <AnimatePresence mode="wait">
            {activeMegaMenu === "ideas" && (
              <motion.div
                id="ideas-menu"
                key="ideas-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={navTransition}
                className="w-full bg-[var(--color-surface)] shadow-lg overflow-hidden border-b border-t border-[var(--color-border)]"
              >
                <div className="mx-auto max-w-[var(--container-wide)] px-[var(--gutter-desktop)] py-12">
                  <div className="grid grid-cols-4 gap-12">
                    <div>
                      <h4 className="font-sans text-[10px] tracking-widest uppercase text-[var(--color-text-muted)] mb-6">By Room</h4>
                      <ul className="space-y-4">
                        {IDEAS_LINKS.rooms.map(link => (
                          <li key={link.href}>{renderNavLink(link, () => setActiveMegaMenu(null), "font-sans text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors focus-visible:outline-[var(--color-accent)]")}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-sans text-[10px] tracking-widest uppercase text-[var(--color-text-muted)] mb-6">By Style</h4>
                      <ul className="space-y-4">
                        {IDEAS_LINKS.styles.map(link => (
                          <li key={link.href}>{renderNavLink(link, () => setActiveMegaMenu(null), "font-sans text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors focus-visible:outline-[var(--color-accent)]")}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-sans text-[10px] tracking-widest uppercase text-[var(--color-text-muted)] mb-6">Explore</h4>
                      <ul className="space-y-4">
                        {IDEAS_LINKS.explore.map(link => (
                          <li key={link.href}>{renderNavLink(link, () => setActiveMegaMenu(null), "font-sans text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors focus-visible:outline-[var(--color-accent)]")}</li>
                        ))}
                      </ul>
                    </div>
                    {featuredProject && (
                      <div className="bg-[var(--color-paper)] p-6 border border-[var(--color-border)] flex flex-col justify-between">
                        <div>
                          <h4 className="font-sans text-[10px] tracking-widest uppercase text-[var(--color-accent)] mb-4">Featured Project</h4>
                          <div className="relative aspect-[4/3] w-full mb-4 overflow-hidden">
                            <Image src={featuredProject.heroImage} alt={featuredProject.name} fill className="object-cover" />
                          </div>
                          <h5 className="font-serif text-[length:var(--text-heading-s)] text-[var(--color-text)] mb-2">{featuredProject.name}</h5>
                          <p className="font-sans text-xs text-[var(--color-text-muted)] line-clamp-2">{featuredProject.brief}</p>
                        </div>
                        <Button href={`/work/${featuredProject.slug}`} variant="ghost" className="mt-4 self-start px-0" onClick={() => setActiveMegaMenu(null)}>View Project →</Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeMegaMenu === "services" && (
              <motion.div
                id="services-menu"
                key="services-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={navTransition}
                className="w-full bg-[var(--color-surface)] shadow-lg overflow-hidden border-b border-t border-[var(--color-border)]"
              >
                <div className="mx-auto max-w-[var(--container-wide)] px-[var(--gutter-desktop)] py-12">
                  <div className="grid grid-cols-3 gap-12">
                    <div>
                      <h4 className="font-sans text-[10px] tracking-widest uppercase text-[var(--color-text-muted)] mb-6">Core Services</h4>
                      <ul className="space-y-4">
                        {SERVICES_LINKS.core.map(link => (
                          <li key={link.href}>{renderNavLink(link, () => setActiveMegaMenu(null), "font-sans text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors focus-visible:outline-[var(--color-accent)]")}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-sans text-[10px] tracking-widest uppercase text-[var(--color-text-muted)] mb-6">By Home Package</h4>
                      <ul className="space-y-4">
                        {SERVICES_LINKS.packages.map(link => (
                          <li key={link.href}>{renderNavLink(link, () => setActiveMegaMenu(null), "font-sans text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors focus-visible:outline-[var(--color-accent)]")}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-[var(--color-ink)] text-[var(--color-surface)] p-6 flex flex-col justify-between">
                      <div>
                        <h4 className="font-sans text-[10px] tracking-widest uppercase text-[var(--color-accent)] mb-4">Premium Full Home</h4>
                        <h5 className="font-serif text-[length:var(--text-heading-s)] mb-2">Transform Your Entire Space</h5>
                        <p className="font-sans text-xs text-[var(--color-surface-muted)]">From conceptual design to final execution, experience our end-to-end luxury interior service.</p>
                      </div>
                      <Button href="/services/full-home-interiors" variant="light" className="mt-6 self-start">Explore Service</Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeMegaMenu === "guides" && (
              <motion.div
                id="guides-menu"
                key="guides-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={navTransition}
                className="w-full bg-[var(--color-surface)] shadow-lg overflow-hidden border-b border-t border-[var(--color-border)]"
              >
                <div className="mx-auto max-w-[var(--container-wide)] px-[var(--gutter-desktop)] py-12">
                  <div className="grid grid-cols-4 gap-12">
                    <div>
                      <h4 className="font-sans text-[10px] tracking-widest uppercase text-[var(--color-text-muted)] mb-6">Planning</h4>
                      <ul className="space-y-4">
                        {GUIDES_LINKS.planning.map(link => (
                          <li key={link.href}>{renderNavLink(link, () => setActiveMegaMenu(null), "font-sans text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors focus-visible:outline-[var(--color-accent)]")}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-sans text-[10px] tracking-widest uppercase text-[var(--color-text-muted)] mb-6">Materials</h4>
                      <ul className="space-y-4">
                        {GUIDES_LINKS.materials.map(link => (
                          <li key={link.href}>{renderNavLink(link, () => setActiveMegaMenu(null), "font-sans text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors focus-visible:outline-[var(--color-accent)]")}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-sans text-[10px] tracking-widest uppercase text-[var(--color-text-muted)] mb-6">Room Guides</h4>
                      <ul className="space-y-4">
                        {GUIDES_LINKS.rooms.map(link => (
                          <li key={link.href}>{renderNavLink(link, () => setActiveMegaMenu(null), "font-sans text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors focus-visible:outline-[var(--color-accent)]")}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-[var(--color-paper)] p-6 border border-[var(--color-border)] flex flex-col justify-between">
                      <div>
                        <h4 className="font-sans text-[10px] tracking-widest uppercase text-[var(--color-accent)] mb-4">Featured Guide</h4>
                        <div className="relative aspect-[4/3] w-full mb-4 overflow-hidden bg-[var(--color-surface-muted)]" />
                        <h5 className="font-serif text-[length:var(--text-heading-s)] text-[var(--color-text)] mb-2 opacity-50">The Ultimate Budget Guide</h5>
                        <p className="font-sans text-xs text-[var(--color-text-muted)]">Understand interior costs and where to invest for maximum impact.</p>
                      </div>
                      <Button href="/guides/budget-cost" variant="ghost" className="mt-4 self-start px-0" onClick={() => setActiveMegaMenu(null)}>Read Guide →</Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* ========================================================
          MOBILE DRAWER
          ======================================================== */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={trapRef as React.RefObject<HTMLDivElement>}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: "100%" }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: "100%" }}
            transition={navTransition}
            id="mobile-menu"
            className="lg:hidden fixed inset-0 bg-[var(--color-surface)] z-[105] flex flex-col pt-24 pb-32 px-[var(--gutter-mobile)] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Drawer"
          >
            <div className="flex-1 w-full max-w-md mx-auto">
              
              <Accordion items={mobileAccordionItems} />

              <div className="flex flex-col gap-6 mt-8 pt-8 border-t border-[var(--color-border)]">
                {STUDIO_LINKS.map(link => (
                  <div key={link.href}>
                    {renderNavLink(link, () => setMenuOpen(false), "font-serif text-[length:var(--text-heading-s)] text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors")}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-6 mt-8 pt-8 border-t border-[var(--color-border)] pb-8">
                <Link href="/estimate" onClick={() => setMenuOpen(false)} className="font-sans text-sm tracking-widest uppercase text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors font-medium">
                  Cost Calculator
                </Link>
                {/* Note: StickyCTA handles the primary conversion button at the bottom of the viewport, so we don't strictly need a massive primary button here, but we include it for structural flow if StickyCTA hides. */}
                <Button href="/consultation" size="lg" fullWidth onClick={() => setMenuOpen(false)}>
                  Book Consultation
                </Button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
