"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { CTABand } from "@/components/CTABand";
import { Container, FadeIn } from "@/components/ui";
import { getAllProjects, getAllCategories } from "@/lib/projects";
import { motion, AnimatePresence } from "framer-motion";

function WorkContent() {
  const allProjects = getAllProjects();
  const categories = getAllCategories();
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const activeCategory = searchParams.get("category") || "All";

  const filteredProjects =
    activeCategory === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  const setCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "All") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <Nav />
      <main className="pt-28 lg:pt-36 pb-0 bg-[#F5F2EC] text-[#1C1B19] min-h-screen">
        <Container>
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-px bg-[#9C5B3F]" />
              <p className="font-sans text-xs tracking-wider uppercase text-[#736F69]">
                Portfolio
              </p>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1B19] mb-4">
              Selected Work
            </h1>
            <p className="font-sans text-base text-[#736F69] max-w-xl font-light mb-12">
              Residential and commercial interior projects across Ahmedabad and Banswara.
            </p>
          </FadeIn>
          
          {/* Filter Bar with square / 2px corners */}
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap gap-2.5 mb-12 pb-6 border-b border-[#E5DFD5]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`font-sans text-xs tracking-wider uppercase px-5 py-2.5 min-h-[44px] inline-flex items-center rounded-sm transition-all duration-200 cursor-pointer ${
                    activeCategory === cat 
                      ? "bg-[#1C1B19] text-[#F5F2EC] border border-[#1C1B19]" 
                      : "bg-[#FAF8F5] text-[#736F69] border border-[#E5DFD5] hover:border-[#1C1B19] hover:text-[#1C1B19]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          <motion.div layout className="pb-24 lg:pb-36">
            <AnimatePresence mode="popLayout">
              {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-start">
                  {filteredProjects.map((project, i) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      key={project.slug}
                    >
                      <ProjectCard project={project} large={i % 3 === 0} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-20 px-8 text-center border border-dashed border-[#E5DFD5] bg-[#FAF8F5] rounded-sm max-w-xl mx-auto space-y-3">
                  <h3 className="font-serif text-2xl text-[#1C1B19]">
                    Portfolio Documentation in Progress
                  </h3>
                  <p className="font-sans text-sm text-[#736F69] font-light leading-relaxed">
                    New photography and project case studies are currently being prepared. To view active site photos or discuss an upcoming project, please contact our studio.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/contact"
                      className="inline-block px-6 py-2.5 bg-[#1C1B19] text-[#F5F2EC] hover:bg-[#9C5B3F] transition-colors text-xs uppercase tracking-wider rounded-sm font-medium"
                    >
                      Inquire With Studio
                    </Link>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </Container>
        <CTABand />
      </main>
      <Footer />
    </>
  );
}

export default function WorkPage() {
  return (
    <Suspense fallback={null}>
      <WorkContent />
    </Suspense>
  );
}
