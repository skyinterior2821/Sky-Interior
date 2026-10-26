import { Container, Button, FadeIn } from "@/components/ui";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="min-h-[70vh] bg-[#F5F2EC] flex flex-col justify-center items-center pt-32 pb-24 text-center">
        <Container>
          <FadeIn>
            <span className="font-sans text-xs tracking-wider uppercase text-[#736F69] block mb-4">
              Page Not Found
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl text-[#1C1B19] mb-4">
              404
            </h1>
            <p className="font-sans text-base text-[#736F69] max-w-md mx-auto font-light leading-relaxed mb-8">
              The page you are looking for does not exist or may have been relocated.
            </p>
            <Button
              href="/"
              variant="primary"
              className="bg-[#1C1B19] text-[#F5F2EC] hover:bg-[#9C5B3F] px-8 py-3.5 tracking-wider uppercase text-xs transition-colors rounded-sm"
            >
              Return Home
            </Button>
          </FadeIn>
        </Container>
      </main>
      <Footer />
    </>
  );
}
