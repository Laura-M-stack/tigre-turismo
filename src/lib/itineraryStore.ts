/**
 * Un único store para "favoritos" + "orden del itinerario".
 * Antes eran dos claves en localStorage que se desincronizaban (quitar del itinerario
 * no quitaba de favoritos). Ahora la lista ordenada ES el itinerario.
 */
export const STORAGE_KEY = "tigre:itinerary:v2";
export const LEGACY_FAVS_KEY = "tigre:favs:v1";
export const LEGACY_ORDER_KEY = "tigre:itinerary:order:v1";

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

function readArray(storage: StorageLike, key: string): string[] {
  try {
    const raw = storage.getItem(key);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

/** Mantiene el orden guardado, agrega al final favoritos nuevos y descarta los que ya no están. */
export function normalizeOrder(favs: string[], savedOrder: string[]) {
  const favSet = new Set(favs);
  const kept = savedOrder.filter((s) => favSet.has(s));
  const keptSet = new Set(kept);
  return [...kept, ...favs.filter((s) => !keptSet.has(s))];
}

export function sanitize(slugs: string[], isValid: (slug: string) => boolean) {
  return [...new Set(slugs)].filter(isValid);
}

export function toggleSlug(list: string[], slug: string) {
  return list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug];
}

export function moveSlug(list: string[], index: number, dir: -1 | 1) {
  const target = index + dir;
  if (index < 0 || index >= list.length || target < 0 || target >= list.length) return list;
  const next = [...list];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

/** Lee la clave nueva; si no existe, migra desde las dos claves viejas (una sola vez). */
export function loadItinerary(storage: StorageLike, isValid: (slug: string) => boolean) {
  if (storage.getItem(STORAGE_KEY) !== null) {
    return sanitize(readArray(storage, STORAGE_KEY), isValid);
  }
  const migrated = sanitize(
    normalizeOrder(readArray(storage, LEGACY_FAVS_KEY), readArray(storage, LEGACY_ORDER_KEY)),
    isValid,
  );
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(migrated));
    storage.removeItem(LEGACY_FAVS_KEY);
    storage.removeItem(LEGACY_ORDER_KEY);
  } catch {
    /* modo privado / cuota llena: seguimos en memoria */
  }
  return migrated;
}

export type ItineraryStore = {
  getSnapshot: () => string[];
  subscribe: (listener: () => void) => () => void;
  set: (next: string[]) => void;
  /** Re-lee storage (para el evento "storage" de otras pestañas). */
  reload: () => void;
};

export function createItineraryStore(
  storage: StorageLike | null,
  isValid: (slug: string) => boolean,
): ItineraryStore {
  let state: string[] = storage ? loadItinerary(storage, isValid) : [];
  const listeners = new Set<() => void>();
  const emit = () => listeners.forEach((l) => l());

  return {
    getSnapshot: () => state,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    set(next) {
      state = sanitize(next, isValid);
      try {
        storage?.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        /* ignore */
      }
      emit();
    },
    reload() {
      if (!storage) return;
      state = sanitize(readArray(storage, STORAGE_KEY), isValid);
      emit();
    },
  };
}
