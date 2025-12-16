import type { Place } from "../types/place";

export const places: Place[] = [
  {
    slug: "puerto-de-frutos",
    name: "Puerto de Frutos",
    category: "paseos",
    shortDescription: "Paseo clásico para compras, artesanías y paseo costero.",
    description:
      "Ideal para recorrer puestos, comer algo y caminar por la zona. Suele estar más concurrido los fines de semana.",
    duration: "medio-dia",
    budget: "bajo",
    zone: "Puerto de Frutos",
    tags: ["familia", "compras", "paseo"],
    lat: -34.42006,
    lng: -58.57343,
    locationType: "entrance",
  },
  {
    slug: "paseo-en-lancha-por-el-delta",
    name: "Paseo en lancha por el Delta",
    category: "naturaleza",
    shortDescription: "Recorrido por ríos y arroyos del Delta.",
    description:
      "Una de las mejores formas de conocer el Delta. Elegí horarios con buena luz si querés fotos.",
    duration: "1-2h",
    budget: "medio",
    zone: "Estación Fluvial",
    tags: ["naturaleza", "fotos", "pareja"],
    lat: -34.42094,
    lng: -58.57982,
    locationType: "area",
  },
  {
    slug: "museo-de-arte-tigre",
    name: "Museo de Arte Tigre (MAT)",
    category: "museos",
    shortDescription: "Museo con obras argentinas en un edificio histórico.",
    description:
      "Plan ideal si llueve o si querés sumar cultura al día. Verificá horarios y exposiciones vigentes.",
    duration: "1-2h",
    budget: "medio",
    tags: ["lluvia", "cultura", "tranquilo"],
    lat: -34.40924,
    lng: -58.59171,
    locationType: "entrance",
  },
];
