export interface DashboardKPIs {
  totalProjects: number;
  activeLeads: number;
  newConsultations: number;
  pendingEstimates: number;
}

export interface ContentOverview {
  projects: { published: number; draft: number };
  designs: { published: number; draft: number };
  services: { published: number; draft: number };
  guides: { published: number; draft: number };
}

export interface Lead {
  id: string;
  name: string;
  service: string;
  property: string;
  budget: string;
  status: "NEW" | "CONTACTED" | "QUALIFIED" | "SITE_VISIT" | "QUOTATION" | "CONVERTED" | "LOST";
  date: string;
}

export interface Consultation {
  id: string;
  client: string;
  property: string;
  service: string;
  timeline: string;
  status: "NEW" | "CONTACTED" | "SCHEDULED" | "COMPLETED" | "CANCELLED" | "CONVERTED";
  date: string;
}

export interface AdminProject {
  id: string;
  name: string;
  slug: string;
  description: string;
  location: string;
  propertyType: string;
  rooms: number;
  style: string;
  featured: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  coverImage: string;
  gallery: string[];
  overview: string;
  designStory: string;
  materials: string;
  highlights: string;
  metaTitle: string;
  metaDescription: string;
  updatedAt: string;
}

export interface AdminDesign {
  id: string;
  title: string;
  slug: string;
  description: string;
  room: string;
  style: string;
  tags: string[];
  featured: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  mainImage: string;
  additionalImages: string[];
  metaTitle: string;
  metaDescription: string;
  updatedAt: string;
}

export interface AdminService {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
  imageAlt: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  featured: boolean;
  features: string[];
  process: { step: string; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  ctaHeading: string;
  ctaDescription: string;
  ctaLabel: string;
  ctaDestination: string;
  metaTitle: string;
  metaDescription: string;
  updatedAt: string;
}

export interface AdminGuide {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  readingTime: string;
  featured: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  coverImage: string;
  imageAlt: string;
  content: { id: string; type: "heading" | "paragraph" | "image" | "quote" | "tip"; content: string }[];
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  canonicalUrl: string;
  updatedAt: string;
}

export type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "IN_PROGRESS" | "CONVERTED" | "LOST" | "ARCHIVED";
export type LeadPriority = "LOW" | "MEDIUM" | "HIGH";
export type LeadSource = "WEBSITE" | "CONSULTATION" | "ESTIMATE" | "CONTACT" | "OTHER";

export interface LeadNote {
  id: string;
  text: string;
  createdAt: string;
}

export interface LeadActivity {
  id: string;
  action: string;
  createdAt: string;
}

export interface AdminLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferredContactMethod: string;
  interestedService: string;
  propertyType: string;
  homeSize: string;
  rooms: string;
  budgetRange: string;
  preferredTimeline: string;
  priority: LeadPriority;
  status: LeadStatus;
  source: LeadSource;
  notes: LeadNote[];
  activity: LeadActivity[];
  createdAt: string;
  updatedAt: string;
}

export type ConsultationStatus = "REQUESTED" | "CONTACTED" | "SCHEDULED" | "COMPLETED" | "CANCELLED" | "ARCHIVED";
export type ConsultationType = "DESIGN_CONSULTATION" | "HOME_VISIT" | "ONLINE_CONSULTATION";

export interface ConsultationNote {
  id: string;
  text: string;
  createdAt: string;
}

export interface ConsultationActivity {
  id: string;
  action: string;
  createdAt: string;
}

export interface AdminConsultation {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  preferredContactMethod: string;
  consultationType: ConsultationType;
  service: string;
  preferredDate: string; // ISO date string
  preferredTime: string;
  propertyType: string;
  homeSize: string;
  rooms: string;
  budgetRange: string;
  additionalRequirements: string;
  status: ConsultationStatus;
  notes: ConsultationNote[];
  activity: ConsultationActivity[];
  relatedLeadId?: string;
  createdAt: string;
  updatedAt: string;
}

export type EstimateStatus = "NEW" | "REVIEWED" | "CONSULTATION_REQUESTED" | "ARCHIVED";
export type EstimatePropertyType = "FULL_HOME" | "KITCHEN" | "BEDROOM" | "LIVING_ROOM" | "OTHER";
export type EstimateFinish = "STANDARD" | "PREMIUM" | "LUXURY";

export interface EstimateNote {
  id: string;
  text: string;
  createdAt: string;
}

export interface EstimateActivity {
  id: string;
  action: string;
  createdAt: string;
}

export interface AdminEstimate {
  id: string;
  reference: string;
  clientName: string;
  email: string;
  phone: string;
  propertyType: EstimatePropertyType;
  homeSize: string;
  finishLevel: EstimateFinish;
  baseAmount: string;
  finishAdjustmentAmount: string;
  addons: { name: string; amount: string }[];
  indicativeAmount: string;
  status: EstimateStatus;
  notes: EstimateNote[];
  activity: EstimateActivity[];
  relatedLeadId?: string;
  relatedConsultationId?: string;
  createdAt: string;
  updatedAt: string;
}

export type MessageStatus = "UNREAD" | "OPEN" | "REPLIED" | "CLOSED" | "ARCHIVED";
export type MessageSource = "CONTACT" | "CONSULTATION" | "ESTIMATE" | "OTHER";

export interface MessageNote {
  id: string;
  text: string;
  createdAt: string;
}

export interface MessageActivity {
  id: string;
  action: string;
  createdAt: string;
}

export interface AdminMessage {
  id: string;
  senderName: string;
  email: string;
  phone?: string;
  subject: string;
  body: string;
  source: MessageSource;
  status: MessageStatus;
  notes: MessageNote[];
  activity: MessageActivity[];
  relatedLeadId?: string;
  relatedConsultationId?: string;
  createdAt: string;
  updatedAt: string;
}

export type MediaType = "IMAGE" | "VIDEO" | "DOCUMENT";
export type MediaStatus = "ACTIVE" | "ARCHIVED";
export type MediaUsage = "USED" | "UNUSED";
export type MediaFolder = "PROJECTS" | "DESIGNS" | "SERVICES" | "GUIDES" | "GENERAL";

export interface MediaRelation {
  type: "PROJECT" | "DESIGN" | "SERVICE" | "GUIDE";
  id: string;
  name: string;
}

export interface AdminMedia {
  id: string;
  filename: string;
  url: string;
  type: MediaType;
  dimensions: string;
  size: string;
  altText: string;
  folder: MediaFolder;
  tags: string[];
  usage: MediaUsage;
  status: MediaStatus;
  relations: MediaRelation[];
  createdAt: string;
  updatedAt: string;
}

export type UserRole = "ADMIN" | "EDITOR" | "MANAGER" | "VIEWER";
export type UserStatus = "ACTIVE" | "INVITED" | "SUSPENDED";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  lastActive: string;
  createdAt: string;
  notes?: string;
}

export interface AdminSettings {
  general: {
    siteName: string;
    adminDisplayName: string;
    defaultContactEmail: string;
    defaultCountry: string;
    defaultCurrency: string;
    timezone: string;
  };
  content: {
    defaultProjectStatus: string;
    defaultDesignStatus: string;
    defaultServiceStatus: string;
    defaultGuideStatus: string;
    itemsPerPage: string;
  };
  notifications: {
    newLead: boolean;
    newConsultation: boolean;
    newEstimate: boolean;
    newMessage: boolean;
  };
  appearance: {
    density: "Comfortable" | "Compact";
    sidebar: "Expanded" | "Collapsed";
    tableRows: "Default" | "Compact";
  };
}
