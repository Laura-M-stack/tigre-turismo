import type { ReactNode } from "react";

type Props = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
  chips?: ReactNode;
  align?: "center" | "left";
  height?: "md" | "lg";
};

const HEIGHT: Record<NonNullable<Props["height"]>, string> = {
  md: "h-[360px] md:h-[440px]",
  lg: "h-[420px] md:h-[520px]",
};

export default function PageHero({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  chips,
  align = "center",
  height = "lg",
}: Props) {
  const isCenter = align === "center";

  return (
    <section className="relative overflow-hidden rounded-3xl border bg-white/70 shadow-sm backdrop-blur">
      {/* Imagen */}
      <img
        src={imageSrc}
        alt={imageAlt}
        className={`w-full ${HEIGHT[height]} object-cover`}
        loading="lazy"
      />

      {/* Overlay para contraste */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/25 to-black/10" />

      {/* Contenido centrado */}
      <div className="absolute inset-0">
        <div
          className={[
            "mx-auto flex h-full max-w-6xl px-6",
            isCenter ? "items-center justify-center text-center" : "items-end",
          ].join(" ")}
        >
          <div className={isCenter ? "max-w-3xl" : "max-w-2xl pb-10"}>
            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
              {title}
            </h1>

            {subtitle ? (
              <p className="mt-3 text-lg leading-relaxed text-white/90 md:text-xl">
                {subtitle}
              </p>
            ) : null}

            {chips ? <div className="mt-5 flex flex-wrap justify-center gap-2">{chips}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
