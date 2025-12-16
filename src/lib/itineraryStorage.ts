const KEY = "tigre:itinerary:order:v1";

export function getItineraryOrder(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function setItineraryOrder(slugs: string[]) {
  localStorage.setItem(KEY, JSON.stringify(slugs));
}

/**
 * Normaliza el orden:
 * - mantiene el orden guardado si existe
 * - agrega al final los favoritos nuevos
 * - elimina slugs que ya no están en favoritos
 */
export function normalizeOrder(favs: string[], savedOrder: string[]) {
  const favSet = new Set(favs);

  const kept = savedOrder.filter((s) => favSet.has(s));
  const missing = favs.filter((s) => !kept.includes(s));

  return [...kept, ...missing];
}
