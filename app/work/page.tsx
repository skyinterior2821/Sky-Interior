"use client";

import { useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { Container, FadeIn, Button } from "@/components/ui";
import { getAllProjects, getAllCategories } from "@/lib/projects";

export default function WorkPage() {
  const allProjects = getAllProjects();
  const categories = getAllCategories();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  return (
    <>
      <Nav />
      <main className="pt-24 lg:pt-40 pb-24 lg:pb-32 bg-bg overflow-hidden">
        {/* Hero */}
        <Container className="pb-16 lg:pb-32">
          <FadeIn>
            <h1 className="font-serif text-[length:var(--text-h1)] lg:text-[120px] leading-[0.9] tracking-tight text-ink drop-shadow-sm">
              Selected <br />
              <span className="italic text-accent-deep">work.</span>
            </h1>
            <p className="mt-8 text-[length:var(--text-lg)] text-ink-muted leading-relaxed max-w-2xl font-light">
              A curated selection of residential and commercial projects across Ahmedabad and Banswara.
            </p>
          </FadeIn>
        </Container>

        <Container>
          {/* Filter Pills */}
          <FadeIn>
            <div className="flex flex-wrap gap-3 mb-16 lg:mb-24">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-sans text-sm uppercase tracking-widest px-6 py-3 rounded-full border transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-ink text-surface border-ink"
                      : "bg-transparent text-ink-muted border-border hover:border-ink hover:text-ink"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
              {filteredProjects.map((project, i) => (
                <FadeIn
                  key={project.slug}
                  className={i === 0 ? "md:col-span-2" : ""}
                  delay={i * 0.08}
                >
                  <ProjectCard project={project} large={i === 0} />
                </FadeIn>
              ))}
            </div>
          ) : (
            <p className="text-ink-muted py-12 text-center text-lg">
              More {activeCategory.toLowerCase()} projects coming soon —{" "}
              <button
                onClick={() => setActiveCategory("All")}
                className="text-accent-deep hover:text-accent underline underline-offset-4"
              >
                see everything →
              </button>
            </p>
          )}

          {/* Bottom CTA */}
          <div className="mt-24 lg:mt-40 text-center">
            <FadeIn>
              <p className="font-serif text-[length:var(--text-h3)] text-ink mb-6">Have a project in mind?</p>
              <Button href="/contact" variant="primary" className="bg-ink text-surface px-12 py-5 rounded-full hover:bg-accent transition-colors duration-500">
                Let&apos;s Talk
              </Button>
            </FadeIn>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
