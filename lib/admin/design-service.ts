"use server";

import { AdminDesign } from "./types";
import { revalidatePath } from "next/cache";

let mockDesigns: AdminDesign[] = [
  {
    id: "d1",
    title: "Minimalist Oak Kitchen",
    slug: "minimalist-oak-kitchen",
    description: "Clean lines with warm oak textures.",
    room: "Kitchen",
    style: "Minimal",
    tags: ["oak", "island", "bright"],
    featured: true,
    status: "PUBLISHED",
    mainImage: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200",
    additionalImages: [],
    metaTitle: "Minimalist Oak Kitchen Idea",
    metaDescription: "Discover minimalist oak kitchen designs.",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "d2",
    title: "Moody Charcoal Bathroom",
    slug: "moody-charcoal-bathroom",
    description: "Dramatic and moody spa-like bathroom.",
    room: "Bathroom",
    style: "Contemporary",
    tags: ["dark", "spa", "charcoal"],
    featured: false,
    status: "PUBLISHED",
    mainImage: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=1200",
    additionalImages: [],
    metaTitle: "Moody Charcoal Bathroom Idea",
    metaDescription: "Spa-like moody bathroom inspiration.",
    updatedAt: new Date().toISOString(),
  }
];

export async function getAdminDesigns(search?: string, status?: string, style?: string, room?: string): Promise<AdminDesign[]> {
  let filtered = [...mockDesigns];

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(d => d.title.toLowerCase().includes(q) || d.tags.some(t => t.toLowerCase().includes(q)));
  }
  if (status && status !== "All") {
    filtered = filtered.filter(d => d.status === status);
  }
  if (style && style !== "All") {
    filtered = filtered.filter(d => d.style === style);
  }
  if (room && room !== "All") {
    filtered = filtered.filter(d => d.room === room);
  }

  return filtered;
}

export async function getAdminDesign(id: string): Promise<AdminDesign | null> {
  return mockDesigns.find(d => d.id === id) || null;
}

export async function createAdminDesign(data: Partial<AdminDesign>): Promise<AdminDesign> {
  const newDesign: AdminDesign = {
    id: `d${Date.now()}`,
    title: data.title || "Untitled Design",
    slug: data.slug || `untitled-${Date.now()}`,
    description: data.description || "",
    room: data.room || "Living Room",
    style: data.style || "Modern",
    tags: data.tags || [],
    featured: data.featured || false,
    status: data.status || "DRAFT",
    mainImage: data.mainImage || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
    additionalImages: data.additionalImages || [],
    metaTitle: data.metaTitle || "",
    metaDescription: data.metaDescription || "",
    updatedAt: new Date().toISOString(),
  };
  mockDesigns.push(newDesign);
  revalidatePath("/admin/designs");
  return newDesign;
}

export async function updateAdminDesign(id: string, data: Partial<AdminDesign>): Promise<AdminDesign> {
  const index = mockDesigns.findIndex(d => d.id === id);
  if (index === -1) throw new Error("Design not found");

  mockDesigns[index] = { ...mockDesigns[index], ...data, updatedAt: new Date().toISOString() };
  revalidatePath("/admin/designs");
  revalidatePath(`/admin/designs/${id}`);
  return mockDesigns[index];
}

export async function deleteAdminDesign(id: string): Promise<void> {
  mockDesigns = mockDesigns.filter(d => d.id !== id);
  revalidatePath("/admin/designs");
}

export async function getDesignStyles(): Promise<string[]> {
  return ["All", "Modern", "Minimal", "Contemporary", "Luxury", "Japandi", "Industrial"];
}

export async function getDesignRooms(): Promise<string[]> {
  return ["All", "Living Room", "Bedroom", "Kitchen", "Dining", "Bathroom"];
}
