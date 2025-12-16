import type { Duration, Place } from "../types/place";

const durationToMinutes: Record<Duration, number> = {
  "1-2h": 90,
  "medio-dia": 240,
  "dia-completo": 420,
};

export function estimateTotalMinutes(places: Place[]) {
  return places.reduce((acc, p) => acc + durationToMinutes[p.duration], 0);
}

export function formatMinutes(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} h`;
  return `${h} h ${m} min`;
}

export function planSuggestion(totalMinutes: number) {
  if (totalMinutes <= 120) return "Plan corto (1–2 horas)";
  if (totalMinutes <= 300) return "Medio día";
  return "Día completo";
}
