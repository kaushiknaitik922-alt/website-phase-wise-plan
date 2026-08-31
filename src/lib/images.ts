/**
 * Placeholder imagery for the local content layer.
 *
 * BRAND_GUIDELINES.md is explicit that production photos must be real
 * shop/decoration photos uploaded via the CMS — never stock photography.
 * Until the owner uploads real photos through `/admin`, these curated
 * editorial-style photos stand in so every page can be reviewed with
 * realistic imagery instead of grey boxes. `ImageWithFallback` (see
 * `components/ui/ImageWithFallback.tsx`) degrades any broken URL to a
 * tasteful branded placeholder, so a bad link never shows as a broken image.
 *
 * Swapping this file's URLs for `image.url` from Payload's `media`
 * collection is the entire migration step later — no component changes
 * needed, since every component already just receives a `string` URL.
 */

function unsplash(id: string, width = 1200): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;
}

export const IMAGES = {
  heroBouquet: unsplash("1490750967868-88aa4486c946", 1600),
  heroBouquetMobile: unsplash("1518895949257-7621c3c786d7", 900),

  shopFlowers: unsplash("1519378058457-4c29a0a2efac"),
  shopFront: unsplash("1441986300917-64674bd600d8"),

  rosesRed: unsplash("1487070183336-b863922373d4"),
  rosesPinkMacro: unsplash("1518895949257-7621c3c786d7"),
  peonyBouquet: unsplash("1441984904996-e0b6ba687e04"),
  bouquetTable: unsplash("1502472584811-0a2f2feb8968"),
  whiteFlowers: unsplash("1508610048659-a06b669e3321"),
  fieldFlowers: unsplash("1462275646964-a0e3386b89fa"),
  pinkFlowers: unsplash("1533616688419-b7a585564566"),
  flowerBunch: unsplash("1465146344425-f00d5f5c8f07"),
  weddingFlowerDecor: unsplash("1487530811176-3780de880c2d"),
  yellowMarigold: unsplash("1473773508845-188df298d2d1"),
  mixedBouquet: unsplash("1526047932273-341f2a7631f9"),
  marigoldGarland: unsplash("1509587584298-0f3b3a3a1797"),
  rosesGarden: unsplash("1520763185298-1b434c919102"),
  giftWrappedBouquet: unsplash("1520923642038-b4259acecbd7"),
  lilies: unsplash("1465495976277-4387d4b0b4c6"),
  carnations: unsplash("1571905837051-7c67e419d5f9"),
  roseCloseup: unsplash("1503781115805-518a5a1c7f9e"),
  gerbera: unsplash("1550005809-91ad75fb315f"),
  weddingStage: unsplash("1519741497674-611481863552"),
  floralArch: unsplash("1519225421980-715cb0215aed"),
  candlesFlowers: unsplash("1478146059778-26028b07395a"),
  gardenRoses: unsplash("1524598171353-e0d02aa79b64"),
  bridalBouquet: unsplash("1546032996-6dfacbacbf3f"),
  flowerMarket: unsplash("1509223197845-458d87318791"),
  petalsClose: unsplash("1524712245354-2c4e5e7121c0"),
} as const;

export type ImageKey = keyof typeof IMAGES;
