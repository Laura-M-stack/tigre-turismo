import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import PlaceMap from "../components/place/PlaceMap";
import AppImage from "../components/ui/AppImage";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Tag from "../components/ui/Tag";
import { places } from "../data/places";
import { googleMapsDirectionsUrl } from "../lib/maps";
import { setSEO } from "../lib/seo";
import { getFavs, toggleFav } from "../lib/storage";

function getBestMoment(duration: string) {
  // simple y útil (sin inventar “facts”)
  if (duration.includes("1-2")) return "Ideal por la mañana o al atardecer.";
  if (duration.includes("2-4")) return "Mejor en media mañana para ir con tiempo.";
  return "Si podés, evitá el mediodía en días de mucho sol.";
}

export default function LugarDetalle() {
  const { slug } = useParams();
  const place = useMemo(() => places.find((p) => p.slug === slug), [slug]);

  const [favs, setFavs] = useState<string[]>(() => getFavs());

  useEffect(() => {
    if (!place) return;
    setSEO(`${place.name} — Tigre Turismo`, place.shortDescription);
  }, [place]);

  if (!place) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-slate-700">Lugar no encontrado.</p>
        <Link className="text-sm underline" to="/que-hacer">
          Volver a Qué hacer
        </Link>
      </div>
    );
  }

  const isFav = favs.includes(place.slug);
  const gallery = place.gallery?.length ? place.gallery : place.coverImage ? [place.coverImage] : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link className="text-sm font-medium text-slate-700 underline" to="/que-hacer">
        ← Volver
      </Link>

      {/* HERO */}
      <section className="mt-4 overflow-hidden rounded-3xl border bg-white/70 shadow-sm backdrop-blur">
        <div className="relative">
          <AppImage
            src={place.coverImage}
            alt={place.name}
            className="h-90 w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="text-white">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                {place.name}
              </h1>
              {place.shortDescription ? (
                <p className="mt-2 max-w-2xl text-white/90">
                  {place.shortDescription}
                </p>
              ) : null}

              <div className="mt-4 flex flex-wrap gap-2">
                <Tag>{place.category}</Tag>
                <Tag>{place.duration}</Tag>
                <Tag>{place.budget}</Tag>
                {place.zone ? <Tag>{place.zone}</Tag> : null}
                {place.locationType ? (
                  <Tag>
                    {place.locationType === "entrance"
                      ? "Acceso principal"
                      : "Zona aproximada"}
                  </Tag>
                ) : null}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {typeof place.lat === "number" && typeof place.lng === "number" ? (
                <a
                  href={googleMapsDirectionsUrl(place.lat, place.lng)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="ghost">Abrir en Google Maps</Button>
                </a>
              ) : null}

              <Button
                onClick={() => setFavs(toggleFav(place.slug))}
                aria-pressed={isFav}
              >
                {isFav ? "Guardado ✓" : "Guardar en itinerario"}
              </Button>
            </div>
          </div>
        </div>

        {/* GALERÍA (si hay) */}
        {gallery.length > 1 ? (
          <div className="grid gap-3 p-4 md:grid-cols-3">
            {gallery.slice(0, 3).map((src) => (
              <AppImage
                key={src}
                src={src}
                alt={place.name}
                className="h-36 w-full rounded-2xl object-cover"
              />
            ))}
          </div>
        ) : null}
      </section>

      {/* DESCRIPCIÓN + INFO */}
      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <h2 className="text-lg font-semibold">Descripción</h2>
          <p className="mt-2 text-slate-700">{place.description}</p>
        </Card>

        <div className="grid gap-4">
          <Card>
            <h3 className="font-semibold">Tips</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>Llevá agua y repelente si vas a zonas verdes.</li>
              <li>Si vas a sacar fotos, priorizá buena luz.</li>
              <li>Guardá este lugar en tu itinerario para no perderlo.</li>
            </ul>
          </Card>

          <Card>
            <h3 className="font-semibold">Mejor momento</h3>
            <p className="mt-2 text-sm text-slate-700">
              {getBestMoment(place.duration)}
            </p>
          </Card>
        </div>
      </section>

      {/* MAPA */}
      <section className="mt-8">
        <h2 className="mb-3 font-semibold">Ubicación</h2>
        <PlaceMap places={[place]} showDetailLink={false} />
      </section>
    </div>
  );
}
