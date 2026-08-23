import { Container } from "@/components/ui";

const STEPS = [
  {
    number: "01",
    title: "Discovery",
    description:
      "A site visit and an honest conversation about how you actually use the space, not just how it should look.",
  },
  {
    number: "02",
    title: "Concept",
    description:
      "Layout options, material palette, and 3D views, aligned to your budget before anything is finalised.",
  },
  {
    number: "03",
    title: "Detailing",
    description:
      "Working drawings, vendor selection, and material sign-off — the unglamorous part that prevents surprises later.",
  },
  {
    number: "04",
    title: "Execution",
    description:
      "On-site execution managed end to end, through to handover and styling.",
  },
];

export function ProcessSteps() {
  return (
    <section id="process" className="py-24 lg:py-32 bg-surface">
      <Container>
        <h2 className="font-serif text-[length:var(--text-h2)] lg:text-[length:var(--text-h1)] mb-16 lg:mb-20">
          How we work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {STEPS.map((step) => (
            <div key={step.number}>
              {/* Numbered step — design.md §7: use numbers in display serif, not icons */}
              <span className="font-serif text-[length:var(--text-display)] text-accent/20 leading-none">
                {step.number}
              </span>
              <h3 className="font-serif text-[length:var(--text-h3)] mt-2 mb-3">
                {step.title}
              </h3>
              <p className="text-ink-muted text-[length:var(--text-body)] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
