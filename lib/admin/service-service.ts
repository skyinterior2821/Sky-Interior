"use server";

import { AdminService } from "./types";
import { revalidatePath } from "next/cache";

let mockServices: AdminService[] = [
  {
    id: "s1",
    name: "Modular Kitchens",
    slug: "modular-kitchens",
    shortDescription: "Functional, beautifully crafted modular kitchens.",
    fullDescription: "Functional, beautifully crafted modular kitchens tailored to your cooking style and spatial requirements. We balance aesthetic appeal with everyday practicality.",
    heroImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
    imageAlt: "Modular Kitchen",
    status: "PUBLISHED",
    featured: true,
    features: [
      "L-Shaped Layouts: Maximizing corner spaces efficiently.",
      "Island Kitchens: Creating a central hub for cooking and gathering.",
      "Parallel Kitchens: Optimized for workflow and space."
    ],
    process: [
      { step: "1", title: "Consultation", description: "Discussing your requirements and space." },
      { step: "2", title: "Design & Planning", description: "Creating 2D layouts and 3D visualisations." },
      { step: "3", title: "Execution", description: "Fabrication and installation." }
    ],
    faqs: [
      { question: "What is the timeline for a modular kitchen installation?", answer: "Timelines vary depending on complexity and materials, but generally range from a few weeks to a couple of months from design approval." }
    ],
    ctaHeading: "Ready for a new kitchen?",
    ctaDescription: "Schedule a consultation with our kitchen design experts.",
    ctaLabel: "Book Consultation",
    ctaDestination: "/consultation",
    metaTitle: "Modular Kitchens - Sky Interior",
    metaDescription: "Beautiful modular kitchens.",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s2",
    name: "Wardrobes & Storage Solutions",
    slug: "wardrobes-storage",
    shortDescription: "Custom wardrobes and storage units.",
    fullDescription: "Custom wardrobes and storage units designed to maximize space and organization without compromising on visual elegance.",
    heroImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200",
    imageAlt: "Wardrobes",
    status: "PUBLISHED",
    featured: false,
    features: [
      "Sliding Wardrobes: Ideal for compact spaces.",
      "Walk-in Closets: Dedicated dressing areas with specialized storage."
    ],
    process: [],
    faqs: [],
    ctaHeading: "Maximize your storage",
    ctaDescription: "Get a custom wardrobe design today.",
    ctaLabel: "Get Estimate",
    ctaDestination: "/estimate",
    metaTitle: "Wardrobes - Sky Interior",
    metaDescription: "Custom wardrobes and storage.",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "s3",
    name: "Full Home Interiors",
    slug: "full-home-interiors",
    shortDescription: "End-to-end interior design and execution.",
    fullDescription: "End-to-end interior design and execution for your entire home. From spatial planning to final styling, we ensure a cohesive aesthetic throughout.",
    heroImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
    imageAlt: "Full Home",
    status: "DRAFT",
    featured: true,
    features: [],
    process: [
      { step: "1", title: "Concept & Layout", description: "Establishing the functional flow and visual language." },
      { step: "2", title: "Detailed Design", description: "Material selection and technical drawings." },
      { step: "3", title: "Site Execution", description: "Project management and quality control." },
      { step: "4", title: "Handover", description: "Final styling and walk-through." }
    ],
    faqs: [
      { question: "Do you handle civil work?", answer: "Yes, our full home service includes necessary civil modifications as part of the interior scope." }
    ],
    ctaHeading: "Transform your entire home",
    ctaDescription: "Let us design your dream home from start to finish.",
    ctaLabel: "Book Consultation",
    ctaDestination: "/consultation",
    metaTitle: "Full Home Interiors - Sky Interior",
    metaDescription: "Complete interior architecture.",
    updatedAt: new Date().toISOString(),
  }
];

export async function getAdminServices(search?: string, status?: string): Promise<AdminService[]> {
  let filtered = [...mockServices];

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(s => s.name.toLowerCase().includes(q) || s.shortDescription.toLowerCase().includes(q));
  }
  if (status && status !== "All") {
    filtered = filtered.filter(s => s.status === status);
  }

  return filtered;
}

export async function getAdminService(id: string): Promise<AdminService | null> {
  return mockServices.find(s => s.id === id) || null;
}

export async function createAdminService(data: Partial<AdminService>): Promise<AdminService> {
  const newService: AdminService = {
    id: `s${Date.now()}`,
    name: data.name || "Untitled Service",
    slug: data.slug || `untitled-service-${Date.now()}`,
    shortDescription: data.shortDescription || "",
    fullDescription: data.fullDescription || "",
    heroImage: data.heroImage || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
    imageAlt: data.imageAlt || "",
    status: data.status || "DRAFT",
    featured: data.featured || false,
    features: data.features || [],
    process: data.process || [],
    faqs: data.faqs || [],
    ctaHeading: data.ctaHeading || "",
    ctaDescription: data.ctaDescription || "",
    ctaLabel: data.ctaLabel || "",
    ctaDestination: data.ctaDestination || "",
    metaTitle: data.metaTitle || "",
    metaDescription: data.metaDescription || "",
    updatedAt: new Date().toISOString(),
  };
  mockServices.push(newService);
  revalidatePath("/admin/services");
  return newService;
}

export async function updateAdminService(id: string, data: Partial<AdminService>): Promise<AdminService> {
  const index = mockServices.findIndex(s => s.id === id);
  if (index === -1) throw new Error("Service not found");

  mockServices[index] = { ...mockServices[index], ...data, updatedAt: new Date().toISOString() };
  revalidatePath("/admin/services");
  revalidatePath(`/admin/services/${id}`);
  return mockServices[index];
}

export async function deleteAdminService(id: string): Promise<void> {
  mockServices = mockServices.filter(s => s.id !== id);
  revalidatePath("/admin/services");
}
