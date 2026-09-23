import Link from "next/link";
import { Container, FadeIn } from "@/components/ui";

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Studio", href: "/studio" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-surface)] border-t border-[var(--color-ink-soft)]" role="contentinfo">
      <Container className="py-20 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand column */}
          <div className="md:col-span-5 lg:col-span-6">
            <FadeIn>
              <Link href="/" className="inline-flex items-center gap-5 group">
                <div className="relative block h-16 w-16 md:h-20 md:w-20 transition-transform duration-700 ease-out group-hover:scale-105">
                  <img
                    src="/logo.png"
                    alt="Sky Interior Emblem"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-serif text-[length:var(--text-heading-m)] md:text-[length:var(--text-heading-l)] tracking-tight text-[var(--color-surface)]">
                  Sky Interior
                </span>
              </Link>
              <p className="mt-8 text-[length:var(--text-body-l)] text-[var(--color-surface-muted)] max-w-sm font-light leading-relaxed opacity-80">
                Elevated interior design for residential and commercial spaces in Ahmedabad and Banswara.
              </p>
            </FadeIn>
          </div>

          {/* Nav column */}
          <div className="md:col-span-3 lg:col-span-2">
            <FadeIn delay={0.1}>
              <p className="font-sans text-xs uppercase tracking-[0.1em] text-[var(--color-accent)] mb-6 font-medium">
                Navigation
              </p>
              <ul className="space-y-4">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--color-surface)] hover:text-[var(--color-accent)] transition-colors opacity-80 hover:opacity-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          {/* Contact column */}
          <div className="md:col-span-4 lg:col-span-4">
            <FadeIn delay={0.2}>
              <p className="font-sans text-xs uppercase tracking-[0.1em] text-[var(--color-accent)] mb-6 font-medium">
                Get in touch
              </p>
              <ul className="space-y-4 text-sm text-[var(--color-surface)] opacity-80">
                <li className="flex flex-col gap-2">
                  <a href="tel:+917726837091" className="hover:text-[var(--color-accent)] hover:opacity-100 transition-colors inline-block">
                    Call: +91 77268 37091
                  </a>
                  <a href="https://wa.me/917802967720" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] hover:opacity-100 transition-colors inline-block">
                    WhatsApp: +91 78029 67720
                  </a>
                </li>
                <li>
                  <a href="mailto:skyinteriordesin08@gmail.com" className="hover:text-[var(--color-accent)] hover:opacity-100 transition-colors inline-block">
                    skyinteriordesin08@gmail.com
                  </a>
                </li>
                <li className="pt-2">
                  <a href="https://www.instagram.com/skyinterior.design" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] hover:opacity-100 transition-colors flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    @skyinterior.design
                  </a>
                </li>
              </ul>
            </FadeIn>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-24 pt-8 border-t border-[var(--color-ink-soft)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--color-surface-muted)] opacity-60">
          <p>© {currentYear} Sky Interior. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-[var(--color-surface)] hover:opacity-100 transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-[var(--color-surface)] hover:opacity-100 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
