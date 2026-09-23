import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container, FadeIn, Button } from "@/components/ui";
import { getAllDesigns, ROOM_CATEGORIES } from "@/lib/designs";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Explore by Room — Sky Interior",
};

const ROOM_DETAILS: Record<string, { desc: string, img: string }> = {
  "Living Room": { desc: "The heart of the home, designed for connection and relaxation.", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200" },
  "Kitchen": { desc: "Functional, beautiful spaces built for culinary creativity.", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200" },
  "Bedroom": { desc: "Personal sanctuaries designed for deep rest and tranquility.", img: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=1200" },
  "Bathroom": { desc: "Spa-like retreats featuring premium finishes and smart layouts.", img: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=1200" },
};

export default function RoomsPage() {
  const designs = getAllDesigns();

  return (
    <>
      <Nav />
      <main className="bg-[var(--color-surface)] min-h-screen">
        {/* Immersive Hero */}
        <div className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 bg-[var(--color-ink)] flex items-end min-h-[40vh]">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000"
              alt="Immersive Room Inspiration"
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
                <span className="font-sans text-xs tracking-widest uppercase text-[var(--color-surface)]">Rooms</span>
              </div>
              <h1 className="font-serif text-[length:var(--text-heading-xl)] lg:text-[length:var(--text-display-m)] text-[var(--color-surface)] mb-6 drop-shadow-md">
                Room Inspiration
              </h1>
              <p className="text-[length:var(--text-body-l)] text-[var(--color-surface)]/80 max-w-2xl font-light drop-shadow-md">
                Discover curated concepts tailored for every living space. From functional kitchens to serene bedrooms, find the perfect blueprint for your home.
              </p>
            </FadeIn>
          </Container>
        </div>

        {/* Magazine Sections */}
        <div className="py-16">
          {Object.entries(ROOM_DETAILS).map(([room, details], index) => {
            const roomDesigns = designs.filter(d => d.room === room).slice(0, 4);
            if (roomDesigns.length === 0) return null;

            return (
              <section key={room} className="py-24 border-b border-border last:border-0">
                <Container>
                  <FadeIn>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 items-center">
                      <div className={`lg:col-span-4 flex flex-col justify-center ${index % 2 !== 0 ? 'lg:order-2 lg:pl-8' : 'lg:order-1'}`}>
                        <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-[var(--color-ink)] mb-6 leading-tight">{room}</h2>
                        <p className="font-sans text-[var(--color-ink-muted)] text-lg leading-relaxed font-light mb-8 max-w-sm">{details.desc}</p>
                        <Link href={`/designs?room=${encodeURIComponent(room)}`} className="text-[10px] font-sans uppercase tracking-[0.2em] text-[var(--color-accent-deep)] hover:text-[var(--color-ink)] transition-colors inline-flex items-center gap-4 group">
                          Explore Category <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                        </Link>
                      </div>
                      <div className={`lg:col-span-8 ${index % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                        <div className="relative aspect-[4/3] lg:aspect-[21/9] bg-[var(--color-border)] overflow-hidden">
                          <Image src={details.img} alt={`${room} inspiration`} fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover hover:scale-105 transition-transform duration-[2s] ease-out" />
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {roomDesigns.map((design, i) => (
                      <FadeIn key={design.id} delay={i * 0.1}>
                        <Link href={`/designs?search=${encodeURIComponent(design.title)}`} className="group block focus-visible:outline-[var(--color-accent-deep)]">
                          <div className="relative aspect-[4/5] bg-[var(--color-border)] mb-4 overflow-hidden border border-[var(--color-border)]">
                            <Image src={design.image} alt={design.title} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover opacity-90 group-hover:opacity-100 transform group-hover:scale-105 transition-all duration-[2s] ease-out grayscale-[0.2] group-hover:grayscale-0" />
                          </div>
                          <h4 className="font-serif text-[var(--color-ink)] group-hover:text-[var(--color-accent-deep)] transition-colors text-lg mb-1">{design.title}</h4>
                          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">{design.style}</span>
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
              <h2 className="font-serif text-[length:var(--text-heading-l)] text-[var(--color-ink)] mb-6">Found what you like?</h2>
              <p className="text-[var(--color-text-muted)] mb-10 max-w-lg mx-auto font-light">
                Bring these concepts to life. Get an indicative estimate based on your exact floorplan and material preferences.
              </p>
              <Button href="/estimate" className="bg-[var(--color-ink)] text-[var(--color-surface)] hover:bg-[var(--color-accent)] transition-colors px-10 py-4 uppercase tracking-widest text-xs font-medium focus-visible:outline-[var(--color-accent)]">
                Get an Estimate
              </Button>
            </FadeIn>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
