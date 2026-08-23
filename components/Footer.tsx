import Link from "next/link";
import { Container } from "@/components/ui";

const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Studio", href: "/studio" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink text-surface" role="contentinfo">
      <Container className="py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand column */}
          <div>
            <Link
              href="/"
              className="font-serif text-[length:var(--text-h3)] text-surface"
            >
              Sky Interiors
            </Link>
            <p className="mt-4 text-sm text-surface/60 max-w-[30ch]">
              {/* content.md — Footer tagline */}
              Interior design for homes and small businesses in [CITY].
            </p>
          </div>

          {/* Nav column */}
          <div>
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
          </div>

          {/* Contact column */}
          <div>
            <p className="text-xs uppercase tracking-widest text-surface/40 mb-4">
              Get in touch
            </p>
            <ul className="space-y-3 text-sm text-surface/70">
              {/* TODO: Replace with real contact info from Priyanshu */}
              <li>[PHONE]</li>
              <li>[EMAIL]</li>
              <li>[INSTAGRAM HANDLE]</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-surface/10 text-xs text-surface/40">
          © {currentYear} Sky Interiors. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
