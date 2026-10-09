"use server";

import { AdminSettings } from "./types";
import { revalidatePath } from "next/cache";

let mockSettings: AdminSettings = {
  general: {
    siteName: "Sky Interior",
    adminDisplayName: "Sky Interior Admin",
    defaultContactEmail: "admin@example.com",
    defaultCountry: "India",
    defaultCurrency: "INR",
    timezone: "Asia/Kolkata",
  },
  content: {
    defaultProjectStatus: "Draft",
    defaultDesignStatus: "Draft",
    defaultServiceStatus: "Published",
    defaultGuideStatus: "Published",
    itemsPerPage: "20",
  },
  notifications: {
    newLead: true,
    newConsultation: true,
    newEstimate: false,
    newMessage: true,
  },
  appearance: {
    density: "Comfortable",
    sidebar: "Expanded",
    tableRows: "Default",
  }
};

export async function getSettings(): Promise<AdminSettings> {
  return JSON.parse(JSON.stringify(mockSettings));
}

export async function updateSettings(newSettings: AdminSettings): Promise<AdminSettings> {
  mockSettings = { ...newSettings };
  revalidatePath("/admin/settings");
  return mockSettings;
}
