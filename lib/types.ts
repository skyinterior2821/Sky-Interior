export interface Project {
  slug: string;
  name: string;
  category: "Residential" | "Commercial" | "Hospitality";
  city: string;
  size: string;
  scope: string;
  timeline: string;
  brief: string;
  heroImage: string;
  images: string[];
  closingLine: string;
  featured: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  spaceType: "Residential" | "Commercial" | "Hospitality" | "Not sure yet";
  message: string;
  honeypot?: string; // spam protection — should always be empty
}
