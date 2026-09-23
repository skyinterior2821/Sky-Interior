"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Button } from "./Button";

export interface StickyCTAProps {
  text?: string;
  href?: string;
  scrollThreshold?: number;
}

export function StickyCTA({ text = "Book a Consultation", href = "/consultation", scrollThreshold = 300 }: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  const hiddenPaths = ["/estimate", "/consultation", "/contact"];
  const isHiddenRoute = hiddenPaths.some(p => pathname?.startsWith(p));

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  if (isHiddenRoute) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-[90] p-4 md:hidden"
        >
          <div className="bg-[var(--color-surface)] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] rounded-[var(--radius-lg)] p-2 border border-[var(--color-border)]">
            <Button href={href} fullWidth size="lg">
              {text}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
