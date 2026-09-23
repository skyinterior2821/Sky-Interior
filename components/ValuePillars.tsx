"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui";

const PILLARS = [
  {
    title: "Residential Design",
    description: "Bespoke home interiors that reflect your personal aesthetic, blending comfort with sophisticated, timeless luxury.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Commercial Spaces",
    description: "Striking workspaces and retail environments meticulously designed to elevate your brand and inspire performance.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Turnkey Execution",
    description: "Seamless end-to-end project management. From initial concept to final styling, we handle every detail flawlessly.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800",
  }
];

export function ValuePillars() {
  return (
    <section className="py-24 lg:py-40 bg-[var(--color-surface)]">
      <Container>
        <div className="mb-20 md:mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-[var(--color-ink)] leading-tight max-w-2xl"
          >
            Elevated Living.
            <span className="block text-[var(--color-ink-muted)]">Defined by details.</span>
          </motion.h2>
        </div>

        <div className="flex flex-col gap-24 lg:gap-40">
          {PILLARS.map((pillar, idx) => {
            const isEven = idx % 2 === 1;
            
            return (
              <div key={idx} className={`grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className={`md:col-span-5 flex flex-col justify-center ${isEven ? 'md:order-2 md:pl-12' : 'md:order-1'}`}
                >
                  <span className="font-sans text-[length:var(--text-display-m)] text-[var(--color-border)] leading-none mb-6 font-light">
                    0{idx + 1}
                  </span>
                  <h3 className="font-serif text-[length:var(--text-h2)] text-[var(--color-ink)] mb-6">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-[length:var(--text-body-l)] text-[var(--color-ink-muted)] leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className={`md:col-span-7 relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-border)] ${isEven ? 'md:order-1' : 'md:order-2'}`}
                >
                  <img 
                    src={pillar.image} 
                    alt={pillar.title}
                    className="w-full h-full object-cover transition-transform duration-[2s] ease-out hover:scale-105"
                  />
                </motion.div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
