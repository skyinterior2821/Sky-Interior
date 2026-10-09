"use server";

import { AdminMessage, MessageStatus } from "./types";
import { revalidatePath } from "next/cache";

let mockMessages: AdminMessage[] = [
  {
    id: "m1",
    senderName: "Demo User",
    email: "demo@example.com",
    phone: "+91 90000 00000",
    subject: "Kitchen enquiry",
    body: "Hi, I am interested in remodeling my kitchen. Do you do custom layouts for older houses?",
    source: "CONTACT",
    status: "UNREAD",
    notes: [],
    activity: [
      { id: "ma1", action: "Message received", createdAt: "2026-10-07T08:00:00Z" }
    ],
    createdAt: "2026-10-07T08:00:00Z",
    updatedAt: "2026-10-07T08:00:00Z"
  },
  {
    id: "m2",
    senderName: "Rahul Shah",
    email: "rahul.shah99@example.com",
    phone: "+91 91234 56789",
    subject: "Wardrobe Consultation Follow-up",
    body: "Thanks for scheduling the consultation. Could you bring some samples of matte finishes?",
    source: "CONSULTATION",
    status: "REPLIED",
    notes: [
      { id: "mn1", text: "Replied confirming we will bring matte laminate samples.", createdAt: "2026-10-02T11:00:00Z" }
    ],
    activity: [
      { id: "ma2", action: "Message received", createdAt: "2026-10-02T10:30:00Z" },
      { id: "ma3", action: "Message opened", createdAt: "2026-10-02T10:45:00Z" },
      { id: "ma4", action: "Reply simulated", createdAt: "2026-10-02T11:00:00Z" }
    ],
    relatedLeadId: "l3",
    relatedConsultationId: "c2",
    createdAt: "2026-10-02T10:30:00Z",
    updatedAt: "2026-10-02T11:00:00Z"
  },
  {
    id: "m3",
    senderName: "Aarav Mehta",
    email: "aarav.mehta@example.com",
    subject: "Full Home Estimate Details",
    body: "I received the indicative estimate. Can we schedule a call to discuss the premium finishes?",
    source: "ESTIMATE",
    status: "OPEN",
    notes: [],
    activity: [
      { id: "ma5", action: "Message received", createdAt: "2026-10-08T09:00:00Z" },
      { id: "ma6", action: "Message opened", createdAt: "2026-10-08T09:10:00Z" }
    ],
    relatedLeadId: "l1",
    createdAt: "2026-10-08T09:00:00Z",
    updatedAt: "2026-10-08T09:10:00Z"
  }
];

export async function getAdminMessages(search?: string, status?: string, source?: string, sortBy?: string): Promise<AdminMessage[]> {
  let filtered = [...mockMessages].filter(m => m.status !== "ARCHIVED");

  if (status === "ARCHIVED") {
    filtered = [...mockMessages].filter(m => m.status === "ARCHIVED");
  } else if (status && status !== "All") {
    filtered = filtered.filter(m => m.status === status);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(m => 
      m.senderName.toLowerCase().includes(q) || 
      m.email.toLowerCase().includes(q) || 
      m.subject.toLowerCase().includes(q) ||
      m.body.toLowerCase().includes(q)
    );
  }
  if (source && source !== "All") {
    filtered = filtered.filter(m => m.source === source);
  }

  filtered.sort((a, b) => {
    if (sortBy === "Oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    // Default Newest
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return filtered;
}

export async function getAdminMessageById(id: string): Promise<AdminMessage | null> {
  return mockMessages.find(m => m.id === id) || null;
}

export async function updateAdminMessage(id: string, data: Partial<AdminMessage>): Promise<AdminMessage> {
  const index = mockMessages.findIndex(m => m.id === id);
  if (index === -1) throw new Error("Message not found");

  mockMessages[index] = { ...mockMessages[index], ...data, updatedAt: new Date().toISOString() };
  revalidatePath("/admin/messages");
  revalidatePath(`/admin/messages/${id}`);
  return mockMessages[index];
}

export async function updateMessageStatus(id: string, status: MessageStatus): Promise<AdminMessage> {
  const index = mockMessages.findIndex(m => m.id === id);
  if (index === -1) throw new Error("Message not found");

  const actionMap = {
    OPEN: "Message opened",
    CLOSED: "Message closed",
    REPLIED: "Reply simulated",
  };
  const actionText = actionMap[status as keyof typeof actionMap] || `Status changed to ${status}`;
  
  const newActivity = { id: `ma-${Date.now()}`, action: actionText, createdAt: new Date().toISOString() };
  mockMessages[index] = { 
    ...mockMessages[index], 
    status, 
    activity: [newActivity, ...mockMessages[index].activity],
    updatedAt: new Date().toISOString() 
  };
  revalidatePath("/admin/messages");
  revalidatePath(`/admin/messages/${id}`);
  return mockMessages[index];
}

export async function archiveAdminMessage(id: string): Promise<void> {
  const index = mockMessages.findIndex(m => m.id === id);
  if (index !== -1) {
    mockMessages[index].status = "ARCHIVED";
    revalidatePath("/admin/messages");
  }
}

export async function addMessageNote(id: string, text: string): Promise<AdminMessage> {
  const index = mockMessages.findIndex(m => m.id === id);
  if (index === -1) throw new Error("Message not found");

  const newNote = { id: `mn-${Date.now()}`, text, createdAt: new Date().toISOString() };
  const newActivity = { id: `ma-${Date.now()}`, action: "Internal note added", createdAt: new Date().toISOString() };
  
  mockMessages[index] = { 
    ...mockMessages[index], 
    notes: [newNote, ...mockMessages[index].notes],
    activity: [newActivity, ...mockMessages[index].activity],
    updatedAt: new Date().toISOString()
  };
  revalidatePath(`/admin/messages/${id}`);
  return mockMessages[index];
}

export async function simulateMessageReply(id: string, subject: string, body: string): Promise<AdminMessage> {
  const index = mockMessages.findIndex(m => m.id === id);
  if (index === -1) throw new Error("Message not found");

  const newActivity = { id: `ma-${Date.now()}`, action: "Reply simulated", createdAt: new Date().toISOString() };
  const replyNote = { id: `mn-${Date.now()}`, text: `SIMULATED REPLY:\nSubject: ${subject}\n\n${body}`, createdAt: new Date().toISOString() };
  
  mockMessages[index] = { 
    ...mockMessages[index], 
    status: "REPLIED", 
    notes: [replyNote, ...mockMessages[index].notes],
    activity: [newActivity, ...mockMessages[index].activity],
    updatedAt: new Date().toISOString()
  };
  revalidatePath(`/admin/messages/${id}`);
  return mockMessages[index];
}

export async function getMessageKPIs() {
  const active = mockMessages.filter(m => m.status !== "ARCHIVED");
  return {
    total: mockMessages.length,
    unread: active.filter(m => m.status === "UNREAD").length,
    open: active.filter(m => m.status === "OPEN").length,
    replied: active.filter(m => m.status === "REPLIED").length,
    archived: mockMessages.filter(m => m.status === "ARCHIVED").length,
  };
}
