import type { Place } from "../types/place";

export const places: Place[] = [
  // =========================
  // CLÁSICOS / PASEOS
  // =========================
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
    lat: -34.4197645,
    lng: -58.5724168,
    locationType: "entrance",
    coverImage: "images/puerto-de-frutos.jpg",
    gallery: [
      "images/puerto-de-frutos.jpg",
      "images/puerto-de-frutos-2.jpg",
      "images/puerto-de-frutos-3.jpg",
    ],
  },
  {
    slug: "paseo-victorica",
    name: "Paseo Victorica",
    category: "paseos",
    shortDescription: "Camino costero con vistas al río, bares y museos.",
    description:
      "Ideal para caminar, sacar fotos y recorrer la costa del río Luján. Zona muy concurrida los fines de semana.",
    duration: "1-2h",
    budget: "gratis",
    zone: "Paseo Victorica",
    tags: ["familia", "pareja", "gratis", "fotos"],
    lat: -34.4169,
    lng: -58.5758,
    locationType: "area",
    coverImage: "images/paseo-victorica.jpg",
    gallery: [
      "images/paseo-victorica.jpg",
      "images/paseo-victorica-2.jpg",
      "images/paseo-victorica-3.jpg",
    ],
  }
  ,

  // =========================
  // PARQUES / ENTRETENIMIENTO
  // =========================
  {
    slug: "parque-de-la-costa",
    name: "Parque de la Costa",
    category: "entretenimiento",
    shortDescription: "Parque de diversiones con juegos y espectáculos.",
    description:
      "Ideal para familias y grupos. Recomendable dedicar medio día o más según la temporada.",
    duration: "dia-completo",
    budget: "alto",
    zone: "Zona Parque de la Costa",
    tags: ["familia", "aventura", "niños"],
    lat: -34.4164,
    lng: -58.5786,
    locationType: "entrance",
    coverImage: "images/parque-de-la-costa.jpg",
    gallery: [
      "images/parque-de-la-costa.jpg",
      "images/parque-de-la-costa-2.jpg",
      "images/parque-de-la-costa-3.webp",
    ],
  },

  // =========================
  // MUSEOS / CULTURA
  // =========================
  {
    slug: "museo-de-arte-tigre",
    name: "Museo de Arte Tigre (MAT)",
    category: "museos",
    shortDescription: "Museo con obras argentinas en un edificio histórico.",
    description:
      "Plan ideal si llueve o si querés sumar cultura al día. Verificá horarios y exposiciones vigentes.",
    duration: "1-2h",
    budget: "medio",
    zone: "Paseo Victorica",
    tags: ["lluvia", "cultura", "tranquilo"],
    lat: -34.40924,
    lng: -58.59171,
    locationType: "entrance",
    coverImage: "images/museo-de-arte-tigre.jpg",
    gallery: [
      "images/museo-de-arte-tigre.jpg",
      "images/museo-de-arte-tigre-2.jpg",
      "images/museo-de-arte-tigre-3.jpg",
    ],
  },
  {
    slug: "museo-de-la-reconquista",
    name: "Museo de la Reconquista",
    category: "museos",
    shortDescription: "Museo histórico sobre los orígenes de Tigre.",
    description:
      "Entrada gratuita. Recorrido breve y educativo.",
    duration: "1-2h",
    budget: "gratis",
    tags: ["cultura", "gratis", "historia"],
    lat: -34.4177,
    lng: -58.5761,
    locationType: "entrance",
    coverImage: "images/museo-de-la-reconquista.jpg",
    gallery: [
      "images/museo-de-la-reconquista.jpg",
      "images/museo-de-la-reconquista-2.jpg",
      "images/museo-de-la-reconquista-3.jpg",
    ],
  },
  {
    slug: "museo-naval",
    name: "Museo Naval de la Nación",
    category: "museos",
    shortDescription: "Historia naval argentina en un edificio histórico.",
    description:
      "Plan tranquilo y educativo. Ideal para días de lluvia.",
    duration: "1-2h",
    budget: "gratis",
    tags: ["cultura", "lluvia", "gratis"],
    lat: -34.4096,
    lng: -58.5908,
    locationType: "entrance",
    coverImage: "images/museo-naval.jpg",
    gallery: ["images/museo-naval.jpg", "images/museo-naval-2.jpg", "images/museo-naval-3.jpg"],
  },
  {
    slug: "casa-museo-sarmiento",
    name: "Casa Museo Domingo Faustino Sarmiento",
    category: "museos",
    shortDescription: "Casa histórica del expresidente argentino.",
    description:
      "Acceso en lancha. Entrada gratuita.",
    duration: "1-2h",
    budget: "gratis",
    tags: ["cultura", "gratis", "historia"],
    locationType: "area",
    coverImage: "images/museo-sarmiento.jpg",
    gallery: [
      "images/museo-sarmiento.jpg",
      "images/museo-sarmiento-2.jpg",
      "images/museo-sarmiento-3.jpg",
    ],
  },

  // =========================
  // NATURALEZA / DELTA
  // =========================
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
    coverImage: "images/paseo-en-lancha.jpg",
    gallery: [
      "images/paseo-en-lancha.jpg",
      "images/paseo-en-lancha-2.jpg",
      "images/paseo-en-lancha-3.jpg",
    ],
  },

  // =========================
  // CLUBES DE REMO (pedidos)
  // =========================

  {
    slug: "clubes-de-remo",
    name: "Clubes de Remo de Tigre",
    category: "paseos",
    shortDescription: "Zona histórica de clubes de remo y deportes náuticos.",
    description:
      "Ideal para caminar y ver actividad deportiva. Acceso libre.",
    duration: "1-2h",
    budget: "gratis",
    tags: ["paseo", "gratis", "fotos"],
    locationType: "area",
    coverImage: "images/clubes-de-remo.jpg",
    gallery: [
      "images/clubes-de-remo.jpg",
      "images/clubes-de-remo-2.jpg",
      "images/clubes-de-remo-3.jpg",
    ]
  },
  // =========================
  // ENTRETENIMIENTO / ESPECTÁCULOS
  // =========================
  {
    slug: "teatro-nini-marshall",
    name: "Teatro Niní Marshall",
    category: "cultura",
    shortDescription: "Teatro municipal con obras y espectáculos.",
    description:
      "Cartelera variable según la temporada. Conviene revisar programación.",
    duration: "1-2h",
    budget: "medio",
    tags: ["cultura", "noche", "pareja"],
    lat: -34.4246,
    lng: -58.5793,
    locationType: "entrance",
    coverImage: "images/teatro-nini-marshall.jpg",
    gallery: [
      "images/teatro-nini-marshall.jpg",
      "images/teatro-nini-marshall-2.jpg",    
      "images/teatro-nini-marshall-3.jpg",
    ],
  },

  {
    slug: "casino-trilenium",
    name: "Casino Trilenium",
    category: "entretenimiento",
    shortDescription: "Casino con tragamonedas, mesas y shows.",
    description:
      "Entrada libre, consumo opcional. Actividad principalmente nocturna.",
    duration: "1-2h",
    budget: "medio",
    zone: "Paseo Victorica",
    tags: ["noche", "pareja", "entretenimiento"],
    lat: -34.4172,
    lng: -58.5769,
    locationType: "entrance",
    coverImage: "images/casino-trilenium.png",
    gallery: [ 
      "images/casino-trilenium.png",
      "images/casino-trilenium-2.png",
      "images/casino-trilenium-3.png",],
  },

  // =========================
  // DELTA / PASEOS NÁUTICOS
  // =========================
  {
    slug: "paseo-en-catamaran",
    name: "Paseo en catamarán",
    category: "paseos",
    shortDescription: "Recorrido guiado por ríos del Delta.",
    description:
      "Alternativa cómoda para conocer el Delta sin lancha privada.",
    duration: "1-2h",
    budget: "medio",
    zone: "Estación Fluvial",
    tags: ["naturaleza", "pareja", "fotos"],
    lat: -34.4209,
    lng: -58.5795,
    locationType: "entrance",
    coverImage: "images/paseo-en-catamaran.jpg",
    gallery: ["images/paseo-en-catamaran.jpg", "images/paseo-en-catamaran-2.jpeg", "images/paseo-en-catamaran-3.jpg"],
  },

  {
    slug: "lancha-colectiva-delta",
    name: "Lancha colectiva por el Delta",
    category: "naturaleza",
    shortDescription: "Transporte fluvial típico del Delta.",
    description:
      "Experiencia local para recorrer islas y arroyos. Funciona como transporte y paseo.",
    duration: "medio-dia",
    budget: "bajo",
    zone: "Estación Fluvial",
    tags: ["delta", "local", "naturaleza"],
    lat: -34.42094,
    lng: -58.57982,
    locationType: "area",
    coverImage: "images/lancha-colectiva.jpg",
    gallery: [ "images/lancha-colectiva.jpg", "images/lancha-colectiva-2.jpg", "images/lancha-colectiva-3.jpg"],
  },

  // =========================
  // NATURALEZA / AIRE LIBRE
  // =========================
  {
    slug: "reserva-natural-rincon-de-milberg",
    name: "Reserva Natural Rincón de Milberg",
    category: "naturaleza",
    shortDescription: "Reserva ecológica con senderos y avistaje de aves.",
    description:
      "Buen plan para caminar, observar aves y desconectar del centro.",
    duration: "medio-dia",
    budget: "bajo",
    zone: "Rincón de Milberg",
    tags: ["naturaleza", "aire-libre", "tranquilo"],
    lat: -34.39557,
    lng: -58.56721,
    locationType: "entrance",
    coverImage: "images/reserva-rincon.jpeg",
    gallery: [ "images/reserva-rincon.jpeg", "images/reserva-rincon-2.jpg", "images/reserva-rincon-3.jpg"],
  },

  {
    slug: "reserva-delta-terra",
    name: "Reserva Natural Delta Terra",
    category: "naturaleza",
    shortDescription: "Reserva privada con senderos y actividades.",
    description:
      "Ideal para contacto con la naturaleza. Requiere reserva previa.",
    duration: "medio-dia",
    budget: "medio",
    tags: ["naturaleza", "tranquilo"],
    locationType: "area",
    coverImage: "images/delta-terra.jpg",
    gallery: ["images/delta-terra.jpg", "images/delta-terra-2.jpg", "images/delta-terra-3.jpg"],
  },

  // =========================
  // AVENTURA / ACTIVIDADES
  // =========================
  {
    slug: "euca-tigre",
    name: "Euca Tigre",
    category: "aventura",
    shortDescription: "Circuitos aéreos y tirolesas en los árboles.",
    description:
      "Actividad al aire libre para niños y adultos.",
    duration: "1-2h",
    budget: "medio",
    tags: ["aventura", "familia", "aire-libre"],
    lat: -34.4089,
    lng: -58.5866,
    locationType: "entrance",
    coverImage: "images/euca-tigre.webp",
    gallery: [ "images/euca-tigre.webp", "images/euca-tigre-2.webp", "images/euca-tigre-3.jpg"],
  },

  {
    slug: "kayak-en-el-delta",
    name: "Kayak en el Delta",
    category: "aventura",
    shortDescription: "Recorré el Delta en kayak.",
    description:
      "Experiencia activa para recorrer arroyos y ríos. Ideal si te gusta remar.",
    duration: "1-2h",
    budget: "medio",
    zone: "Delta",
    tags: ["aventura", "deporte", "naturaleza"],
    lat: -34.4205,
    lng: -58.5801,
    locationType: "area",
    coverImage: "images/kayak-delta.jpg",
    gallery: [ "images/kayak-delta.jpg", "images/kayak-delta-2.jpg", "images/kayak-delta-3.jpg"],
  },

  // =========================
  // GASTRONOMÍA / RELAX
  // =========================
  {
    slug: "restaurantes-sobre-el-rio",
    name: "Restaurantes sobre el río",
    category: "gastronomia",
    shortDescription: "Almorzar o cenar con vista al río.",
    description:
      "Zona con varios restaurantes para disfrutar comida y paisaje.",
    duration: "1-2h",
    budget: "medio",
    zone: "Paseo Victorica",
    tags: ["comida", "pareja", "relax"],
    lat: -34.4151,
    lng: -58.5839,
    locationType: "area",
    coverImage: "images/restaurante.webp",
    gallery: [ "images/restaurante.webp", "images/restaurante-2.webp", "images/restaurante-3.webp"],
  },

  {
    slug: "spa-y-relax-en-tigre",
    name: "Spa y relax en Tigre",
    category: "relax",
    shortDescription: "Spas y masajes para un plan tranquilo.",
    description:
      "Ideal para bajar un cambio y disfrutar un día de relax.",
    duration: "medio-dia",
    budget: "alto",
    zone: "Centro / Delta",
    tags: ["relax", "pareja", "tranquilo"],
    lat: -34.4169,
    lng: -58.5823,
    locationType: "area",
    coverImage: "images/spa.jpg",
    gallery: [ "images/spa.jpg", "images/spa-2.jpeg", "images/spa-3.webp"],
  },
];
