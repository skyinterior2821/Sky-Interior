import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { GuideDetailTemplate } from "@/components/GuideDetailTemplate";
import guidesData from "@/content/guides.json";

export function generateStaticParams() {
  return guidesData.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guidesData.find((g) => g.slug === slug);
  
  if (!guide) {
    return {
      title: "Guide Not Found | Sky Interior"
    };
  }

  return {
    title: `${guide.title} | Sky Interior Guides`,
    description: guide.excerpt,
    openGraph: {
      title: `${guide.title} | Sky Interior`,
      description: guide.excerpt,
      images: [guide.heroImage],
    }
  };
}

export default async function GuidePage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const guide = guidesData.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  return (
    <>
      <Nav />
      <main className="bg-[var(--color-surface)]">
        <GuideDetailTemplate guide={guide} />
      </main>
      <Footer />
    </>
  );
}
