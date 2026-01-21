import type { Place } from "../types/place";

import { estimateTotalMinutes, formatMinutes, planSuggestion } from "./itinerary";
import { googleMapsDirectionsUrl } from "./maps";

function joinBase(base: string) {
  // Si está en GH Pages con /tigre-turismo, origin no incluye el path.
  // Tomamos el href actual y recortamos hasta el "#", quedándonos con el base real.
  const href = typeof window !== "undefined" ? window.location.href : base;
  const noHash = href.split("#")[0];
  return noHash.endsWith("/") ? noHash.slice(0, -1) : noHash;
}

export function buildItineraryShareText(places: Place[], siteBaseUrl: string): string {
  const totalMinutes = estimateTotalMinutes(places);
  const summary = `Itinerario en Tigre — ${planSuggestion(totalMinutes)} (${formatMinutes(totalMinutes)})`;

  // ✅ HashRouter: los links deben incluir "/#/"
  const base = typeof window !== "undefined" ? joinBase(siteBaseUrl) : siteBaseUrl;

  const items = places.map((p, idx) => {
    const detailUrl = `${base}/#/lugares/${p.slug}`;
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
