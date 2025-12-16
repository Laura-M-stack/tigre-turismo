import { useEffect, useMemo, useState } from "react";

import PlaceCard from "../components/place/PlaceCard";
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
import { getFavs } from "../lib/storage";
import PlaceMap from "../components/place/PlaceMap";

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

  useEffect(() => {
    setItineraryOrder(order);
  }, [order]);

  const orderedPlaces = useMemo(() => {
    const bySlug = new Map(places.map((p) => [p.slug, p]));
    return order.map((slug) => bySlug.get(slug)).filter(Boolean);
  }, [order]);

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
    setItineraryOrder(next);
  };

  const clearOrder = () => {
    setOrder([]);
    setItineraryOrder([]);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold tracking-tight">Mi itinerario</h1>
      <p className="mt-2 text-slate-600">
        Ordená tus favoritos y obtené una estimación del tiempo total.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
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

          <div className="mt-4 flex gap-2">
            <Button variant="ghost" onClick={clearOrder}>
              Limpiar orden
            </Button>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Estimación aproximada. No incluye traslados ni esperas.
          </p>
        </Card>
        <div className="mt-4">
          <PlaceMap places={orderedPlaces} height={360} />
        </div>
        <div className="md:col-span-2">
          <div className="grid gap-4">
            {orderedPlaces.map((p, i) => (
              <div key={p.slug} className="relative">
                <div className="absolute right-3 top-3 z-10 flex gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => move(i, -1)}
                    aria-label="Mover arriba"
                    disabled={i === 0}
                  >
                    ↑
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => move(i, 1)}
                    aria-label="Mover abajo"
                    disabled={i === orderedPlaces.length - 1}
                  >
                    ↓
                  </Button>
                </div>
                <PlaceCard place={p} />
              </div>
            ))}
          </div>

          {!orderedPlaces.length ? (
            <p className="mt-6 text-sm text-slate-600">
              Todavía no guardaste lugares. Andá a “Qué hacer” y tocá “Guardar en
              itinerario”.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
