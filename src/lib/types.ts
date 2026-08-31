/**
 * Content shapes mirrored 1:1 from WEBSITE_ARCHITECTURE.md's Payload CMS
 * collection/global field definitions. Today these are served from the local
 * data layer in `src/lib/data`; swapping the functions in that folder for
 * real Payload REST/local-API calls later requires no change to components,
 * since the shapes already match the Payload collections.
 */

export type FlowerCategory = "Loose Flowers" | "Bouquets" | "Garlands";

export interface Flower {
  id: string;
  name: string;
  slug: string;
  category: FlowerCategory;
  image: string;
  rate: number;
  unit: "per piece" | "per bunch" | "per kg" | "per dozen";
  description?: string;
  isFeatured?: boolean;
  isSeasonal?: boolean;
  sortOrder?: number;
}

export type DecorationCategory = "Car" | "Haldi" | "Room";

export interface DecorationService {
  id: string;
  title: string;
  category: DecorationCategory;
  images: string[];
  startingRate: number;
  description: string;
  whatsappMessageOverride?: string;
  isFeatured?: boolean;
  sortOrder?: number;
}

export type GalleryCategory =
  | "Car Decoration"
  | "Haldi"
  | "Room Decoration"
  | "Bouquets"
  | "Other";

export interface GalleryItem {
  id: string;
  title?: string;
  image: string;
  category: GalleryCategory;
  relatedService?: string;
  isFeatured?: boolean;
  sortOrder?: number;
}

export interface DefaultWhatsappMessages {
  home: string;
  flowerGeneric: string;
  carDecoration: string;
  haldiDecoration: string;
  roomDecoration: string;
  galleryGeneric: string;
  bulkOrder: string;
  contact: string;
}

export interface SiteSettings {
  businessName: string;
  tagline: string;
  phoneNumber: string;
  whatsappNumber: string;
  address: string;
  shopHours: string;
  heroImage: string;
  heroHeadline: string;
  heroSubline: string;
  establishedNote: string;
  defaultWhatsappMessages: DefaultWhatsappMessages;
}

export interface GenerationBlock {
  id: string;
  name: string;
  role: string;
  years: string;
  photo?: string;
  storyText: string;
  sortOrder: number;
}

export interface ValuePoint {
  title: string;
  description: string;
}

export interface AboutStory {
  intro: string;
  generations: GenerationBlock[];
  valuesSection: ValuePoint[];
  shopPhoto: string;
}

export type Occasion =
  | "Birthday"
  | "Wedding"
  | "Haldi"
  | "Room Decoration"
  | "Car Decoration"
  | "Other";

export interface EnquiryInput {
  name: string;
  phone: string;
  occasion: Occasion;
  eventDate?: string;
  message?: string;
}
