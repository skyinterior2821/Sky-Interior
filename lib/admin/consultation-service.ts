"use server";

import { AdminConsultation, ConsultationStatus } from "./types";
import { revalidatePath } from "next/cache";

let mockConsultations: AdminConsultation[] = [
  {
    id: "c1",
    clientName: "Neha Patel",
    email: "neha.p@example.com",
    phone: "+91 99887 76655",
    preferredContactMethod: "Phone",
    consultationType: "DESIGN_CONSULTATION",
    service: "Full Home Interiors",
    preferredDate: "2026-10-15T00:00:00Z",
    preferredTime: "11:00 AM",
    propertyType: "Apartment",
    homeSize: "1200 sq ft",
    rooms: "3 BHK",
    budgetRange: "₹10L - ₹15L",
    additionalRequirements: "We want to focus primarily on the living room and modular kitchen design initially.",
    status: "REQUESTED",
    notes: [],
    activity: [
      { id: "ac1", action: "Request received", createdAt: "2026-10-06T14:30:00Z" }
    ],
    relatedLeadId: "l2",
    createdAt: "2026-10-06T14:30:00Z",
    updatedAt: "2026-10-06T14:30:00Z"
  },
  {
    id: "c2",
    clientName: "Rahul Shah",
    email: "rahul.shah99@example.com",
    phone: "+91 91234 56789",
    preferredContactMethod: "WhatsApp",
    consultationType: "HOME_VISIT",
    service: "Wardrobes & Storage",
    preferredDate: "2026-10-10T00:00:00Z",
    preferredTime: "2:00 PM",
    propertyType: "Apartment",
    homeSize: "1500 sq ft",
    rooms: "3 BHK",
    budgetRange: "₹5L - ₹10L",
    additionalRequirements: "Please bring laminate samples for wardrobes.",
    status: "SCHEDULED",
    notes: [
      { id: "nc1", text: "Confirmed time with client via WhatsApp.", createdAt: "2026-10-02T10:00:00Z" }
    ],
    activity: [
      { id: "ac2", action: "Request received", createdAt: "2026-10-01T09:00:00Z" },
      { id: "ac3", action: "Appointment scheduled", createdAt: "2026-10-02T10:00:00Z" }
    ],
    relatedLeadId: "l3",
    createdAt: "2026-10-01T09:00:00Z",
    updatedAt: "2026-10-02T10:00:00Z"
  },
  {
    id: "c3",
    clientName: "Priya Sharma",
    email: "priya.sharma22@example.com",
    phone: "+91 98989 87878",
    preferredContactMethod: "Email",
    consultationType: "ONLINE_CONSULTATION",
    service: "Modular Kitchens",
    preferredDate: "2026-10-12T00:00:00Z",
    preferredTime: "4:00 PM",
    propertyType: "Independent House",
    homeSize: "2000 sq ft",
    rooms: "Kitchen Only",
    budgetRange: "₹2L - ₹5L",
    additionalRequirements: "Need an L-shaped kitchen layout consultation.",
    status: "COMPLETED",
    notes: [],
    activity: [
      { id: "ac4", action: "Request received", createdAt: "2026-09-25T11:00:00Z" },
      { id: "ac5", action: "Status changed to COMPLETED", createdAt: "2026-10-12T17:00:00Z" }
    ],
    createdAt: "2026-09-25T11:00:00Z",
    updatedAt: "2026-10-12T17:00:00Z"
  }
];

export async function getAdminConsultations(search?: string, status?: string, type?: string, sortBy?: string): Promise<AdminConsultation[]> {
  let filtered = [...mockConsultations].filter(c => c.status !== "ARCHIVED");

  if (status === "ARCHIVED") {
    filtered = [...mockConsultations].filter(c => c.status === "ARCHIVED");
  } else if (status && status !== "All") {
    filtered = filtered.filter(c => c.status === status);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(c => 
      c.clientName.toLowerCase().includes(q) || 
      c.email.toLowerCase().includes(q) || 
      c.service.toLowerCase().includes(q)
    );
  }
  if (type && type !== "All") {
    filtered = filtered.filter(c => c.consultationType === type);
  }

  // Sorting
  filtered.sort((a, b) => {
    if (sortBy === "Oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sortBy === "Preferred Date") return new Date(a.preferredDate).getTime() - new Date(b.preferredDate).getTime();
    // Default Newest request
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return filtered;
}

export async function getAdminConsultation(id: string): Promise<AdminConsultation | null> {
  return mockConsultations.find(c => c.id === id) || null;
}

export async function updateAdminConsultation(id: string, data: Partial<AdminConsultation>): Promise<AdminConsultation> {
  const index = mockConsultations.findIndex(c => c.id === id);
  if (index === -1) throw new Error("Consultation not found");

  mockConsultations[index] = { ...mockConsultations[index], ...data, updatedAt: new Date().toISOString() };
  revalidatePath("/admin/consultations");
  revalidatePath(`/admin/consultations/${id}`);
  return mockConsultations[index];
}

export async function updateConsultationStatus(id: string, status: ConsultationStatus): Promise<AdminConsultation> {
  const index = mockConsultations.findIndex(c => c.id === id);
  if (index === -1) throw new Error("Consultation not found");

  const actionMap = {
    SCHEDULED: "Appointment scheduled",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
  };
  const actionText = actionMap[status as keyof typeof actionMap] || `Status changed to ${status}`;
  
  const newActivity = { id: `ac-${Date.now()}`, action: actionText, createdAt: new Date().toISOString() };
  mockConsultations[index] = { 
    ...mockConsultations[index], 
    status, 
    activity: [newActivity, ...mockConsultations[index].activity],
    updatedAt: new Date().toISOString() 
  };
  revalidatePath("/admin/consultations");
  revalidatePath(`/admin/consultations/${id}`);
  return mockConsultations[index];
}

export async function archiveAdminConsultation(id: string): Promise<void> {
  const index = mockConsultations.findIndex(c => c.id === id);
  if (index !== -1) {
    mockConsultations[index].status = "ARCHIVED";
    revalidatePath("/admin/consultations");
  }
}

export async function addConsultationNote(id: string, text: string): Promise<AdminConsultation> {
  const index = mockConsultations.findIndex(c => c.id === id);
  if (index === -1) throw new Error("Consultation not found");

  const newNote = { id: `nc-${Date.now()}`, text, createdAt: new Date().toISOString() };
  const newActivity = { id: `ac-${Date.now()}`, action: "Note added", createdAt: new Date().toISOString() };
  
  mockConsultations[index] = { 
    ...mockConsultations[index], 
    notes: [newNote, ...mockConsultations[index].notes],
    activity: [newActivity, ...mockConsultations[index].activity],
    updatedAt: new Date().toISOString()
  };
  revalidatePath(`/admin/consultations/${id}`);
  return mockConsultations[index];
}

export async function getConsultationKPIs() {
  const active = mockConsultations.filter(c => c.status !== "ARCHIVED");
  return {
    total: active.length,
    new: active.filter(c => c.status === "REQUESTED").length,
    scheduled: active.filter(c => c.status === "SCHEDULED").length,
    completed: active.filter(c => c.status === "COMPLETED").length,
    cancelled: active.filter(c => c.status === "CANCELLED").length,
  };
}
