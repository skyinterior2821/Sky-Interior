import { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container, Section, SectionHeader, PageShell } from "@/components/ui";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CTABand } from "@/components/CTABand";
import servicesData from "@/content/services.json";

export const metadata: Metadata = {
  title: "Interior Design Services | Sky Interior",
  description: "Explore our comprehensive range of interior design services including modular kitchens, full home interiors, and commercial spaces.",
};

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <PageShell className="pb-0">
        <Container>
          <Breadcrumbs 
            items={[
              { label: "Home", href: "/" },
              { label: "Services" }
            ]} 
          />
          
          <div className="max-w-4xl mt-8 mb-16 lg:mb-24">
            <h1 className="font-serif text-[clamp(3rem,5vw,5rem)] text-[var(--color-ink)] mb-8 leading-none">
              Services
            </h1>
            <p className="font-sans text-[length:var(--text-lg)] text-[var(--color-ink-muted)] font-light max-w-2xl leading-relaxed">
              Thoughtful interiors, designed around how you live. From bespoke modular kitchens to complete home transformations, we offer end-to-end execution.
            </p>
          </div>
        </Container>

        <div className="py-24 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
          <Container>
            <div className="flex items-center gap-4 mb-24">
              <span className="w-8 h-px bg-[var(--color-ink)] block" />
              <h2 className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink)]">Studio Services</h2>
            </div>
            
            <div className="flex flex-col gap-32">
              {servicesData.map((service, idx) => (
                <div key={service.slug} className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center group`}>
                  
                  <div className={`lg:col-span-5 flex flex-col justify-center ${idx % 2 === 1 ? 'lg:order-2 lg:pl-12' : 'lg:order-1 lg:pr-12'}`}>
                    <span className="font-serif text-[clamp(3rem,5vw,4.5rem)] text-[var(--color-accent)] opacity-50 mb-6 block leading-none">
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <h3 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-[var(--color-ink)] mb-6 leading-[1.1] group-hover:text-[var(--color-accent)] transition-colors">
                      {service.title}
                    </h3>
                    <p className="font-sans text-lg text-[var(--color-ink-muted)] font-light leading-relaxed mb-10 max-w-md">
                      {service.description}
                    </p>
                    <Link href={`/services/${service.slug}`} className="text-[10px] font-sans uppercase tracking-[0.2em] text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors inline-flex items-center gap-4">
                      Explore Service <span className="transform transition-transform group-hover:translate-x-2">→</span>
                    </Link>
                  </div>
                  
                  <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <Link href={`/services/${service.slug}`} className="block relative aspect-[4/3] lg:aspect-[16/10] bg-[var(--color-border)] overflow-hidden focus-visible:outline-[var(--color-accent)]">
                      {service.heroImage ? (
                        <img 
                          src={service.heroImage} 
                          alt={service.title} 
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-[var(--color-ink-muted)] text-[10px] uppercase tracking-[0.2em]">
                          Coming Soon
                        </div>
                      )}
                    </Link>
                  </div>
                  
                </div>
              ))}
            </div>
          </Container>
        </div>

        <div className="py-32 bg-[var(--color-paper)]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              <div>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-6 block">Our Approach</span>
                <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-[var(--color-ink)] mb-8 leading-tight">
                  A seamless journey from concept to reality.
                </h2>
                <p className="font-sans text-lg text-[var(--color-ink-muted)] font-light leading-relaxed mb-12 max-w-lg">
                  We believe that great design should be matched by flawless execution. Our integrated process ensures that the vision we create together is realized down to the finest detail.
                </p>
                <Link href="/consultation" className="text-[10px] font-sans uppercase tracking-[0.2em] text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors inline-flex items-center gap-4 group">
                  Discuss your project <span className="transform transition-transform group-hover:translate-x-2">→</span>
                </Link>
              </div>
              <div className="pt-4 lg:pt-12">
                <ul className="space-y-16">
                  <li className="flex flex-col md:flex-row gap-6 md:gap-12 group">
                    <span className="font-serif text-[clamp(3rem,4vw,4rem)] text-[var(--color-border-strong)] group-hover:text-[var(--color-accent)] transition-colors leading-none">01</span>
                    <div>
                      <h4 className="font-serif text-2xl text-[var(--color-ink)] mb-3">Consultation</h4>
                      <p className="font-sans text-[var(--color-ink-muted)] font-light leading-relaxed max-w-sm">Understanding your space, budget, and lifestyle to form a strong foundation.</p>
                    </div>
                  </li>
                  <li className="flex flex-col md:flex-row gap-6 md:gap-12 group">
                    <span className="font-serif text-[clamp(3rem,4vw,4rem)] text-[var(--color-border-strong)] group-hover:text-[var(--color-accent)] transition-colors leading-none">02</span>
                    <div>
                      <h4 className="font-serif text-2xl text-[var(--color-ink)] mb-3">Design & Planning</h4>
                      <p className="font-sans text-[var(--color-ink-muted)] font-light leading-relaxed max-w-sm">Detailed layouts, 3D visualizations, and meticulous material selection.</p>
                    </div>
                  </li>
                  <li className="flex flex-col md:flex-row gap-6 md:gap-12 group">
                    <span className="font-serif text-[clamp(3rem,4vw,4rem)] text-[var(--color-border-strong)] group-hover:text-[var(--color-accent)] transition-colors leading-none">03</span>
                    <div>
                      <h4 className="font-serif text-2xl text-[var(--color-ink)] mb-3">Execution & Handover</h4>
                      <p className="font-sans text-[var(--color-ink-muted)] font-light leading-relaxed max-w-sm">Stringent quality control, fabrication, and timely site delivery.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>
      </PageShell>
      <Footer />
    </>
  );
}
