"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  onChange?: (id: string) => void;
}

export function Tabs({ tabs, defaultTabId, onChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0]?.id);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    if (onChange) onChange(id);
  };

  return (
    <div className="w-full">
      <div 
        className="flex overflow-x-auto hide-scrollbar border-b border-[var(--color-border)] mb-8"
        role="tablist"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => handleTabClick(tab.id)}
            className={`relative px-6 py-4 font-sans text-xs tracking-widest uppercase transition-colors focus-visible:outline-[var(--color-accent)] whitespace-nowrap ${
              activeTab === tab.id ? "text-[var(--color-text)] font-medium" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-accent)]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
      
      <div className="w-full">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            hidden={activeTab !== tab.id}
            className="focus-visible:outline-none"
            tabIndex={0}
          >
            {activeTab === tab.id && tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
