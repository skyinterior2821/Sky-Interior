import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Container, FadeIn } from '@/components/ui';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: "Contact | Sky Interior",
  description:
    "Get in touch with Sky Interior for residential and commercial interior projects in Ahmedabad and Banswara.",
};

const NEXT_STEPS = [
  {
    title: "1. Review",
    desc: "We review your requirements to ensure our studio is the right fit for your scope."
  },
  {
    title: "2. Initial Call",
    desc: "A brief conversation to understand your space, timeline, and expectations."
  },
  {
    title: "3. Site Consultation",
    desc: "An in-depth consultation on-site or at the studio to begin planning."
  }
];

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="pt-20 lg:pt-32 pb-20 lg:pb-28 bg-[#F5F2EC] text-[#1C1B19]">
        <Container className="pb-12 lg:pb-16">
          <FadeIn>
            <h1 className="font-serif text-4xl lg:text-6xl tracking-tight text-[#1C1B19]">
              Contact the studio.
            </h1>
          </FadeIn>
        </Container>

        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Form Section */}
            <div className="lg:col-span-7">
              <FadeIn delay={0.1}>
                <p className="font-sans text-sm text-[#736F69] leading-relaxed mb-8">
                  We take on a limited number of projects at a time to ensure personal attention on every site. Tell us about your space and what you are planning.
                </p>
                <ContactForm />
              </FadeIn>
            </div>

            {/* Sidebar / Info Section */}
            <div className="lg:col-span-4 lg:col-start-9">
              <FadeIn delay={0.2} className="space-y-12">
                
                {/* What happens next */}
                <div className="bg-[#FAF8F5] p-6 border border-[#E5DFD5]">
                  <h3 className="font-serif text-lg mb-4 text-[#1C1B19]">What happens next</h3>
                  <div className="space-y-4">
                    {NEXT_STEPS.map((step, i) => (
                      <div key={i} className="space-y-1">
                        <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#1C1B19]">{step.title}</h4>
                        <p className="font-sans text-xs text-[#736F69] leading-relaxed">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Contact Details */}
                <div className="space-y-6 font-sans text-sm text-[#736F69]">
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-[#1C1B19] font-medium mb-2">Studio Locations</h3>
                    <p className="text-[#1C1B19]">Ahmedabad, Gujarat</p>
                    <p className="text-[#1C1B19]">Banswara, Rajasthan</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-[#1C1B19] font-medium mb-2">Phone & WhatsApp</h3>
                    <div className="space-y-1">
                      <a href={`tel:${siteConfig.contact.phoneTel}`} className="block text-[#1C1B19] hover:text-[#9C5B3F]">
                        Call: {siteConfig.contact.phoneDisplay}
                      </a>
                      <a href={siteConfig.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="block text-[#1C1B19] hover:text-[#9C5B3F]">
                        WhatsApp: {siteConfig.contact.whatsappDisplay}
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-[#1C1B19] font-medium mb-2">Email</h3>
                    <a href={`mailto:${siteConfig.contact.email}`} className="text-[#1C1B19] hover:text-[#9C5B3F]">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-[#1C1B19] font-medium mb-2">Instagram</h3>
                    <a href={siteConfig.contact.instagram} target="_blank" rel="noopener noreferrer" className="text-[#1C1B19] hover:text-[#9C5B3F]">
                      {siteConfig.contact.instagramHandle}
                    </a>
                  </div>
                </div>
                
              </FadeIn>
            </div>

          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
