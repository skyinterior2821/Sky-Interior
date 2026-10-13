import { mockKPIs, mockContentOverview, mockRecentLeads, mockRecentConsultations } from "./mock-data";

export async function getDashboardKPIs() {
  // Simulating network delay
  return new Promise((resolve) => setTimeout(() => resolve(mockKPIs), 100));
}

export async function getContentOverview() {
  return new Promise((resolve) => setTimeout(() => resolve(mockContentOverview), 100));
}

export async function getRecentLeads() {
  return new Promise((resolve) => setTimeout(() => resolve(mockRecentLeads), 150));
}

export async function getRecentConsultations() {
  return new Promise((resolve) => setTimeout(() => resolve(mockRecentConsultations), 150));
}
