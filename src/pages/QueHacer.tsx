import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import PlaceCard from "../components/place/PlaceCard";
import PlaceFilters from "../components/place/PlaceFilters";
import AppImage from "../components/ui/AppImage";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { places } from "../data/places";
import { setSEO } from "../lib/seo";
import type { Budget, Category, Duration, Place } from "../types/place";

type QuickPlan = {
  id: string;
  label: string;
  predicate: (p: Place) => boolean;
};

type SortKey = "relevance" | "popular" | "budget_low" | "duration_short";

function getTags(p: Place): string[] {
  return Array.isArray(p.tags) ? p.tags : [];
}

function includesQuery(p: Place, query: string) {
  if (!query) return true;
  const q = query.toLowerCase();
  const name = p.name?.toLowerCase() ?? "";
  const desc = p.shortDescription?.toLowerCase() ?? "";
  const tags = getTags(p).map((t) => t.toLowerCase());
  return (
    name.includes(q) ||
    desc.includes(q) ||
    tags.some((t) => t.includes(q))
  );
}

// Heurística simple y estable (sin analytics):
// - empuja "gratis/bajo" y tags útiles
// - da un plus a museos/naturaleza (muy buscados)
// - si hay query, prioriza matches por nombre > tags > descripción
function scorePlace(p: Place, query: string) {
  let s = 0;

  // Budget
  if (p.budget === "gratis") s += 5;
  if (p.budget === "bajo") s += 3;

  // Categories con demanda típica
  if (p.category === "museos") s += 2;
  if (p.category === "naturaleza") s += 2;

  const tags = getTags(p);

  // Tags "de decisión"
  if (tags.includes("familia")) s += 2;
  if (tags.includes("pareja")) s += 2;
  if (tags.includes("lluvia")) s += 1;
  if (tags.includes("fotos")) s += 1;

  // Query relevance
  const q = query.trim().toLowerCase();
  if (q) {
    const name = p.name?.toLowerCase() ?? "";
    const desc = p.shortDescription?.toLowerCase() ?? "";
    const t = tags.map((x) => x.toLowerCase());

    if (name.includes(q)) s += 6;
    else if (t.some((x) => x.includes(q))) s += 4;
    else if (desc.includes(q)) s += 2;
  }

  return s;
}

function durationWeight(d: Place["duration"]) {
  if (d === "medio-dia") return 2;
  if (d === "dia-completo") return 3;
  if (d === "1-2h") return 1;
  return 2;
}

function budgetWeight(b: Place["budget"]) {
  if (b === "gratis") return 0;
  if (b === "bajo") return 1;
  if (b === "medio") return 2;
  if (b === "alto") return 3;
  return 2;
}

export default function QueHacer() {
  useEffect(() => {
    setSEO(
      "Qué hacer en Tigre — Lugares y actividades",
      "Explorá actividades en Tigre con filtros por categoría, duración y presupuesto.",
    );
  }, []);

  const quickPlans = useMemo<QuickPlan[]>(
    () => [
      {
        id: "familia",
        label: "👨‍👩‍👧 Familia",
        predicate: (p) => getTags(p).includes("familia") || p.budget === "bajo" || p.budget === "gratis",
      },
      {
        id: "pareja",
        label: "💑 Pareja",
        predicate: (p) => getTags(p).includes("pareja"),
      },
      {
        id: "lluvia",
        label: "🌧️ Día de lluvia",
        predicate: (p) => p.category === "museos" || getTags(p).includes("lluvia"),
      },
      {
        id: "naturaleza",
        label: "🌿 Naturaleza",
        predicate: (p) => p.category === "naturaleza",
      },
      {
        id: "aventura",
        label: "🎢 Aventura",
        predicate: (p) => p.category === "aventura",
      },
      {
        id: "bajo",
        label: "💸 Bajo presupuesto",
        predicate: (p) => p.budget === "bajo" || p.budget === "gratis",
      },
    ],
    [],
  );

  const [quickPlan, setQuickPlan] = useState<string | null>(null);

  const [q, setQ] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [duration, setDuration] = useState<Duration | "all">("all");
  const [budget, setBudget] = useState<Budget | "all">("all");
  const [sort, setSort] = useState<SortKey>("relevance");

  const hasAnyFilter =
    Boolean(q.trim()) ||
    category !== "all" ||
    duration !== "all" ||
    budget !== "all" ||
    Boolean(quickPlan);

  const clearAll = () => {
    setQ("");
    setCategory("all");
    setDuration("all");
    setBudget("all");
    setQuickPlan(null);
    setSort("relevance");
  };

  const filtered = useMemo(() => {
    const query = q.trim();

    let result = places.filter((p) => {
      const matchesQuery = includesQuery(p, query);
      const matchesCategory = category === "all" || p.category === category;
      const matchesDuration = duration === "all" || p.duration === duration;
      const matchesBudget = budget === "all" || p.budget === budget;
      return matchesQuery && matchesCategory && matchesDuration && matchesBudget;
    });

    if (quickPlan) {
      const plan = quickPlans.find((p) => p.id === quickPlan);
      if (plan) result = result.filter(plan.predicate);
    }

    // Sorting
    const qTrim = query.trim();
    if (sort === "relevance") {
      result = [...result].sort((a, b) => scorePlace(b, qTrim) - scorePlace(a, qTrim));
    } else if (sort === "popular") {
      // “Popular” sin datos reales: usa score sin query para ser estable
      result = [...result].sort((a, b) => scorePlace(b, "") - scorePlace(a, ""));
    } else if (sort === "budget_low") {
      result = [...result].sort((a, b) => budgetWeight(a.budget) - budgetWeight(b.budget));
    } else if (sort === "duration_short") {
      result = [...result].sort((a, b) => durationWeight(a.duration) - durationWeight(b.duration));
    }

    return result;
  }, [q, category, duration, budget, quickPlan, quickPlans, sort]);

  return (
    <div className="pb-14">
      {/* HERO */}
      <section className="full-bleed relative overflow-hidden">
        <AppImage
          src="images/museo-de-arte-tigre-3.jpg"
          alt="Qué hacer en Tigre"
          className="h-[62vh] w-full object-cover md:h-[72vh]"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/35 to-black/10" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="page-container w-full">
            <div className="mx-auto max-w-3xl text-center text-white">
              <p className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-lg font-medium backdrop-blur">
                🌿 Delta • 🛶 Paseos • 🏛️ Museos
              </p>

              <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
                Qué hacer en Tigre
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-base text-white/90 md:text-xl">
                Elegí actividades según tu tiempo, presupuesto o compañía y armá tu día sin improvisar.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link to="/itinerario">
                  <Button>Ver mi itinerario</Button>
                </Link>
                <Link to="/como-llegar">
                  <Button variant="ghost">Cómo llegar</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENIDO */}
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Aviso de llegada */}
        <Card className="p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold">🚧 Llegar en verano</h2>
              <p className="mt-1 text-lg text-slate-600">
                Si el <b>Tren Mitre</b> no está disponible, podés venir igual por{" "}
                <b>Tren de la Costa</b>, colectivo o auto.
              </p>
            </div>
            <Link to="/como-llegar">
              <Button>Ver opciones</Button>
            </Link>
          </div>
        </Card>

        {/* Planes rápidos */}
        <div className="mt-6">
          <p className="text-lg text-slate-700">
            Empezá por un plan rápido (un click) y después afiná con filtros.
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {quickPlans.map((plan) => {
              const active = quickPlan === plan.id;

              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setQuickPlan((prev) => (prev === plan.id ? null : plan.id))}
                  aria-pressed={active}
                  className={[
                    "rounded-full px-4 py-2 text-lg transition",
                    "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50",
                    active ? "bg-teal-900 text-white border-teal-900 hover:bg-teal-900" : "",
                  ].join(" ")}
                >
                  {plan.label}
                </button>
              );
            })}

            {hasAnyFilter ? (
              <button
                type="button"
                onClick={clearAll}
                className="rounded-full px-4 py-2 text-lg transition border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              >
                ✕ Limpiar
              </button>
            ) : null}
          </div>
        </div>

        {/* Filtros */}
        <p className="mt-6 mb-3 text-lg text-slate-600">
          Tip: guardá lugares para armar tu itinerario ideal.
        </p>

        <PlaceFilters
          q={q}
          setQ={setQ}
          category={category}
          setCategory={setCategory}
          duration={duration}
          setDuration={setDuration}
          budget={budget}
          setBudget={setBudget}
        />

        {/* Barra resultados + sort */}
        <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-lg text-slate-700">
            <span className="font-semibold">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "resultado" : "resultados"}
            {hasAnyFilter ? <span className="text-slate-500"> · con filtros</span> : null}
          </div>

          <div className="flex items-center gap-3">
            <label className="text-lg text-slate-600" htmlFor="sort">
              Ordenar:
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-lg text-slate-800 shadow-sm"
            >
              <option value="relevance">Recomendados</option>
              <option value="popular">Más populares</option>
              <option value="budget_low">Más baratos primero</option>
              <option value="duration_short">Más cortos primero</option>
            </select>
          </div>
        </div>

        {/* Grid estable (sin huecos) */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <div key={p.slug} className="h-full">
              <PlaceCard place={p} />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {!filtered.length ? (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white/80 p-8">
            <h3 className="text-xl font-semibold tracking-tight text-slate-900">
              No se encontraron resultados
            </h3>
            <p className="mt-2 text-lg text-slate-600">
              Probá con otra búsqueda o quitá algún filtro.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button onClick={clearAll}>Limpiar todo</Button>
              <Link to="/itinerario">
                <Button variant="ghost">Ver mi itinerario</Button>
              </Link>
            </div>
          </div>
        ) : null}
      </div>

      {/* Sticky helper (desktop) */}
      <div className="pointer-events-none fixed bottom-5 left-0 right-0 hidden md:block">
        <div className="mx-auto max-w-6xl px-4">
          <div className="pointer-events-auto flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white/90 px-5 py-4 shadow-sm backdrop-blur">
            <div className="text-lg text-slate-700">
              Guardá lugares y armá tu plan del día en{" "}
              <span className="font-semibold">Mi itinerario</span>.
            </div>
            <Link to="/itinerario">
              <Button>Ir al itinerario</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
