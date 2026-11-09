import { describe, expect, it } from "vitest";

import { places } from "../data/places";

import { EMPTY_FILTERS, filterPlaces, fold, hasActiveFilters, matchesQuery } from "./filterPlaces";

describe("búsqueda", () => {
  it("ignora tildes y mayúsculas", () => {
    expect(fold("Catamarán")).toBe("catamaran");
    const cat = places.find((p) => p.slug === "paseo-en-catamaran")!;
    expect(matchesQuery(cat, "CATAMARAN")).toBe(true);
  });
  it("query vacía coincide con todo", () => {
    expect(filterPlaces(places, EMPTY_FILTERS)).toHaveLength(places.length);
  });
});

describe("filterPlaces", () => {
  it("filtra por categoría y presupuesto", () => {
    const r = filterPlaces(places, { ...EMPTY_FILTERS, category: "museos" });
    expect(r.length > 0 && r.every((p) => p.category === "museos")).toBe(true);
    const g = filterPlaces(places, { ...EMPTY_FILTERS, budget: "gratis" });
    expect(g.every((p) => p.budget === "gratis")).toBe(true);
  });
  it("ordena por presupuesto ascendente", () => {
    const order = { gratis: 0, bajo: 1, medio: 2, alto: 3 } as const;
    const r = filterPlaces(places, { ...EMPTY_FILTERS, sort: "budget_low" }).map((p) => order[p.budget]);
    expect(r).toEqual([...r].sort((a, b) => a - b));
  });
  it("plan rápido 'lluvia' devuelve museos o lugares con tag lluvia", () => {
    const r = filterPlaces(places, { ...EMPTY_FILTERS, plan: "lluvia" });
    expect(r.every((p) => p.category === "museos" || p.tags.includes("lluvia"))).toBe(true);
  });
  it("detecta filtros activos", () => {
    expect(hasActiveFilters(EMPTY_FILTERS)).toBe(false);
    expect(hasActiveFilters({ ...EMPTY_FILTERS, q: "  " })).toBe(false);
    expect(hasActiveFilters({ ...EMPTY_FILTERS, plan: "pareja" })).toBe(true);
  });
});
