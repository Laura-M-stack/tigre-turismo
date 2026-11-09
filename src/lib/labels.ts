import type { Budget, Category, Duration, LocationType, Place } from "../types/place";

export const CATEGORY_LABEL: Record<Category, string> = {
  naturaleza: "Naturaleza",
  paseos: "Paseos",
  museos: "Museos",
  gastronomia: "Gastronomía",
  aventura: "Aventura",
  relax: "Relax",
  entretenimiento: "Entretenimiento",
  cultura: "Cultura",
};

export const DURATION_LABEL: Record<Duration, string> = {
  "1-2h": "1–2 h",
  "medio-dia": "Medio día",
  "dia-completo": "Día completo",
};

/** Se muestra con signos $ para escanear rápido; el texto largo va en aria-label / title. */
export const BUDGET_LABEL: Record<Budget, string> = {
  gratis: "Gratis",
  bajo: "$",
  medio: "$$",
  alto: "$$$",
};

export const BUDGET_LONG_LABEL: Record<Budget, string> = {
  gratis: "Gratis",
  bajo: "Presupuesto bajo",
  medio: "Presupuesto medio",
  alto: "Presupuesto alto",
};

export const LOCATION_LABEL: Record<LocationType, string> = {
  entrance: "Acceso principal",
  area: "Zona aproximada",
};

/** "Paseos · 1–2 h · Gratis" */
export function metaLine(place: Pick<Place, "category" | "duration" | "budget">) {
  return [CATEGORY_LABEL[place.category], DURATION_LABEL[place.duration], BUDGET_LABEL[place.budget]].join(
    " · ",
  );
}

export function metaLineLong(place: Pick<Place, "category" | "duration" | "budget">) {
  return [CATEGORY_LABEL[place.category], DURATION_LABEL[place.duration], BUDGET_LONG_LABEL[place.budget]].join(
    ", ",
  );
}
