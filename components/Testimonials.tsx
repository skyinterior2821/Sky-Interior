import { Container } from "@/components/ui";

const TESTIMONIALS = [
  {
    quote:
      "[PLACEHOLDER — replace with real client quote, e.g. what changed about how the space felt or how the process went]",
    name: "[Client Name]",
    project: "[Project Type]",
    city: "[City]",
  },
  {
    quote: "[PLACEHOLDER — second real client quote]",
    name: "[Client Name]",
    project: "[Project Type]",
    city: "[City]",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <h2 className="font-serif text-[length:var(--text-h2)] lg:text-[length:var(--text-h1)] mb-16">
          What clients say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {TESTIMONIALS.map((t, i) => (
            <blockquote key={i} className="border-l-2 border-accent/20 pl-8">
              <p className="font-serif text-[length:var(--text-lg)] lg:text-[length:var(--text-h3)] text-ink leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-6 text-sm text-ink-muted">
                — {t.name}, {t.project}, {t.city}
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
