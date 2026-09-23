import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ServiceDetailTemplate } from "@/components/ServiceDetailTemplate";
import servicesData from "@/content/services.json";

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  
  if (!service) {
    return {
      title: "Service Not Found | Sky Interior"
    };
  }

  return {
    title: `${service.title} | Sky Interior`,
    description: service.description,
    openGraph: {
      title: `${service.title} | Sky Interior`,
      description: service.description,
      images: [service.heroImage],
    }
  };
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Nav />
      <main className="bg-[var(--color-surface)]">
        <ServiceDetailTemplate service={service} />
      </main>
      <Footer />
    </>
  );
}
