import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Testimonials } from "@/components/Testimonials";
import { CTABand } from "@/components/CTABand";
import { Footer } from "@/components/Footer";
import { Container, FadeIn, Button } from "@/components/ui";
import { ValuePillars } from "@/components/ValuePillars";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { MaterialsShowcase } from "@/components/MaterialsShowcase";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        {/* Editorial Introduction */}
        <ValuePillars />

        {/* Featured Projects */}
        <ProjectGrid />

        {/* Explore Rooms & Styles — High Contrast Editorial Spread */}
        <section className="py-24 lg:py-40 bg-[var(--color-ink)] text-[var(--color-surface)]">
          <Container>
            <FadeIn>
              <div className="flex items-center gap-4 mb-8">
                <span className="w-8 h-px bg-[var(--color-surface)]/30 block" />
                <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-surface)]/70">Design Discovery</h2>
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
                <h3 className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] max-w-2xl">
                  Find your inspiration across curated rooms and distinct visual styles.
                </h3>
                <Button href="/designs" className="bg-[var(--color-surface)] text-[var(--color-ink)] hover:bg-[var(--color-accent-deep)] transition-colors px-10 py-5 rounded-none uppercase tracking-[0.2em] text-[10px] font-medium shrink-0">
                  View All Designs
                </Button>
              </div>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16">
              <div className="md:col-span-8">
                <FadeIn delay={0.1}>
                  <Link href="/rooms" className="group block relative aspect-[4/3] lg:aspect-[16/9] w-full bg-[var(--color-surface)]/10 overflow-hidden focus-visible:outline-[var(--color-accent-deep)]">
                    <Image src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200" alt="Rooms" fill sizes="(max-width: 768px) 100vw, 66vw" className="object-cover transform group-hover:scale-105 transition-transform duration-[2s] ease-out opacity-90 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/90 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
                    <div className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12 z-10 flex flex-col items-start">
                      <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-surface)]/70 mb-3 block">Explore By</span>
                      <span className="font-serif text-3xl lg:text-5xl text-[var(--color-surface)] flex items-center gap-6">
                        Room Category
                        <span className="opacity-0 -translate-x-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0 font-serif text-3xl lg:text-4xl text-[var(--color-accent)]">→</span>
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              </div>
              
              <div className="md:col-span-4 md:mt-24">
                <FadeIn delay={0.2}>
                  <Link href="/styles" className="group block relative aspect-[3/4] lg:aspect-[4/5] w-full bg-[var(--color-surface)]/10 overflow-hidden focus-visible:outline-[var(--color-accent-deep)]">
                    <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200" alt="Styles" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transform group-hover:scale-105 transition-transform duration-[2s] ease-out opacity-90 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/90 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
                    <div className="absolute bottom-8 left-8 lg:bottom-10 lg:left-10 z-10 flex flex-col items-start">
                      <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-surface)]/70 mb-3 block">Explore By</span>
                      <span className="font-serif text-2xl lg:text-4xl text-[var(--color-surface)] flex items-center gap-4">
                        Design Style
                        <span className="opacity-0 -translate-x-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0 font-serif text-2xl lg:text-3xl text-[var(--color-accent)]">→</span>
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              </div>
            </div>
          </Container>
        </section>

        {/* Services Teaser — Bento Grid */}
        <section className="py-24 lg:py-40 bg-[var(--color-surface)]">
          <Container>
            <FadeIn>
              <div className="flex items-center gap-4 mb-8">
                <span className="w-8 h-px bg-[var(--color-accent-deep)] block" />
                <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent-deep)]">Our Expertise</h2>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20">
                <h3 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-[var(--color-ink)] max-w-2xl leading-[1.05]">
                  Comprehensive interior solutions for every space.
                </h3>
                <Link
                  href="/services"
                  className="group inline-flex items-center gap-4 text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--color-ink)] hover:text-[var(--color-accent-deep)] transition-colors duration-300 pb-2 border-b border-[var(--color-border)] hover:border-[var(--color-accent-deep)]"
                >
                  <span>Explore Services</span>
                  <span className="transform transition-transform duration-500 group-hover:translate-x-2">→</span>
                </Link>
              </div>
            </FadeIn>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Massive Hero-style Service Block */}
              <div className="lg:col-span-8">
                <FadeIn delay={0.1} className="h-full">
                  <Link href="/services/full-home-interiors" className="group block relative h-full min-h-[60vh] bg-[var(--color-border)] overflow-hidden focus-visible:outline-[var(--color-accent-deep)]">
                    <Image src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200" alt="Full Home Interiors" fill className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105 opacity-95 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" aria-hidden="true" />
                    <div className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12 right-8 z-10 flex justify-between items-end">
                      <div>
                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--color-surface)]/70 mb-3 block">Service 01</span>
                        <h4 className="font-serif text-3xl lg:text-4xl text-[var(--color-surface)]">Full Home Interiors</h4>
                      </div>
                      <span className="w-12 h-12 rounded-full border border-[var(--color-surface)]/30 flex items-center justify-center text-[var(--color-surface)] transform transition-transform duration-500 group-hover:-rotate-45 group-hover:bg-[var(--color-surface)] group-hover:text-[var(--color-ink)]">
                        →
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              </div>
              
              {/* Stacked Smaller Services */}
              <div className="lg:col-span-4 flex flex-col gap-8">
                <FadeIn delay={0.2} className="flex-1">
                  <Link href="/services/modular-kitchens" className="group block relative h-full min-h-[30vh] bg-[var(--color-border)] overflow-hidden focus-visible:outline-[var(--color-accent-deep)]">
                    <Image src="https://images.unsplash.com/photo-1556910103-1c02745a872e?auto=format&fit=crop&q=80&w=800" alt="Modular Kitchens" fill className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105 opacity-95 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" aria-hidden="true" />
                    <div className="absolute bottom-6 left-6 right-6 z-10 flex justify-between items-end">
                      <div>
                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--color-surface)]/70 mb-2 block">Service 02</span>
                        <h4 className="font-serif text-2xl text-[var(--color-surface)]">Modular Kitchens</h4>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
                
                <FadeIn delay={0.3} className="flex-1">
                  <Link href="/services/commercial-office-spaces" className="group block relative h-full min-h-[30vh] bg-[var(--color-border)] overflow-hidden focus-visible:outline-[var(--color-accent-deep)]">
                    <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" alt="Commercial Spaces" fill className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105 opacity-95 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" aria-hidden="true" />
                    <div className="absolute bottom-6 left-6 right-6 z-10 flex justify-between items-end">
                      <div>
                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--color-surface)]/70 mb-2 block">Service 03</span>
                        <h4 className="font-serif text-2xl text-[var(--color-surface)]">Commercial Spaces</h4>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              </div>
            </div>
          </Container>
        </section>

        {/* Before / After */}
        <section className="py-24 lg:py-32 bg-surface">
          <Container>
            <FadeIn>
              <div className="flex items-center gap-4 mb-16">
                <span className="w-8 h-px bg-accent-deep block" />
                <h2 className="font-sans text-xs tracking-widest uppercase text-accent-deep">Transformation</h2>
              </div>
              <h3 className="font-serif text-[length:var(--text-h2)] lg:text-[length:var(--text-display)] text-ink mb-16 max-w-3xl">
                See the difference considered design makes.
              </h3>
            </FadeIn>
            <FadeIn delay={0.2}>
              <BeforeAfterSlider 
                beforeImage="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200"
                afterImage="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200"
                beforeLabel="Original Space"
                afterLabel="Sky Interior Design"
              />
            </FadeIn>
          </Container>
        </section>

        <ProcessSteps />
        
        {/* Materials / Finishes */}
        <section className="py-24 lg:py-32 bg-[var(--color-surface)] overflow-hidden">
          <Container className="mb-16">
            <FadeIn>
              <div className="flex items-center gap-4 mb-8">
                <span className="w-8 h-px bg-[var(--color-accent)] block" />
                <h2 className="font-sans text-xs tracking-widest uppercase text-[var(--color-accent)]">Materials & Finishes</h2>
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <h3 className="font-serif text-[length:var(--text-heading-xl)] lg:text-[length:var(--text-display-m)] text-[var(--color-ink)] max-w-2xl leading-tight">
                  Tactile details that define premium living.
                </h3>
              </div>
            </FadeIn>
          </Container>
          <div className="pl-6 md:pl-[max(1.5rem,calc((100vw-80rem)/2))]">
            <MaterialsShowcase />
          </div>
        </section>

        {/* Interactive Estimate Teaser */}
        <section className="py-32 lg:py-48 bg-[var(--color-ink)] text-[var(--color-surface)] relative">
          <Container className="relative z-10 text-center">
            <FadeIn>
              <div className="flex items-center justify-center gap-4 mb-8">
                <span className="w-8 h-px bg-[var(--color-surface)]/30 block" />
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--color-surface)]/70">
                  Plan Your Project
                </span>
                <span className="w-8 h-px bg-[var(--color-surface)]/30 block" />
              </div>
              <h2 className="font-serif text-[clamp(3rem,8vw,5.5rem)] leading-[0.95] mb-12 text-[var(--color-surface)] max-w-4xl mx-auto tracking-tight">
                An indicative estimate, calculated instantly.
              </h2>
              <p className="font-sans text-[length:var(--text-body-l)] text-[var(--color-surface)]/60 leading-relaxed max-w-xl mx-auto font-light mb-16">
                Answer a few quick questions about your space and preferred style to see what your project might cost. No commitments required.
              </p>
              <Button href="/estimate" className="bg-[var(--color-surface)] text-[var(--color-ink)] hover:bg-[var(--color-accent-deep)] hover:text-[var(--color-surface)] transition-colors duration-300 px-10 py-5 uppercase tracking-[0.2em] text-[10px] font-medium rounded-none">
                Calculate Estimate
              </Button>
            </FadeIn>
          </Container>
        </section>
        
        {/* Guides Teaser */}
        <section className="py-24 lg:py-40 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
          <Container>
            <FadeIn>
              <div className="flex items-center gap-4 mb-16">
                <span className="w-8 h-px bg-[var(--color-accent-deep)] block" />
                <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent-deep)]">Knowledge Library</h2>
              </div>
              <div className="flex flex-col lg:flex-row justify-between items-start gap-16">
                <div className="lg:w-1/3">
                  <h3 className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] text-[var(--color-ink)] leading-[1.05] mb-8">
                    The Design Journal
                  </h3>
                  <p className="font-sans text-[length:var(--text-body-l)] text-[var(--color-ink-muted)] leading-relaxed font-light mb-12 max-w-md">
                    Insights, perspectives, and practical advice on interior architecture, space planning, and premium materials.
                  </p>
                  <Button href="/guides" variant="outline" className="hidden lg:inline-flex uppercase tracking-[0.2em] text-[10px] px-8 py-4">All Guides</Button>
                </div>
                
                <div className="lg:w-2/3 w-full flex flex-col border-t border-[var(--color-border)]">
                  <FadeIn delay={0.1}>
                    <Link href="/guides/budget-cost" className="group flex flex-col sm:flex-row sm:items-center justify-between py-8 border-b border-[var(--color-border)] hover:border-[var(--color-ink)] transition-colors">
                      <div className="flex-1 pr-8">
                        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-3 block">Planning · 8 Min Read</span>
                        <h4 className="font-serif text-2xl lg:text-3xl text-[var(--color-ink)] mb-3 group-hover:text-[var(--color-accent-deep)] transition-colors">How much does an interior really cost?</h4>
                      </div>
                      <div className="hidden sm:block overflow-hidden relative w-32 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                         <Image src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=400" alt="Cost guide" fill className="object-cover transform group-hover:scale-110 transition-transform duration-700" />
                      </div>
                    </Link>
                  </FadeIn>
                  <FadeIn delay={0.2}>
                    <Link href="/guides/kitchen" className="group flex flex-col sm:flex-row sm:items-center justify-between py-8 border-b border-[var(--color-border)] hover:border-[var(--color-ink)] transition-colors">
                      <div className="flex-1 pr-8">
                        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-3 block">Rooms · 6 Min Read</span>
                        <h4 className="font-serif text-2xl lg:text-3xl text-[var(--color-ink)] mb-3 group-hover:text-[var(--color-accent-deep)] transition-colors">Designing the perfect modular kitchen</h4>
                      </div>
                      <div className="hidden sm:block overflow-hidden relative w-32 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                         <Image src="https://images.unsplash.com/photo-1556910103-1c02745a872e?auto=format&fit=crop&q=80&w=400" alt="Kitchen guide" fill className="object-cover transform group-hover:scale-110 transition-transform duration-700" />
                      </div>
                    </Link>
                  </FadeIn>
                </div>
              </div>
            </FadeIn>
            <div className="mt-12 lg:hidden">
                <Button href="/guides" variant="outline" className="w-full uppercase tracking-[0.2em] text-[10px] py-4">All Guides</Button>
            </div>
          </Container>
        </section>

        <CTABand />
      </main>
      <Footer />
    </>
  );
}
