import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ProcessSteps } from "@/components/ProcessSteps";
import { CTABand } from "@/components/CTABand";
import { Footer } from "@/components/Footer";
import { Container, FadeIn } from "@/components/ui";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        {/* Selected Work */}
        <ProjectGrid />

        {/* Studio Brief Intro */}
        <section className="py-20 lg:py-28 bg-[#F5F2EC] border-b border-[#E5DFD5]">
          <Container>
            <FadeIn>
              <div className="max-w-3xl">
                <span className="font-sans text-xs tracking-wider uppercase text-[#736F69] block mb-4">
                  About the Studio
                </span>
                <h2 className="font-serif text-3xl lg:text-4xl text-[#1C1B19] leading-snug mb-6">
                  Design shaped around how people live day-to-day, not fleeting trends.
                </h2>
                <p className="font-sans text-base text-[#736F69] leading-relaxed mb-8">
                  Founded by Harshit Suthar and Palak Suthar, Sky Interior operates across Ahmedabad and Banswara. We handle spatial planning, custom cabinetry, material selection, and complete turnkey execution with quiet precision.
                </p>
                <Link
                  href="/studio"
                  className="font-sans text-xs tracking-wider uppercase text-[#1C1B19] hover:text-[#9C5B3F] transition-colors border-b border-[#1C1B19] hover:border-[#9C5B3F] pb-1 inline-flex items-center gap-2"
                >
                  <span>Learn more about our studio</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </FadeIn>
          </Container>
        </section>

        {/* Services List Preview */}
        <section className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#E5DFD5]">
          <Container>
            <FadeIn>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div>
                  <span className="font-sans text-xs tracking-wider uppercase text-[#736F69] block mb-4">
                    Services
                  </span>
                  <h2 className="font-serif text-3xl lg:text-4xl text-[#1C1B19]">
                    What we do
                  </h2>
                </div>
                <Link
                  href="/services"
                  className="font-sans text-xs tracking-wider uppercase text-[#1C1B19] hover:text-[#9C5B3F] transition-colors border-b border-[#1C1B19] hover:border-[#9C5B3F] pb-1 inline-flex items-center gap-2"
                >
                  <span>All services</span>
                  <span>&rarr;</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                <div className="p-8 bg-[#F5F2EC] border border-[#E5DFD5] space-y-3">
                  <span className="font-sans text-xs text-[#9C5B3F] tracking-wider uppercase">01</span>
                  <h3 className="font-serif text-xl text-[#1C1B19]">Residential Interiors</h3>
                  <p className="font-sans text-sm text-[#736F69] leading-relaxed">
                    Complete interior planning, bespoke furniture, and styling for apartments, villas, and family homes.
                  </p>
                </div>

                <div className="p-8 bg-[#F5F2EC] border border-[#E5DFD5] space-y-3">
                  <span className="font-sans text-xs text-[#9C5B3F] tracking-wider uppercase">02</span>
                  <h3 className="font-serif text-xl text-[#1C1B19]">Modular Kitchens & Storage</h3>
                  <p className="font-sans text-sm text-[#736F69] leading-relaxed">
                    High-utility kitchens and built-in wardrobes engineered with quality hardware and ergonomic detailing.
                  </p>
                </div>

                <div className="p-8 bg-[#F5F2EC] border border-[#E5DFD5] space-y-3">
                  <span className="font-sans text-xs text-[#9C5B3F] tracking-wider uppercase">03</span>
                  <h3 className="font-serif text-xl text-[#1C1B19]">Commercial & Workspace</h3>
                  <p className="font-sans text-sm text-[#736F69] leading-relaxed">
                    Productive, calm environments for offices, clinics, retail studios, and client consultation spaces.
                  </p>
                </div>

                <div className="p-8 bg-[#F5F2EC] border border-[#E5DFD5] space-y-3">
                  <span className="font-sans text-xs text-[#9C5B3F] tracking-wider uppercase">04</span>
                  <h3 className="font-serif text-xl text-[#1C1B19]">Turnkey Execution</h3>
                  <p className="font-sans text-sm text-[#736F69] leading-relaxed">
                    Full end-to-end site supervision, vendor management, material procurement, and timely handover.
                  </p>
                </div>
              </div>
            </FadeIn>
          </Container>
        </section>

        {/* Process */}
        <ProcessSteps />

        {/* Contact Strip */}
        <section className="py-16 bg-[#F5F2EC] border-b border-[#E5DFD5]">
          <Container>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <p className="font-serif text-xl text-[#1C1B19]">Ready to discuss your project?</p>
                <p className="font-sans text-xs text-[#736F69] mt-1">Available across Ahmedabad and Banswara.</p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={siteConfig.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#1C1B19] text-[#F5F2EC] font-sans text-xs tracking-wider uppercase rounded-sm hover:bg-[#9C5B3F] transition-colors"
                >
                  Message on WhatsApp
                </a>
                <Link
                  href="/contact"
                  className="px-6 py-3 border border-[#1C1B19] text-[#1C1B19] font-sans text-xs tracking-wider uppercase rounded-sm hover:bg-[#1C1B19] hover:text-[#F5F2EC] transition-colors"
                >
                  Contact Form
                </Link>
              </div>
            </div>
          </Container>
        </section>

        <CTABand />
      </main>
      <Footer />
    </>
  );
}
