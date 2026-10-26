import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";

const FOOTER_NAV = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Studio", href: "/studio" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1C1B19] text-[#F5F2EC] border-t border-[#2D2A26]" role="contentinfo">
      <Container className="py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Studio info */}
          <div className="md:col-span-5 lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-4 group">
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src="/logo.png"
                  alt="Sky Interior"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-serif text-2xl tracking-tight text-[#F5F2EC]">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mt-6 text-sm text-[#A8A29E] max-w-sm font-light leading-relaxed">
              Boutique interior design studio based in Ahmedabad and Banswara. Designing spaces around how people actually live.
            </p>
            <div className="mt-6 font-sans text-xs text-[#736F69] space-y-1">
              <p>Founders: {siteConfig.founders.map(f => f.name).join(" & ")}</p>
              <p>Locations: {siteConfig.locations.map(l => `${l.city}, ${l.state}`).join(" · ")}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 lg:col-span-3">
            <p className="font-sans text-xs uppercase tracking-wider text-[#A8A29E] mb-6 font-medium">
              Navigation
            </p>
            <ul className="space-y-3">
              {FOOTER_NAV.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#F5F2EC]/80 hover:text-[#F5F2EC] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (One Source of Truth) */}
          <div className="md:col-span-4 lg:col-span-4">
            <p className="font-sans text-xs uppercase tracking-wider text-[#A8A29E] mb-6 font-medium">
              Contact
            </p>
            <ul className="space-y-3 text-sm text-[#F5F2EC]/80">
              <li>
                <a
                  href={`tel:${siteConfig.contact.phoneTel}`}
                  className="hover:text-[#F5F2EC] transition-colors"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F5F2EC] transition-colors"
                >
                  WhatsApp: {siteConfig.contact.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-[#F5F2EC] transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="pt-2">
                <a
                  href={siteConfig.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F5F2EC] transition-colors inline-flex items-center gap-2"
                >
                  <span>Instagram</span>
                  <span className="text-[#A8A29E]">{siteConfig.contact.instagramHandle}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#2D2A26] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#736F69]">
          <p>© {currentYear} Sky Interior. All rights reserved.</p>
          <div>
            <Link href="/privacy" className="hover:text-[#F5F2EC] transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
