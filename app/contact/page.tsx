import { redirect } from 'next/navigation';


export const metadata: Metadata = {
  title: "Contact Top Interior Designers | Sky Interior",
  description:
    "Get in touch with Sky Interior for your next residential or commercial project.",
  keywords: [
    "Contact Interior Designer",
    "Hire Interior Designer",
    "Interior Design Consultation",
    "Sky Interior Contact"
  ]
};

const NEXT_STEPS = [
  {
    title: "1. Review",
    desc: "We review your details to ensure we're the right fit for your scope."
  },
  {
    title: "2. Discovery Call",
    desc: "A brief 15-minute call to discuss your vision, budget, and timeline."
  },
  {
    title: "3. Consultation",
    desc: "An in-depth consultation (on-site or studio) to build the initial brief."
  }
];

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 lg:pt-40 pb-24 lg:pb-32 bg-bg overflow-hidden">
        <Container className="pb-16 lg:pb-32">
          <FadeIn>
            <h1 className="font-serif text-[length:var(--text-h1)] lg:text-[120px] leading-[0.9] tracking-tight text-ink drop-shadow-sm">
              Start a <br />
              <span className="italic text-accent-deep">conversation.</span>
            </h1>
          </FadeIn>
        </Container>

        <Container>
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Form Section */}
            <div className="lg:col-span-7">
              <FadeIn delay={0.1}>
                <p className="text-[length:var(--text-lg)] text-ink-muted leading-relaxed mb-12 font-light">
                  We take on a limited number of projects each year to ensure
                  every space gets the attention it deserves. Tell us a bit about
                  what you&apos;re looking to do.
                </p>

                <ContactForm />
              </FadeIn>
            </div>

            {/* Sidebar / Info Section */}
            <div className="lg:col-span-4 lg:col-start-9">
              <FadeIn delay={0.2} className="space-y-16">
                
                {/* What happens next */}
                <div className="bg-surface p-8 rounded-3xl border border-border/50 shadow-sm">
                  <h3 className="font-serif text-[length:var(--text-h3)] mb-6 text-ink">What happens next</h3>
                  <div className="space-y-6">
                    {NEXT_STEPS.map((step, i) => (
                      <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full">
                        <h4 className="font-sans text-sm font-semibold uppercase tracking-widest text-ink mb-1">{step.title}</h4>
                        <p className="text-ink-muted font-light text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-10">
                  <div>
                    <h3 className="font-sans text-xs uppercase tracking-widest text-accent font-semibold mb-3">Studio Location</h3>
                    <address className="not-italic font-serif text-[length:var(--text-h3)] text-ink leading-tight">
                      Bopal<br />
                      Ahmedabad, Gujarat
                    </address>
                  </div>
                  
                  <div>
                    <h3 className="font-sans text-xs uppercase tracking-widest text-accent font-semibold mb-3">Call / WhatsApp</h3>
                    <div className="space-y-2">
                      <a href="tel:+917726837091" className="font-serif text-[length:var(--text-h3)] text-ink hover:text-accent-deep transition-colors block">
                        +91 77268 37091
                      </a>
                      <a href="https://wa.me/917802967720" target="_blank" rel="noopener noreferrer" className="font-serif text-[length:var(--text-h3)] text-ink hover:text-accent-deep transition-colors flex items-center gap-2">
                        <span className="text-sm font-sans tracking-widest uppercase text-ink-muted mt-1">WA:</span> +91 78029 67720
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-sans text-xs uppercase tracking-widest text-accent font-semibold mb-3">Email</h3>
                    <p className="font-serif text-[length:var(--text-lg)] text-ink">
                      <a href="mailto:skyinteriordesign08@gmail.com" className="hover:text-accent-deep transition-colors">skyinteriordesign08@gmail.com</a>
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-sans text-xs uppercase tracking-widest text-accent font-semibold mb-3">Follow Us</h3>
                    <p className="font-serif text-[length:var(--text-h3)] text-ink">
                      <a href="https://www.instagram.com/skyinterior.design" target="_blank" rel="noopener noreferrer" className="hover:text-accent-deep transition-colors flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                        @skyinterior.design
                      </a>
                    </p>
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
