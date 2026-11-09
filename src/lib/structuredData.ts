const SCRIPT_ID = "place-jsonld";

export function buildPlaceJsonLd(place: { name: string; description?: string; lat?: number; lng?: number }) {
  const hasGeo = Number.isFinite(place.lat) && Number.isFinite(place.lng);
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: place.name,
    ...(place.description ? { description: place.description } : {}),
    ...(hasGeo
      ? { geo: { "@type": "GeoCoordinates", latitude: place.lat, longitude: place.lng } }
      : {}),
    containedInPlace: { "@type": "City", name: "Tigre, Buenos Aires, Argentina" },
  };
}

/** Reemplaza (no agrega) el JSON-LD del lugar: antes se sumaba un <script> por cada visita. */
export function setPlaceStructuredData(place: Parameters<typeof buildPlaceJsonLd>[0]) {
  let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.text = JSON.stringify(buildPlaceJsonLd(place));
}

export function clearPlaceStructuredData() {
  document.getElementById(SCRIPT_ID)?.remove();
}
