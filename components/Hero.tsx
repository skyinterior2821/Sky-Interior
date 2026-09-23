"use client";

import { Container, Button } from "@/components/ui";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  // High-end architectural image
  const heroImage = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000";

  return (
    <section ref={containerRef} className="relative pt-32 lg:pt-48 pb-16 lg:pb-32 bg-[var(--color-surface)] border-b border-[var(--color-border)] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 pt-8 lg:pt-0">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent-deep)] mb-8 flex items-center gap-4">
                <span className="w-8 h-px bg-[var(--color-accent-deep)]" />
                Interior Design Studio — Ahmedabad
              </p>
            </motion.div>

            <motion.h1
              className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] text-[var(--color-ink)] mb-8 tracking-tight"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              Spaces that feel like they were always yours.
            </motion.h1>

            <motion.p
              className="text-[length:var(--text-body-l)] text-[var(--color-ink-muted)] max-w-[45ch] font-light leading-relaxed mb-12"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              Sky Interior plans, designs, and delivers full-home and commercial interiors — from first sketch to the last cushion.
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            >
              <Button
                href="/designs"
                className="bg-[var(--color-ink)] text-[var(--color-surface)] hover:bg-[var(--color-accent-deep)] transition-colors px-10 py-5 rounded-none uppercase tracking-widest text-[10px] font-medium"
              >
                Explore Designs
              </Button>
            </motion.div>
          </div>

          {/* Image Content */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative">
            <motion.div 
              className="relative aspect-[4/5] lg:aspect-[3/4] w-full bg-[var(--color-border)] overflow-hidden"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="w-full h-full scale-110 origin-top"
                style={{ y: shouldReduceMotion ? 0 : yImage }}
              >
                <Image
                  src={heroImage}
                  alt="Beautiful interior space"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </Container>
    </section>
  );
}

