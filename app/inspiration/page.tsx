import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container, FadeIn, Button } from "@/components/ui";
import { getAllDesigns } from "@/lib/designs";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Inspiration & Ideas — Sky Interior",
};

export default function InspirationPage() {
  const designs = getAllDesigns();

  // Curated collections from local data
  const collections = [
    {
      title: "Compact Luxury",
      description: "Clever spatial planning for urban apartments.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
      query: "small"
    },
    {
      title: "Natural Light & Neutrals",
      description: "Airy, sunlit spaces focusing on texture over color.",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200",
      query: "neutral"
    },
    {
      title: "Entertainer's Kitchens",
      description: "Open-plan culinary spaces designed for hosting.",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1200",
      query: "kitchen"
    }
  ];

  return (
    <>
      <Nav />
      <main className="bg-[var(--color-surface)] min-h-screen">
        {/* Immersive Hero */}
        <div className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 bg-[var(--color-ink)] flex items-end min-h-[40vh]">
          <Container className="relative z-10 w-full">
            <FadeIn>
              <div className="flex items-center gap-4 mb-12">
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-surface)]/60">Home</span>
                <span className="text-[var(--color-surface)]/60">/</span>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-surface)]/60">Ideas</span>
                <span className="text-[var(--color-surface)]/60">/</span>
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-surface)]">Inspiration</span>
              </div>
              <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-[var(--color-surface)] mb-8 max-w-4xl">
                Curated Inspiration
              </h1>
              <p className="text-xl text-[var(--color-surface)]/80 max-w-2xl font-light">
                Explore hand-picked collections of our finest design ideas, organized to help you envision your perfect space.
              </p>
            </FadeIn>
          </Container>
        </div>

        {/* Featured Story & Editorial Grid */}
        <div className="py-24 bg-[var(--color-paper)]">
          <Container>
            {/* Featured Story (Index 0) */}
            {collections[0] && (
              <FadeIn>
                <div className="mb-24 lg:mb-40">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="w-8 h-px bg-[var(--color-ink)]" />
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink)]">Featured Story</span>
                  </div>
                  <Link href={`/designs?search=${collections[0].query}`} className="group block focus-visible:outline-[var(--color-accent-deep)]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                      <div className="lg:col-span-8">
                        <div className="relative aspect-[16/9] bg-[var(--color-border)] overflow-hidden">
                          <Image 
                            src={collections[0].image} 
                            alt={collections[0].title} 
                            fill 
                            sizes="(max-width: 1024px) 100vw, 75vw" 
                            className="object-cover transform group-hover:scale-105 transition-transform duration-[3s] ease-out" 
                            priority
                          />
                        </div>
                      </div>
                      <div className="lg:col-span-4 flex flex-col justify-center">
                        <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-[var(--color-ink)] mb-6 leading-[1.1] group-hover:text-[var(--color-accent-deep)] transition-colors">{collections[0].title}</h2>
                        <p className="font-sans text-lg text-[var(--color-ink-muted)] font-light leading-relaxed mb-10">{collections[0].description}</p>
                        <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[var(--color-ink)] group-hover:text-[var(--color-accent-deep)] transition-colors inline-flex items-center gap-4">
                          Read Story <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </FadeIn>
            )}

            {/* Editorial Grid (Index 1+) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 pt-24 border-t border-[var(--color-border)]">
              {collections.slice(1).map((collection, i) => (
                <FadeIn key={collection.title} delay={i * 0.1}>
                  <Link href={`/designs?search=${collection.query}`} className="group block focus-visible:outline-[var(--color-accent-deep)]">
                    <div className="relative aspect-[4/5] bg-[var(--color-border)] overflow-hidden mb-8">
                      <Image 
                        src={collection.image} 
                        alt={collection.title} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 50vw" 
                        className="object-cover transform group-hover:scale-105 transition-all duration-[2s] ease-out opacity-90 group-hover:opacity-100 grayscale-[0.2] group-hover:grayscale-0" 
                      />
                    </div>
                    <h2 className="font-serif text-3xl text-[var(--color-ink)] mb-4 group-hover:text-[var(--color-accent-deep)] transition-colors">{collection.title}</h2>
                    <p className="font-sans text-lg text-[var(--color-ink-muted)] font-light leading-relaxed mb-8">{collection.description}</p>
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[var(--color-ink)] group-hover:text-[var(--color-accent-deep)] transition-colors inline-flex items-center gap-4">
                      Explore Concept <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                    </span>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </Container>
        </div>

        {/* Teaser */}
        <section className="py-24 bg-[var(--color-surface)] border-t border-[var(--color-border)] text-center">
          <Container>
            <FadeIn>
              <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-[var(--color-ink)] mb-6">Need expert guidance?</h2>
              <p className="text-[var(--color-ink-muted)] text-lg mb-12 max-w-lg mx-auto font-light leading-relaxed">
                Bring your inspiration to our design experts. We'll help you translate these ideas into a concrete plan for your home.
              </p>
              <Button href="/consultation" className="bg-[var(--color-ink)] text-[var(--color-surface)] hover:bg-[var(--color-accent-deep)] transition-colors px-10 py-5 uppercase tracking-[0.2em] text-[10px] font-medium focus-visible:outline-[var(--color-accent-deep)]">
                Book a Consultation
              </Button>
            </FadeIn>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
