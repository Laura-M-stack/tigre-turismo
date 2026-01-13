import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import PlaceCard from "../components/place/PlaceCard";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Tag from "../components/ui/Tag";
import { places } from "../data/places";
import { estimateTotalMinutes, formatMinutes, planSuggestion } from "../lib/itinerary";
import { getItineraryOrder, normalizeOrder, setItineraryOrder } from "../lib/itineraryStorage";
import { setSEO } from "../lib/seo";
import { buildItineraryShareText } from "../lib/share";
import { getFavs } from "../lib/storage";

const PlaceMap = lazy(() => import("../components/place/PlaceMap"));

// ✅ slugs válidos: calculado una vez (sin hooks)
const VALID_SLUGS = new Set(places.map((p) => p.slug));

function clampToValid(slugs: string[]) {
  return slugs.filter((s) => VALID_SLUGS.has(s));
}

export default function Itinerario() {
  useEffect(() => {
    setSEO(
      "Mi itinerario — Tigre Turismo",
      "Organizá tus favoritos, estimá tiempos y armá un plan.",
    );
  }, []);

  const [order, setOrder] = useState<string[]>(() => {
    const initial = normalizeOrder(getFavs(), getItineraryOrder());
    return clampToValid(initial);
  });

  const [copied, setCopied] = useState(false);

  // Persistimos el orden SOLO acá
  useEffect(() => {
    setItineraryOrder(order);
  }, [order]);

  const orderedPlaces = useMemo(() => {
    const bySlug = new Map(places.map((p) => [p.slug, p] as const));
    return order
      .map((slug) => bySlug.get(slug))
      .filter((p): p is (typeof places)[number] => Boolean(p));
  }, [order]);

  const totalMinutes = useMemo(
    () => estimateTotalMinutes(orderedPlaces),
    [orderedPlaces],
  );

  const suggestion = useMemo(() => planSuggestion(totalMinutes), [totalMinutes]);

  const move = (index: number, dir: -1 | 1) => {
    setOrder((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  // Mejor UX: volver al orden "natural" de favoritos (no el orden guardado)
  const resetOrder = () => {
    const favs = clampToValid(getFavs());
    setOrder(favs);
  };

  const removeFromItinerary = (slug: string) => {
    setOrder((prev) => prev.filter((s) => s !== slug));
  };

  const copyItinerary = async () => {
    const baseUrl = window.location.origin;
    const text = buildItineraryShareText(orderedPlaces, baseUrl);

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
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
        <p className="text-lg text-slate-600">Cargando itinerario…</p>
      </div>
    );
  }

  if (!order.length) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-3xl border border-slate-200 bg-white/70 p-8">
          <h1 className="text-2xl font-semibold tracking-tight">Mi itinerario</h1>
          <p className="mt-2 text-lg text-slate-600">Todavía no guardaste lugares.</p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/que-hacer">
              <Button>Explorar qué hacer</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Mi itinerario</h1>
      <p className="mt-2 text-lg text-slate-600">
        Ordená tus favoritos y obtené una estimación del tiempo total.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {/* Resumen */}
        <Card>
          <div className="flex items-center justify-between px-4 pt-6">
            <h2 className="font-semibold">Resumen</h2>
            <Tag>{suggestion}</Tag>
          </div>

          <div className="mt-3 space-y-2 px-4 text-lg text-slate-700">
            <div className="flex items-center justify-between">
              <span>Lugares</span>
              <span className="font-semibold">{orderedPlaces.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Tiempo estimado</span>
              <span className="font-semibold">{formatMinutes(totalMinutes)}</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 px-4 pb-4">
            <Button variant="ghost" onClick={resetOrder}>
              Resetear orden
            </Button>

            <Button onClick={copyItinerary} disabled={!orderedPlaces.length}>
              {copied ? "Copiado ✓" : "Copiar plan del día"}
            </Button>
          </div>

          <p className="px-4 pb-6 text-base text-slate-500">
            Tiempo estimado solo para actividades. No contempla traslados, filas ni pausas para comer.
          </p>
        </Card>

        {/* Mapa + lista */}
        <div className="md:col-span-2">
          <Suspense
            fallback={
              <div className="rounded-3xl border border-slate-200 bg-white/70 p-6 text-slate-700">
                Cargando mapa…
              </div>
            }
          >
            <PlaceMap places={orderedPlaces} height={360} />
          </Suspense>

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
                    className="h-8 w-8 rounded-lg bg-red-50 px-0 text-red-600 hover:bg-red-100"
                  >
                    🗑️
                  </Button>
                </div>

                <PlaceCard place={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
