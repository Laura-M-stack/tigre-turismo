import type { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{
  className?: string;
}>;

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={[
        "rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
