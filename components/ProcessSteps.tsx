import { Container, FadeIn } from "@/components/ui";

const STEPS = [
  {
    number: "01",
    title: "Consultation",
    description: "A site walkthrough and honest conversation about how you live, your spatial priorities, and budget parameters.",
  },
  {
    number: "02",
    title: "Design & Planning",
    description: "Detailed 2D layouts, material palette selection, and 3D views so every detail is approved before building.",
  },
  {
    number: "03",
    title: "Execution",
    description: "On-site carpentry, civil works, electrical fittings, and vendor coordination managed with continuous supervision.",
  },
  {
    number: "04",
    title: "Handover",
    description: "Rigorous quality check, final detailing, deep cleaning, and formal walkthrough ready for immediate move-in.",
  },
];

export function ProcessSteps() {
  return (
    <section className="py-20 lg:py-28 bg-[#F5F2EC] border-b border-[#E5DFD5]">
      <Container>
        <FadeIn>
          <div className="max-w-2xl mb-16">
            <span className="font-sans text-xs tracking-wider uppercase text-[#736F69] block mb-3">
              How We Work
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl text-[#1C1B19] leading-snug">
              A transparent four-step process.
            </h2>
            <p className="font-sans text-sm text-[#736F69] mt-3 leading-relaxed">
              No guesswork or unexpected surprises. Every phase is clearly planned, budgeted, and reviewed with you.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, idx) => (
            <FadeIn key={step.number} delay={idx * 0.1}>
              <div className="border-t border-[#E5DFD5] pt-6 space-y-3">
                <span className="font-sans text-xs uppercase tracking-widest text-[#9C5B3F] font-medium block">
                  Step {step.number}
                </span>
                <h3 className="font-serif text-xl text-[#1C1B19]">
                  {step.title}
                </h3>
                <p className="font-sans text-sm text-[#736F69] leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
