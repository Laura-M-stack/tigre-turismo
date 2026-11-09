export type ButtonVariant = "primary" | "secondary" | "ghost" | "accent";
export type ButtonSize = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors " +
  "disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-river-800 text-white hover:bg-river-900",
  accent: "bg-brick-600 text-white hover:bg-brick-700",
  secondary: "border border-ink/15 bg-white text-ink hover:border-ink/30 hover:bg-cream-50",
  ghost: "text-ink hover:bg-ink/5",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-12 px-6 text-base",
};

export type ButtonStyleProps = { variant?: ButtonVariant; size?: ButtonSize; className?: string };

export function buttonClasses({ variant = "primary", size = "md", className = "" }: ButtonStyleProps = {}) {
  return [BASE, VARIANTS[variant], SIZES[size], className].filter(Boolean).join(" ");
}
