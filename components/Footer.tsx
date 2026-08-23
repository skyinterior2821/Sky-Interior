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
    <footer className="bg-ink text-surface" role="contentinfo">
      <Container className="py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand column */}
          <FadeIn>
            <Link href="/" className="inline-flex items-center gap-4 group">
              <div className="relative block h-16 w-16 md:h-20 md:w-20 transition-transform duration-500 group-hover:scale-105">
                <img
                  src="/logo.png"
                  alt="Sky Interior Emblem"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-serif text-[length:var(--text-h2)] md:text-[length:var(--text-h1)] tracking-tight" style={{ color: '#DAA464' }}>
                Sky Interior
              </span>
            </Link>
            <p className="mt-4 text-sm text-surface/60 max-w-[30ch]">
              Interior design for homes and small businesses in Ahmedabad and Banswara.
            </p>
          </FadeIn>

          {/* Nav column */}
          <FadeIn delay={0.1}>
            <p className="text-xs uppercase tracking-widest text-surface/40 mb-4">
              Pages
            </p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-surface/70 hover:text-surface transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* Contact column */}
          <FadeIn delay={0.2}>
            <p className="text-xs uppercase tracking-widest text-surface/40 mb-4">
              Get in touch
            </p>
            <ul className="space-y-3 text-sm text-surface/70">
              <li className="flex flex-col gap-1.5">
                <a href="tel:+917726837091" className="hover:text-surface transition-colors">
                  Call: +91 77268 37091
                </a>
                <a href="https://wa.me/917802967720" target="_blank" rel="noopener noreferrer" className="hover:text-surface transition-colors">
                  WhatsApp: +91 78029 67720
                </a>
              </li>
              <li>
                <a href="mailto:skyinteriordesin08@gmail.com" className="hover:text-surface transition-colors">
                  skyinteriordesin08@gmail.com
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/skyinterior.design" target="_blank" rel="noopener noreferrer" className="hover:text-surface transition-colors flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  @skyinterior.design
                </a>
              </li>
            </ul>
          </FadeIn>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-surface/10 text-xs text-surface/40">
          © {currentYear} Sky Interior. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
