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

function StepItem({ step, index }: { step: typeof STEPS[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "center center"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [20, 0]);

  return (
    <motion.div 
      ref={ref} 
      style={{ opacity, x }} 
      className="flex flex-col md:flex-row gap-6 md:gap-16 border-t border-border pt-12 pb-8"
    >
      <div className="md:w-1/4">
        <span className="font-sans text-xs tracking-[0.2em] uppercase text-accent-deep block">
          Phase {step.number}
        </span>
      </div>
      <div className="md:w-3/4">
        <h3 className="font-serif text-[length:var(--text-h2)] lg:text-[length:var(--text-h1)] mb-6 text-ink">
          {step.title}
        </h3>
        <p className="text-ink-muted text-[length:var(--text-lg)] leading-relaxed max-w-2xl font-light">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export function ProcessSteps() {
  const container = useRef<HTMLDivElement>(null);

  return (
    <section id="process" ref={container} className="py-24 lg:py-40 bg-surface">
      <Container>
        <FadeIn className="mb-20 lg:mb-32">
          <h2 className="font-serif text-[length:var(--text-h2)] lg:text-[length:var(--text-display)] max-w-3xl leading-tight">
            A meticulous approach to timeless spaces.
          </h2>
          <p className="mt-8 text-ink-muted text-[length:var(--text-lg)] max-w-xl leading-relaxed font-light">
            Our process eliminates surprises, ensuring the final result is an elevated translation of your vision.
          </p>
        </FadeIn>
        
        <div className="flex flex-col">
          {STEPS.map((step, idx) => (
             <StepItem key={step.number} step={step} index={idx} />
          ))}
        </div>
      </Container>
    </section>
  );
}
