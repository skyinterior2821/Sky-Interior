"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { CTABand } from "@/components/CTABand";
import { Container, FadeIn } from "@/components/ui";
import { getAllProjects, getAllCategories } from "@/lib/projects";
import { motion, AnimatePresence } from "framer-motion";

function WorkContent() {
  const allProjects = getAllProjects();
  const categories = getAllCategories();
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const activeCategory = searchParams.get("category") || "All";

  const filteredProjects =
    activeCategory === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  const setCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "All") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <Nav />
      <main className="pt-32 lg:pt-40 pb-0 bg-[var(--color-surface)] min-h-screen">
        <Container>
          <FadeIn>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-sans text-xs tracking-widest uppercase text-[var(--color-text-muted)]">Home</span>
              <span className="text-[var(--color-text-muted)]">/</span>
              <span className="font-sans text-xs tracking-widest uppercase text-[var(--color-accent)]">Work</span>
            </div>
            <h1 className="font-serif text-[length:var(--text-heading-xl)] lg:text-[length:var(--text-display-m)] text-[var(--color-ink)] mb-6">
              Selected Work
            </h1>
            <p className="text-[length:var(--text-body-l)] text-[var(--color-text-muted)] max-w-2xl font-light mb-16 lg:mb-24">
              A curation of our finest residential and commercial spaces across Ahmedabad and Banswara.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap gap-3 mb-16 lg:mb-24">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`font-sans text-xs tracking-widest uppercase px-6 py-3 rounded-full transition-all duration-300 ${
                    activeCategory === cat 
                      ? "bg-[var(--color-ink)] text-[var(--color-surface)] border border-[var(--color-ink)]" 
                      : "bg-transparent text-[var(--color-text-muted)] border border-[var(--color-border)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          <motion.div layout className="pb-24 lg:pb-40">
            <AnimatePresence mode="popLayout">
              {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-start">
                  {filteredProjects.map((project, i) => {
                    // Pattern: Large (span 8), Small (span 4), Full (span 12), Small (span 5), Medium (span 7)
                    let colSpan = "md:col-span-6";
                    let isLarge = false;
                    const patternIndex = i % 5;
                    
                    if (patternIndex === 0) { colSpan = "md:col-span-8"; isLarge = true; }
                    else if (patternIndex === 1) { colSpan = "md:col-span-4 md:mt-32"; }
                    else if (patternIndex === 2) { colSpan = "md:col-span-12"; isLarge = true; }
                    else if (patternIndex === 3) { colSpan = "md:col-span-5"; }
                    else if (patternIndex === 4) { colSpan = "md:col-span-7 md:mt-16"; isLarge = true; }

                    return (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        key={project.slug}
                        className={colSpan}
                      >
                        <ProjectCard project={project} large={isLarge} />
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="col-span-full py-32 text-center border border-dashed border-[var(--color-border)]">
                  <p className="font-serif text-[length:var(--text-heading-s)] text-[var(--color-text-muted)]">More projects coming soon.</p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </Container>
        <CTABand />
      </main>
      <Footer />
    </>
  );
}

export default function WorkPage() {
  return (
    <Suspense fallback={null}>
      <WorkContent />
    </Suspense>
  );
}
