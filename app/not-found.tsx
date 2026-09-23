import { Container, Button, FadeIn } from "@/components/ui";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg flex flex-col justify-center items-center pt-32 pb-24 text-center">
        <Container>
          <FadeIn>
            <span className="font-sans text-xs tracking-widest uppercase text-accent-deep block mb-6">Error 404</span>
            <h1 className="font-serif text-[length:var(--text-display)] text-ink mb-6">Page Not Found</h1>
            <p className="font-sans text-[length:var(--text-lg)] text-ink-muted max-w-lg mx-auto font-light leading-relaxed mb-12">
              The space you are looking for does not exist. It might have been moved or removed.
            </p>
            <Button href="/" className="bg-ink text-surface hover:bg-accent-deep px-8 py-4 tracking-widest uppercase text-xs transition-colors duration-300">
              Return Home
            </Button>
          </FadeIn>
        </Container>
      </main>
      <Footer />
    </>
  );
}
