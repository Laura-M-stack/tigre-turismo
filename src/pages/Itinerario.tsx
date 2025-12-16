import { useEffect, useMemo, useState } from "react";

import PlaceCard from "../components/place/PlaceCard";
import { places } from "../data/places";
import { setSEO } from "../lib/seo";
import { getFavs } from "../lib/storage";

export default function Itinerario() {
  useEffect(() => {
    setSEO(
      "Mi itinerario — Tigre Turismo",
      "Tus lugares guardados para armar un plan simple.",
    );
  }, []);

  const [favs] = useState<string[]>(() => getFavs());

  const favPlaces = useMemo(() => places.filter((p) => favs.includes(p.slug)), [favs]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold tracking-tight">Mi itinerario</h1>
      <p className="mt-2 text-slate-600">
        Tus favoritos guardados (LocalStorage). Próximo paso: ordenar y estimar tiempos.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {favPlaces.map((p) => (
          <PlaceCard key={p.slug} place={p} />
        ))}
      </div>

      {!favPlaces.length ? (
        <p className="mt-6 text-sm text-slate-600">
          Todavía no guardaste lugares. Andá a “Qué hacer” y tocá “Guardar en itinerario”.
        </p>
      ) : null}
    </div>
  );
}
