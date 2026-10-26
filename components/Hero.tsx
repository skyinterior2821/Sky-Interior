"use client";

import { Container, Button } from "@/components/ui";
import { FadeIn } from "@/components/ui/FadeIn";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export function Hero() {
  return (
    <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 bg-[#F5F2EC] border-b border-[#E5DFD5]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
            <FadeIn>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-6 h-px bg-[#9C5B3F]" />
                <p className="font-sans text-xs tracking-wider uppercase text-[#736F69]">
                  Ahmedabad &amp; Banswara
                </p>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1B19] leading-[1.15] mb-6 tracking-tight">
                Spaces designed around how people actually live.
              </h1>

              <p className="font-sans text-base text-[#736F69] font-light leading-relaxed mb-8 max-w-xl">
                Sky Interior is an interior design studio founded by Harshit Suthar and Palak Suthar. We plan, design, and deliver residential and commercial spaces with quiet restraint and turnkey precision.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button
                  href="/work"
                  variant="primary"
                  className="bg-[#1C1B19] text-[#F5F2EC] hover:bg-[#9C5B3F] transition-colors px-8 py-3.5 rounded-sm text-xs tracking-wider uppercase"
                >
                  View Selected Work
                </Button>
                <Button
                  href="/contact"
                  variant="outline"
                  className="border border-[#1C1B19] text-[#1C1B19] hover:bg-[#1C1B19] hover:text-[#F5F2EC] transition-colors px-8 py-3.5 rounded-sm text-xs tracking-wider uppercase"
                >
                  Discuss a Project
                </Button>
              </div>
            </FadeIn>
          </div>

          {/* Hero Image Visual Placeholder */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <FadeIn delay={0.15}>
              <div className="border border-[#E5DFD5] bg-[#EBE7DF]">
                <ImagePlaceholder
                  label="Selected Interior Works"
                  sublabel="Ahmedabad & Banswara Studios"
                  aspect="aspect-[4/3] lg:aspect-[16/11]"
                  className="w-full"
                  priority={true}
                />
              </div>
            </FadeIn>
          </div>

        </div>
      </Container>
    </section>
  );
}
