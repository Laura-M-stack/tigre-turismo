import { useEffect, useMemo, useState } from "react";

import PlaceCard from "../components/place/PlaceCard";
import PlaceMap from "../components/place/PlaceMap";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Tag from "../components/ui/Tag";
import { places } from "../data/places";
import { estimateTotalMinutes, formatMinutes, planSuggestion } from "../lib/itinerary";
import {
  getItineraryOrder,
  normalizeOrder,
  setItineraryOrder,
} from "../lib/itineraryStorage";
import { setSEO } from "../lib/seo";
import { buildItineraryShareText } from "../lib/share";
import { getFavs } from "../lib/storage";

export default function Itinerario() {
  useEffect(() => {
    setSEO(
      "Mi itinerario — Tigre Turismo",
      "Organizá tus favoritos, estimá tiempos y armá un plan.",
    );
  }, []);

  const [order, setOrder] = useState<string[]>(() =>
    normalizeOrder(getFavs(), getItineraryOrder()),
  );
  const [copied, setCopied] = useState(false);

  // Persistimos el orden SOLO acá (no duplicar en move/clear)
  useEffect(() => {
    setItineraryOrder(order);
  }, [order]);

  const orderedPlaces = useMemo(() => {
    const bySlug = new Map(places.map((p) => [p.slug, p] as const));

    return order
      .map((slug) => bySlug.get(slug))
      .filter((p): p is (typeof places)[number] => Boolean(p));
  }, [order]);

  useEffect(() => {
    const valid = new Set(places.map((p) => p.slug));
    const next = order.filter((s) => valid.has(s));
    if (next.length !== order.length) {
      setOrder(next);
      setItineraryOrder(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const totalMinutes = useMemo(
    () => estimateTotalMinutes(orderedPlaces),
    [orderedPlaces],
  );

  const suggestion = useMemo(() => planSuggestion(totalMinutes), [totalMinutes]);

  const move = (index: number, dir: -1 | 1) => {
    const next = [...order];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;

    [next[index], next[target]] = [next[target], next[index]];
    setOrder(next);
  };

  const clearOrder = () => {
    setOrder([]);
  };

  const copyItinerary = async () => {
    const baseUrl = window.location.origin;
    const text = buildItineraryShareText(orderedPlaces, baseUrl);

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback simple (por permisos del navegador)
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    }
  };
  if (!places.length) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-sm text-slate-600">Cargando itinerario…</p>
      </div>
    );
  }

  if (!order.length) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-sm text-slate-600">No tienes favoritos.</p>
      </div>
    );
  }

  const removeFromItinerary = (slug: string) => {
    const next = order.filter((s) => s !== slug);
    setOrder(next);
    setItineraryOrder(next);
  };


  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold tracking-tight">Mi itinerario</h1>
      <p className="mt-2 text-slate-600">
        Ordená tus favoritos y obtené una estimación del tiempo total.
      </p>

      {/* Layout correcto: 3 columnas -> Resumen (1) + contenido (2) */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {/* Columna 1: Resumen */}
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Resumen</h2>
            <Tag>{suggestion}</Tag>
          </div>

          <div className="mt-3 space-y-2 text-sm text-slate-700">
            <div className="flex items-center justify-between">
              <span>Lugares</span>
              <span className="font-semibold">{orderedPlaces.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Tiempo estimado</span>
              <span className="font-semibold">{formatMinutes(totalMinutes)}</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="ghost" onClick={clearOrder}>
              Limpiar orden
            </Button>

            <Button onClick={copyItinerary} disabled={!orderedPlaces.length}>
              {copied ? "Copiado ✓" : "Copiar itinerario"}
            </Button>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Estimación aproximada. No incluye traslados ni esperas.
          </p>
        </Card>

        {/* Columnas 2-3: Mapa + lista */}
        <div className="md:col-span-2">
          <PlaceMap places={orderedPlaces} height={360} />

          <div className="mt-4 grid gap-4">
            {orderedPlaces.map((p, i) => (
              <div key={p.slug} className="relative">
                <div className="absolute right-3 top-3 z-10 flex items-center gap-2 rounded-xl bg-white/90 px-2 py-1 shadow-sm backdrop-blur">
                  <Button
                    variant="ghost"
                    onClick={() => move(i, -1)}
                    aria-label="Mover arriba"
                    disabled={i === 0}
                    className="h-8 w-8 px-0 text-slate-800 hover:bg-slate-200"
                  >
                    ↑
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={() => move(i, 1)}
                    aria-label="Mover abajo"
                    disabled={i === orderedPlaces.length - 1}
                    className="h-8 w-8 px-0 text-slate-800 hover:bg-slate-200"
                  >
                    ↓
                  </Button>

                  <Button
                    onClick={() => removeFromItinerary(p.slug)}
                    aria-label="Quitar del itinerario"
                    className="h-8 w-8 px-0 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                  >
                    🗑️
                  </Button>
                </div>
                <PlaceCard place={p} />
              </div>
            ))}
          </div>

          {!orderedPlaces.length ? (
            <div className="mt-6 rounded-xl border bg-slate-50 p-6 text-sm text-slate-700">
              <p className="font-medium">Tu itinerario está vacío</p>
              <p className="mt-1">
                Explorá la sección <strong>Qué hacer</strong> y guardá lugares para armar
                tu plan.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
