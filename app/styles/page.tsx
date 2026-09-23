import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container, FadeIn, Button } from "@/components/ui";
import { getAllDesigns } from "@/lib/designs";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Explore by Style — Sky Interior",
};

const STYLE_DETAILS: Record<string, { desc: string, img: string, colors: string[] }> = {
  "Modern": { desc: "Clean lines, uncluttered spaces, and a focus on function and simplicity.", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200", colors: ["#FFFFFF", "#333333", "#D1D5DB"] },
  "Minimal": { desc: "Pared back to the essentials. Characterized by negative space and pure forms.", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200", colors: ["#F9FAFB", "#F3F4F6", "#9CA3AF"] },
  "Japandi": { desc: "The intersection of Scandinavian functionality and Japanese rustic minimalism.", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200", colors: ["#E7E5E4", "#D6D3D1", "#78716C"] },
  "Luxury": { desc: "Rich textures, premium materials, and sophisticated, statement-making layouts.", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200", colors: ["#1F2937", "#D4AF37", "#4B5563"] },
};

export default function StylesPage() {
  const designs = getAllDesigns();

  return (
    <>
      <Nav />
      <main className="bg-[var(--color-surface)] min-h-screen">
        {/* Immersive Hero */}
        <div className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 bg-[var(--color-ink)] flex items-end min-h-[40vh]">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
              alt="Immersive Style Inspiration"
              fill
              className="object-cover opacity-50 grayscale-[0.2]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/60 to-transparent" />
          </div>
          <Container className="relative z-10 w-full">
            <FadeIn>
              <div className="flex items-center gap-4 mb-8">
                <span className="font-sans text-xs tracking-widest uppercase text-[var(--color-surface)]/60">Home</span>
                <span className="text-[var(--color-surface)]/60">/</span>
                <span className="font-sans text-xs tracking-widest uppercase text-[var(--color-surface)]/60">Ideas</span>
                <span className="text-[var(--color-surface)]/60">/</span>
                <span className="font-sans text-xs tracking-widest uppercase text-[var(--color-surface)]">Styles</span>
              </div>
              <h1 className="font-serif text-[length:var(--text-heading-xl)] lg:text-[length:var(--text-display-m)] text-[var(--color-surface)] mb-6 drop-shadow-md">
                Design Styles
              </h1>
              <p className="text-[length:var(--text-body-l)] text-[var(--color-surface)]/80 max-w-2xl font-light drop-shadow-md">
                Find the aesthetic that speaks to you. From minimalist tranquility to striking modern luxury, explore the visual languages that define our work.
              </p>
            </FadeIn>
          </Container>
        </div>

        {/* Magazine Sections */}
        <div className="py-16">
          {Object.entries(STYLE_DETAILS).map(([style, details], index) => {
            const styleDesigns = designs.filter(d => d.style === style).slice(0, 3);
            if (styleDesigns.length === 0) return null;

            return (
              <section key={style} className="py-24 border-b border-border last:border-0">
                <Container>
                  <FadeIn>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-16 items-center">
                      <div className={`lg:col-span-5 ${index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                        <div className="relative aspect-[3/4] bg-[var(--color-border)] overflow-hidden">
                          <Image src={details.img} alt={`${style} style mood`} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover hover:scale-105 transition-transform duration-[2s] ease-out" />
                        </div>
                      </div>
                      <div className={`lg:col-span-7 flex flex-col justify-center ${index % 2 !== 0 ? 'lg:order-1 lg:pr-12' : 'lg:order-2 lg:pl-12'}`}>
                        <h2 className="font-serif text-[clamp(3rem,5vw,4.5rem)] text-[var(--color-ink)] mb-8 leading-none">{style}</h2>
                        <p className="font-sans text-[var(--color-ink-muted)] text-xl leading-relaxed font-light mb-12 max-w-xl">{details.desc}</p>
                        
                        <div className="mb-16">
                          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)] block mb-6">Core Palette</span>
                          <div className="flex gap-4">
                            {details.colors.map(color => (
                              <div key={color} className="w-16 h-16 rounded-none border border-[var(--color-border)] shadow-sm" style={{ backgroundColor: color }} aria-label={`Color ${color}`} />
                            ))}
                          </div>
                        </div>

                        <Link href={`/designs?style=${encodeURIComponent(style)}`} className="text-[10px] font-sans uppercase tracking-[0.2em] text-[var(--color-accent-deep)] hover:text-[var(--color-ink)] transition-colors inline-flex items-center gap-4 group">
                          View {style} Portfolio <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                        </Link>
                      </div>
                    </div>
                  </FadeIn>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-[var(--color-border)]/50">
                    {styleDesigns.map((design, i) => (
                      <FadeIn key={design.id} delay={i * 0.1}>
                        <Link href={`/designs?search=${encodeURIComponent(design.title)}`} className="group block focus-visible:outline-[var(--color-accent-deep)]">
                          <div className="relative aspect-video bg-[var(--color-border)] mb-6 overflow-hidden">
                            <Image src={design.image} alt={design.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-90 group-hover:opacity-100 transform group-hover:scale-105 transition-all duration-[2s] ease-out grayscale-[0.2] group-hover:grayscale-0" />
                          </div>
                          <h4 className="font-serif text-[var(--color-ink)] group-hover:text-[var(--color-accent-deep)] transition-colors text-lg mb-2">{design.title}</h4>
                          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">{design.room}</span>
                        </Link>
                      </FadeIn>
                    ))}
                  </div>
                </Container>
              </section>
            );
          })}
        </div>

        {/* Teaser */}
        <section className="py-24 bg-[var(--color-surface)] border-t border-[var(--color-border)] text-center">
          <Container>
            <FadeIn>
              <h2 className="font-serif text-[length:var(--text-heading-l)] text-[var(--color-ink)] mb-6">Found your aesthetic?</h2>
              <p className="text-[var(--color-text-muted)] mb-10 max-w-lg mx-auto font-light">
                Our designers can adapt any of these styles to fit your unique floorplan and lifestyle.
              </p>
              <Button href="/consultation" className="bg-[var(--color-accent)] text-[var(--color-ink)] hover:bg-[var(--color-surface)] transition-colors px-10 py-4 uppercase tracking-widest text-xs font-medium focus-visible:outline-[var(--color-surface)]">
                Talk to a Designer
              </Button>
            </FadeIn>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
