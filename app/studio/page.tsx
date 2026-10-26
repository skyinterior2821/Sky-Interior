import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container, FadeIn } from "@/components/ui";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About the Studio | Sky Interior",
  description:
    "Sky Interior is an interior design studio based in Ahmedabad and Banswara founded by Harshit Suthar and Palak Suthar. Designing spaces around how people actually live.",
};

const PHILOSOPHY_PILLARS = [
  {
    title: "Honest Materials",
    description: "We favor genuine materials that age gracefully — natural timber veneers, lime plaster, stone, and authentic metals. No synthetic imitation surfaces.",
  },
  {
    title: "Contextual Design",
    description: "Designing for the climate and lifestyle of Western India. We account for natural light, ventilation, dust management, and cultural family traditions.",
  },
  {
    title: "Functional Craftsmanship",
    description: "Every wardrobe shelf, kitchen counter, and electrical point is placed with purpose. Beauty arises naturally from seamless function.",
  },
  {
    title: "Calm Restraint",
    description: "We resist short-lived design fads. By decluttering spatial geometry and maintaining cohesive palettes, we create spaces that feel peaceful for decades.",
  },
];

export default function StudioPage() {
  return (
    <>
      <Nav />
      <main className="pt-28 lg:pt-36 bg-[#F5F2EC] text-[#1C1B19]">
        {/* Page Heading */}
        <Container className="pb-16 lg:pb-24 border-b border-[#E5DFD5]">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-px bg-[#9C5B3F]" />
              <p className="font-sans text-xs tracking-wider uppercase text-[#736F69]">
                About Sky Interior
              </p>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1B19] leading-tight mb-6 max-w-3xl">
              A studio founded on quiet craftsmanship and personal attention.
            </h1>
            <p className="font-sans text-base text-[#736F69] font-light max-w-2xl leading-relaxed">
              Based in Ahmedabad and Banswara, Sky Interior is intentionally boutique. Every project receives direct conceptual and on-site guidance from the founders.
            </p>
          </FadeIn>
        </Container>

        {/* Founders Section */}
        <section className="py-20 lg:py-28 border-b border-[#E5DFD5]">
          <Container>
            <FadeIn>
              <div className="max-w-2xl mb-16">
                <span className="font-sans text-xs tracking-wider uppercase text-[#736F69] block mb-3">
                  Leadership
                </span>
                <h2 className="font-serif text-3xl text-[#1C1B19]">
                  Meet Harshit and Palak
                </h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              {/* Harshit */}
              <FadeIn>
                <div className="space-y-6">
                  <div className="border border-[#E5DFD5] bg-[#EBE7DF]">
                    <ImagePlaceholder
                      label="Harshit Suthar"
                      sublabel="Principal Designer &amp; Execution Lead"
                      aspect="aspect-[4/5]"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-[#1C1B19]">
                      Harshit Suthar
                    </h3>
                    <p className="font-sans text-xs uppercase tracking-wider text-[#9C5B3F] font-medium mt-1 mb-4">
                      Principal Designer &middot; Project Execution
                    </p>
                    <p className="font-sans text-sm text-[#736F69] leading-relaxed font-light">
                      With deep expertise in spatial mechanics, structural detailing, and site coordination, Harshit ensures that what is drafted on paper is built faithfully on site. He oversees trade contractors, technical drawings, and procurement timelines to protect quality at every milestone.
                    </p>
                  </div>
                </div>
              </FadeIn>

              {/* Palak */}
              <FadeIn delay={0.15}>
                <div className="space-y-6">
                  <div className="border border-[#E5DFD5] bg-[#EBE7DF]">
                    <ImagePlaceholder
                      label="Palak Suthar"
                      sublabel="Design Director &amp; Material Lead"
                      aspect="aspect-[4/5]"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-[#1C1B19]">
                      Palak Suthar
                    </h3>
                    <p className="font-sans text-xs uppercase tracking-wider text-[#9C5B3F] font-medium mt-1 mb-4">
                      Design Director &middot; Spatial Concepts
                    </p>
                    <p className="font-sans text-sm text-[#736F69] leading-relaxed font-light">
                      Palak shapes the aesthetic narrative and spatial ergonomics of each project. Her work centers on layering natural textures, balancing color temperatures, and designing tailored joinery that supports the daily rhythms of modern families.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </Container>
        </section>

        {/* Studio Philosophy */}
        <section className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#E5DFD5]">
          <Container>
            <FadeIn>
              <div className="max-w-2xl mb-16">
                <span className="font-sans text-xs tracking-wider uppercase text-[#736F69] block mb-3">
                  Ethos
                </span>
                <h2 className="font-serif text-3xl text-[#1C1B19]">
                  Our design philosophy
                </h2>
                <p className="font-sans text-sm text-[#736F69] mt-3 font-light leading-relaxed">
                  We believe interior architecture should serve living, not photography alone.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {PHILOSOPHY_PILLARS.map((pillar, idx) => (
                <FadeIn key={pillar.title} delay={idx * 0.1}>
                  <div className="p-8 bg-[#F5F2EC] border border-[#E5DFD5] space-y-3">
                    <span className="font-sans text-xs text-[#9C5B3F] font-medium tracking-wider uppercase">
                      0{idx + 1}
                    </span>
                    <h3 className="font-serif text-xl text-[#1C1B19]">
                      {pillar.title}
                    </h3>
                    <p className="font-sans text-sm text-[#736F69] leading-relaxed font-light">
                      {pillar.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>

        {/* Two Studio Locations */}
        <section className="py-20 lg:py-28 border-b border-[#E5DFD5]">
          <Container>
            <FadeIn>
              <div className="max-w-2xl mb-16">
                <span className="font-sans text-xs tracking-wider uppercase text-[#736F69] block mb-3">
                  Presence
                </span>
                <h2 className="font-serif text-3xl text-[#1C1B19]">
                  Two Studio Locations
                </h2>
                <p className="font-sans text-sm text-[#736F69] mt-3 font-light">
                  Active projects and on-site supervision across Gujarat and Southern Rajasthan.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <FadeIn>
                <div className="p-8 bg-[#FAF8F5] border border-[#E5DFD5] space-y-4">
                  <span className="font-sans text-xs tracking-widest uppercase text-[#9C5B3F] font-medium">
                    Gujarat Studio
                  </span>
                  <h3 className="font-serif text-2xl text-[#1C1B19]">
                    Ahmedabad
                  </h3>
                  <p className="font-sans text-sm text-[#736F69] font-light leading-relaxed">
                    Serving residential communities and commercial clients across Ahmedabad, Gandhinagar, and surrounding regions.
                  </p>
                  <p className="font-sans text-xs text-[#1C1B19] pt-2">
                    PIN 380058 &middot; Gujarat, India
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="p-8 bg-[#FAF8F5] border border-[#E5DFD5] space-y-4">
                  <span className="font-sans text-xs tracking-widest uppercase text-[#9C5B3F] font-medium">
                    Rajasthan Studio
                  </span>
                  <h3 className="font-serif text-2xl text-[#1C1B19]">
                    Banswara
                  </h3>
                  <p className="font-sans text-sm text-[#736F69] font-light leading-relaxed">
                    Executing villa interiors, ancestral home renovations, and bespoke retail spaces in Banswara and neighboring districts.
                  </p>
                  <p className="font-sans text-xs text-[#1C1B19] pt-2">
                    PIN 327001 &middot; Rajasthan, India
                  </p>
                </div>
              </FadeIn>
            </div>
          </Container>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 bg-[#FAF8F5] text-center">
          <Container>
            <FadeIn>
              <h2 className="font-serif text-3xl text-[#1C1B19] mb-4">
                Work directly with our founders
              </h2>
              <p className="font-sans text-sm text-[#736F69] max-w-md mx-auto mb-8 font-light">
                Schedule a consultation to discuss your floor plan, timeline, and spatial ideas.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-3.5 bg-[#1C1B19] text-[#F5F2EC] hover:bg-[#9C5B3F] transition-colors text-xs uppercase tracking-wider rounded-sm font-medium"
                >
                  Contact Studio
                </Link>
                <a
                  href={siteConfig.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 border border-[#1C1B19] text-[#1C1B19] hover:bg-[#1C1B19] hover:text-[#F5F2EC] transition-colors text-xs uppercase tracking-wider rounded-sm font-medium"
                >
                  WhatsApp Harshit &amp; Palak
                </a>
              </div>
            </FadeIn>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
