import type { Budget, Category, Duration, Place } from "../types/place";

export type SortKey = "relevance" | "budget_low" | "duration_short";

export type QuickPlan = { id: string; label: string; predicate: (p: Place) => boolean };

export const QUICK_PLANS: QuickPlan[] = [
  {
    id: "familia",
    label: "En familia",
    predicate: (p) => p.tags.includes("familia") || p.budget === "gratis" || p.budget === "bajo",
  },
  { id: "pareja", label: "En pareja", predicate: (p) => p.tags.includes("pareja") },
  {
    id: "lluvia",
    label: "Si llueve",
    predicate: (p) => p.category === "museos" || p.tags.includes("lluvia"),
  },
  { id: "naturaleza", label: "Naturaleza", predicate: (p) => p.category === "naturaleza" },
  { id: "aventura", label: "Aventura", predicate: (p) => p.category === "aventura" },
  { id: "bajo", label: "Gastando poco", predicate: (p) => p.budget === "gratis" || p.budget === "bajo" },
];

export type Filters = {
  q: string;
  category: Category | "all";
  duration: Duration | "all";
  budget: Budget | "all";
  plan: string | null;
  sort: SortKey;
};

export const EMPTY_FILTERS: Filters = {
  q: "",
  category: "all",
  duration: "all",
  budget: "all",
  plan: null,
  sort: "relevance",
};

/** Minúsculas y sin tildes: "museo" encuentra "Muséo", "catamaran" encuentra "catamarán". */
export function fold(text: string) {
  return text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

export function matchesQuery(p: Place, query: string) {
  const q = fold(query.trim());
  if (!q) return true;
  return [p.name, p.shortDescription, p.zone ?? "", ...p.tags].some((t) => fold(t).includes(q));
}

export function scorePlace(p: Place, query = "") {
  let s = 0;
  if (p.budget === "gratis") s += 5;
  if (p.budget === "bajo") s += 3;
  if (p.category === "museos" || p.category === "naturaleza") s += 2;
  if (p.tags.includes("familia")) s += 2;
  if (p.tags.includes("pareja")) s += 2;
  if (p.tags.includes("lluvia")) s += 1;
  if (p.tags.includes("fotos")) s += 1;

  const q = fold(query.trim());
  if (q) {
    if (fold(p.name).includes(q)) s += 6;
    else if (p.tags.some((t) => fold(t).includes(q))) s += 4;
    else if (fold(p.shortDescription).includes(q)) s += 2;
  }
  return s;
}

const DURATION_ORDER: Record<Duration, number> = { "1-2h": 1, "medio-dia": 2, "dia-completo": 3 };
const BUDGET_ORDER: Record<Budget, number> = { gratis: 0, bajo: 1, medio: 2, alto: 3 };

export function hasActiveFilters(f: Filters) {
  return Boolean(f.q.trim()) || f.category !== "all" || f.duration !== "all" || f.budget !== "all" || !!f.plan;
}

export function filterPlaces(list: Place[], f: Filters): Place[] {
  const plan = f.plan ? QUICK_PLANS.find((p) => p.id === f.plan) : undefined;

  const result = list.filter(
    (p) =>
      matchesQuery(p, f.q) &&
      (f.category === "all" || p.category === f.category) &&
      (f.duration === "all" || p.duration === f.duration) &&
      (f.budget === "all" || p.budget === f.budget) &&
      (!plan || plan.predicate(p)),
  );

  // sort estable: ante empate se respeta el orden curado de places.ts
  const indexed = result.map((p, i) => ({ p, i }));
  const cmp: Record<SortKey, (a: Place, b: Place) => number> = {
    relevance: (a, b) => scorePlace(b, f.q) - scorePlace(a, f.q),
    budget_low: (a, b) => BUDGET_ORDER[a.budget] - BUDGET_ORDER[b.budget],
    duration_short: (a, b) => DURATION_ORDER[a.duration] - DURATION_ORDER[b.duration],
  };
  return indexed.sort((a, b) => cmp[f.sort](a.p, b.p) || a.i - b.i).map((x) => x.p);
}
