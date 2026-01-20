import { Link, useLocation } from "react-router-dom";

import { googleMapsDirectionsUrl } from "../../lib/maps";
import type { Place } from "../../types/place";
import AppImage from "../ui/AppImage";
import Button from "../ui/Button";
import Tag from "../ui/Tag";

type Props = {
  place: Place;
};

export default function PlaceCard({ place }: Props) {
  const { pathname } = useLocation();
  const isDetail = pathname.startsWith("/lugares/");

  return (
    <article
      className={[
        "group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-sm",
        // ✅ altura consistente en todas las pantallas
        // - mínimo: 320px
        // - máximo: 450px
        // - en el medio: escala con viewport
        "h-[clamp(320px,44vw,450px)]",
      ].join(" ")}
    >
      {/* Imagen de fondo */}
      <AppImage
        src={place.coverImage}
        alt={place.name}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/35 to-black/10" />

      {/* Badges arriba */}
      <div className="absolute left-4 right-4 top-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-white/15 px-3 py-1 text-md font-semibold text-white backdrop-blur">
          {place.category}
        </span>
        <span className="rounded-full bg-white/15 px-3 py-1 text-md font-semibold text-white backdrop-blur">
          {place.duration}
        </span>
        <span className="rounded-full bg-white/15 px-3 py-1 text-md font-semibold text-white backdrop-blur">
          {place.budget}
        </span>
        {place.locationType ? (
          <span className="rounded-full bg-white/15 px-3 py-1 text-md font-semibold text-white backdrop-blur">
            {place.locationType === "entrance" ? "Acceso" : "Zona"}
          </span>
        ) : null}
      </div>

      {/* Contenido abajo */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
          {place.name}
        </h3>

        {place.shortDescription ? (
          <p className="mt-2 line-clamp-2 max-w-2xl text-md text-white/90 md:text-base">
            {place.shortDescription}
          </p>
        ) : null}

        {place.tags?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {place.tags.slice(0, 4).map((t) => (
              <Tag variant="overlay" key={t}>
                {t}
              </Tag>
            ))}
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2">
          {!isDetail ? (
            <Link to={`/lugares/${place.slug}`}>
              <Button className="shadow-lg">Ver detalle</Button>
            </Link>
          ) : null}

          {typeof place.lat === "number" && typeof place.lng === "number" ? (
            <a
              href={googleMapsDirectionsUrl(place.lat, place.lng)}
              target="_blank"
              rel="noreferrer"
            >
              <Button
                variant="ghost"
                className="border border-white/55 bg-white/15 text-white shadow-lg ring-1 ring-white/10 backdrop-blur hover:bg-white/30 hover:border-white/70"
              >
                Cómo llegar
              </Button>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
