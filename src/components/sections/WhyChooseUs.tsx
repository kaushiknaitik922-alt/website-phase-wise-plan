import { Flower2, Truck, HandHeart, Tag } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerReveal, StaggerItem } from "@/components/ui/StaggerReveal";

const POINTS = [
  {
    icon: HandHeart,
    title: "Teen Peedhiyon Ka Bharosa",
    description: "Harivansh Saini se leke aaj tak — wahi imaandaari, wahi rishta.",
  },
  {
    icon: Flower2,
    title: "Roz Taaze Phool",
    description: "Har din mandi se fresh flowers — koi purana stock nahi.",
  },
  {
    icon: Truck,
    title: "Delivery Available",
    description: "Flowers ho ya decoration setup — samay par delivery.",
  },
  {
    icon: Tag,
    title: "Transparent Rates",
    description: "Rate pehle hi saaf — koi hidden charge ya bargaining nahi.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-warm-white">
      <div className="container-content">
        <SectionHeading eyebrow="Hamari Pehchaan" title="Why Choose Us" />
        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {POINTS.map(({ icon: Icon, title, description }) => (
            <StaggerItem key={title} className="flex flex-col items-center text-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage/15 text-sage-dark">
                <Icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-[18px] font-semibold text-charcoal">{title}</h3>
              <p className="font-body text-sm text-muted max-w-[220px]">{description}</p>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
