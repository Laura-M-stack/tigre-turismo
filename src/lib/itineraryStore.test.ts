import { describe, expect, it } from "vitest";

import {
  createItineraryStore,
  LEGACY_FAVS_KEY,
  LEGACY_ORDER_KEY,
  loadItinerary,
  moveSlug,
  normalizeOrder,
  STORAGE_KEY,
  toggleSlug,
} from "./itineraryStore";

function memoryStorage(init: Record<string, string> = {}) {
  const data = new Map(Object.entries(init));
  return {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
    removeItem: (k: string) => void data.delete(k),
    data,
  };
}

const valid = (s: string) => ["a", "b", "c", "d"].includes(s);

describe("normalizeOrder", () => {
  it("mantiene el orden guardado y agrega favoritos nuevos al final", () => {
    expect(normalizeOrder(["a", "b", "c"], ["c", "a"])).toEqual(["c", "a", "b"]);
  });
  it("descarta del orden lo que ya no es favorito", () => {
    expect(normalizeOrder(["a"], ["b", "a"])).toEqual(["a"]);
  });
});

describe("toggleSlug / moveSlug", () => {
  it("agrega al final y quita si ya estaba", () => {
    expect(toggleSlug(["a"], "b")).toEqual(["a", "b"]);
    expect(toggleSlug(["a", "b"], "a")).toEqual(["b"]);
  });
  it("mueve dentro de los límites y no hace nada fuera de ellos", () => {
    expect(moveSlug(["a", "b", "c"], 0, 1)).toEqual(["b", "a", "c"]);
    expect(moveSlug(["a", "b", "c"], 2, -1)).toEqual(["a", "c", "b"]);
    const list = ["a", "b"];
    expect(moveSlug(list, 0, -1)).toBe(list);
    expect(moveSlug(list, 1, 1)).toBe(list);
  });
});

describe("loadItinerary", () => {
  it("migra las claves v1 a la v2 y borra las viejas", () => {
    const s = memoryStorage({
      [LEGACY_FAVS_KEY]: JSON.stringify(["a", "b", "zzz"]),
      [LEGACY_ORDER_KEY]: JSON.stringify(["b"]),
    });
    expect(loadItinerary(s, valid)).toEqual(["b", "a"]);
    expect(s.getItem(STORAGE_KEY)).toBe(JSON.stringify(["b", "a"]));
    expect(s.getItem(LEGACY_FAVS_KEY)).toBeNull();
    expect(s.getItem(LEGACY_ORDER_KEY)).toBeNull();
  });
  it("tolera JSON roto o con tipos inesperados", () => {
    expect(loadItinerary(memoryStorage({ [STORAGE_KEY]: "{no-json" }), valid)).toEqual([]);
    expect(loadItinerary(memoryStorage({ [STORAGE_KEY]: '{"a":1}' }), valid)).toEqual([]);
    expect(loadItinerary(memoryStorage({ [STORAGE_KEY]: '["a",3,"a","x"]' }), valid)).toEqual(["a"]);
  });
});

describe("createItineraryStore", () => {
  it("persiste, notifica y quita del itinerario = quita de guardados (una sola lista)", () => {
    const s = memoryStorage();
    const store = createItineraryStore(s, valid);
    let calls = 0;
    const unsub = store.subscribe(() => calls++);

    store.set(["a", "b"]);
    store.set(store.getSnapshot().filter((x) => x !== "a"));

    expect(store.getSnapshot()).toEqual(["b"]);
    expect(s.getItem(STORAGE_KEY)).toBe(JSON.stringify(["b"]));
    expect(calls).toBe(2);
    unsub();
    store.set([]);
    expect(calls).toBe(2);
  });
  it("funciona sin storage (modo privado)", () => {
    const store = createItineraryStore(null, valid);
    store.set(["c"]);
    expect(store.getSnapshot()).toEqual(["c"]);
  });
});
