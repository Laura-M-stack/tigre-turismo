import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import AppImage from "../components/ui/AppImage";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Tag from "../components/ui/Tag";
import { places } from "../data/places";
import { estimateTotalMinutes, formatMinutes, planSuggestion } from "../lib/itinerary";
import { getItineraryOrder, normalizeOrder, setItineraryOrder } from "../lib/itineraryStorage";
import { googleMapsDirectionsUrl } from "../lib/maps";
import { setSEO } from "../lib/seo";
import { buildItineraryShareText } from "../lib/share";
import { getFavs } from "../lib/storage";
import type { Place } from "../types/place";

const PlaceMap = lazy(() => import("../components/place/PlaceMap"));

const VALID_SLUGS = new Set(places.map((p) => p.slug));
function clampToValid(slugs: string[]) {
  return slugs.filter((s) => VALID_SLUGS.has(s));
}

type MobileTab = "lista" | "mapa";

function getTags(p: Place): string[] {
  return Array.isArray(p.tags) ? p.tags : [];
}

function ItineraryRow({
  place,
  index,
  total,
  onMove,
  onRemove,
}: {
  place: Place;
  index: number;
  total: number;
  onMove: (i: number, dir: -1 | 1) => void;
  onRemove: (slug: string) => void;
}) {
  const tags = getTags(place).slice(0, 3);

  return (
    <article className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Acciones */}
      <div className="absolute right-3 top-3 z-10 flex items-center gap-2 rounded-xl bg-white/90 px-2 py-1 shadow-sm backdrop-blur">
        <Button
          variant="ghost"
          onClick={() => onMove(index, -1)}
          aria-label="Mover arriba"
          disabled={index === 0}
          className="h-8 w-8 px-0 text-slate-800 hover:bg-slate-200"
        >
          ↑
        </Button>

        <Button
          variant="ghost"
          onClick={() => onMove(index, 1)}
          aria-label="Mover abajo"
          disabled={index === total - 1}
          className="h-8 w-8 px-0 text-slate-800 hover:bg-slate-200"
        >
          ↓
        </Button>

        <Button
          onClick={() => onRemove(place.slug)}
          aria-label="Quitar del itinerario"
          className="h-8 w-8 rounded-lg bg-red-50 px-0 text-red-600 hover:bg-red-100"
        >
          🗑️
        </Button>
      </div>

      {/* Layout: stack en mobile, row en desktop */}
      <div className="grid gap-4 p-4 sm:grid-cols-[220px_1fr] sm:items-stretch">
        {/* Imagen con ratio estable (NO se corta raro / NO deja huecos gigantes) */}
        <div className="relative overflow-hidden rounded-2xl bg-slate-100">
          <AppImage
            src={place.coverImage}
            alt={place.name}
            className="aspect-[4/3] h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Contenido */}
        <div className="flex min-w-0 flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <Tag>{place.category}</Tag>
            <Tag>{place.duration}</Tag>
            <Tag>{place.budget}</Tag>
            {place.locationType ? (
              <Tag>{place.locationType === "entrance" ? "Acceso" : "Zona"}</Tag>
            ) : null}
          </div>

          <h3 className="mt-3 line-clamp-1 text-xl font-semibold tracking-tight text-slate-900">
            {place.name}
          </h3>

          {place.shortDescription ? (
            <p className="mt-1 line-clamp-2 text-base text-slate-600">
              {place.shortDescription}
            </p>
          ) : null}

          {tags.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-2">
            <Link to={`/lugares/${place.slug}`}>
              <Button>Ver detalle</Button>
            </Link>

            {typeof place.lat === "number" && typeof place.lng === "number" ? (
              <a
                href={googleMapsDirectionsUrl(place.lat, place.lng)}
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="ghost">Cómo llegar</Button>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Itinerario() {
  useEffect(() => {
    setSEO("Mi itinerario — Tigre Turismo", "Organizá tus favoritos, estimá tiempos y armá un plan.");
  }, []);

  const [order, setOrder] = useState<string[]>(() => {
    const initial = normalizeOrder(getFavs(), getItineraryOrder());
    return clampToValid(initial);
  });

  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<MobileTab>("lista");

  useEffect(() => {
    setItineraryOrder(order);
  }, [order]);

  const orderedPlaces = useMemo(() => {
    const bySlug = new Map(places.map((p) => [p.slug, p] as const));
    return order
      .map((slug) => bySlug.get(slug))
      .filter((p): p is (typeof places)[number] => Boolean(p));
  }, [order]);

  const totalMinutes = useMemo(() => estimateTotalMinutes(orderedPlaces), [orderedPlaces]);
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
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Mi itinerario</h1>
          <p className="mt-1 text-lg text-slate-600">
            Ordená tus favoritos y obtené una estimación del tiempo total.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Tag>{`${orderedPlaces.length} lugares`}</Tag>
          <Tag>{formatMinutes(totalMinutes)}</Tag>
          <Tag>{suggestion}</Tag>
        </div>
      </div>

      {/* Mobile tabs */}
      <div className="mt-5 flex w-full overflow-hidden rounded-2xl border border-slate-200 bg-white/70 p-1 md:hidden">
        <button
          type="button"
          onClick={() => setTab("lista")}
          className={[
            "flex-1 rounded-xl px-4 py-2 text-base font-semibold transition",
            tab === "lista" ? "bg-teal-900 text-white" : "text-slate-700 hover:bg-white",
          ].join(" ")}
        >
          Lista
        </button>
        <button
          type="button"
          onClick={() => setTab("mapa")}
          className={[
            "flex-1 rounded-xl px-4 py-2 text-base font-semibold transition",
            tab === "mapa" ? "bg-teal-900 text-white" : "text-slate-700 hover:bg-white",
          ].join(" ")}
        >
          Mapa
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
        {/* Sidebar */}
        <div className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
          <Card>
            <div className="flex items-center justify-between px-4 pt-6">
              <h2 className="text-lg font-semibold">Resumen</h2>
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
              Estimación solo de actividades. No incluye traslados, filas ni pausas.
            </p>
          </Card>

          {/* Mapa */}
          <div className={tab === "lista" ? "hidden md:block" : ""}>
            <Suspense
              fallback={
                <div className="rounded-3xl border border-slate-200 bg-white/70 p-6 text-slate-700">
                  Cargando mapa…
                </div>
              }
            >
              <PlaceMap places={orderedPlaces} height={340} />
            </Suspense>

            <p className="mt-2 text-sm text-slate-500">
              Tip: tocá cada punto para ver el nombre.
            </p>
          </div>
        </div>

        {/* Lista */}
        <div className={tab === "mapa" ? "hidden md:block" : ""}>
          <div className="grid gap-4">
            {orderedPlaces.map((p, i) => (
              <ItineraryRow
                key={p.slug}
                place={p}
                index={i}
                total={orderedPlaces.length}
                onMove={move}
                onRemove={removeFromItinerary}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
