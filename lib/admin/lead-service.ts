"use server";

import { AdminLead, LeadStatus, LeadPriority, LeadSource } from "./types";
import { revalidatePath } from "next/cache";

let mockLeads: AdminLead[] = [
  {
    id: "l1",
    name: "Aarav Mehta",
    email: "aarav.mehta@example.com",
    phone: "+91 98765 43210",
    preferredContactMethod: "Phone",
    interestedService: "Full Home Interiors",
    propertyType: "Villa",
    homeSize: "3500 sq ft",
    rooms: "4 BHK",
    budgetRange: "₹50L - ₹80L",
    preferredTimeline: "Immediate",
    priority: "HIGH",
    status: "NEW",
    source: "WEBSITE",
    notes: [
      { id: "n1", text: "Client prefers a modern minimalist style.", createdAt: "2026-10-07T10:00:00Z" }
    ],
    activity: [
      { id: "a1", action: "Lead created via website form", createdAt: "2026-10-07T10:00:00Z" }
    ],
    createdAt: "2026-10-07T10:00:00Z",
    updatedAt: "2026-10-07T10:00:00Z"
  },
  {
    id: "l2",
    name: "Neha Patel",
    email: "neha.p@example.com",
    phone: "+91 99887 76655",
    preferredContactMethod: "Email",
    interestedService: "Modular Kitchens",
    propertyType: "Apartment",
    homeSize: "1200 sq ft",
    rooms: "3 BHK",
    budgetRange: "₹10L - ₹15L",
    preferredTimeline: "3 Months",
    priority: "MEDIUM",
    status: "CONTACTED",
    source: "ESTIMATE",
    notes: [],
    activity: [
      { id: "a2", action: "Lead created via estimate tool", createdAt: "2026-10-06T14:30:00Z" },
      { id: "a3", action: "Status changed to CONTACTED", createdAt: "2026-10-08T09:15:00Z" }
    ],
    createdAt: "2026-10-06T14:30:00Z",
    updatedAt: "2026-10-08T09:15:00Z"
  },
  {
    id: "l3",
    name: "Rahul Shah",
    email: "rahul.shah99@example.com",
    phone: "+91 91234 56789",
    preferredContactMethod: "WhatsApp",
    interestedService: "Wardrobes & Storage",
    propertyType: "Apartment",
    homeSize: "1500 sq ft",
    rooms: "3 BHK",
    budgetRange: "₹5L - ₹10L",
    preferredTimeline: "6 Months",
    priority: "LOW",
    status: "IN_PROGRESS",
    source: "CONSULTATION",
    notes: [
      { id: "n2", text: "Looking for sliding wardrobes in all 3 bedrooms.", createdAt: "2026-10-05T11:20:00Z" }
    ],
    activity: [
      { id: "a4", action: "Lead created via consultation form", createdAt: "2026-10-01T09:00:00Z" },
      { id: "a5", action: "Status changed to QUALIFIED", createdAt: "2026-10-02T10:00:00Z" },
      { id: "a6", action: "Status changed to IN_PROGRESS", createdAt: "2026-10-05T11:20:00Z" }
    ],
    createdAt: "2026-10-01T09:00:00Z",
    updatedAt: "2026-10-05T11:20:00Z"
  }
];

export async function getAdminLeads(search?: string, status?: string, source?: string, priority?: string, sortBy?: string): Promise<AdminLead[]> {
  let filtered = [...mockLeads].filter(l => l.status !== "ARCHIVED");

  if (status === "ARCHIVED") {
    filtered = [...mockLeads].filter(l => l.status === "ARCHIVED");
  } else if (status && status !== "All") {
    filtered = filtered.filter(l => l.status === status);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(l => 
      l.name.toLowerCase().includes(q) || 
      l.email.toLowerCase().includes(q) || 
      l.phone.includes(q) ||
      l.interestedService.toLowerCase().includes(q)
    );
  }
  if (source && source !== "All") {
    filtered = filtered.filter(l => l.source === source);
  }
  if (priority && priority !== "All") {
    filtered = filtered.filter(l => l.priority === priority);
  }

  // Sorting
  filtered.sort((a, b) => {
    if (sortBy === "Oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sortBy === "Priority") {
      const pMap = { HIGH: 3, MEDIUM: 2, LOW: 1 };
      return pMap[b.priority] - pMap[a.priority];
    }
    if (sortBy === "Name") return a.name.localeCompare(b.name);
    // Default Newest
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return filtered;
}

export async function getAdminLead(id: string): Promise<AdminLead | null> {
  return mockLeads.find(l => l.id === id) || null;
}

export async function updateAdminLead(id: string, data: Partial<AdminLead>): Promise<AdminLead> {
  const index = mockLeads.findIndex(l => l.id === id);
  if (index === -1) throw new Error("Lead not found");

  mockLeads[index] = { ...mockLeads[index], ...data, updatedAt: new Date().toISOString() };
  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${id}`);
  return mockLeads[index];
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<AdminLead> {
  const index = mockLeads.findIndex(l => l.id === id);
  if (index === -1) throw new Error("Lead not found");

  const newActivity = { id: `a-${Date.now()}`, action: `Status changed to ${status}`, createdAt: new Date().toISOString() };
  mockLeads[index] = { 
    ...mockLeads[index], 
    status, 
    activity: [newActivity, ...mockLeads[index].activity],
    updatedAt: new Date().toISOString() 
  };
  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${id}`);
  return mockLeads[index];
}

export async function archiveAdminLead(id: string): Promise<void> {
  const index = mockLeads.findIndex(l => l.id === id);
  if (index !== -1) {
    mockLeads[index].status = "ARCHIVED";
    revalidatePath("/admin/leads");
  }
}

export async function addLeadNote(id: string, text: string): Promise<AdminLead> {
  const index = mockLeads.findIndex(l => l.id === id);
  if (index === -1) throw new Error("Lead not found");

  const newNote = { id: `n-${Date.now()}`, text, createdAt: new Date().toISOString() };
  const newActivity = { id: `a-${Date.now()}`, action: "Note added", createdAt: new Date().toISOString() };
  
  mockLeads[index] = { 
    ...mockLeads[index], 
    notes: [newNote, ...mockLeads[index].notes],
    activity: [newActivity, ...mockLeads[index].activity],
    updatedAt: new Date().toISOString()
  };
  revalidatePath(`/admin/leads/${id}`);
  return mockLeads[index];
}

export async function getLeadKPIs() {
  const active = mockLeads.filter(l => l.status !== "ARCHIVED");
  return {
    total: active.length,
    new: active.filter(l => l.status === "NEW").length,
    inProgress: active.filter(l => l.status === "IN_PROGRESS").length,
    qualified: active.filter(l => l.status === "QUALIFIED").length,
    converted: active.filter(l => l.status === "CONVERTED").length,
  };
}
