import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Sky Interior",
  description: "Privacy policy for Sky Interior studio client inquiries and communication.",
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen py-20 lg:py-28 bg-[#F5F2EC] text-[#1C1B19]">
        <Container>
          <div className="max-w-2xl mx-auto space-y-8">
            <h1 className="font-serif text-3xl lg:text-4xl tracking-tight text-[#1C1B19]">
              Privacy Policy
            </h1>
            <p className="font-sans text-xs tracking-wider uppercase text-[#736F69]">
              Last updated: October 2026
            </p>

            <div className="space-y-6 font-sans text-sm text-[#736F69] leading-relaxed">
              <p>
                Sky Interior operates as an interior design studio based in Ahmedabad and Banswara. We respect your privacy and only collect information necessary to respond to design inquiries and manage client projects.
              </p>

              <h2 className="font-serif text-lg text-[#1C1B19] pt-4">Information We Collect</h2>
              <p>
                When you contact us via our website form, phone, email, or WhatsApp, you may provide your name, phone number, email address, property type, and project requirements. We use this information solely to discuss your project and communicate with you.
              </p>

              <h2 className="font-serif text-lg text-[#1C1B19] pt-4">How Your Data is Handled</h2>
              <p>
                We do not sell, rent, or trade your personal information with third parties. Form inquiries submitted through our website are received directly by our design team via secure Google Workspace services.
              </p>

              <h2 className="font-serif text-lg text-[#1C1B19] pt-4">Contacting Us</h2>
              <p>
                If you have questions regarding your data or wish to have your contact details updated or removed from our records, please contact us at:
              </p>
              <ul className="space-y-1 text-[#1C1B19]">
                <li>Email: <a href={`mailto:${siteConfig.contact.email}`} className="text-[#9C5B3F] hover:underline">{siteConfig.contact.email}</a></li>
                <li>Phone: <a href={`tel:${siteConfig.contact.phoneTel}`} className="text-[#9C5B3F] hover:underline">{siteConfig.contact.phoneDisplay}</a></li>
                <li>Studio Locations: {siteConfig.locations.map(l => `${l.city}, ${l.state}`).join(" & ")}</li>
              </ul>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
