import { useEffect, useMemo, useState } from "react";

import PlaceCard from "../components/place/PlaceCard";
import PlaceFilters from "../components/place/PlaceFilters";
import { places } from "../data/places";
import { setSEO } from "../lib/seo";
import type { Budget, Category, Duration } from "../types/place";

export default function QueHacer() {
  useEffect(() => {
    setSEO(
      "Qué hacer en Tigre — Lugares y actividades",
      "Explorá actividades en Tigre con filtros por categoría, duración y presupuesto.",
    );
  }, []);

  const [q, setQ] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [duration, setDuration] = useState<Duration | "all">("all");
  const [budget, setBudget] = useState<Budget | "all">("all");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return places.filter((p) => {
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
  }, [q, category, duration, budget]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold tracking-tight">Qué hacer</h1>
      <p className="mt-2 text-slate-600">
        Filtrá ideas según tu plan y guardá tus favoritos para armar itinerario.
      </p>

      <div className="mt-6">
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
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {filtered.map((p) => (
          <PlaceCard key={p.slug} place={p} />
        ))}
      </div>

      {!filtered.length ? (
        <p className="mt-6 text-sm text-slate-600">
          No se encontraron resultados. Probá con otra búsqueda o quitá filtros.
        </p>
      ) : null}
    </div>
  );
}
