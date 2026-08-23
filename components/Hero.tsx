import { Container, Button } from "@/components/ui";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-end pb-16 lg:pb-24 pt-32 lg:pt-40">
      {/* Background image placeholder — full-bleed per design.md §4 */}
      <div className="absolute inset-0 -z-10">
        {/* TODO: Replace with real hero project photography via next/image */}
        <div className="w-full h-full bg-border flex items-center justify-center">
          <p className="text-ink-muted text-sm uppercase tracking-widest">
            [Hero image — real project photography needed]
          </p>
        </div>
      </div>

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 -z-10 bg-ink/30" />

      <Container>
        <div className="max-w-2xl">
          {/* Eyebrow — content.md */}
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-surface/80 mb-4">
            Interior Design Studio — [CITY]
          </p>

          {/* Headline — content.md, Option A selected per agent-instructions.md §3 */}
          <h1
            className="font-serif text-surface leading-[1.1]"
            style={{
              fontSize: "clamp(var(--text-h1), 5vw, var(--text-hero))",
            }}
          >
            Spaces that feel like they were always yours
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-[length:var(--text-lg)] text-surface/80 max-w-[50ch]">
            Sky Interiors plans, designs, and delivers full-home and commercial
            interiors — from first sketch to the last cushion.
          </p>

          {/* CTA */}
          <div className="mt-10">
            <Button href="/contact" variant="outline" className="border-surface text-surface hover:bg-surface hover:text-ink">
              Book a Consultation
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
