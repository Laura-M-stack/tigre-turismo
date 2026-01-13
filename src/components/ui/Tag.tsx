type Props = {
  children: string;
  variant?: "default" | "overlay";
};

export default function Tag({ children, variant = "default" }: Props) {
  const base =
    "inline-flex items-center rounded-full px-3 py-1 text-md font-semibold";

  const styles =
    variant === "overlay"
      ? "bg-white/10 text-white backdrop-blur border border-white/30"
      : "bg-slate-100 text-slate-700";

  return <span className={`${base} ${styles}`}>{children}</span>;
}
