import { Container, Button } from "@/components/ui";

export function CTABand() {
  return (
    <section className="py-24 lg:py-32 bg-accent-deep text-surface">
      <Container className="text-center">
        <h2 className="font-serif text-[length:var(--text-h2)] lg:text-[length:var(--text-h1)]">
          Have a space in mind?
        </h2>
        <p className="mt-4 text-[length:var(--text-lg)] text-surface/70">
          Tell us about it — most projects start with a short call.
        </p>
        <div className="mt-10">
          <Button
            href="/contact"
            variant="outline"
            className="border-surface text-surface hover:bg-surface hover:text-ink"
          >
            Book a Consultation
          </Button>
        </div>
      </Container>
    </section>
  );
}
