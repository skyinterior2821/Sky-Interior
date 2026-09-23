"use client";

import { Container, FadeIn } from "@/components/ui";
import Link from "next/link";

export function CTABand() {
  return (
    <section className="bg-surface relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-[0.03] grayscale mix-blend-overlay" />
      <Container className="relative py-32 lg:py-48 text-center md:border-x border-border">
        <FadeIn>
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-accent-deep mb-8">
            Begin the process
          </p>
          <h2 className="font-serif text-[length:var(--text-h2)] lg:text-[length:var(--text-hero)] leading-[1.05] mb-10 text-ink max-w-4xl mx-auto drop-shadow-xl">
            Ready to build <br className="hidden md:block" />
            <span className="italic font-light text-accent-deep/80">something exceptional?</span>
          </h2>
          <p className="mt-6 text-[length:var(--text-lg)] text-ink-muted max-w-2xl mx-auto font-light leading-relaxed mb-16">
            Tell us about your project — whether it's a bespoke residence or a commercial build-out. Let's create a space that feels unequivocally yours.
          </p>
          <Link
            href="/contact"
            className="group relative overflow-hidden bg-accent-deep text-surface hover:text-ink px-10 py-5 uppercase tracking-widest text-xs font-medium inline-block"
          >
            <span className="relative z-10 transition-colors duration-300">Start the Conversation</span>
            <span className="absolute inset-0 bg-ink transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-500 ease-out" />
          </Link>
        </FadeIn>
      </Container>
    </section>
  );
}
