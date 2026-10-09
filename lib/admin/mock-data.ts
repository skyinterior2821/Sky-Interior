import { DashboardKPIs, ContentOverview, Lead, Consultation } from "./types";

export const mockKPIs: DashboardKPIs = {
  totalProjects: 24,
  activeLeads: 48,
  newConsultations: 16,
  pendingEstimates: 31,
};

export const mockContentOverview: ContentOverview = {
  projects: { published: 18, draft: 6 },
  designs: { published: 42, draft: 12 },
  services: { published: 5, draft: 0 },
  guides: { published: 8, draft: 3 },
};

export const mockRecentLeads: Lead[] = [
  { id: "L-1001", name: "Aarav Patel", service: "Full Home Interior", property: "3 BHK Apartment", budget: "₹15L - ₹25L", status: "NEW", date: "Today, 10:42 AM" },
  { id: "L-1002", name: "Neha Sharma", service: "Modular Kitchen", property: "Villa", budget: "₹5L - ₹10L", status: "CONTACTED", date: "Yesterday, 04:15 PM" },
  { id: "L-1003", name: "Vikram Singh", service: "Wardrobes & Storage", property: "4 BHK Apartment", budget: "₹10L - ₹15L", status: "QUALIFIED", date: "Oct 12, 09:30 AM" },
  { id: "L-1004", name: "Priya Desai", service: "Commercial Space", property: "Office 2000 sqft", budget: "₹25L+", status: "QUOTATION", date: "Oct 10, 02:20 PM" },
];

export const mockRecentConsultations: Consultation[] = [
  { id: "C-2001", client: "Rohan Mehta", property: "3 BHK Premium", service: "Full Home", timeline: "Immediately", status: "NEW", date: "Today, 11:00 AM" },
  { id: "C-2002", client: "Sanya Gupta", property: "Villa Duplex", service: "Renovation", timeline: "Within 3 months", status: "SCHEDULED", date: "Tomorrow, 02:00 PM" },
  { id: "C-2003", client: "Amit Joshi", property: "2 BHK", service: "Kitchen Only", timeline: "Within 6 months", status: "COMPLETED", date: "Oct 11, 2023" },
];
