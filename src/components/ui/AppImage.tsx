import { useMemo, useState } from "react";

type Props = {
  src?: string;
  alt: string;
  className?: string;

  // passthrough img props útiles
  loading?: "eager" | "lazy";
  decoding?: "async" | "auto" | "sync";
  fetchPriority?: "high" | "low" | "auto";
};

function toWebpPath(src: string) {
  const s = src.replace(/\\/g, "/");
  if (s.toLowerCase().endsWith(".webp")) return s;

  const withWebpExt = s.replace(/\.(jpe?g|png)$/i, ".webp");

  // public/images/webp
  if (withWebpExt.startsWith("images/")) {
    return withWebpExt.replace(/^images\//, "images/webp/");
  }

  return withWebpExt;
}

export default function AppImage({
  src,
  alt,
  className,
  loading = "lazy",
  decoding = "async",
  fetchPriority = "auto",
}: Props) {
  // 0 = intentando webp, 1 = fallback al original, 2 = roto
  const [stage, setStage] = useState<0 | 1 | 2>(0);

  const webpSrc = useMemo(() => (src ? toWebpPath(src) : undefined), [src]);

  const key = `${src ?? "no-src"}`;

  if (!src || stage === 2) {
    return (
      <div className={`flex items-center justify-center bg-slate-100 text-slate-500 ${className ?? ""}`}>
        <span className="text-sm">Sin imagen</span>
      </div>
    );
  }

  const finalSrc = stage === 0 ? webpSrc : src;

  return (
    <img
      key={key}
      src={finalSrc}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      onError={() => setStage((prev) => (prev === 0 ? 1 : 2))}
    />
  );
}
