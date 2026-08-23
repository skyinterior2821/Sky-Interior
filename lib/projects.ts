import { Project } from "./types";
import projectsData from "@/content/projects.json";

export function getAllProjects(): Project[] {
  return projectsData as Project[];
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === "All") return getAllProjects();
  return getAllProjects().filter((p) => p.category === category);
}

export function getAllCategories(): string[] {
  return ["All", "Residential", "Commercial", "Hospitality"];
}
