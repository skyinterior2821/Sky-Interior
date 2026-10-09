"use server";

import { AdminEstimate, EstimateStatus } from "./types";
import { revalidatePath } from "next/cache";

let mockEstimates: AdminEstimate[] = [
  {
    id: "e1",
    reference: "EST-001",
    clientName: "Demo Client",
    email: "demo@example.com",
    phone: "+91 90000 00000",
    propertyType: "FULL_HOME",
    homeSize: "3 BHK",
    finishLevel: "PREMIUM",
    baseAmount: "₹12,00,000",
    finishAdjustmentAmount: "₹3,60,000",
    addons: [
      { name: "TV Unit", amount: "₹50,000" }
    ],
    indicativeAmount: "₹16,10,000",
    status: "NEW",
    notes: [],
    activity: [
      { id: "ea1", action: "Estimate generated", createdAt: "2026-10-07T14:00:00Z" }
    ],
    createdAt: "2026-10-07T14:00:00Z",
    updatedAt: "2026-10-07T14:00:00Z"
  },
  {
    id: "e2",
    reference: "EST-002",
    clientName: "Neha Patel",
    email: "neha.p@example.com",
    phone: "+91 99887 76655",
    propertyType: "KITCHEN",
    homeSize: "Medium",
    finishLevel: "STANDARD",
    baseAmount: "₹2,50,000",
    finishAdjustmentAmount: "₹0",
    addons: [
      { name: "Built-in Appliances", amount: "₹80,000" }
    ],
    indicativeAmount: "₹3,30,000",
    status: "CONSULTATION_REQUESTED",
    notes: [
      { id: "en1", text: "Client requested a home visit after seeing this estimate.", createdAt: "2026-10-06T15:00:00Z" }
    ],
    activity: [
      { id: "ea2", action: "Estimate generated", createdAt: "2026-10-06T14:30:00Z" },
      { id: "ea3", action: "Consultation requested", createdAt: "2026-10-06T15:00:00Z" }
    ],
    relatedLeadId: "l2",
    relatedConsultationId: "c1",
    createdAt: "2026-10-06T14:30:00Z",
    updatedAt: "2026-10-06T15:00:00Z"
  },
  {
    id: "e3",
    reference: "EST-003",
    clientName: "Priya Sharma",
    email: "priya.sharma22@example.com",
    phone: "+91 98989 87878",
    propertyType: "LIVING_ROOM",
    homeSize: "Large",
    finishLevel: "LUXURY",
    baseAmount: "₹4,00,000",
    finishAdjustmentAmount: "₹2,00,000",
    addons: [],
    indicativeAmount: "₹6,00,000",
    status: "REVIEWED",
    notes: [],
    activity: [
      { id: "ea4", action: "Estimate generated", createdAt: "2026-10-05T09:00:00Z" },
      { id: "ea5", action: "Estimate reviewed", createdAt: "2026-10-05T10:30:00Z" }
    ],
    createdAt: "2026-10-05T09:00:00Z",
    updatedAt: "2026-10-05T10:30:00Z"
  }
];

export async function getAdminEstimates(search?: string, propertyType?: string, finishLevel?: string, status?: string, sortBy?: string): Promise<AdminEstimate[]> {
  let filtered = [...mockEstimates].filter(e => e.status !== "ARCHIVED");

  if (status === "ARCHIVED") {
    filtered = [...mockEstimates].filter(e => e.status === "ARCHIVED");
  } else if (status && status !== "All") {
    filtered = filtered.filter(e => e.status === status);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(e => 
      e.reference.toLowerCase().includes(q) ||
      e.clientName.toLowerCase().includes(q) || 
      e.email.toLowerCase().includes(q) ||
      e.homeSize.toLowerCase().includes(q)
    );
  }
  if (propertyType && propertyType !== "All") {
    filtered = filtered.filter(e => e.propertyType === propertyType);
  }
  if (finishLevel && finishLevel !== "All") {
    filtered = filtered.filter(e => e.finishLevel === finishLevel);
  }

  const parseAmount = (amt: string) => parseInt(amt.replace(/[^\d]/g, ''), 10) || 0;

  filtered.sort((a, b) => {
    if (sortBy === "Oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sortBy === "Highest Estimate") return parseAmount(b.indicativeAmount) - parseAmount(a.indicativeAmount);
    if (sortBy === "Lowest Estimate") return parseAmount(a.indicativeAmount) - parseAmount(b.indicativeAmount);
    // Default Newest
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return filtered;
}

export async function getAdminEstimateById(id: string): Promise<AdminEstimate | null> {
  return mockEstimates.find(e => e.id === id) || null;
}

export async function updateAdminEstimate(id: string, data: Partial<AdminEstimate>): Promise<AdminEstimate> {
  const index = mockEstimates.findIndex(e => e.id === id);
  if (index === -1) throw new Error("Estimate not found");

  mockEstimates[index] = { ...mockEstimates[index], ...data, updatedAt: new Date().toISOString() };
  revalidatePath("/admin/estimates");
  revalidatePath(`/admin/estimates/${id}`);
  return mockEstimates[index];
}

export async function updateEstimateStatus(id: string, status: EstimateStatus): Promise<AdminEstimate> {
  const index = mockEstimates.findIndex(e => e.id === id);
  if (index === -1) throw new Error("Estimate not found");

  const actionMap = {
    REVIEWED: "Estimate reviewed",
    CONSULTATION_REQUESTED: "Consultation requested",
  };
  const actionText = actionMap[status as keyof typeof actionMap] || `Status changed to ${status}`;
  
  const newActivity = { id: `ea-${Date.now()}`, action: actionText, createdAt: new Date().toISOString() };
  mockEstimates[index] = { 
    ...mockEstimates[index], 
    status, 
    activity: [newActivity, ...mockEstimates[index].activity],
    updatedAt: new Date().toISOString() 
  };
  revalidatePath("/admin/estimates");
  revalidatePath(`/admin/estimates/${id}`);
  return mockEstimates[index];
}

export async function archiveAdminEstimate(id: string): Promise<void> {
  const index = mockEstimates.findIndex(e => e.id === id);
  if (index !== -1) {
    mockEstimates[index].status = "ARCHIVED";
    revalidatePath("/admin/estimates");
  }
}

export async function addEstimateNote(id: string, text: string): Promise<AdminEstimate> {
  const index = mockEstimates.findIndex(e => e.id === id);
  if (index === -1) throw new Error("Estimate not found");

  const newNote = { id: `en-${Date.now()}`, text, createdAt: new Date().toISOString() };
  const newActivity = { id: `ea-${Date.now()}`, action: "Internal note added", createdAt: new Date().toISOString() };
  
  mockEstimates[index] = { 
    ...mockEstimates[index], 
    notes: [newNote, ...mockEstimates[index].notes],
    activity: [newActivity, ...mockEstimates[index].activity],
    updatedAt: new Date().toISOString()
  };
  revalidatePath(`/admin/estimates/${id}`);
  return mockEstimates[index];
}

export async function getEstimateKPIs() {
  const active = mockEstimates.filter(e => e.status !== "ARCHIVED");
  return {
    total: mockEstimates.length, // Include archived in total? Prompt: "Total Estimates" (let's use active)
    new: active.filter(e => e.status === "NEW").length,
    reviewed: active.filter(e => e.status === "REVIEWED").length,
    consultationRequested: active.filter(e => e.status === "CONSULTATION_REQUESTED").length,
    archived: mockEstimates.filter(e => e.status === "ARCHIVED").length,
  };
}
