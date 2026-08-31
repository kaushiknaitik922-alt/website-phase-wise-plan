import { Flower2 } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { PetalDecor } from "@/components/ui/PetalDecor";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <PetalDecor variant="scatter" className="absolute top-10 left-10 opacity-60" />
      <div className="container-content flex flex-col items-center gap-5 py-24 md:py-32 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blush-tint text-blush-dark">
          <Flower2 size={30} strokeWidth={1.5} />
        </div>
        <h1 className="font-heading text-[28px] md:text-[36px] font-bold text-charcoal">
          Yeh Page Nahi Mila
        </h1>
        <p className="font-body text-muted max-w-md">
          Lagta hai yeh raasta khaali hai. Chaliye aapko wapas le chalte hain.
        </p>
        <LinkButton as="a" href="/" variant="primary">
          Home Par Jaayein
        </LinkButton>
      </div>
    </section>
  );
}
