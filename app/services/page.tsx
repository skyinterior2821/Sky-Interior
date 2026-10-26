import { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container, FadeIn } from "@/components/ui";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { siteConfig } from "@/lib/site";
import servicesData from "@/content/services.json";

export const metadata: Metadata = {
  title: "Interior Design Services | Sky Interior",
  description:
    "Comprehensive interior design and turnkey execution services in Ahmedabad and Banswara. Residential homes, modular kitchens, wardrobes, and commercial spaces.",
};

const STUDIO_FAQS = [
  {
    question: "How do you charge for your services?",
    answer: "Our fees are structured transparently: a fixed design fee covering the planning, 2D drawings, 3D views, and material specifications, followed by a project management and execution schedule. There are no hidden markups.",
  },
  {
    question: "Can we use our own carpenter or civil contractor?",
    answer: "Yes. While our turnkey execution ensures single-point responsibility and strict quality control, we are also happy to provide complete design-only drawings and periodic site supervision if you have your own contractor.",
  },
  {
    question: "How long does a typical full-home interior take?",
    answer: "A complete 3BHK or 4BHK residential project in Ahmedabad or Banswara generally takes 4 to 7 months from layout sign-off to final handover.",
  },
  {
    question: "Do you take on single-room projects or kitchen renovations?",
    answer: "Yes. In addition to full residences, we take on modular kitchens, customized wardrobe suites, and commercial offices.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main className="pt-28 lg:pt-36 bg-[#F5F2EC] text-[#1C1B19]">
        {/* Page Header */}
        <Container className="pb-16 lg:pb-24 border-b border-[#E5DFD5]">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-px bg-[#9C5B3F]" />
              <p className="font-sans text-xs tracking-wider uppercase text-[#736F69]">
                What We Offer
              </p>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1B19] leading-tight mb-6 max-w-3xl">
              Interior services designed around how people live.
            </h1>
            <p className="font-sans text-base text-[#736F69] font-light max-w-2xl leading-relaxed">
              From tailored modular kitchens to complete turnkey home architecture, our studio manages every stage from spatial planning to final site handover.
            </p>
          </FadeIn>
        </Container>

        {/* Folded Comprehensive Services Section */}
        <section className="py-20 lg:py-28">
          <Container>
            <div className="space-y-24 lg:space-y-36">
              {servicesData.map((service, idx) => (
                <div
                  key={service.slug}
                  id={service.slug}
                  className="border-t border-[#E5DFD5] pt-12 lg:pt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
                >
                  {/* Left Column: Number & Title & Visual */}
                  <div className="lg:col-span-5 space-y-6">
                    <span className="font-sans text-xs uppercase tracking-widest text-[#9C5B3F] font-medium block">
                      0{idx + 1} &mdash; {service.eyebrow || "Service"}
                    </span>
                    <h2 className="font-serif text-2xl lg:text-3xl text-[#1C1B19] leading-snug">
                      {service.title}
                    </h2>
                    <p className="font-sans text-sm text-[#736F69] leading-relaxed font-light">
                      {service.description}
                    </p>

                    <div className="pt-2">
                      <ImagePlaceholder
                        label={service.title}
                        sublabel="Sky Interior Studio"
                        aspect="aspect-[4/3]"
                        src={service.heroImage}
                        alt={service.title}
                      />
                    </div>

                    <div className="pt-4 flex flex-wrap gap-4">
                      <Link
                        href="/contact"
                        className="px-6 py-3 bg-[#1C1B19] text-[#F5F2EC] hover:bg-[#9C5B3F] transition-colors text-xs uppercase tracking-wider rounded-sm font-medium"
                      >
                        Inquire About This Service
                      </Link>
                      <a
                        href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=Hello%20Sky%20Interior%2C%20I%20am%20interested%20in%20${encodeURIComponent(service.title)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 border border-[#1C1B19] text-[#1C1B19] hover:bg-[#1C1B19] hover:text-[#F5F2EC] transition-colors text-xs uppercase tracking-wider rounded-sm font-medium"
                      >
                        WhatsApp Inquiry
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Detailed Breakdown (What we design, Materials, Process, FAQs) */}
                  <div className="lg:col-span-7 space-y-12">
                    {/* What We Design */}
                    {service.whatWeDesign && service.whatWeDesign.length > 0 && (
                      <div className="bg-[#FAF8F5] p-6 lg:p-8 border border-[#E5DFD5]">
                        <h3 className="font-serif text-lg text-[#1C1B19] mb-4">
                          Scope &amp; Deliverables
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-6">
                          {service.whatWeDesign.map((item, i) => (
                            <div key={i} className="space-y-1">
                              <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#1C1B19]">
                                {item.title}
                              </h4>
                              <p className="font-sans text-xs text-[#736F69] leading-relaxed font-light">
                                {item.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Materials & Specifications */}
                    {service.materials && service.materials.length > 0 && (
                      <div className="border-t border-[#E5DFD5] pt-8">
                        <h3 className="font-serif text-lg text-[#1C1B19] mb-4">
                          Materials &amp; Hardware
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-6">
                          {service.materials.map((mat, i) => (
                            <div key={i} className="space-y-1">
                              <h4 className="font-sans text-xs font-medium text-[#1C1B19]">
                                {mat.name}
                              </h4>
                              <p className="font-sans text-xs text-[#736F69] leading-relaxed font-light">
                                {mat.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Service Specific Process */}
                    {service.process && service.process.length > 0 && (
                      <div className="border-t border-[#E5DFD5] pt-8">
                        <h3 className="font-serif text-lg text-[#1C1B19] mb-6">
                          Workflow for this service
                        </h3>
                        <div className="grid sm:grid-cols-3 gap-6">
                          {service.process.map((step) => (
                            <div key={step.step} className="space-y-1.5">
                              <span className="font-sans text-[11px] font-mono text-[#9C5B3F]">
                                0{step.step}
                              </span>
                              <h4 className="font-serif text-sm text-[#1C1B19]">
                                {step.title}
                              </h4>
                              <p className="font-sans text-xs text-[#736F69] leading-relaxed font-light">
                                {step.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Service FAQs */}
                    {service.faqs && service.faqs.length > 0 && (
                      <div className="border-t border-[#E5DFD5] pt-8 space-y-4">
                        <h3 className="font-serif text-base text-[#1C1B19]">
                          Frequently Asked
                        </h3>
                        {service.faqs.map((faq, i) => (
                          <div key={i} className="bg-[#FAF8F5] p-5 border border-[#E5DFD5] space-y-2">
                            <p className="font-serif text-sm text-[#1C1B19] font-medium">
                              {faq.question}
                            </p>
                            <p className="font-sans text-xs text-[#736F69] leading-relaxed font-light">
                              {faq.answer}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Studio FAQs Section */}
        <section className="py-20 lg:py-28 bg-[#FAF8F5] border-t border-[#E5DFD5]">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-4">
                <span className="font-sans text-xs tracking-wider uppercase text-[#736F69] block mb-3">
                  Questions &amp; Answers
                </span>
                <h2 className="font-serif text-3xl text-[#1C1B19] leading-snug">
                  Working with Sky Interior.
                </h2>
                <p className="font-sans text-sm text-[#736F69] mt-4 leading-relaxed font-light">
                  Have questions not answered here? Call us directly or message our founders on WhatsApp.
                </p>
                <div className="mt-6">
                  <a
                    href={siteConfig.contact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-wider text-[#1C1B19] hover:text-[#9C5B3F] font-medium"
                  >
                    <span>Ask on WhatsApp</span>
                    <span>&rarr;</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-6">
                {STUDIO_FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-[#F5F2EC] border border-[#E5DFD5] space-y-2"
                  >
                    <h3 className="font-serif text-lg text-[#1C1B19]">
                      {faq.question}
                    </h3>
                    <p className="font-sans text-sm text-[#736F69] leading-relaxed font-light">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 bg-[#F5F2EC] border-t border-[#E5DFD5] text-center">
          <Container>
            <FadeIn>
              <h2 className="font-serif text-3xl text-[#1C1B19] mb-4">
                Have a project in mind?
              </h2>
              <p className="font-sans text-sm text-[#736F69] max-w-md mx-auto mb-8 font-light">
                Tell us about your space. We are available for projects across Ahmedabad and Banswara.
              </p>
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-[#1C1B19] text-[#F5F2EC] hover:bg-[#9C5B3F] transition-colors text-xs uppercase tracking-wider rounded-sm inline-block font-medium"
              >
                Book a Consultation
              </Link>
            </FadeIn>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
