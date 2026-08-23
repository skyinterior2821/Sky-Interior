"use client";

import { Container, FadeIn } from "@/components/ui";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    number: "01",
    title: "Discovery",
    description:
      "A site visit and an honest conversation about how you actually use the space, not just how it should look.",
  },
  {
    number: "02",
    title: "Concept",
    description:
      "Layout options, material palette, and 3D views, aligned to your budget before anything is finalised.",
  },
  {
    number: "03",
    title: "Detailing",
    description:
      "Working drawings, vendor selection, and material sign-off — the unglamorous part that prevents surprises later.",
  },
  {
    number: "04",
    title: "Execution",
    description:
      "On-site execution managed end to end, through to handover and styling.",
  },
];

function StepItem({ step }: { step: typeof STEPS[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "center center"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);

  return (
    <motion.div 
      ref={ref} 
      style={{ opacity, scale, y }} 
      className="flex flex-col border-l border-accent/20 pl-6 md:pl-8 lg:pl-16 py-4"
    >
      <span className="font-serif text-[80px] md:text-[length:var(--text-hero)] lg:text-[140px] text-accent/20 leading-none mb-6 block drop-shadow-xl">
        {step.number}
      </span>
      <h3 className="font-serif text-[length:var(--text-h3)] lg:text-[length:var(--text-h2)] mt-2 mb-4 text-ink">
        {step.title}
      </h3>
      <p className="text-ink-muted text-[length:var(--text-lg)] leading-relaxed max-w-xl font-light">
        {step.description}
      </p>
    </motion.div>
  );
}

export function ProcessSteps() {
  const container = useRef<HTMLDivElement>(null);

  return (
    <section id="process" ref={container} className="py-24 lg:py-40 bg-surface relative overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          {/* Sticky left side */}
          <div className="lg:w-1/3">
            <div className="sticky top-40">
              <FadeIn>
                <h2 className="font-serif text-[length:var(--text-h2)] lg:text-[length:var(--text-display)]">
                  How we work
                </h2>
                <p className="mt-8 text-ink-muted text-lg max-w-sm leading-relaxed font-light">
                  Our process is designed to eliminate surprises, ensuring that the final space is exactly what we agreed upon. No hidden fees, no compromised visions.
                </p>
              </FadeIn>
            </div>
          </div>
          
          {/* Scrolling right side */}
          <div className="lg:w-2/3 flex flex-col gap-24 lg:gap-40 pt-16 lg:pt-0">
            {STEPS.map((step) => (
               <StepItem key={step.number} step={step} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
