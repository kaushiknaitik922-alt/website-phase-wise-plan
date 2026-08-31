import { IMAGES } from "@/lib/images";
import type { AboutStory } from "@/lib/types";

/**
 * Local stand-in for Payload's `aboutStory` global (WEBSITE_ARCHITECTURE.md §3).
 *
 * Note on `photo`: real family photos belong to the Saini family and must be
 * uploaded by the owner via `/admin` — they are intentionally left unset
 * here rather than stood in with unrelated stock photography of strangers.
 * `GenerationBlock` renders a tasteful monogram placeholder until a real
 * photo is set, matching BRAND_GUIDELINES.md's "real photos only" rule.
 */
const aboutStory: AboutStory = {
  intro:
    "Teen peedhiyon se Sonipat ke shubh avsaron ka hissa — flowers aur decoration jinpe bharosa kiya ja sakta hai.",
  generations: [
    {
      id: "gen-1",
      name: "Harivansh Saini",
      role: "Founder",
      years: "Shuruaat",
      storyText:
        "Harivansh Saini ne Gur Mandi, Sonipat ke paas ek chhoti si phool ki dukaan se is safar ki shuruaat ki. Unka maanna tha ki har phool taaza hona chahiye aur har grahak se rishta imaandaari se banna chahiye. Yehi soch aaj bhi dukaan ki neev hai.",
      sortOrder: 1,
    },
    {
      id: "gen-2",
      name: "Sunil Saini",
      role: "Second Generation",
      years: "Vistaar",
      storyText:
        "Apne pita ke kaam ko aage badhate hue, Sunil Saini ne dukaan mein decoration services jodi — car decoration, haldi rasam aur room decoration. Unhone Sonipat ki bahut si shaadiyon aur samaroh mein apni sewa di, aur naye grahakon ka bharosa jeeta.",
      sortOrder: 2,
    },
    {
      id: "gen-3",
      name: "Ayush Saini & Anant Saini",
      role: "Third Generation",
      years: "Aaj",
      storyText:
        "Aaj Ayush aur Anant Saini dukaan sambhaalte hain — wahi purani imaandaari, ab nayi soch ke saath. Rates saaf-saaf, WhatsApp par turant jawab, aur har order mein wahi dhyaan jo unke dada ne shuru kiya tha.",
      sortOrder: 3,
    },
  ],
  valuesSection: [
    {
      title: "Taaze Phoolon Ki Guarantee",
      description:
        "Har din mandi se taaze phool mangwaaye jaate hain — koi purana stock nahi bikta.",
    },
    {
      title: "Saaf Aur Imaandaar Rates",
      description:
        "Rate poochhne par turant sahi jawab — bargaining ya hidden charges nahi.",
    },
    {
      title: "Personal Rishta",
      description:
        "Teen peedhiyon se wahi families dobara aati hain — kyunki yahan grahak, customer nahi, apna maana jaata hai.",
    },
  ],
  shopPhoto: IMAGES.shopFront,
};

export async function getAboutStory(): Promise<AboutStory> {
  return aboutStory;
}
