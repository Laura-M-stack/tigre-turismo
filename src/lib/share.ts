import type { Place } from "../types/place";
import { googleMapsDirectionsUrl } from "./maps";
import { estimateTotalMinutes, formatMinutes, planSuggestion } from "./itinerary";

export function buildItineraryShareText(
  places: Place[],
  siteBaseUrl: string,
): string {
  const totalMinutes = estimateTotalMinutes(places);
  const summary = `Itinerario en Tigre — ${planSuggestion(totalMinutes)} (${formatMinutes(totalMinutes)})`;

  const items = places.map((p, idx) => {
    const detailUrl = `${siteBaseUrl}/lugares/${p.slug}`;
    const mapsUrl =
      typeof p.lat === "number" && typeof p.lng === "number"
        ? googleMapsDirectionsUrl(p.lat, p.lng)
        : null;

    const lines = [
      `${idx + 1}) ${p.name}`,
      `   Detalle: ${detailUrl}`,
      mapsUrl ? `   Cómo llegar: ${mapsUrl}` : null,
    ].filter(Boolean);

    return lines.join("\n");
  });

  return [summary, "", ...items].join("\n");
}