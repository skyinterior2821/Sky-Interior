"use client";

import { Container, FadeIn } from "@/components/ui";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    quote: "Sky Interior completely transformed our home. They understood the brief immediately and managed to respect the space while making it feel incredibly modern and livable. The process was seamless from start to finish.",
    name: "Sarah Jenkins",
    project: "Oak & Timber House",
    city: "Ahmedabad",
  },
  {
    quote: "Working with the team was a revelation. We wanted an office that didn't feel like a traditional corporate space, and they delivered a beautifully fluid environment. It has completely changed how our agency collaborates.",
    name: "Marcus Thorne",
    project: "The Modern Loft",
    city: "Ahmedabad",
  },
  {
    quote: "They took a cramped space and made it breathe. The attention to detail is remarkable, and their sourcing of local materials was exactly what we were looking for.",
    name: "Priya Patel",
    project: "Urban Retreat",
    city: "Ahmedabad",
  },
  {
    quote: "Professional, creative, and highly organized. They handled the entire execution flawlessly, allowing us to just enjoy the final reveal without any stress.",
    name: "Rajesh Desai",
    project: "Lakeside Villa",
    city: "Banswara",
  }
];

export function Testimonials() {
  // Double the array for smooth infinite scrolling
  const marqueeItems = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-24 lg:py-40 overflow-hidden bg-bg">
      <Container>
        <FadeIn>
          <h2 className="font-serif text-[length:var(--text-h2)] lg:text-[length:var(--text-display)] mb-16 lg:mb-24 text-center">
            Client Stories
          </h2>
        </FadeIn>
      </Container>

      {/* Marquee Wrapper with gradient fades on edges */}
      <div className="relative w-full flex overflow-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />
        
        <motion.div
          className="flex gap-8 lg:gap-12 px-4 lg:px-6 w-max"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {marqueeItems.map((t, i) => (
            <div 
              key={i} 
              className="w-[85vw] md:w-[60vw] lg:w-[40vw] flex-shrink-0 bg-surface border border-border p-8 lg:p-12 rounded-3xl hover:border-accent/40 transition-colors duration-500"
            >
              <blockquote className="flex flex-col h-full justify-between gap-8">
                <p className="font-serif text-[length:var(--text-lg)] lg:text-[length:var(--text-h3)] text-ink leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-6 flex flex-col border-t border-border pt-6">
                  <span className="font-sans text-sm tracking-widest uppercase font-semibold text-ink">{t.name}</span>
                  <span className="text-sm text-ink-muted mt-1">{t.project} — {t.city}</span>
                </footer>
              </blockquote>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
