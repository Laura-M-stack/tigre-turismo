import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-lg font-semibold " +
    "transition focus:outline-none focus:ring-2 focus:ring-slate-900/20 disabled:opacity-50 " +
    // 👇 CLAVE: esto hace que border-white/xx funcione aunque no pongas `border`
    "border border-transparent";

  const styles =
    variant === "primary"
      ? "bg-teal-900 border-2 border-white/70 text-white hover:bg-teal-600 focus:ring-white-500/50"
      : "bg-slate-100 border-2 text-slate-800 hover:bg-slate-200";

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
