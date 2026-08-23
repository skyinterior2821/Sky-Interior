"use client";

import { Container, Button, FadeIn } from "@/components/ui";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function CTABand() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={container} className="py-24 lg:py-40 bg-bg overflow-hidden">
      <Container>
        <motion.div 
          style={{ scale, y }}
          className="relative bg-surface rounded-[3rem] p-12 lg:p-32 text-center overflow-hidden border border-border/50 shadow-2xl"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />

          <FadeIn className="relative z-10">
            <h2 className="font-serif text-[length:var(--text-h2)] lg:text-[length:var(--text-hero)] leading-[1.1] mb-8 text-ink drop-shadow-sm">
              Ready to build <br className="hidden md:block" />
              <span className="italic text-accent/80 font-light">something beautiful?</span>
            </h2>
            <p className="mt-4 text-[length:var(--text-lg)] text-ink-muted max-w-2xl mx-auto font-light leading-relaxed">
              Tell us about your project — whether it's a single room or a full commercial build-out. Let's create a space that feels like you.
            </p>
            <div className="mt-16">
              <Button
                href="/contact"
                variant="solid"
                className="bg-ink text-surface hover:bg-accent hover:text-ink transition-colors duration-500 px-12 py-5 text-lg rounded-full"
              >
                Start the Conversation
              </Button>
            </div>
          </FadeIn>
        </motion.div>
      </Container>
    </section>
  );
}
