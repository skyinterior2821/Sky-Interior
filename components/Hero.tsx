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

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // High-end architectural image
  const heroImage = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000";

  return (
    <section ref={containerRef} className="relative min-h-[100vh] flex items-end pb-16 lg:pb-24 pt-32 lg:pt-40 overflow-hidden">
      {/* Background image container — Parallax effect */}
      <motion.div
        className="absolute inset-0 -z-20 bg-border"
        style={{ y: shouldReduceMotion ? 0 : yBg }}
      >
        <motion.div
          className="relative w-full h-full scale-110"
          initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={heroImage}
            alt="Beautiful interior space"
            fill
            priority
            className="object-cover object-[center_65%] md:object-center"
          />
        </motion.div>
      </motion.div>

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/60 to-bg/10 md:via-bg/40 md:to-transparent" />

      <Container className="relative z-10 w-full">
        <motion.div 
          className="max-w-3xl relative"
          style={{ opacity: opacityText, y: yText }}
        >
          {/* Glassmorphism backing for text */}
          <div className="absolute -inset-x-8 -inset-y-12 z-[-1] bg-bg/20 backdrop-blur-md border border-white/5 rounded-3xl hidden md:block" />

          {/* Eyebrow */}
          <motion.p
            className="font-sans text-xs uppercase tracking-[0.2em] text-accent-deep mb-6 drop-shadow-md"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            Interior Design Studio — Ahmedabad
          </motion.p>

          {/* Headline — Split Character Animation */}
          <motion.h1
            className="font-serif text-ink leading-[1.05] flex flex-wrap gap-x-1.5 md:gap-x-2 lg:gap-x-4 drop-shadow-lg"
            style={{
              fontSize: "clamp(var(--text-h2), 8vw, var(--text-hero))",
            }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08, delayChildren: 0.3 }
              }
            }}
            initial="hidden"
            animate="visible"
          >
            {"Spaces that feel like they were always yours".split(" ").map((word, i) => (
              <span key={i} className="inline-flex overflow-hidden">
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: "100%", rotateX: -20 },
                    visible: { 
                      opacity: 1, 
                      y: "0%", 
                      rotateX: 0,
                      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
                    }
                  }}
                  style={{ transformOrigin: "bottom center" }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="mt-8 text-[length:var(--text-lg)] text-ink/90 max-w-[50ch] font-light leading-relaxed drop-shadow-md"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          >
            Sky Interior plans, designs, and delivers full-home and commercial
            interiors — from first sketch to the last cushion.
          </motion.p>

          {/* CTA */}
          <motion.div
            className="mt-10"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          >
            <Button
              href="/contact"
              variant="outline"
              className="border-ink/40 bg-ink/10 backdrop-blur-sm text-ink hover:bg-ink hover:text-bg hover:border-ink transition-all duration-300"
            >
              Book a Consultation
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
