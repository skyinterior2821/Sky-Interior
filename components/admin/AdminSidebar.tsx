"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NAV_GROUPS = [
  {
    title: "OVERVIEW",
    items: [{ label: "Dashboard", href: "/admin", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }],
  },
  {
    title: "CONTENT",
    items: [
      { label: "Projects", href: "/admin/projects", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
      { label: "Designs", href: "/admin/designs", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
      { label: "Services", href: "/admin/services", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
      { label: "Guides", href: "/admin/guides", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
    ],
  },
  {
    title: "OPERATIONS",
    items: [
      { label: "Leads", href: "/admin/leads", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
      { label: "Consultations", href: "/admin/consultations", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
      { label: "Estimates", href: "/admin/estimates", icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" },
      { label: "Messages", href: "/admin/messages", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    ],
  },
  {
    title: "ASSETS",
    items: [{ label: "Media", href: "/admin/media", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" }],
  },
  {
    title: "ADMINISTRATION",
    items: [
      { label: "Users", href: "/admin/users", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
      { label: "Settings", href: "/admin/settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Close sidebar on route change for mobile
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        className="md:hidden fixed bottom-4 right-4 z-[200] bg-[var(--color-ink)] text-[var(--color-surface)] p-4 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Admin Menu"
        aria-expanded={isOpen}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Sidebar Overlay (Mobile) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-[var(--color-ink)]/50 backdrop-blur-sm z-[140] md:hidden transition-opacity" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      <aside className={`fixed md:static inset-y-0 left-0 z-[150] w-64 bg-[var(--color-surface-elevated)] border-r border-[var(--color-border)] flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="p-6 border-b border-[var(--color-border)]">
          <Link href="/admin" className="font-serif text-xl tracking-tight text-[var(--color-ink)] block">
            Sky Interior <span className="text-[var(--color-accent)] font-sans text-xs tracking-widest uppercase ml-1 align-top">OS</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-8">
          {NAV_GROUPS.map((group, idx) => (
            <div key={idx}>
              <h3 className="text-[10px] font-semibold tracking-widest text-[var(--color-text-subtle)] uppercase mb-3 px-2">
                {group.title}
              </h3>
              <ul className="space-y-1">
                {group.items.map((item, i) => {
                  const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
                  return (
                    <li key={i}>
                      <Link 
                        href={item.href}
                        className={`flex items-center gap-3 px-2 py-2 rounded-[var(--radius-md)] text-sm transition-colors duration-150 ${
                          isActive 
                            ? "bg-[var(--color-surface-muted)] text-[var(--color-accent)] font-medium" 
                            : "text-[var(--color-text-muted)] hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)]"
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 opacity-80">
                          <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                        </svg>
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-[var(--color-border)] text-xs text-[var(--color-text-subtle)] flex justify-between items-center bg-[var(--color-surface)]">
          <span>Sky OS v1.0</span>
          <span className="w-2 h-2 rounded-full bg-[var(--color-success)]"></span>
        </div>
      </aside>
    </>
  );
}
