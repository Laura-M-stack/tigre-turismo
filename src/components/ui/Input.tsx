import type { InputHTMLAttributes } from "react";

export default function Input({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-xl border px-4 py-2 text-md outline-none focus:ring-2 focus:ring-slate-900/15 ${className}`}
      {...props}
    />
  );
}
