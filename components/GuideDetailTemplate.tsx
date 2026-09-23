"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Container, Section, SectionHeader, FadeIn } from "./ui";
import { Breadcrumbs } from "./ui/Breadcrumbs";
import { CTABand } from "./CTABand";
import { Accordion } from "./ui/Accordion";
import { DesignGrid } from "./DesignGrid";
import { ServiceCard } from "./ServiceCard";
import { getDesignsByIds } from "@/lib/designs";
import servicesData from "@/content/services.json";

export interface GuideData {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  heroImage: string;
  readingTime: string;
  sections: { heading: string; content: string }[];
  relatedDesigns?: string[];
  relatedServices?: string[];
  faqs?: { question: string; answer: string }[];
}

export function GuideDetailTemplate({ guide }: { guide: GuideData }) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  // Format section ids for TOC
  const sectionsWithIds = guide.sections.map((sec, i) => ({
    ...sec,
    id: `section-${i}`
  }));

  // Setup intersection observer for TOC highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -60% 0px" }
    );

    sectionsWithIds.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionsWithIds]);

  // Fetch related designs and services safely
  const relatedDesigns = guide.relatedDesigns && guide.relatedDesigns.length > 0 
    ? getDesignsByIds(guide.relatedDesigns) 
    : [];

  const relatedServices = guide.relatedServices && guide.relatedServices.length > 0
    ? servicesData.filter(s => guide.relatedServices?.includes(s.slug))
    : [];

  const formattedFaqs = (guide.faqs || []).map((faq, index) => ({
    id: `faq-${index}`,
    title: faq.question,
    content: <p className="font-sans text-[var(--color-text-muted)] leading-relaxed">{faq.answer}</p>
  }));

  return (
    <>
      <article className="min-h-screen bg-[var(--color-surface)] pb-20 lg:pb-32">
        {/* HERO */}
        <header className="pt-32 lg:pt-40 pb-16 lg:pb-24 border-b border-[var(--color-border)]">
          <Container>
            <Breadcrumbs 
              items={[
                { label: "Home", href: "/" },
                { label: "Guides", href: "/guides" },
                { label: guide.title }
              ]} 
            />
            <div className="max-w-4xl mt-12">
              <FadeIn>
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent)]">
                    {guide.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[var(--color-border-strong)]" />
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">
                    {guide.readingTime}
                  </span>
                </div>
                <h1 className="font-serif text-[clamp(3rem,5vw,5rem)] text-[var(--color-ink)] mb-8 leading-[1.1]">
                  {guide.title}
                </h1>
                <p className="font-sans text-[clamp(1.25rem,2vw,1.5rem)] text-[var(--color-ink-muted)] font-light max-w-2xl leading-relaxed">
                  {guide.excerpt}
                </p>
              </FadeIn>
            </div>
          </Container>
        </header>

        {/* HERO IMAGE */}
        {guide.heroImage && (
          <div className="w-full h-[50vh] md:h-[70vh] relative bg-[var(--color-border)] mb-16 lg:mb-24">
            <Image src={guide.heroImage} alt={guide.title} fill className="object-cover" priority />
          </div>
        )}

        <Container>
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* TABLE OF CONTENTS */}
            <div className="lg:w-1/4 hidden lg:block">
              <div className="sticky top-32">
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-6 block border-b border-[var(--color-border)] pb-4">
                  Contents
                </span>
                <nav className="flex flex-col gap-4 pt-2">
                  {sectionsWithIds.map((sec, idx) => (
                    <a 
                      key={sec.id}
                      href={`#${sec.id}`}
                      className={`font-sans text-xs flex items-start gap-4 transition-colors focus-visible:outline-[var(--color-accent)] ${activeSection === sec.id ? 'text-[var(--color-ink)] font-medium' : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'}`}
                    >
                      <span className="opacity-50 tracking-widest">{(idx + 1).toString().padStart(2, '0')}</span>
                      <span>{sec.heading}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            
            {/* MOBILE TOC */}
            <div className="block lg:hidden border-b border-[var(--color-border)] pb-8 mb-8">
              <Accordion 
                items={[
                  {
                    id: "toc",
                    title: "Table of Contents",
                    content: (
                      <nav className="flex flex-col gap-3 pt-4">
                        {sectionsWithIds.map((sec, idx) => (
                          <a 
                            key={sec.id}
                            href={`#${sec.id}`}
                            className={`font-sans text-sm flex items-center gap-3 transition-colors ${activeSection === sec.id ? 'text-[var(--color-ink)] font-medium' : 'text-[var(--color-ink-muted)]'}`}
                          >
                            <span className="text-[10px] tracking-widest opacity-50">{(idx + 1).toString().padStart(2, '0')}</span>
                            {sec.heading}
                          </a>
                        ))}
                      </nav>
                    )
                  }
                ]}
              />
            </div>

            {/* ARTICLE CONTENT */}
            <div className="lg:w-3/4 max-w-[720px]">
              <FadeIn delay={0.2}>
                <div className="prose prose-lg prose-headings:font-serif prose-headings:text-[var(--color-ink)] prose-headings:font-normal prose-p:font-sans prose-p:text-[var(--color-ink-muted)] prose-p:font-light prose-p:leading-[1.8] prose-a:text-[var(--color-accent)] max-w-none">
                  {sectionsWithIds.map((sec) => (
                    <section key={sec.id} id={sec.id} className="mb-20 scroll-mt-32">
                      <h2 className="text-3xl md:text-4xl mb-8 leading-[1.2]">{sec.heading}</h2>
                      <div className="font-sans text-[1.125rem] text-[var(--color-ink-muted)] font-light leading-[1.8] whitespace-pre-wrap">
                        {sec.content}
                      </div>
                    </section>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </article>

      {/* RELATED DESIGNS */}
      {relatedDesigns.length > 0 && (
        <div className="py-24 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
          <Container>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-6 block">Inspiration</span>
                <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-[var(--color-ink)]">Related Designs</h2>
              </div>
              <Link href="/designs" className="text-[10px] font-sans uppercase tracking-[0.2em] text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors inline-flex items-center gap-4 group">
                View Gallery <span className="transform transition-transform group-hover:translate-x-2">→</span>
              </Link>
            </div>
            <DesignGrid initialDesigns={relatedDesigns} showFilters={false} />
          </Container>
        </div>
      )}

      {/* RELATED SERVICES */}
      {relatedServices.length > 0 && (
        <div className="py-24 bg-[var(--color-paper)]">
          <Container>
            <div className="flex items-center gap-4 mb-16">
              <span className="w-8 h-px bg-[var(--color-ink)] block" />
              <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink)]">Relevant Services</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {relatedServices.map((service, i) => (
                <FadeIn key={service.slug} delay={0.1 * i}>
                  <ServiceCard 
                    slug={service.slug}
                    title={service.title}
                    category={service.category}
                    description={service.description}
                    image={service.heroImage}
                  />
                </FadeIn>
              ))}
            </div>
          </Container>
        </div>
      )}

      {/* FAQS */}
      {guide.faqs && guide.faqs.length > 0 && (
        <div className="py-24 bg-[var(--color-surface)]">
          <Container>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-serif text-[clamp(2rem,3vw,3rem)] text-[var(--color-ink)]">Common Questions</h2>
              </div>
              <Accordion items={formattedFaqs} />
            </div>
          </Container>
        </div>
      )}

      {/* CONTEXTUAL CTA */}
      <section className="py-24 bg-[var(--color-ink)] text-center">
        <Container>
          <FadeIn>
            <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-[var(--color-surface)] mb-6">Ready to apply these ideas?</h2>
            <p className="text-[var(--color-surface)]/80 text-lg mb-12 max-w-lg mx-auto font-light leading-relaxed">
              Book a consultation with our design experts and turn your vision into reality.
            </p>
            <Link href="/consultation" className="bg-[var(--color-surface)] text-[var(--color-ink)] hover:bg-[var(--color-accent-deep)] hover:text-[var(--color-surface)] transition-colors px-10 py-5 uppercase tracking-[0.2em] text-[10px] font-medium inline-block focus-visible:outline-[var(--color-accent)]">
              Book Consultation
            </Link>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
