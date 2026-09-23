"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Container, Section, SectionHeader, PageShell, FadeIn } from "@/components/ui";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CTABand } from "@/components/CTABand";
import guidesData from "@/content/guides.json";

export function GuidesClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const selectedCategory = searchParams.get("category") || "ALL";
  
  // Extract unique categories
  const categories = ["ALL", ...Array.from(new Set(guidesData.map(g => g.category)))];

  // Filter guides
  const filteredGuides = selectedCategory === "ALL" 
    ? guidesData 
    : guidesData.filter(g => g.category.toUpperCase() === selectedCategory.toUpperCase());

  const handleCategoryClick = (category: string) => {
    if (category === "ALL") {
      router.push("/guides");
    } else {
      router.push(`/guides?category=${category}`);
    }
  };

  return (
    <PageShell className="pb-0">
      <Container>
        <Breadcrumbs 
          items={[
            { label: "Home", href: "/" },
            { label: "Guides" }
          ]} 
        />
        
        <div className="max-w-4xl mt-8 mb-20 lg:mb-32 text-center mx-auto">
          <FadeIn>
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent)] mb-6 block">The Design Journal</span>
            <h1 className="font-serif text-[clamp(3.5rem,6vw,6rem)] text-[var(--color-ink)] mb-8 leading-none">
              Ideas & Intel
            </h1>
            <p className="font-sans text-lg text-[var(--color-ink-muted)] font-light max-w-xl mx-auto leading-relaxed">
              Curated perspectives on materials, spatial planning, and the details that elevate a home.
            </p>
          </FadeIn>
        </div>

        {/* FEATURED GUIDE (If ALL is selected, show the first guide as featured) */}
        {selectedCategory === "ALL" && guidesData.length > 0 && (
          <FadeIn delay={0.2}>
            <Link href={`/guides/${guidesData[0].slug}`} className="group block mb-32 focus-visible:outline-[var(--color-accent)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                <div className="lg:col-span-8 relative aspect-[4/3] lg:aspect-[16/9] w-full bg-[var(--color-border)] overflow-hidden">
                  <Image 
                    src={guidesData[0].heroImage} 
                    alt={guidesData[0].title} 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="lg:col-span-4 flex flex-col justify-center">
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-4 block">
                    Featured • {guidesData[0].category} <span className="mx-2 opacity-30">/</span> {guidesData[0].readingTime}
                  </span>
                  <h2 className="font-serif text-[clamp(2.5rem,3vw,3.5rem)] text-[var(--color-ink)] mb-6 leading-[1.1] group-hover:text-[var(--color-accent)] transition-colors">
                    {guidesData[0].title}
                  </h2>
                  <p className="font-sans text-lg text-[var(--color-ink-muted)] font-light leading-relaxed mb-10 max-w-sm">
                    {guidesData[0].excerpt}
                  </p>
                  <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors flex items-center gap-4">
                    Read Guide <span className="transform transition-transform group-hover:translate-x-2">→</span>
                  </span>
                </div>
              </div>
            </Link>
          </FadeIn>
        )}
        
        {/* CATEGORY FILTERS */}
        <div className="flex flex-wrap gap-8 md:gap-12 mb-16 border-b border-[var(--color-border)] pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`font-sans text-[10px] tracking-[0.2em] uppercase pb-4 border-b-2 transition-colors focus-visible:outline-none ${
                selectedCategory === cat 
                  ? 'text-[var(--color-ink)] border-[var(--color-ink)] font-medium' 
                  : 'text-[var(--color-ink-muted)] border-transparent hover:text-[var(--color-ink)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GUIDES GRID */}
        {filteredGuides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 mb-32">
            {filteredGuides.map((guide, i) => (
              <FadeIn key={guide.slug} delay={0.1 * i}>
                <Link href={`/guides/${guide.slug}`} className="group flex flex-col h-full focus-visible:outline-[var(--color-accent)]">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-border)] mb-8">
                    <Image 
                      src={guide.heroImage} 
                      alt={guide.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-4 block">
                    {guide.category} <span className="mx-2 opacity-30">/</span> {guide.readingTime}
                  </span>
                  <h3 className="font-serif text-2xl text-[var(--color-ink)] mb-4 group-hover:text-[var(--color-accent)] transition-colors leading-[1.2]">
                    {guide.title}
                  </h3>
                  <p className="font-sans text-sm text-[var(--color-ink-muted)] font-light leading-relaxed line-clamp-3 mb-6">
                    {guide.excerpt}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center border-y border-[var(--color-border)] mb-32">
            <p className="font-sans text-lg text-[var(--color-ink-muted)] font-light">No guides found in this category.</p>
            <button 
              onClick={() => handleCategoryClick("ALL")}
              className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink)] mt-6 hover:text-[var(--color-accent)] transition-colors"
            >
              Return to All Guides
            </button>
          </div>
        )}
      </Container>
      
      {/* CONTEXTUAL CTA */}
      <section className="py-24 bg-[var(--color-ink)] text-center">
        <Container>
          <FadeIn>
            <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-[var(--color-surface)] mb-6">Have a space in mind?</h2>
            <p className="text-[var(--color-surface)]/80 text-lg mb-12 max-w-lg mx-auto font-light leading-relaxed">
              Explore our comprehensive range of interior design services and let's build something beautiful.
            </p>
            <Link href={`/services`} className="bg-[var(--color-surface)] text-[var(--color-ink)] hover:bg-[var(--color-accent-deep)] hover:text-[var(--color-surface)] transition-colors px-10 py-5 uppercase tracking-[0.2em] text-[10px] font-medium inline-block focus-visible:outline-[var(--color-accent)]">
              Explore Services
            </Link>
          </FadeIn>
        </Container>
      </section>
    </PageShell>
  );
}
