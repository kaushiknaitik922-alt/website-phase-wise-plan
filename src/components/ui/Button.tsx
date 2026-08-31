import { forwardRef } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "call" | "whatsapp" | "ghost";
type Size = "md" | "sm" | "icon";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold transition-all duration-200 ease-breeze focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-blush text-white shadow-btn-primary hover:bg-blush-dark hover:-translate-y-0.5",
  outline:
    "border-[1.5px] border-charcoal text-charcoal bg-transparent hover:bg-charcoal hover:text-white",
  call:
    "border-[1.5px] border-charcoal text-charcoal bg-transparent hover:bg-charcoal hover:text-white",
  whatsapp:
    "bg-whatsapp text-white shadow-btn-whatsapp hover:bg-whatsapp-dark hover:-translate-y-0.5",
  ghost: "text-charcoal hover:text-blush-dark",
};

const sizes: Record<Size, string> = {
  md: "px-7 py-3 text-base",
  sm: "px-5 py-2 text-sm",
  icon: "h-14 w-14 p-0",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
}

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };
type LinkProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a"; href: string };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", icon, children, className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
);
Button.displayName = "Button";

export const LinkButton = forwardRef<HTMLAnchorElement, LinkProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- `as` is a discriminant prop, not a DOM attribute
  ({ variant = "primary", size = "md", icon, children, className, as, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {icon}
      {children}
    </a>
  )
);
LinkButton.displayName = "LinkButton";

/** Convenience wrapper for the recurring "Call Now" outline button. */
export function CallButton({
  href,
  className,
  compact = false,
}: {
  href: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <LinkButton
      as="a"
      href={href}
      variant="call"
      size={compact ? "icon" : "md"}
      className={className}
      aria-label="Call Now"
    >
      <Phone size={compact ? 20 : 18} strokeWidth={1.75} />
      {!compact && "Call Now"}
    </LinkButton>
  );
}
