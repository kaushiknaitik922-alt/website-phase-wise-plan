import { IMAGES } from "@/lib/images";
import type { DecorationService } from "@/lib/types";

/** Local stand-in for Payload's `decorationServices` collection (WEBSITE_ARCHITECTURE.md §3). */
const decorationServices: DecorationService[] = [
  {
    id: "d1",
    title: "Wedding Car Decoration – Classic",
    category: "Car",
    images: [IMAGES.weddingFlowerDecor, IMAGES.floralArch],
    startingRate: 2500,
    description:
      "Fresh roses aur genda phool se car ki classic sajaawat — baraat aur doli, dono ke liye.",
    isFeatured: true,
    sortOrder: 1,
  },
  {
    id: "d2",
    title: "Wedding Car Decoration – Premium",
    category: "Car",
    images: [IMAGES.rosesGarden, IMAGES.weddingStage],
    startingRate: 4500,
    description:
      "Premium imported flowers, full-body coverage aur custom theme colours ke saath.",
    sortOrder: 2,
  },
  {
    id: "d3",
    title: "Doli Car Decoration",
    category: "Car",
    images: [IMAGES.mixedBouquet],
    startingRate: 1800,
    description: "Vidaai ke liye doli car ki simple aur khoobsurat sajaawat.",
    sortOrder: 3,
  },
  {
    id: "d4",
    title: "Haldi Rasam Decoration – Standard",
    category: "Haldi",
    images: [IMAGES.marigoldGarland, IMAGES.yellowMarigold],
    startingRate: 3500,
    description:
      "Genda phool ki backdrop, seating aur props ke saath poori haldi rasam sajaawat.",
    isFeatured: true,
    sortOrder: 4,
  },
  {
    id: "d5",
    title: "Haldi Rasam Decoration – Premium Backdrop",
    category: "Haldi",
    images: [IMAGES.floralArch, IMAGES.fieldFlowers],
    startingRate: 6000,
    description:
      "Bade backdrop, umbrella decor aur photo-corner ke saath premium haldi setup.",
    sortOrder: 5,
  },
  {
    id: "d6",
    title: "Bridal Room Decoration",
    category: "Room",
    images: [IMAGES.candlesFlowers, IMAGES.rosesGarden],
    startingRate: 4000,
    description:
      "Roses, fairy lights aur balloons ke saath first-night bridal room sajaawat.",
    isFeatured: true,
    sortOrder: 6,
  },
  {
    id: "d7",
    title: "Engagement Room Decoration",
    category: "Room",
    images: [IMAGES.weddingStage, IMAGES.mixedBouquet],
    startingRate: 3000,
    description: "Engagement ke liye theme-based flower aur balloon decoration.",
    sortOrder: 7,
  },
  {
    id: "d8",
    title: "Birthday Room Decoration",
    category: "Room",
    images: [IMAGES.gerbera, IMAGES.petalsClose],
    startingRate: 1500,
    description: "Balloons, flowers aur banner ke saath birthday room setup.",
    sortOrder: 8,
  },
  {
    id: "d9",
    title: "Welcome Home Decoration",
    category: "Room",
    images: [IMAGES.giftWrappedBouquet],
    startingRate: 1200,
    description: "Naye ghar ya nayi bahu ke swagat ke liye simple phool sajaawat.",
    sortOrder: 9,
  },
];

export async function getDecorationServices(): Promise<DecorationService[]> {
  return [...decorationServices].sort(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
  );
}

export async function getFeaturedDecorationServices(
  limit = 3
): Promise<DecorationService[]> {
  const all = await getDecorationServices();
  const featured = all.filter((d) => d.isFeatured);
  if (featured.length >= limit) return featured.slice(0, limit);
  // Fall back to first one of each category so the Home preview always has 3.
  const categories: DecorationService["category"][] = ["Car", "Haldi", "Room"];
  return categories
    .map((cat) => all.find((d) => d.category === cat)!)
    .filter(Boolean);
}

export const DECORATION_CATEGORIES = ["Car", "Haldi", "Room"] as const;
