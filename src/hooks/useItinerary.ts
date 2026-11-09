import { useCallback, useSyncExternalStore } from "react";

import { places } from "../data/places";
import { createItineraryStore, moveSlug, STORAGE_KEY, toggleSlug } from "../lib/itineraryStore";

const VALID = new Set(places.map((p) => p.slug));

function safeStorage(): Storage | null {
  try {
    return typeof window !== "undefined" ? window.localStorage : null;
  } catch {
    return null;
  }
}

const store = createItineraryStore(safeStorage(), (s) => VALID.has(s));

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) store.reload();
  });
}

export function useItinerary() {
  const slugs = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);

  const has = useCallback((slug: string) => slugs.includes(slug), [slugs]);
  const toggle = useCallback((slug: string) => store.set(toggleSlug(store.getSnapshot(), slug)), []);
  const remove = useCallback(
    (slug: string) => store.set(store.getSnapshot().filter((s) => s !== slug)),
    [],
  );
  const move = useCallback(
    (index: number, dir: -1 | 1) => store.set(moveSlug(store.getSnapshot(), index, dir)),
    [],
  );
  const clear = useCallback(() => store.set([]), []);

  return { slugs, count: slugs.length, has, toggle, remove, move, clear };
}
