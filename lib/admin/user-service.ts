"use server";

import { AdminUser, UserRole, UserStatus } from "./types";
import { revalidatePath } from "next/cache";

let mockUsers: AdminUser[] = [
  {
    id: "USER-001",
    name: "Admin User",
    email: "admin@example.com",
    phone: "+91 98000 00001",
    role: "ADMIN",
    status: "ACTIVE",
    lastActive: "2026-10-08T09:00:00Z",
    createdAt: "2024-01-10T10:00:00Z",
    notes: "Primary platform administrator."
  },
  {
    id: "USER-002",
    name: "John Manager",
    email: "manager@example.com",
    phone: "+91 98000 00002",
    role: "MANAGER",
    status: "ACTIVE",
    lastActive: "2026-10-07T14:30:00Z",
    createdAt: "2025-06-15T11:00:00Z",
  },
  {
    id: "USER-003",
    name: "Sarah Editor",
    email: "editor1@example.com",
    role: "EDITOR",
    status: "ACTIVE",
    lastActive: "2026-10-06T11:20:00Z",
    createdAt: "2025-08-20T09:15:00Z",
  },
  {
    id: "USER-004",
    name: "Raj Editor",
    email: "editor2@example.com",
    phone: "+91 98000 00004",
    role: "EDITOR",
    status: "SUSPENDED",
    lastActive: "2026-05-12T16:45:00Z",
    createdAt: "2025-09-01T14:00:00Z",
    notes: "Account temporarily suspended while on extended leave."
  },
  {
    id: "USER-005",
    name: "Client Viewer 1",
    email: "viewer1@example.com",
    role: "VIEWER",
    status: "INVITED",
    lastActive: "",
    createdAt: "2026-10-01T10:00:00Z",
  },
  {
    id: "USER-006",
    name: "Client Viewer 2",
    email: "viewer2@example.com",
    role: "VIEWER",
    status: "ACTIVE",
    lastActive: "2026-10-05T09:10:00Z",
    createdAt: "2026-09-20T10:30:00Z",
  },
  {
    id: "USER-007",
    name: "Marketing Manager",
    email: "marketing@example.com",
    role: "MANAGER",
    status: "ACTIVE",
    lastActive: "2026-10-08T10:15:00Z",
    createdAt: "2025-11-05T08:00:00Z",
  },
  {
    id: "USER-008",
    name: "Finance Viewer",
    email: "finance@example.com",
    role: "VIEWER",
    status: "INVITED",
    lastActive: "",
    createdAt: "2026-10-07T16:00:00Z",
  }
];

export async function getUsers(): Promise<AdminUser[]> {
  return [...mockUsers];
}

export async function getUserById(id: string): Promise<AdminUser | null> {
  return mockUsers.find(u => u.id === id) || null;
}

export async function getUserKPIs() {
  return {
    total: mockUsers.length,
    active: mockUsers.filter(u => u.status === "ACTIVE").length,
    invited: mockUsers.filter(u => u.status === "INVITED").length,
    suspended: mockUsers.filter(u => u.status === "SUSPENDED").length,
  };
}

export async function createUser(input: Omit<AdminUser, "id" | "lastActive" | "createdAt">): Promise<AdminUser> {
  const newUser: AdminUser = {
    ...input,
    id: `USER-${String(mockUsers.length + 1).padStart(3, '0')}`,
    lastActive: "",
    createdAt: new Date().toISOString()
  };
  mockUsers = [newUser, ...mockUsers];
  revalidatePath("/admin/users");
  return newUser;
}

export async function updateUser(id: string, input: Partial<AdminUser>): Promise<AdminUser> {
  const index = mockUsers.findIndex(u => u.id === id);
  if (index === -1) throw new Error("User not found");
  mockUsers[index] = { ...mockUsers[index], ...input };
  revalidatePath("/admin/users");
  return mockUsers[index];
}

export async function updateUserStatus(id: string, status: UserStatus): Promise<AdminUser> {
  const index = mockUsers.findIndex(u => u.id === id);
  if (index === -1) throw new Error("User not found");
  mockUsers[index].status = status;
  revalidatePath("/admin/users");
  return mockUsers[index];
}
