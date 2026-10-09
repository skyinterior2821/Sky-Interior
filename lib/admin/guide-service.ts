"use server";

import { AdminGuide } from "./types";
import { revalidatePath } from "next/cache";

let mockGuides: AdminGuide[] = [
  {
    id: "g1",
    title: "The Ultimate Budget & Cost Guide",
    slug: "budget-cost",
    excerpt: "Understand interior costs, what drives pricing, and where to invest for maximum impact.",
    category: "PLANNING",
    tags: ["budget", "planning"],
    author: "Sky Interior Editorial",
    readingTime: "5 min read",
    featured: true,
    status: "PUBLISHED",
    coverImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
    imageAlt: "Budget Guide",
    content: [
      { id: "b1", type: "heading", content: "Understanding Interior Costs" },
      { id: "b2", type: "paragraph", content: "Budgeting for an interior design project can be daunting. Costs are typically driven by three main factors: civil work, material quality, and custom joinery. By prioritizing where you spend, you can achieve a premium look without unnecessary expenditure." },
      { id: "b3", type: "heading", content: "Where to Invest" },
      { id: "b4", type: "paragraph", content: "We recommend investing heavily in permanent fixtures like kitchen cabinetry, flooring, and bathroom fittings. These elements see the most wear and tear and are the hardest to replace." },
      { id: "b5", type: "tip", content: "Always buy the highest quality hinges and channels your budget allows." },
      { id: "b6", type: "heading", content: "Where to Save" },
      { id: "b7", type: "paragraph", content: "You can often save on decorative lighting, soft furnishings, and loose furniture. These items can be easily upgraded over time." }
    ],
    metaTitle: "Budget & Cost Guide - Sky Interior",
    metaDescription: "Understand interior costs and where to invest.",
    ogImage: "",
    canonicalUrl: "",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "g2",
    title: "A Guide to Laminates",
    slug: "laminates",
    excerpt: "Everything you need to know about choosing laminates for your wardrobes and kitchens.",
    category: "MATERIALS",
    tags: ["laminates", "finishes"],
    author: "Sky Interior Editorial",
    readingTime: "4 min read",
    featured: false,
    status: "DRAFT",
    coverImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200",
    imageAlt: "Laminates",
    content: [
      { id: "b1", type: "heading", content: "What is a Laminate?" },
      { id: "b2", type: "paragraph", content: "Laminates are composite artificial materials created by pressing together thin layers of flat paper and plastic resins." },
      { id: "b3", type: "heading", content: "Matte vs. Gloss" },
      { id: "b4", type: "paragraph", content: "Matte laminates offer a sophisticated, understated look and are excellent at hiding smudges and scratches." }
    ],
    metaTitle: "Guide to Laminates",
    metaDescription: "Everything you need to know about choosing laminates.",
    ogImage: "",
    canonicalUrl: "",
    updatedAt: new Date().toISOString(),
  }
];

export async function getAdminGuides(search?: string, status?: string, category?: string): Promise<AdminGuide[]> {
  let filtered = [...mockGuides];

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(g => g.title.toLowerCase().includes(q) || g.tags.some(t => t.toLowerCase().includes(q)));
  }
  if (status && status !== "All") {
    filtered = filtered.filter(g => g.status === status);
  }
  if (category && category !== "All") {
    filtered = filtered.filter(g => g.category === category);
  }

  return filtered;
}

export async function getAdminGuide(id: string): Promise<AdminGuide | null> {
  return mockGuides.find(g => g.id === id) || null;
}

export async function createAdminGuide(data: Partial<AdminGuide>): Promise<AdminGuide> {
  const newGuide: AdminGuide = {
    id: `g${Date.now()}`,
    title: data.title || "Untitled Guide",
    slug: data.slug || `untitled-guide-${Date.now()}`,
    excerpt: data.excerpt || "",
    category: data.category || "PLANNING",
    tags: data.tags || [],
    author: data.author || "Sky Interior Editorial",
    readingTime: data.readingTime || "5 min read",
    featured: data.featured || false,
    status: data.status || "DRAFT",
    coverImage: data.coverImage || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
    imageAlt: data.imageAlt || "",
    content: data.content || [],
    metaTitle: data.metaTitle || "",
    metaDescription: data.metaDescription || "",
    ogImage: data.ogImage || "",
    canonicalUrl: data.canonicalUrl || "",
    updatedAt: new Date().toISOString(),
  };
  mockGuides.push(newGuide);
  revalidatePath("/admin/guides");
  return newGuide;
}

export async function updateAdminGuide(id: string, data: Partial<AdminGuide>): Promise<AdminGuide> {
  const index = mockGuides.findIndex(g => g.id === id);
  if (index === -1) throw new Error("Guide not found");

  mockGuides[index] = { ...mockGuides[index], ...data, updatedAt: new Date().toISOString() };
  revalidatePath("/admin/guides");
  revalidatePath(`/admin/guides/${id}`);
  return mockGuides[index];
}

export async function deleteAdminGuide(id: string): Promise<void> {
  mockGuides = mockGuides.filter(g => g.id !== id);
  revalidatePath("/admin/guides");
}

export async function getGuideCategories(): Promise<string[]> {
  return ["All", "PLANNING", "MATERIALS", "ROOMS", "TIPS"];
}
