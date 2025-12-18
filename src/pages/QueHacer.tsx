import { useEffect, useMemo, useState } from "react";

import PlaceCard from "../components/place/PlaceCard";
import PlaceFilters from "../components/place/PlaceFilters";
import AppImage from "../components/ui/AppImage";
import Tag from "../components/ui/Tag";
import { places } from "../data/places";
import { setSEO } from "../lib/seo";
import type { Budget, Category, Duration, Place } from "../types/place";

export default function QueHacer() {
  useEffect(() => {
    setSEO(
      "Qué hacer en Tigre — Lugares y actividades",
      "Explorá actividades en Tigre con filtros por categoría, duración y presupuesto.",
    );
  }, []);

  /* =========================
     PLANES SUGERIDOS
     ========================= */
  const quickPlans = useMemo(
    () => [
      {
        id: "familia",
        label: "👨‍👩‍👧 Familia",
        predicate: (p: Place) =>
          p.tags.includes("familia") || p.budget === "bajo",
      },
      {
        id: "pareja",
        label: "💑 Pareja",
        predicate: (p: Place) => p.tags.includes("pareja"),
      },
      {
        id: "lluvia",
        label: "🌧️ Día de lluvia",
        predicate: (p: Place) =>
          p.category === "museos" || p.tags.includes("lluvia"),
      },
      {
        id: "naturaleza",
        label: "🌿 Naturaleza",
        predicate: (p: Place) => p.category === "naturaleza",
      },
      {
        id: "aventura",
        label: "🎢 Aventura",
        predicate: (p: Place) => p.category === "aventura",
      },
      {
        id: "bajo",
        label: "💸 Bajo presupuesto",
        predicate: (p: Place) => p.budget === "bajo",
      },
    ],
    [],
  );

  const [quickPlan, setQuickPlan] = useState<string | null>(null);

  /* =========================
     FILTROS EXISTENTES
     ========================= */
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [duration, setDuration] = useState<Duration | "all">("all");
  const [budget, setBudget] = useState<Budget | "all">("all");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    let result = places.filter((p) => {
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.shortDescription.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query));

      const matchesCategory = category === "all" || p.category === category;
      const matchesDuration = duration === "all" || p.duration === duration;
      const matchesBudget = budget === "all" || p.budget === budget;

      return matchesQuery && matchesCategory && matchesDuration && matchesBudget;
    });

    if (quickPlan) {
      const plan = quickPlans.find((p) => p.id === quickPlan);
      if (plan) {
        result = result.filter(plan.predicate);
      }
    }

    return result;
  }, [q, category, duration, budget, quickPlan, quickPlans]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* =========================
          BANNER
          ========================= */}
      <section className="relative overflow-hidden rounded-3xl border bg-white/70 shadow-sm backdrop-blur">
        <AppImage
          src="images/museo-de-arte-tigre-3.jpg"
          alt="Qué hacer en Tigre"
          className="h-56 w-full object-cover md:h-120"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/55 via-black/25 to-transparent" />

        <div className="absolute inset-0 flex items-start md:items-end-safe">
          <div className="p-6 md:p-10 text-white">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Qué hacer en Tigre
            </h1>
            <p className="mt-3 max-w-xl text-white/90 text-base md:text-lg">
              Filtrá ideas según tu plan y guardá favoritos para armar tu itinerario.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Tag>Delta</Tag>
              <Tag>Paseos</Tag>
              <Tag>Naturaleza</Tag>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          PLANES RÁPIDOS
          ========================= */}
      <div className="mt-6 flex flex-wrap gap-2">
        {quickPlans.map((plan) => (
          <button
            key={plan.id}
            onClick={() =>
              setQuickPlan((prev) => (prev === plan.id ? null : plan.id))
            }
            className={[
              "rounded-full px-4 py-2 text-sm transition",
              quickPlan === plan.id
                ? "bg-slate-900 text-white"
                : "bg-white/70 text-slate-700 hover:bg-white",
            ].join(" ")}
          >
            {plan.label}
          </button>
        ))}
      </div>

      {/* =========================
          FILTROS
          ========================= */}
      <p className="mt-4 mb-3 text-sm text-slate-600">
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

      {/* =========================
          GRID
          ========================= */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <PlaceCard key={p.slug} place={p} />
        ))}
      </div>

      {!filtered.length ? (
        <p className="mt-8 rounded-2xl border bg-white/70 p-6 text-sm text-slate-700">
          No se encontraron resultados. Probá con otra búsqueda o quitá filtros.
        </p>
      ) : null}
    </div>
  );
}
