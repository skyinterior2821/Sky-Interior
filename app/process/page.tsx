import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container, FadeIn, Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Interior Design Process | Turnkey Execution",
  description:
    "Discover the Sky Interior design process. From architectural planning and 3D visualization to turnkey execution and handover.",
  keywords: [
    "Interior Design Process",
    "Turnkey Interior Execution",
    "3D Interior Visualization",
    "Architectural Planning",
    "Interior Design Consultation"
  ]
};

const DETAILED_STEPS = [
  {
    number: "01",
    title: "Discovery & Consultation",
    timeline: "1-2 Weeks",
    description: "Every great space starts with an honest conversation. We begin by understanding how you actually live or work in the space, your aesthetic preferences, and your budget parameters.",
    deliverables: ["Initial Site Visit", "Design Brief Document", "Budget Estimate", "Fee Proposal"],
    client_needs: ["Inspiration imagery", "Basic floor plans (if available)", "Budget range"]
  },
  {
    number: "02",
    title: "Concept Design",
    timeline: "3-4 Weeks",
    description: "This is where the vision takes shape. We develop the overarching design narrative, establishing the spatial layout, material palettes, and initial furniture selections.",
    deliverables: ["2D Floor Plans", "Mood Boards & Material Samples", "Initial 3D Renderings", "Preliminary Costings"],
    client_needs: ["Feedback on concepts", "Sign-off on layout and materials"]
  },
  {
    number: "03",
    title: "Detailed Design & Sourcing",
    timeline: "4-6 Weeks",
    description: "The unglamorous but critical stage. We create comprehensive working drawings for the contractors, design custom joinery, and finalize every single fixture and fitting.",
    deliverables: ["Technical Drawings (Electrical, Plumbing, HVAC)", "Custom Millwork Elevations", "Final 3D Renders", "Procurement Schedule"],
    client_needs: ["Final design approval", "Procurement deposit"]
  },
  {
    number: "04",
    title: "Execution & Handover",
    timeline: "Varies by Project",
    description: "We manage the entire build process, coordinating with contractors and vendors to ensure the design is executed exactly as planned. We handle the headaches so you don't have to.",
    deliverables: ["Site Management & Quality Control", "Furniture Installation", "Final Styling", "Handover Documentation"],
    client_needs: ["Patience", "Excitement for the reveal"]
  }
];

const FAQS = [
  {
    question: "How do you charge for your services?",
    answer: "Our fees are typically structured in two parts: a fixed design fee for the conceptual and detailed design phases, followed by a project management percentage during the execution phase. This ensures complete transparency from day one."
  },
  {
    question: "Can I use my own contractor?",
    answer: "Yes. While we highly recommend using our trusted network of skilled tradespeople to ensure the highest quality of execution, we are happy to work alongside your preferred contractor, provided they meet our quality standards."
  },
  {
    question: "How long does a typical project take?",
    answer: "A full residential renovation typically takes 6-9 months from the initial consultation to handover. Commercial projects can vary widely based on scale, but generally follow a 4-8 month timeline."
  },
  {
    question: "Do you take on smaller, single-room projects?",
    answer: "While we specialize in full-home and comprehensive commercial designs, we occasionally take on select single-room projects (like a luxury kitchen or master suite) if the timeline and scope align with our studio capacity."
  }
];

export default function ProcessPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 lg:pt-40 pb-24 lg:pb-32 bg-bg">
        <Container className="pb-16 lg:pb-32">
          <FadeIn>
            <h1 className="font-serif text-[length:var(--text-h1)] lg:text-[120px] leading-[0.9] tracking-tight text-ink drop-shadow-sm">
              How we <br />
              <span className="italic text-accent-deep">work.</span>
            </h1>
            <p className="mt-8 text-[length:var(--text-lg)] text-ink-muted leading-relaxed max-w-2xl font-light">
              A transparent, structured process designed to eliminate surprises and ensure your space is built exactly as envisioned.
            </p>
          </FadeIn>
        </Container>

        {/* Detailed Steps */}
        <section className="py-16 lg:py-24">
          <Container>
            <div className="flex flex-col gap-16 lg:gap-32">
              {DETAILED_STEPS.map((step, index) => (
                <FadeIn key={step.number} delay={0.1}>
                  <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 border-t border-border pt-12 lg:pt-16">
                    {/* Number & Title */}
                    <div className="lg:col-span-4">
                      <span className="font-serif text-6xl lg:text-8xl text-accent/30 leading-none block mb-4">
                        {step.number}
                      </span>
                      <h2 className="font-serif text-[length:var(--text-h2)] text-ink mb-2">
                        {step.title}
                      </h2>
                      <span className="font-sans text-xs uppercase tracking-widest text-accent font-semibold">
                        Timeline: {step.timeline}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="lg:col-span-8">
                      <p className="text-[length:var(--text-lg)] text-ink-muted leading-relaxed font-light mb-12">
                        {step.description}
                      </p>

                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Deliverables */}
                        <div className="bg-surface p-8 rounded-2xl border border-border shadow-sm">
                          <h3 className="font-sans text-sm uppercase tracking-widest text-ink mb-4 font-semibold">What we deliver</h3>
                          <ul className="space-y-3">
                            {step.deliverables.map((item, i) => (
                              <li key={i} className="flex items-start text-ink-muted font-light">
                                <span className="text-accent mr-3">✓</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Client Needs */}
                        <div className="bg-surface p-8 rounded-2xl border border-border shadow-sm">
                          <h3 className="font-sans text-sm uppercase tracking-widest text-ink mb-4 font-semibold">What we need from you</h3>
                          <ul className="space-y-3">
                            {step.client_needs.map((item, i) => (
                              <li key={i} className="flex items-start text-ink-muted font-light">
                                <span className="text-accent mr-3">→</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQs */}
        <section className="py-24 lg:py-40 bg-surface mt-16 lg:mt-32">
          <Container>
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
              <div className="lg:col-span-4">
                <FadeIn>
                  <h2 className="font-serif text-[length:var(--text-h2)] lg:text-[length:var(--text-display)]">
                    F.A.Q.
                  </h2>
                  <p className="mt-6 text-ink-muted leading-relaxed font-light">
                    Common questions about working with Sky Interior. Don't see your question here? Reach out to us directly.
                  </p>
                </FadeIn>
              </div>
              
              <div className="lg:col-span-8">
                <div className="flex flex-col border-t border-border">
                  {FAQS.map((faq, i) => (
                    <FadeIn key={i} delay={i * 0.1}>
                      <div className="py-8 border-b border-border">
                        <h3 className="font-serif text-[length:var(--text-h3)] text-ink mb-4">
                          {faq.question}
                        </h3>
                        <p className="text-ink-muted leading-relaxed font-light">
                          {faq.answer}
                        </p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-24 lg:py-32">
          <Container className="text-center">
            <FadeIn>
              <h2 className="font-serif text-[length:var(--text-h3)] mb-8">Ready to start the process?</h2>
              <Button href="/contact" variant="primary" className="bg-ink text-surface px-12 py-5 rounded-full hover:bg-accent transition-colors duration-500">
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
