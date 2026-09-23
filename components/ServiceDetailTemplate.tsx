"use client";

import Image from "next/image";
import Link from "next/link";
import { Container, Section, SectionHeader, FadeIn } from "./ui";
import { Breadcrumbs } from "./ui/Breadcrumbs";
import { Button } from "./ui/Button";
import { CTABand } from "./CTABand";
import { Accordion } from "./ui/Accordion";
import { ProjectCard } from "./ProjectCard";
import { getProjectBySlug } from "@/lib/projects";
import { Project } from "@/lib/types";

export interface ServiceData {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  eyebrow: string;
  description: string;
  heroImage: string;
  gallery?: string[];
  whatWeDesign?: { title: string; description: string }[];
  materials?: { name: string; description: string }[];
  process?: { step: string; title: string; description: string }[];
  relatedProjects?: string[];
  faqs?: { question: string; answer: string }[];
}

export function ServiceDetailTemplate({ service }: { service: ServiceData }) {
  // Process related projects
  const relatedProjects: Project[] = (service.relatedProjects || [])
    .map(slug => getProjectBySlug(slug))
    .filter((p): p is Project => p !== undefined);

  // Format FAQs for Accordion
  const formattedFaqs = (service.faqs || []).map((faq, index) => ({
    id: `faq-${index}`,
    title: faq.question,
    content: <p className="font-sans text-[var(--color-text-muted)] leading-relaxed">{faq.answer}</p>
  }));

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-32 bg-[var(--color-surface)] border-b border-[var(--color-border)] overflow-hidden">
        <Container>
          <Breadcrumbs 
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.title }
            ]} 
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mt-16 items-center">
            <div className="lg:col-span-7">
              <FadeIn>
                <div className="relative aspect-[4/3] lg:aspect-[16/10] w-full overflow-hidden bg-[var(--color-border)]">
                  {service.heroImage && (
                    <Image 
                      src={service.heroImage} 
                      alt={service.title} 
                      fill 
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover"
                    />
                  )}
                </div>
              </FadeIn>
            </div>
            
            <div className="lg:col-span-5 flex flex-col justify-center">
              <FadeIn delay={0.2}>
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-8 h-px bg-[var(--color-accent)] block" />
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent)]">
                    {service.eyebrow}
                  </span>
                </div>
                <h1 className="font-serif text-[clamp(2.5rem,4vw,4rem)] text-[var(--color-ink)] mb-8 leading-[1.1]">
                  {service.title}
                </h1>
                <p className="font-sans text-lg text-[var(--color-ink-muted)] font-light mb-12 leading-relaxed max-w-md">
                  {service.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Link href="/consultation" className="text-[10px] font-sans uppercase tracking-[0.2em] text-[var(--color-surface)] bg-[var(--color-ink)] px-8 py-4 text-center hover:bg-[var(--color-accent-deep)] transition-colors focus-visible:outline-[var(--color-accent)]">
                    Discuss Project
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* WHAT WE DESIGN */}
      {service.whatWeDesign && service.whatWeDesign.length > 0 && (
        <div className="py-24 bg-[var(--color-paper)]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4">
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-6 block">Capabilities</span>
                <h2 className="font-serif text-[clamp(2.5rem,3vw,3.5rem)] text-[var(--color-ink)] leading-tight mb-6">What We Design</h2>
                <p className="font-sans text-[var(--color-ink-muted)] font-light leading-relaxed max-w-sm mb-8">
                  Tailored approaches for every specific requirement within this category.
                </p>
              </div>
              <div className="lg:col-span-8 lg:pl-12">
                <ul className="flex flex-col">
                  {service.whatWeDesign.map((item, i) => (
                    <FadeIn key={i} delay={0.1 * i}>
                      <li className="flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-[var(--color-border)] group cursor-default">
                        <div className="flex items-center gap-8 mb-4 md:mb-0">
                          <span className="font-sans text-[10px] tracking-[0.2em] text-[var(--color-ink-muted)] opacity-50">{(i + 1).toString().padStart(2, '0')}</span>
                          <h3 className="font-serif text-2xl text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">{item.title}</h3>
                        </div>
                        <p className="font-sans text-[var(--color-ink-muted)] font-light md:text-right max-w-sm leading-relaxed">{item.description}</p>
                      </li>
                    </FadeIn>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </div>
      )}

      {/* GALLERY */}
      {service.gallery && service.gallery.length > 0 && (
        <div className="py-24 bg-[var(--color-surface)]">
          <Container>
            <div className="flex items-center gap-4 mb-16">
              <span className="w-8 h-px bg-[var(--color-ink)] block" />
              <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink)]">Featured Execution</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.gallery.map((img, i) => (
                <FadeIn key={i} delay={0.1 * i} className={i === 0 && service.gallery!.length === 3 ? "md:col-span-2" : ""}>
                  <div className={`relative w-full overflow-hidden bg-[var(--color-border)] ${i === 0 && service.gallery!.length === 3 ? "aspect-[21/9]" : "aspect-[4/3] lg:aspect-[16/10]"}`}>
                    <Image src={img} alt={`Gallery image ${i + 1}`} fill className="object-cover transition-transform duration-700 ease-out hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </div>
      )}

      {/* MATERIALS / OPTIONS */}
      {service.materials && service.materials.length > 0 && (
        <div className="py-24 bg-[var(--color-ink)]">
          <Container>
            <div className="flex items-center gap-4 mb-16">
              <span className="w-8 h-px bg-[var(--color-accent)] block" />
              <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent)]">Material Options</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {service.materials.map((mat, i) => (
                <FadeIn key={i} delay={0.1 * i}>
                  <div className="border-t border-[var(--color-surface)]/20 pt-6">
                    <h3 className="font-serif text-3xl text-[var(--color-surface)] mb-4">{mat.name}</h3>
                    <p className="font-sans text-[var(--color-surface)]/70 font-light leading-relaxed">{mat.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </div>
      )}

      {/* PROCESS */}
      {service.process && service.process.length > 0 && (
        <div className="py-24 bg-[var(--color-surface)]">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-20">
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)] block mb-6">Methodology</span>
                <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-[var(--color-ink)]">How We Work</h2>
              </div>
              <div className="relative border-l border-[var(--color-border-strong)] ml-4 md:ml-0 md:border-none">
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[var(--color-border-strong)] -translate-x-1/2" />
                <ul className="flex flex-col gap-16 md:gap-24">
                  {service.process.map((step, i) => (
                    <FadeIn key={i} delay={0.1 * i}>
                      <li className="relative flex flex-col md:flex-row items-center md:justify-between group">
                        <div className={`pl-8 md:pl-0 md:w-[45%] flex flex-col ${i % 2 === 0 ? 'md:text-right' : 'md:order-2 md:text-left'}`}>
                          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent)] mb-3">Step {step.step}</span>
                          <h3 className="font-serif text-3xl text-[var(--color-ink)] mb-4">{step.title}</h3>
                          <p className="font-sans text-[var(--color-ink-muted)] font-light leading-relaxed">{step.description}</p>
                        </div>
                        <div className="absolute left-[-5px] md:static md:left-auto md:w-3 md:h-3 rounded-full bg-[var(--color-surface)] border-2 border-[var(--color-accent)] z-10 group-hover:bg-[var(--color-accent)] transition-colors" />
                        <div className={`hidden md:block w-[45%] ${i % 2 === 0 ? 'order-2' : 'order-1'}`} />
                      </li>
                    </FadeIn>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </div>
      )}

      {/* RELATED PROJECTS */}
      {relatedProjects.length > 0 && (
        <div className="py-24 bg-[var(--color-paper)]">
          <Container>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-6 block">Portfolio</span>
                <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-[var(--color-ink)]">Related Work</h2>
              </div>
              <Link href="/work" className="text-[10px] font-sans uppercase tracking-[0.2em] text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors inline-flex items-center gap-4 group">
                View All Projects <span className="transform transition-transform group-hover:translate-x-2">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {relatedProjects.map((project, i) => (
                <FadeIn key={project.slug} delay={0.1 * i}>
                  <ProjectCard project={project} large={false} />
                </FadeIn>
              ))}
            </div>
          </Container>
        </div>
      )}

      {/* FAQS */}
      {service.faqs && service.faqs.length > 0 && (
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
            <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-[var(--color-surface)] mb-6">Planning your interiors?</h2>
            <p className="text-[var(--color-surface)]/80 text-lg mb-12 max-w-lg mx-auto font-light leading-relaxed">
              Bring your requirements to our design experts. We'll help you translate these ideas into a concrete plan for your home.
            </p>
            <Link href={`/consultation?service=${service.slug}`} className="bg-[var(--color-surface)] text-[var(--color-ink)] hover:bg-[var(--color-accent-deep)] hover:text-[var(--color-surface)] transition-colors px-10 py-5 uppercase tracking-[0.2em] text-[10px] font-medium inline-block focus-visible:outline-[var(--color-accent)]">
              Discuss your project
            </Link>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
