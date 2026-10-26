"use client";

import { Container, FadeIn } from "@/components/ui";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function CTABand() {
  return (
    <section className="bg-[#FAF8F5] relative overflow-hidden border-b border-[#E5DFD5]">
      <Container className="py-20 lg:py-28 text-center">
        <FadeIn>
          <span className="font-sans text-xs tracking-wider uppercase text-[#736F69] block mb-4">
            Get in Touch
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1B19] leading-tight max-w-2xl mx-auto mb-6">
            Ready to discuss your space?
          </h2>
          <p className="font-sans text-base text-[#736F69] max-w-xl mx-auto font-light leading-relaxed mb-10">
            Tell us about your project &mdash; whether a residence in Ahmedabad, a home in Banswara, or a commercial workspace. We are here to help.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="bg-[#1C1B19] text-[#F5F2EC] hover:bg-[#9C5B3F] transition-colors px-8 py-3.5 text-xs tracking-wider uppercase rounded-sm inline-block font-medium"
            >
              Start Consultation
            </Link>
            <a
              href={siteConfig.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#1C1B19] text-[#1C1B19] hover:bg-[#1C1B19] hover:text-[#F5F2EC] transition-colors px-8 py-3.5 text-xs tracking-wider uppercase rounded-sm inline-block font-medium"
            >
              Chat on WhatsApp
            </a>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
