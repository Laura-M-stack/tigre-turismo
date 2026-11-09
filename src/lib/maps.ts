export function googleMapsDirectionsUrl(lat: number, lng: number) {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    throw new Error("Invalid coordinates for Google Maps directions");
  }

  const destination = `${lat},${lng}`;

  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}

export function googleMapsSearchUrl(query: string) {
  if (!query?.trim()) {
    throw new Error("Query is required for Google Maps search");
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}