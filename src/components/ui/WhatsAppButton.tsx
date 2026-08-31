import { MessageCircle } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function WhatsAppButton({
  number,
  message,
  label = "WhatsApp Karein",
  className,
  size = "md",
}: {
  number: string;
  message: string;
  label?: string;
  className?: string;
  size?: "md" | "sm" | "icon";
}) {
  return (
    <LinkButton
      as="a"
      href={buildWhatsAppLink(number, message)}
      target="_blank"
      rel="noopener noreferrer"
      variant="whatsapp"
      size={size}
      className={cn(className)}
      aria-label={size === "icon" ? "Chat on WhatsApp" : undefined}
    >
      <MessageCircle size={size === "icon" ? 24 : 18} strokeWidth={1.75} />
      {size !== "icon" && label}
    </LinkButton>
  );
}
