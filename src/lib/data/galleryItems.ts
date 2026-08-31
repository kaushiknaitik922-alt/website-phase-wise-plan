import { IMAGES } from "@/lib/images";
import type { GalleryItem } from "@/lib/types";

/** Local stand-in for Payload's `galleryItems` collection (WEBSITE_ARCHITECTURE.md §3). */
const galleryItems: GalleryItem[] = [
  { id: "g1", title: "Classic Wedding Car", image: IMAGES.weddingFlowerDecor, category: "Car Decoration", isFeatured: true, sortOrder: 1 },
  { id: "g2", title: "Premium Car Decoration", image: IMAGES.rosesGarden, category: "Car Decoration", sortOrder: 2 },
  { id: "g3", title: "Doli Car Setup", image: IMAGES.floralArch, category: "Car Decoration", isFeatured: true, sortOrder: 3 },
  { id: "g4", title: "Haldi Backdrop", image: IMAGES.marigoldGarland, category: "Haldi", isFeatured: true, sortOrder: 4 },
  { id: "g5", title: "Haldi Seating Decor", image: IMAGES.yellowMarigold, category: "Haldi", sortOrder: 5 },
  { id: "g6", title: "Haldi Umbrella Setup", image: IMAGES.fieldFlowers, category: "Haldi", sortOrder: 6 },
  { id: "g7", title: "Bridal Room", image: IMAGES.candlesFlowers, category: "Room Decoration", isFeatured: true, sortOrder: 7 },
  { id: "g8", title: "Engagement Room", image: IMAGES.weddingStage, category: "Room Decoration", sortOrder: 8 },
  { id: "g9", title: "Birthday Room Setup", image: IMAGES.petalsClose, category: "Room Decoration", sortOrder: 9 },
  { id: "g10", title: "Welcome Home Setup", image: IMAGES.giftWrappedBouquet, category: "Room Decoration", sortOrder: 10 },
  { id: "g11", title: "Anniversary Bouquet", image: IMAGES.bouquetTable, category: "Bouquets", isFeatured: true, sortOrder: 11 },
  { id: "g12", title: "Mixed Flower Bouquet", image: IMAGES.mixedBouquet, category: "Bouquets", sortOrder: 12 },
  { id: "g13", title: "Bridal Garland", image: IMAGES.bridalBouquet, category: "Bouquets", sortOrder: 13 },
  { id: "g14", title: "Rose Bouquet", image: IMAGES.gardenRoses, category: "Bouquets", sortOrder: 14 },
  { id: "g15", title: "Shop Fresh Flowers", image: IMAGES.shopFlowers, category: "Other", sortOrder: 15 },
  { id: "g16", title: "Lily Arrangement", image: IMAGES.lilies, category: "Bouquets", sortOrder: 16 },
  { id: "g17", title: "Gerbera Decoration", image: IMAGES.gerbera, category: "Room Decoration", sortOrder: 17 },
  { id: "g18", title: "Floral Stage Arch", image: IMAGES.floralArch, category: "Haldi", sortOrder: 18 },
  { id: "g19", title: "Car Flower Detailing", image: IMAGES.rosesRed, category: "Car Decoration", sortOrder: 19 },
  { id: "g20", title: "Room Petal Decor", image: IMAGES.petalsClose, category: "Room Decoration", sortOrder: 20 },
];

export async function getGalleryItems(): Promise<GalleryItem[]> {
  return [...galleryItems].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export async function getFeaturedGalleryItems(limit = 8): Promise<GalleryItem[]> {
  const all = await getGalleryItems();
  const featured = all.filter((g) => g.isFeatured);
  const rest = all.filter((g) => !g.isFeatured);
  return [...featured, ...rest].slice(0, limit);
}

export const GALLERY_CATEGORIES = [
  "All",
  "Car Decoration",
  "Haldi",
  "Room Decoration",
  "Bouquets",
] as const;
