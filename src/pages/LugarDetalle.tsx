import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Button from "../components/ui/Button";
import Tag from "../components/ui/Tag";
import { places } from "../data/places";
import { setSEO } from "../lib/seo";
import { getFavs, toggleFav } from "../lib/storage";

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

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link className="text-sm underline text-slate-700" to="/que-hacer">
        ← Volver
      </Link>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{place.name}</h1>
          <p className="mt-2 text-slate-600 max-w-2xl">{place.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Tag>{place.category}</Tag>
            <Tag>{place.duration}</Tag>
            <Tag>{place.budget}</Tag>
            {place.zone ? <Tag>{place.zone}</Tag> : null}
          </div>
        </div>

        <Button onClick={() => setFavs(toggleFav(place.slug))} aria-pressed={isFav}>
          {isFav ? "Guardado ✓" : "Guardar en itinerario"}
        </Button>
      </div>

      <section className="mt-8 rounded-2xl border bg-slate-50 p-6">
        <h2 className="font-semibold">Mapa</h2>
        <p className="mt-1 text-sm text-slate-600">
          (MVP) Placeholder. Luego lo conectamos a Leaflet con coordenadas desde data.
        </p>
      </section>
    </div>
  );
}
