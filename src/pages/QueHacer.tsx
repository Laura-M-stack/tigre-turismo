import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";

import PlaceCard from "../components/place/PlaceCard";
import PlaceFilters from "../components/place/PlaceFilters";
import AppImage from "../components/ui/AppImage";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
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

  const quickPlans = useMemo(
    () => [
      {
        id: "familia",
        label: "👨‍👩‍👧 Familia",
        predicate: (p: Place) => p.tags.includes("familia") || p.budget === "bajo",
      },
      {
        id: "pareja",
        label: "💑 Pareja",
        predicate: (p: Place) => p.tags.includes("pareja"),
      },
      {
        id: "lluvia",
        label: "🌧️ Día de lluvia",
        predicate: (p: Place) => p.category === "museos" || p.tags.includes("lluvia"),
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
        predicate: (p: Place) => p.budget === "bajo" || p.budget === "gratis",
      },
    ],
    [],
  );

  const [quickPlan, setQuickPlan] = useState<string | null>(null);

  const [q, setQ] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [duration, setDuration] = useState<Duration | "all">("all");
  const [budget, setBudget] = useState<Budget | "all">("all");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    let result = places.filter((p) => {
      const name = p.name?.toLowerCase() ?? "";
      const desc = p.shortDescription?.toLowerCase() ?? "";
      const tags = p.tags ?? [];

      const matchesQuery =
        !query ||
        name.includes(query) ||
        desc.includes(query) ||
        tags.some((t) => t.toLowerCase().includes(query));

      const matchesCategory = category === "all" || p.category === category;
      const matchesDuration = duration === "all" || p.duration === duration;
      const matchesBudget = budget === "all" || p.budget === budget;

      return matchesQuery && matchesCategory && matchesDuration && matchesBudget;
    });

    if (quickPlan) {
      const plan = quickPlans.find((p) => p.id === quickPlan);
      if (plan) result = result.filter(plan.predicate);
    }

    return result;
  }, [q, category, duration, budget, quickPlan, quickPlans]);

  return (
    <div className="pb-14">
      {/* HERO full-bleed */}
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
        {/* Aviso de llegada (Mitre) — minimal, no molesta */}
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
        <div className="mt-6 flex flex-wrap gap-2">
          {quickPlans.map((plan) => {
            const active = quickPlan === plan.id;

            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => setQuickPlan((prev) => (prev === plan.id ? null : plan.id))}
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
        </div>

        {/* Filtros */}
        <p className="mt-5 mb-3 text-lg text-slate-600">
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

        {/* Grid */}
        <div
          className="
            mt-6 grid gap-4
            sm:grid-cols-2
            lg:grid-cols-3
            lg:[auto-rows:10px]
          "
        >
          {filtered.map((p, i) => {
            // Bloques de 5 items (1 alto + 4 normales)
            const block = Math.floor(i / 5);
            const pos = i % 5;

            // unidad (en filas del auto-rows)
            const UNIT = 24;
            const base = block * UNIT * 2;

            const row1 = base + 1;
            const row2 = base + 1 + UNIT;

            const tallOnLeft = block % 2 === 0;

            let col = 1;
            let row = row1;
            let span = UNIT;

            if (tallOnLeft) {
              if (pos === 0) {
                col = 1; row = row1; span = UNIT * 2;
              } else if (pos === 1) {
                col = 2; row = row1; span = UNIT;
              } else if (pos === 2) {
                col = 3; row = row1; span = UNIT;
              } else if (pos === 3) {
                col = 2; row = row2; span = UNIT;
              } else if (pos === 4) {
                col = 3; row = row2; span = UNIT;
              }
            } else {
              if (pos === 0) {
                col = 1; row = row1; span = UNIT;
              } else if (pos === 1) {
                col = 2; row = row1; span = UNIT;
              } else if (pos === 2) {
                col = 3; row = row1; span = UNIT * 2;
              } else if (pos === 3) {
                col = 1; row = row2; span = UNIT;
              } else if (pos === 4) {
                col = 2; row = row2; span = UNIT;
              }
            }

            const style = {
              ["--tt-col" as any]: col,
              ["--tt-row" as any]: row,
              ["--tt-span" as any]: span,
            } as CSSProperties;

            return (
              <div key={p.slug} className="tt-masonry-item h-full" style={style}>
                <PlaceCard place={p} />
              </div>
            );
          })}
        </div>

        {!filtered.length ? (
          <p className="mt-8 rounded-2xl border bg-white/70 p-6 text-lg text-slate-700">
            No se encontraron resultados. Probá con otra búsqueda o quitá filtros.
          </p>
        ) : null}
      </div>
    </div>
  );
}
