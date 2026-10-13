"use server";

import { AdminProject } from "./types";
import { revalidatePath } from "next/cache";

// Initialize mock data in-memory based on some public content
// In a real app this would connect to the DB
let mockProjects: AdminProject[] = [
  {
    id: "p1",
    name: "Oak Timber House",
    slug: "oak-timber-house",
    description: "A serene family home blending natural oak textures with contemporary minimalism.",
    location: "Ahmedabad, Gujarat",
    propertyType: "Villa",
    rooms: 6,
    style: "Minimal",
    featured: true,
    status: "PUBLISHED",
    coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200",
    ],
    overview: "A sprawling layout that emphasizes natural light and timber.",
    designStory: "The clients wanted a sanctuary that feels miles away from the city noise...",
    materials: "White Oak, Travertine, Linen",
    highlights: "Custom oak staircase, double-height living room",
    metaTitle: "Oak Timber House - Sky Interior",
    metaDescription: "Minimalist villa design in Ahmedabad.",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "p2",
    name: "Modern Loft",
    slug: "modern-loft",
    description: "Urban loft with industrial elements and warm tones.",
    location: "Mumbai",
    propertyType: "Apartment",
    rooms: 3,
    style: "Industrial",
    featured: false,
    status: "DRAFT",
    coverImage: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&q=80&w=1200",
    gallery: [],
    overview: "Open plan living in the heart of the city.",
    designStory: "Industrial bones softened with warm lighting and textures.",
    materials: "Concrete, Steel, Walnut",
    highlights: "Exposed brick wall, custom metal shelving",
    metaTitle: "Modern Loft Design",
    metaDescription: "Industrial loft interior design.",
    updatedAt: new Date().toISOString(),
  }
];

export async function getAdminProjects(search?: string, status?: string, style?: string, room?: string): Promise<AdminProject[]> {
  let filtered = [...mockProjects];

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.propertyType.toLowerCase().includes(q));
  }
  if (status && status !== "All") {
    filtered = filtered.filter(p => p.status === status);
  }
  if (style && style !== "All") {
    filtered = filtered.filter(p => p.style === style);
  }
  if (room && room !== "All") {
    filtered = filtered.filter(p => p.rooms.toString() === room);
  }

  return filtered;
}

export async function getAdminProject(id: string): Promise<AdminProject | null> {
  return mockProjects.find(p => p.id === id) || null;
}

export async function createAdminProject(data: Partial<AdminProject>): Promise<AdminProject> {
  const newProject: AdminProject = {
    id: `p${Date.now()}`,
    name: data.name || "Untitled Project",
    slug: data.slug || `untitled-${Date.now()}`,
    description: data.description || "",
    location: data.location || "",
    propertyType: data.propertyType || "",
    rooms: data.rooms || 1,
    style: data.style || "Modern",
    featured: data.featured || false,
    status: data.status || "DRAFT",
    coverImage: data.coverImage || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
    gallery: data.gallery || [],
    overview: data.overview || "",
    designStory: data.designStory || "",
    materials: data.materials || "",
    highlights: data.highlights || "",
    metaTitle: data.metaTitle || "",
    metaDescription: data.metaDescription || "",
    updatedAt: new Date().toISOString(),
  };
  mockProjects.push(newProject);
  revalidatePath("/admin/projects");
  return newProject;
}

export async function updateAdminProject(id: string, data: Partial<AdminProject>): Promise<AdminProject> {
  const index = mockProjects.findIndex(p => p.id === id);
  if (index === -1) throw new Error("Project not found");

  mockProjects[index] = { ...mockProjects[index], ...data, updatedAt: new Date().toISOString() };
  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${id}`);
  return mockProjects[index];
}

export async function deleteAdminProject(id: string): Promise<void> {
  mockProjects = mockProjects.filter(p => p.id !== id);
  revalidatePath("/admin/projects");
}

export async function getProjectStyles(): Promise<string[]> {
  return ["All", "Modern", "Minimal", "Industrial", "Luxury", "Contemporary"];
}

export async function getProjectRooms(): Promise<string[]> {
  return ["All", "1", "2", "3", "4", "5", "6"];
}
