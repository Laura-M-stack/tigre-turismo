import { useState } from "react";

type Props = {
  src?: string;
  alt: string;
  className?: string;
};

export default function AppImage({ src, alt, className }: Props) {
  const [broken, setBroken] = useState(false);

  if (!src || broken) {
    return (
      <div
        className={`h-44 w-full object-cover transition group-hover:scale-[1.02] ${className ?? ""}`}
      >
        <span className="text-xs">Sin imagen</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setBroken(true)}
    />
  );
}
