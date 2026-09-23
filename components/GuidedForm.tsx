"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

export function GuidedForm() {
  const searchParams = useSearchParams();
  const shouldReduceMotion = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Extract Context
  const contextType = searchParams.get("type");
  const contextTier = searchParams.get("tier");
  const hasContext = contextType || contextTier;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network delay for UI frontend confirmation
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  };

  if (submitted) {
    return (
      <motion.div 
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-12 md:py-24 max-w-2xl"
      >
        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent)] block mb-6">Request Received</span>
        <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-[var(--color-ink)] mb-6 leading-none">Thank you.</h2>
        <p className="text-[var(--color-ink-muted)] text-lg font-light leading-relaxed mb-8">
          This is a frontend demonstration environment. In a production setting, your consultation request would be securely routed to our design team.
        </p>
        <button onClick={() => setSubmitted(false)} className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors border-b border-[var(--color-ink)] hover:border-[var(--color-accent)] pb-1">
          Submit another request
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl w-full">
      {hasContext && (
        <div className="mb-16 md:mb-24 p-8 lg:p-10 border border-[var(--color-border)] bg-[var(--color-paper)]">
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)] block mb-4">Your Project Context</span>
          <div className="flex flex-wrap gap-x-8 gap-y-2 font-serif text-3xl lg:text-4xl text-[var(--color-ink)]">
            {contextType && <span>{contextType}</span>}
            {contextType && contextTier && <span className="text-[var(--color-border-strong)] opacity-30">•</span>}
            {contextTier && <span>{contextTier} Finish</span>}
          </div>
        </div>
      )}

      <div className="space-y-20 lg:space-y-28">
        {/* Section 1: About You */}
        <section>
          <h2 className="font-serif text-2xl lg:text-3xl text-[var(--color-ink)] mb-10 border-b border-[var(--color-border)] pb-4">01. About You</h2>
          <div className="space-y-10">
            <div>
              <label htmlFor="name" className="block font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-4">Full Name</label>
              <input id="name" type="text" required className="w-full bg-transparent border-b border-[var(--color-border-strong)] py-3 text-xl font-light text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)] transition-colors" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <label htmlFor="email" className="block font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-4">Email Address</label>
                <input id="email" type="email" required className="w-full bg-transparent border-b border-[var(--color-border-strong)] py-3 text-xl font-light text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)] transition-colors" />
              </div>
              <div>
                <label htmlFor="phone" className="block font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-4">Phone Number</label>
                <input id="phone" type="tel" required className="w-full bg-transparent border-b border-[var(--color-border-strong)] py-3 text-xl font-light text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)] transition-colors" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Your Space */}
        <section>
          <h2 className="font-serif text-2xl lg:text-3xl text-[var(--color-ink)] mb-10 border-b border-[var(--color-border)] pb-4">02. Your Space</h2>
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <label htmlFor="property_type" className="block font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-4">Property Type</label>
                <select id="property_type" defaultValue={contextType || ""} className="w-full bg-transparent border-b border-[var(--color-border-strong)] py-3 text-xl font-light text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)] transition-colors appearance-none">
                  <option value="" disabled>Select property</option>
                  <option value="Full Home">Full Home</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa / Independent House</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="city" className="block font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-4">City / Location</label>
                <input id="city" type="text" required className="w-full bg-transparent border-b border-[var(--color-border-strong)] py-3 text-xl font-light text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)] transition-colors" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Your Requirements */}
        <section>
          <h2 className="font-serif text-2xl lg:text-3xl text-[var(--color-ink)] mb-10 border-b border-[var(--color-border)] pb-4">03. Requirements</h2>
          <div className="space-y-10">
            <div>
              <label htmlFor="budget" className="block font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-4">Estimated Budget</label>
              <select id="budget" defaultValue="" className="w-full bg-transparent border-b border-[var(--color-border-strong)] py-3 text-xl font-light text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)] transition-colors appearance-none">
                <option value="" disabled>Select range</option>
                <option value="5-10L">₹5L - ₹10L</option>
                <option value="10-20L">₹10L - ₹20L</option>
                <option value="20-50L">₹20L - ₹50L</option>
                <option value="50L+">₹50L+</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-4">Project Details</label>
              <textarea id="message" rows={4} placeholder="Briefly describe your vision..." className="w-full bg-transparent border-b border-[var(--color-border-strong)] py-3 text-xl font-light text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-ink)] transition-colors resize-none placeholder:text-[var(--color-border-strong)] opacity-50 focus:opacity-100" />
            </div>
          </div>
        </section>

        {/* Submit */}
        <div className="pt-8">
          <button type="submit" disabled={isSubmitting} className="w-full md:w-auto bg-[var(--color-ink)] text-[var(--color-surface)] px-12 py-5 font-sans text-[10px] tracking-[0.2em] uppercase hover:bg-[var(--color-accent-deep)] transition-colors duration-300 focus-visible:outline-[var(--color-accent)] disabled:opacity-50">
            {isSubmitting ? "Submitting..." : "Submit Inquiry"}
          </button>
        </div>
      </div>
    </form>
  );
}
