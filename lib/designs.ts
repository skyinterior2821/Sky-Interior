import designsData from "@/content/designs.json";

export interface DesignIdea {
  id: string;
  title: string;
  room: string;
  style: string;
  image: string;
  description: string;
}

export function getAllDesigns(): DesignIdea[] {
  return designsData as DesignIdea[];
}

export function getDesignsByIds(ids: string[]): DesignIdea[] {
  return getAllDesigns().filter((d) => ids.includes(d.id));
}

export function getDesignsByRoom(room: string): DesignIdea[] {
  if (room === "All") return getAllDesigns();
  return getAllDesigns().filter((d) => d.room.toLowerCase() === room.toLowerCase());
}

export function getDesignsByStyle(style: string): DesignIdea[] {
  if (style === "All") return getAllDesigns();
  return getAllDesigns().filter((d) => d.style.toLowerCase() === style.toLowerCase());
}

export const ROOM_CATEGORIES = [
  "All",
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Dining",
  "Bathroom",
  "Home Office",
  "Kids Room",
  "Balcony",
  "Foyer",
  "Wardrobe"
];

export const STYLE_CATEGORIES = [
  "All",
  "Modern",
  "Minimal",
  "Contemporary",
  "Luxury",
  "Japandi",
  "Industrial",
  "Modern Classic",
  "Indian Contemporary"
];
