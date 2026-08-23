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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as any
    }
  }
};

export function ValuePillars() {
  return (
    <section className="py-24 lg:py-32 bg-surface">
      <Container>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {PILLARS.map((pillar, idx) => (
            <motion.div key={idx} variants={itemVariants} className="group cursor-pointer">
              <div className="relative aspect-[4/5] w-full overflow-hidden mb-8 bg-border">
                <img 
                  src={pillar.image} 
                  alt={pillar.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                {/* Subtle dark overlay that fades out on hover */}
                <div className="absolute inset-0 bg-bg/40 transition-opacity duration-700 group-hover:opacity-0" />
              </div>
              <h3 className="font-serif text-[length:var(--text-h3)] text-ink mb-4 transition-colors duration-300 group-hover:text-[#E2C1A1]">
                {pillar.title}
              </h3>
              <p className="font-sans text-[length:var(--text-sm)] text-ink-muted leading-relaxed font-light">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
