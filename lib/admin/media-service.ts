"use server";

import { AdminMedia, MediaStatus, MediaFolder } from "./types";
import { revalidatePath } from "next/cache";

let mockMedia: AdminMedia[] = [
  {
    id: "MEDIA-001",
    filename: "oak-timber-hero.jpg",
    url: "/images/projects/oak-timber-house/hero.jpg",
    type: "IMAGE",
    dimensions: "1920 × 1280",
    size: "1.2 MB",
    altText: "Oak Timber House living room with expansive windows",
    folder: "PROJECTS",
    tags: ["living room", "oak", "timber"],
    usage: "USED",
    status: "ACTIVE",
    relations: [{ type: "PROJECT", id: "oak-timber-house", name: "Oak Timber House" }],
    createdAt: "2026-09-01T10:00:00Z",
    updatedAt: "2026-09-01T10:00:00Z"
  },
  {
    id: "MEDIA-002",
    filename: "modern-loft-kitchen.jpg",
    url: "/images/projects/modern-loft/kitchen.jpg",
    type: "IMAGE",
    dimensions: "1600 × 1067",
    size: "840 KB",
    altText: "Modern loft kitchen with dark cabinets",
    folder: "PROJECTS",
    tags: ["kitchen", "loft", "dark"],
    usage: "USED",
    status: "ACTIVE",
    relations: [{ type: "PROJECT", id: "modern-loft", name: "Modern Loft" }],
    createdAt: "2026-09-02T11:00:00Z",
    updatedAt: "2026-09-02T11:00:00Z"
  },
  {
    id: "MEDIA-003",
    filename: "kitchen-service-banner.jpg",
    url: "/images/services/modular-kitchens.jpg",
    type: "IMAGE",
    dimensions: "1920 × 1080",
    size: "950 KB",
    altText: "Modular kitchen service banner",
    folder: "SERVICES",
    tags: ["kitchen", "modular", "service"],
    usage: "USED",
    status: "ACTIVE",
    relations: [{ type: "SERVICE", id: "modular-kitchens", name: "Modular Kitchens" }],
    createdAt: "2026-09-05T09:30:00Z",
    updatedAt: "2026-09-05T09:30:00Z"
  },
  {
    id: "MEDIA-004",
    filename: "laminates-guide-cover.jpg",
    url: "/images/guides/laminates.jpg",
    type: "IMAGE",
    dimensions: "1200 × 800",
    size: "450 KB",
    altText: "Guide to choosing laminates",
    folder: "GUIDES",
    tags: ["guide", "laminates", "materials"],
    usage: "USED",
    status: "ACTIVE",
    relations: [{ type: "GUIDE", id: "laminates", name: "A Guide to Laminates" }],
    createdAt: "2026-09-10T14:15:00Z",
    updatedAt: "2026-09-10T14:15:00Z"
  },
  {
    id: "MEDIA-005",
    filename: "unused-concept-render.webp",
    url: "/images/designs/scandinavian-bedroom.jpg", // Reusing an image as placeholder
    type: "IMAGE",
    dimensions: "2000 × 1333",
    size: "1.5 MB",
    altText: "Concept render for scandinavian bedroom",
    folder: "DESIGNS",
    tags: ["concept", "bedroom", "scandinavian"],
    usage: "UNUSED",
    status: "ACTIVE",
    relations: [],
    createdAt: "2026-10-01T08:00:00Z",
    updatedAt: "2026-10-01T08:00:00Z"
  },
  {
    id: "MEDIA-006",
    filename: "old-logo-draft.png",
    url: "/icon.png",
    type: "IMAGE",
    dimensions: "512 × 512",
    size: "120 KB",
    altText: "Old logo draft",
    folder: "GENERAL",
    tags: ["logo", "draft"],
    usage: "UNUSED",
    status: "ARCHIVED",
    relations: [],
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-02-20T11:00:00Z"
  }
];

export async function getAdminMedia(search?: string, type?: string, usage?: string, folder?: string, sortBy?: string): Promise<AdminMedia[]> {
  let filtered = [...mockMedia].filter(m => m.status !== "ARCHIVED");

  if (usage === "ARCHIVED") {
    filtered = [...mockMedia].filter(m => m.status === "ARCHIVED");
  } else if (usage && usage !== "All") {
    filtered = filtered.filter(m => m.usage === usage);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(m => 
      m.filename.toLowerCase().includes(q) ||
      m.altText.toLowerCase().includes(q) ||
      m.tags.some(t => t.toLowerCase().includes(q))
    );
  }
  if (type && type !== "All") {
    filtered = filtered.filter(m => m.type === type);
  }
  if (folder && folder !== "All") {
    filtered = filtered.filter(m => m.folder === folder);
  }

  const parseSize = (sizeStr: string) => {
    const num = parseFloat(sizeStr);
    if (sizeStr.includes("MB")) return num * 1024 * 1024;
    if (sizeStr.includes("KB")) return num * 1024;
    return num;
  };

  filtered.sort((a, b) => {
    if (sortBy === "Oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sortBy === "Filename A-Z") return a.filename.localeCompare(b.filename);
    if (sortBy === "Filename Z-A") return b.filename.localeCompare(a.filename);
    if (sortBy === "Largest") return parseSize(b.size) - parseSize(a.size);
    if (sortBy === "Smallest") return parseSize(a.size) - parseSize(b.size);
    // Default Newest
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return filtered;
}

export async function getAdminMediaById(id: string): Promise<AdminMedia | null> {
  return mockMedia.find(m => m.id === id) || null;
}

export async function updateMediaMetadata(id: string, data: Partial<AdminMedia>): Promise<AdminMedia> {
  const index = mockMedia.findIndex(m => m.id === id);
  if (index === -1) throw new Error("Media not found");

  mockMedia[index] = { ...mockMedia[index], ...data, updatedAt: new Date().toISOString() };
  revalidatePath("/admin/media");
  return mockMedia[index];
}

export async function archiveMedia(id: string): Promise<void> {
  const index = mockMedia.findIndex(m => m.id === id);
  if (index !== -1) {
    mockMedia[index].status = "ARCHIVED";
    revalidatePath("/admin/media");
  }
}

export async function createMockMedia(data: { filename: string, altText: string, folder: MediaFolder, tags: string[] }): Promise<AdminMedia> {
  const newMedia: AdminMedia = {
    id: `MEDIA-${String(mockMedia.length + 1).padStart(3, '0')}`,
    filename: data.filename,
    url: "/images/placeholder.jpg", // Deterministic fallback placeholder
    type: "IMAGE",
    dimensions: "800 × 600",
    size: "150 KB",
    altText: data.altText,
    folder: data.folder,
    tags: data.tags,
    usage: "UNUSED",
    status: "ACTIVE",
    relations: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockMedia = [newMedia, ...mockMedia];
  revalidatePath("/admin/media");
  return newMedia;
}

export async function getMediaKPIs() {
  const active = mockMedia.filter(m => m.status !== "ARCHIVED");
  return {
    total: mockMedia.length,
    images: mockMedia.filter(m => m.type === "IMAGE").length,
    used: active.filter(m => m.usage === "USED").length,
    unused: active.filter(m => m.usage === "UNUSED").length,
    archived: mockMedia.filter(m => m.status === "ARCHIVED").length,
  };
}
