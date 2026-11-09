import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import LazyPlaceMap from "../components/place/LazyPlaceMap";
import PlaceFilters from "../components/place/PlaceFilters";
import PlaceListItem from "../components/place/PlaceListItem";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import Photo from "../components/ui/Photo";
import { places } from "../data/places";
import {
  EMPTY_FILTERS,
  filterPlaces,
  hasActiveFilters,
  QUICK_PLANS,
  type Filters,
  type SortKey,
} from "../lib/filterPlaces";
import { BUDGET_LONG_LABEL, CATEGORY_LABEL, DURATION_LABEL } from "../lib/labels";
import { setSEO } from "../lib/seo";
import type { Budget, Category, Duration } from "../types/place";

type View = "lista" | "mapa";

function oneOf<T extends string>(value: string | null, allowed: readonly T[], fallback: T): T {
  return value && (allowed as readonly string[]).includes(value) ? (value as T) : fallback;
}

/** La URL es la fuente de verdad de los filtros: se pueden compartir y sobreviven al "volver". */
function readFilters(sp: URLSearchParams): Filters {
  return {
    q: sp.get("q") ?? "",
    category: oneOf(sp.get("cat"), ["all", ...Object.keys(CATEGORY_LABEL)] as (Category | "all")[], "all"),
    duration: oneOf(sp.get("dur"), ["all", ...Object.keys(DURATION_LABEL)] as (Duration | "all")[], "all"),
    budget: oneOf(sp.get("pres"), ["all", ...Object.keys(BUDGET_LONG_LABEL)] as (Budget | "all")[], "all"),
    plan: QUICK_PLANS.some((p) => p.id === sp.get("plan")) ? sp.get("plan") : null,
    sort: oneOf<SortKey>(sp.get("orden"), ["relevance", "budget_low", "duration_short"], "relevance"),
  };
}

function writeFilters(f: Filters) {
  const sp = new URLSearchParams();
  if (f.q) sp.set("q", f.q);
  if (f.category !== "all") sp.set("cat", f.category);
  if (f.duration !== "all") sp.set("dur", f.duration);
  if (f.budget !== "all") sp.set("pres", f.budget);
  if (f.plan) sp.set("plan", f.plan);
  if (f.sort !== "relevance") sp.set("orden", f.sort);
  return sp;
}

export default function QueHacer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useMemo(() => readFilters(searchParams), [searchParams]);
  const [active, setActive] = useState<string | null>(null);
  const [view, setView] = useState<View>("lista");

  useEffect(() => {
    setSEO(
      "Qué hacer en Tigre",
      `${places.length} lugares y actividades en Tigre con duración, presupuesto, tips y mapa.`,
    );
  }, []);

  const update = (patch: Partial<Filters>) =>
    setSearchParams(writeFilters({ ...filters, ...patch }), { replace: true });

  const results = useMemo(() => filterPlaces(places, filters), [filters]);
  const filtering = hasActiveFilters(filters);

  return (
    <>
      <header className="page-container grid gap-8 pb-8 pt-10 md:grid-cols-[1fr_minmax(0,420px)] md:items-end">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-brick-600">Qué hacer</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">{places.length} formas de pasar el día</h1>
          <p className="mt-3 max-w-xl text-lg text-ink-soft">
            Del Puerto de Frutos a los arroyos del Delta. Agregá lo que te guste y lo vas a ver numerado en el
            mapa y en tu itinerario.
          </p>
        </div>
        <Photo
          photoKey="hero-que-hacer"
          alt="Muelle y casa sobre un arroyo del Delta del Paraná, en Tigre"
          sizes="420px"
          className="hidden aspect-[16/9] rounded-2xl md:block"
          showCredit
          priority
        />
      </header>

      <div className="page-container">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Planes rápidos">
          {QUICK_PLANS.map((p) => {
            const on = filters.plan === p.id;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={on}
                onClick={() => update({ plan: on ? null : p.id })}
                className={`h-9 rounded-full border px-4 text-sm transition-colors ${
                  on
                    ? "border-river-800 bg-river-800 text-white"
                    : "border-ink/15 bg-white text-ink hover:border-river-700"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        <div className="mt-5 rounded-2xl bg-cream-50 p-4 ring-1 ring-ink/10">
          <PlaceFilters value={filters} onChange={update} />
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <p className="text-[15px] text-ink-soft" role="status" aria-live="polite">
            <strong className="font-semibold text-ink">{results.length}</strong>{" "}
            {results.length === 1 ? "lugar" : "lugares"}
            {filtering ? " con estos filtros" : ""}
          </p>
          <div className="flex items-center gap-2">
            {filtering ? (
              <Button variant="ghost" size="sm" onClick={() => setSearchParams(writeFilters(EMPTY_FILTERS), { replace: true })}>
                <Icon name="x" /> Limpiar
              </Button>
            ) : null}
            <div className="flex rounded-full bg-white p-1 ring-1 ring-ink/10 lg:hidden" role="group" aria-label="Vista">
              {(["lista", "mapa"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={view === v}
                  onClick={() => setView(v)}
                  className={`inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-sm capitalize ${
                    view === v ? "bg-river-800 text-white" : "text-ink-soft"
                  }`}
                >
                  <Icon name={v === "lista" ? "list" : "map"} /> {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        {results.length ? (
          <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)]">
            <ol className={`grid gap-3 ${view === "mapa" ? "hidden lg:grid" : ""}`}>
              {results.map((p, i) => (
                <li key={p.slug}>
                  <PlaceListItem place={p} number={i + 1} active={active === p.slug} onActivate={setActive} />
                </li>
              ))}
            </ol>

            <div className={view === "lista" ? "hidden lg:block" : ""}>
              <div className="h-[65vh] lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)]">
                <LazyPlaceMap places={results} height="fill" activeSlug={active} onActivate={setActive} />
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl bg-white p-8 text-center ring-1 ring-ink/10">
            <h2 className="text-2xl">No hay lugares con esos filtros</h2>
            <p className="mt-2 text-ink-soft">Probá con otra palabra o sacá algún filtro.</p>
            <Button className="mt-5" onClick={() => setSearchParams(new URLSearchParams(), { replace: true })}>
              Ver todos
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
