"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/ui";

const MATERIALS = [
  { 
    id: 1, 
    name: "Italian Marble", 
    category: "Stone", 
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    properties: "Cool to the touch, highly durable, unique veining patterns.",
    recommended: "Kitchen countertops, luxury bathroom vanities, and statement flooring.",
    rooms: "Kitchen, Bathroom, Living Room"
  },
  { 
    id: 2, 
    name: "Fluted Oak", 
    category: "Wood", 
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800",
    properties: "Warm, acoustic dampening, linear texture adds verticality.",
    recommended: "Accent walls, custom cabinetry, and hidden doors.",
    rooms: "Living Room, Bedroom, Home Office"
  },
  { 
    id: 3, 
    name: "Brushed Brass", 
    category: "Metal", 
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800",
    properties: "Subtle sheen, develops a natural patina over time.",
    recommended: "Cabinet hardware, light fixtures, and structural accents.",
    rooms: "Kitchen, Bathroom, Foyer"
  },
  { 
    id: 4, 
    name: "Bouclé Fabric", 
    category: "Textile", 
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800",
    properties: "Highly tactile, cozy, visually soft and inviting.",
    recommended: "Accent chairs, custom sofas, and bed frames.",
    rooms: "Living Room, Bedroom"
  },
  { 
    id: 5, 
    name: "Smoked Glass", 
    category: "Glass", 
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
    properties: "Semi-transparent, reflective, adds depth without visual weight.",
    recommended: "Wardrobe doors, partition walls, and coffee tables.",
    rooms: "Bedroom, Living Room, Bathroom"
  },
  { 
    id: 6, 
    name: "Walnut Veneer", 
    category: "Wood", 
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800",
    properties: "Rich dark tones, elegant grain, brings warmth.",
    recommended: "Media consoles, dining tables, and wall paneling.",
    rooms: "Dining, Living Room, Home Office"
  },
];

export function MaterialsShowcase() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const activeMaterial = MATERIALS.find(m => m.id === activeId);

  return (
    <div className="w-full">
      <div className="flex overflow-x-auto pb-8 gap-6 hide-scrollbar snap-x snap-mandatory px-4 md:px-0">
        {MATERIALS.map((material, i) => {
          const isActive = activeId === material.id;
          return (
            <FadeIn key={material.id} delay={i * 0.1} className="snap-start shrink-0">
              <button 
                onClick={() => setActiveId(isActive ? null : material.id)}
                className="group w-[280px] sm:w-[320px] text-left focus-visible:outline-accent-deep relative"
                aria-expanded={isActive}
              >
                <div className={`relative aspect-square overflow-hidden mb-4 rounded-sm border transition-colors duration-300 ${isActive ? 'border-accent-deep' : 'border-border/50'}`}>
                  <Image
                    src={material.image}
                    alt={`Material texture: ${material.name}`}
                    fill
                    sizes="320px"
                    className={`object-cover transform transition-transform duration-[1.5s] ease-out ${isActive ? 'scale-110 grayscale-0' : 'group-hover:scale-105 grayscale-[0.2] group-hover:grayscale-0'}`}
                  />
                  <div className={`absolute inset-0 transition-colors duration-500 pointer-events-none ${isActive ? 'bg-transparent' : 'bg-black/10 group-hover:bg-transparent'}`} aria-hidden="true" />
                </div>
                <div className="flex justify-between items-end px-1">
                  <div>
                    <h4 className={`font-serif text-[length:var(--text-lg)] transition-colors ${isActive ? 'text-accent-deep' : 'text-ink'}`}>{material.name}</h4>
                    <p className="font-sans text-xs text-ink-muted tracking-widest uppercase mt-1">{material.category}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 text-xs ${isActive ? 'border-accent-deep bg-accent-deep text-surface rotate-45' : 'border-border text-ink opacity-0 group-hover:opacity-100'}`}>
                    +
                  </div>
                </div>
              </button>
            </FadeIn>
          );
        })}
      </div>

      <AnimatePresence>
        {activeMaterial && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-surface border border-border mt-4"
          >
            <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink-muted mb-3">Properties</h4>
                <p className="font-serif text-[length:var(--text-lg)] text-ink">{activeMaterial.properties}</p>
              </div>
              <div>
                <h4 className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink-muted mb-3">Recommended Use</h4>
                <p className="font-serif text-[length:var(--text-lg)] text-ink">{activeMaterial.recommended}</p>
              </div>
              <div>
                <h4 className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink-muted mb-3">Suitable Rooms</h4>
                <p className="font-serif text-[length:var(--text-lg)] text-ink">{activeMaterial.rooms}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
