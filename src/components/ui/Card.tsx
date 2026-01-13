import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
}>;

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

export default function Card({ children, className }: Props) {
  return (
    <div
      className={cn(
        [
          "rounded-2xl border border-slate-200/70",
          "bg-white/90 backdrop-blur",
          "shadow-sm transition-all duration-200",
          "hover:shadow-md hover:-translate-y-0.5",
        ].join(" "),
        className,
      )}
    >
      {children}
    </div>
  );
}
