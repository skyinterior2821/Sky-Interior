"use client";

import React from "react";

export function AdminHeader() {
  return (
    <header className="h-16 bg-[var(--color-surface-elevated)] border-b border-[var(--color-border)] flex items-center justify-between px-4 md:px-8 shrink-0">
      <div className="flex-1 flex items-center">
        {/* Mock Search */}
        <div className="relative w-full max-w-md hidden sm:block">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-subtle)]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search projects, leads, or content..." 
            className="w-full pl-9 pr-4 py-2 bg-[var(--color-surface-muted)] border border-transparent focus:border-[var(--color-accent)] focus:bg-[var(--color-surface)] rounded-[var(--radius-md)] text-sm outline-none transition-all duration-200"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Mock Notifications */}
        <button className="relative p-2 text-[var(--color-text-muted)] hover:text-[var(--color-ink)] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--color-error)] rounded-full border border-[var(--color-surface-elevated)]"></span>
        </button>

        {/* Mock User Profile */}
        <button className="flex items-center gap-2 pl-2 border-l border-[var(--color-border)]">
          <div className="w-8 h-8 rounded-full bg-[var(--color-ink)] text-[var(--color-surface)] flex items-center justify-center text-xs font-medium">
            AD
          </div>
          <span className="text-sm font-medium hidden md:block text-[var(--color-ink)]">Admin User</span>
        </button>
      </div>
    </header>
  );
}
