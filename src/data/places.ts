import type { Place } from "../types/place";

export const places: Place[] = [
  // =========================
  // CLÁSICOS / PASEOS
  // =========================
  {
    slug: "puerto-de-frutos",
    name: "Puerto de Frutos",
    category: "paseos",
    shortDescription:
      "Paseo al aire libre con puestos, artesanías y gastronomía junto al río. Ideal para recorrer sin apuro.",
    longDescription: [
      "El Puerto de Frutos es uno de los puntos más emblemáticos de Tigre y una visita casi obligada para quienes llegan por primera vez.",
      "Su origen está ligado al antiguo puerto donde se descargaban frutas y productos del Delta, actividad que le dio nombre y marcó la identidad del lugar durante décadas.",
      "Hoy funciona como un paseo al aire libre con puestos de artesanías, decoración, productos regionales y una amplia oferta gastronómica, todo en contacto directo con el río.",
      "Es ideal para recorrer sin apuro, curiosear entre locales y sentarse a comer algo mientras pasan las lanchas. Los fines de semana suele haber mucho movimiento, lo que lo convierte en un espacio muy animado.",
      "Para una experiencia más tranquila, se recomienda visitarlo entre semana o temprano por la mañana. Además de pasear, es un buen lugar para comprar recuerdos y productos típicos de la región.",
    ],
    duration: "medio-dia",
    budget: "bajo",
    tips: [
      {
        id: "puerto-de-frutos-horario",
        title: "Horario ideal",
        description:
          "Si vas un fin de semana, conviene llegar antes de las 11 hs para recorrer con más tranquilidad y evitar las horas de mayor afluencia.",
      },
      {
        id: "puerto-de-frutos-pagos",
        title: "Medios de pago",
        description:
          "Muchos puestos aceptan efectivo y transferencias, pero no todos trabajan con tarjeta. Llevá varias opciones por las dudas.",
      },
      {
        id: "puerto-de-frutos-plan-combinado",
        title: "Plan combinado",
        description:
          "Buena idea: combinar la visita con un paseo en lancha desde la Estación Fluvial para conocer el Delta desde el agua.",
      },
      {
        id: "puerto-de-frutos-comer",
        title: "Para comer",
        description:
          "Si querés evitar filas, almorzá temprano o después de las 15 hs. También hay opciones para picar mientras recorrés los puestos.",
      },
    ],
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
    shortDescription: "Paseo costero junto al río, ideal para caminar, sacar fotos o comer algo con vista al agua.",
    longDescription: [
      "El Paseo Victorica es una avenida costera que bordea el río Luján y concentra algunos de los edificios más representativos de Tigre.",
      "A lo largo de su recorrido se encuentran museos, restaurantes, clubes náuticos y construcciones históricas que reflejan el pasado turístico y social de la zona.",
      "Es un lugar ideal para caminar, sacar fotos y disfrutar de vistas abiertas al río, especialmente al atardecer.",
      "Los fines de semana suele haber mucha circulación de gente, lo que le da un clima animado, mientras que durante la semana resulta más tranquilo para pasear con calma.",
    ],
    duration: "1-2h",
    budget: "gratis",
    tips: [
      {
        id: "paseo-victorica-atardecer",
        title: "Mejor momento del día",
        description:
          "El atardecer suele ser el mejor momento: luz cálida, buenas fotos y vistas abiertas sobre el río.",
      },
      {
        id: "paseo-victorica-semana",
        title: "Días más tranquilos",
        description:
          "Entre semana es mucho más calmo, ideal para caminar sin apuro y disfrutar del entorno con menos gente.",
      },
      {
        id: "paseo-victorica-museos",
        title: "Recorrido cultural",
        description:
          "Podés aprovechar para visitar museos cercanos como el MAT o el Museo Naval, a pocos minutos a pie.",
      },
      {
        id: "paseo-victorica-comer",
        title: "Dónde parar a comer",
        description:
          "Hay cafés y restaurantes con vista al río. Si vas en fin de semana, reservar puede ahorrarte espera.",
      },
    ],
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
  },

  // =========================
  // PARQUES / ENTRETENIMIENTO
  // =========================
  {
    slug: "parque-de-la-costa",
    name: "Parque de la Costa",
    category: "entretenimiento",
    shortDescription: "Parque de diversiones con juegos y shows. Ideal para pasar el día en familia o con chicos.",
    longDescription: [
      "El Parque de la Costa es un parque de diversiones ubicado en la zona norte de la ciudad de Tigre.",
      "Ofrece una amplia variedad de juegos mecánicos, atracciones familiares, propuestas para chicos y espectáculos en vivo, lo que lo convierte en un plan de día completo.",
      "Dependiendo de la temporada, la experiencia puede variar: en vacaciones y fines de semana suele haber mayor afluencia, mientras que los días de semana son más tranquilos.",
      "Es una opción pensada especialmente para familias y grupos que buscan una jornada activa y entretenida.",
    ],
    duration: "dia-completo",
    budget: "alto",
    tips: [
      {
        id: "parque-costa-entradas",
        title: "Entradas y filas",
        description:
          "Conviene comprar las entradas online con anticipación para evitar filas y asegurar disponibilidad en días de alta demanda.",
      },
      {
        id: "parque-costa-horario",
        title: "Horario estratégico",
        description:
          "En temporada alta o fines de semana, llegar apenas abre el parque te permite aprovechar mejor antes de que se formen filas largas.",
      },
      {
        id: "parque-costa-alturas",
        title: "Altura y edades",
        description:
          "Si vas con chicos, revisá las alturas mínimas de los juegos para organizar mejor el recorrido y evitar frustraciones.",
      },
      {
        id: "parque-costa-comer",
        title: "Comida",
        description:
          "Llevá agua y considerá horarios “no pico” para comer. En días muy concurridos, las filas de gastronomía también crecen.",
      },
    ],
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
    shortDescription:
      "Museo de arte argentino en un palacio frente al río. Un plan tranquilo para sumar cultura al recorrido.",
    longDescription: [
      "El Museo de Arte Tigre funciona en el antiguo edificio del Tigre Club, inaugurado en 1912, una construcción emblemática que simboliza el auge turístico y social de Tigre a comienzos del siglo XX.",
      "Su arquitectura de estilo ecléctico, con influencias italianas y francesas, lo convierte en uno de los edificios más reconocibles de la ciudad.",
      "El museo se dedica principalmente al arte argentino, con un enfoque especial en el arte figurativo de los siglos XIX y XX.",
      "Su colección permanente incluye obras de destacados artistas nacionales, ofreciendo una visión amplia del desarrollo del arte en Argentina durante esos períodos.",
      "El recorrido incluye salones y galerías en dos niveles, con una propuesta cuidada y una experiencia visual enriquecedora.",
    ],
    duration: "1-2h",
    budget: "bajo",
    tips: [
      {
        id: "mat-horarios",
        title: "Horarios y días",
        description:
          "Entre semana suele haber menos visitantes, lo que permite recorrer las salas con mayor tranquilidad.",
      },
      {
        id: "mat-edificio",
        title: "Valor arquitectónico",
        description:
          "Además de las obras, vale la pena detenerse en el edificio: balcones, ventanales y vistas al río forman parte de la experiencia.",
      },
      {
        id: "mat-plan-combinado",
        title: "Plan combinado",
        description:
          "Ideal para combinar con una caminata por el Paseo Victorica o un café cercano.",
      },
      {
        id: "mat-fotografias",
        title: "Fotografías",
        description:
          "Suele ser un lugar muy elegido para fotos por su arquitectura y entorno. Consultá si hay restricciones en salas específicas.",
      },
    ],
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
    shortDescription: "Museo histórico local, ideal para entender los orígenes de Tigre y sumar un plan cultural corto.",
    longDescription: [
      "El Museo de la Reconquista está dedicado a la historia local y a los orígenes de Tigre, con foco en la Reconquista de Buenos Aires y el desarrollo de la región.",
      "Funciona en una casona histórica y propone un recorrido breve pero informativo.",
      "A través de objetos, documentos y material gráfico, permite entender cómo se fue formando la identidad del lugar y su relación con el río.",
      "Es una buena opción para quienes buscan un acercamiento histórico sencillo y accesible, y queda muy bien como complemento del Paseo Victorica.",
      "También es un buen plan para sumar cultura en un día de lluvia o para equilibrar un itinerario de paseos al aire libre.",
    ],
    duration: "1-2h",
    budget: "gratis",
    tips: [
      {
        id: "reconquista-horarios",
        title: "Horarios y días",
        description:
          "Los días de semana suele haber menos visitantes, lo que permite recorrer las salas con mayor tranquilidad.",
      },
      {
        id: "reconquista-exposiciones",
        title: "Exposiciones temporarias",
        description:
          "Antes de ir, chequeá si hay muestras temporarias: suelen cambiar durante el año.",
      },
      {
        id: "reconquista-edificio",
        title: "El edificio",
        description:
          "Tomate un momento para recorrer la casona: el entorno y la arquitectura también hacen parte de la experiencia.",
      },
      {
        id: "reconquista-plan-combinado",
        title: "Plan combinado",
        description:
          "Ideal para combinar con una caminata por el Paseo Victorica (queda a pocos minutos a pie).",
      },
    ],
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
    longDescription: [
      "El Museo Naval de la Nación ofrece un recorrido por la historia marítima y fluvial de Argentina, con énfasis en la navegación, la Armada y el vínculo del país con sus ríos y mares.",
      "Funciona en un edificio histórico ubicado frente al río, lo que suma contexto a la visita.",
      "El museo exhibe maquetas de barcos, instrumentos de navegación, uniformes y documentos históricos.",
      "Es un plan tranquilo y educativo, ideal para complementar un paseo por la zona o para días en los que el clima no acompaña.",
    ],
    duration: "1-2h",
    budget: "gratis",
    tips: [
      {
        id: "museo-naval-lluvia",
        title: "Ideal para días de lluvia",
        description:
          "Es un plan bajo techo y tranquilo, perfecto para sumar cultura cuando el clima no acompaña.",
      },
      {
        id: "museo-naval-entorno",
        title: "Entorno y vistas",
        description:
          "La ubicación frente al río suma mucho a la experiencia, especialmente si combinás la visita con una caminata por la zona.",
      },
      {
        id: "museo-naval-maquetas",
        title: "Maquetas y mapas",
        description:
          "Tomate tiempo para observar maquetas y mapas históricos: suelen ser de lo más interesante del recorrido.",
      },
      {
        id: "museo-naval-tiempos",
        title: "Tiempo de visita",
        description:
          "Si tenés poco tiempo, con 45–60 minutos alcanza para un recorrido general sin apuro.",
      },
    ],
    tags: ["cultura", "lluvia", "gratis"],
    lat: -34.4096,
    lng: -58.5908,
    locationType: "entrance",
    coverImage: "images/museo-naval.jpg",
    gallery: [
      "images/museo-naval.jpg",
      "images/museo-naval-2.jpg",
      "images/museo-naval-3.jpg",
    ],
  },
  {
    slug: "casa-museo-sarmiento",
    name: "Casa Museo Domingo Faustino Sarmiento",
    category: "museos",
    shortDescription: "Casa histórica del expresidente argentino en una isla del Delta.",
    longDescription: [
      "La Casa Museo Domingo Faustino Sarmiento se encuentra en una isla del Delta y fue residencia del expresidente argentino durante sus estadías en la zona. El entorno natural y el acceso en lancha forman parte fundamental de la experiencia.",
      "El museo conserva objetos personales, mobiliario y documentos que permiten conocer más sobre la vida de Sarmiento y su relación con el Delta.",
      "Es una visita distinta que combina historia, naturaleza y navegación, y requiere organizar el traslado con anticipación.",
    ],
    duration: "1-2h",
    budget: "gratis",
    tips: [
      {
        id: "casa-museo-sarmiento-acceso",
        title: "Acceso en lancha",
        description:
          "Confirmá previamente horarios y recorridos del transporte fluvial, ya que el traslado es parte clave de la visita.",
      },
      {
        id: "casa-museo-sarmiento-organizacion",
        title: "Organización previa",
        description:
          "Llevá efectivo para el traslado y planificá con tiempo: no es un museo de acceso inmediato desde el centro.",
      },
      {
        id: "casa-museo-sarmiento-historia",
        title: "Historia y naturaleza",
        description:
          "Ideal si querés una visita distinta: historia argentina en pleno entorno natural del Delta.",
      },
    ],
    zone: "Isla del Delta",
    lat: -34.4035,
    lng: -58.5849,
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
    shortDescription:
      "Recorrido en lancha por el Delta. Ideal para conocer la vida isleña y el paisaje desde el agua.",
    longDescription: [
      "La lancha colectiva es el medio de transporte tradicional de los habitantes del Delta y una experiencia auténtica para quienes visitan la zona.",
      "Funciona como transporte público fluvial, conectando distintas islas y paradas.",
      "Viajar en lancha colectiva permite ver el Delta desde una perspectiva cotidiana, compartiendo el trayecto con vecinos y observando la vida diaria en los ríos.",
      "Es una opción económica y muy representativa de la cultura local.",
    ],
    duration: "1-2h",
    budget: "medio",
    tips: [
      {
        id: "paseo-lancha-primera-vez",
        title: "Primera vez en el Delta",
        description:
          "Si es tu primera experiencia, conviene elegir un paseo con guía para entender mejor la vida y la geografía del Delta.",
      },
      {
        id: "paseo-lancha-horarios",
        title: "Horarios fluviales",
        description:
          "Consultá los horarios antes de planificar el día: funcionan como transporte público y no siempre hay frecuencia alta.",
      },
      {
        id: "paseo-lancha-fotografia",
        title: "Fotografía y paisaje",
        description:
          "Sentarte cerca de las ventanas o al aire libre te permite sacar muy buenas fotos de la vida cotidiana del Delta.",
      },
      {
        id: "paseo-lancha-sol",
        title: "Qué llevar",
        description:
          "Protector solar y repelente son clave, incluso si está nublado: el agua refleja mucho la luz.",
      },
    ],
    zone: "Estación Fluvial",
    tags: ["naturaleza", "fotos", "pareja"],
    lat: -34.42094,
    lng: -58.57982,
    locationType: "area",
    coverImage: "images/paseo-en-lancha.jpg",
    gallery: [
      "images/paseo-en-lancha.jpg",
      "images/paseo-en-lancha-1.jpg",
      "images/paseo-en-lancha-2.jpg",
      "images/paseo-en-lancha-3.jpg",
      "images/paseo-en-lancha-4.jpg",
      "images/paseo-en-lancha-5.jpg",
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
    longDescription: [
      "La zona de clubes de remo de Tigre es un espacio ideal para disfrutar de la actividad náutica y el deporte en la ciudad.",
      "Reúne clubes históricos vinculados a la identidad del Tigre, con construcciones tradicionales y mucha vida sobre el río.",
      "Aunque los clubes son privados, el entorno es de acceso libre y muy atractivo para caminar, sacar fotos y ver entrenamientos.",
      "Es un buen complemento para recorrer junto al Paseo Victorica y otros puntos cercanos.",
    ],
    duration: "1-2h",
    budget: "gratis",
    tips: [
      {
        id: "clubes-remo-horarios",
        title: "Horarios recomendados",
        description:
          "Las primeras horas de la mañana o los momentos de entrenamiento son ideales para ver actividad en el río.",
      },
      {
        id: "clubes-remo-fotos",
        title: "Fotos",
        description:
          "La arquitectura y el río dan muy buenas fotos. Atardecer suele ser el mejor momento por la luz.",
      },
      {
        id: "clubes-remo-caminata",
        title: "Acceso y recorrido",
        description:
          "Los clubes son privados, pero todo el entorno es de acceso público y muy agradable para caminar.",
      },
      {
        id: "clubes-remo-plan-combinado",
        title: "Plan combinado",
        description:
          "Sumalo como tramo del paseo si ya estás recorriendo el Paseo Victorica.",
      },
    ],
    tags: ["paseo", "gratis", "fotos"],
    locationType: "area",
    coverImage: "images/clubes-de-remo.jpg",
    gallery: [
      "images/clubes-de-remo.jpg",
      "images/clubes-de-remo-2.jpg",
      "images/clubes-de-remo-3.jpg",
    ],
  },

  // =========================
  // ENTRETENIMIENTO / ESPECTÁCULOS
  // =========================
  {
    slug: "teatro-nini-marshall",
    name: "Teatro Niní Marshall",
    category: "cultura",
    shortDescription: "Teatro municipal con obras y espectáculos.",
    longDescription: [
      "El Teatro Niní Marshall es el principal teatro municipal de Tigre y un espacio clave para la actividad cultural local.",
      "Lleva el nombre de la reconocida actriz y humorista argentina y cuenta con una programación variada a lo largo del año.",
      "En su cartelera se pueden encontrar obras teatrales, espectáculos musicales, funciones infantiles y eventos especiales.",
      "Es una buena opción para sumar una salida nocturna o cultural al itinerario, especialmente si buscás algo distinto al paseo diurno.",
    ],
    duration: "1-2h",
    budget: "medio",
    tips: [
      {
        id: "teatro-nini-marshall-cartelera",
        title: "Cartelera",
        description:
          "Revisá la programación con anticipación: la oferta varía entre teatro, música y espectáculos infantiles.",
      },
      {
        id: "teatro-nini-marshall-entradas",
        title: "Entradas",
        description:
          "Comprar online te asegura lugar, especialmente en funciones con alta demanda.",
      },
      {
        id: "teatro-nini-marshall-salida-cultural",
        title: "Salida cultural",
        description:
          "Es ideal para cerrar el día con un plan más tranquilo y distinto.",
      },
    ],
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
    longDescription: [
      "El Casino Trilenium es uno de los casinos más grandes de la provincia y está ubicado sobre el Paseo Victorica.",
      "Ofrece tragamonedas, mesas de juego y espectáculos en vivo, acompañados de bares y restaurantes.",
      "Funciona principalmente como plan nocturno y tiene entrada libre.",
      "Es una buena opción para quienes buscan entretenimiento bajo techo o una salida diferente luego de cenar, especialmente en pareja o en grupo.",
    ],
    duration: "1-2h",
    budget: "medio",
    tips: [
      {
        id: "casino-trilenium-documentacion",
        title: "Documentación",
        description: "Llevá DNI, ya que es obligatorio presentarlo para ingresar.",
      },
      {
        id: "casino-trilenium-juego-responsable",
        title: "Juego responsable",
        description:
          "Definí un presupuesto antes de jugar para disfrutar la experiencia sin excesos.",
      },
      {
        id: "casino-trilenium-plan-nocturno",
        title: "Plan nocturno",
        description:
          "Funciona mejor como salida nocturna, especialmente después de cenar por la zona.",
      },
    ],
    zone: "Paseo Victorica",
    tags: ["noche", "pareja", "entretenimiento"],
    lat: -34.4172,
    lng: -58.5769,
    locationType: "entrance",
    coverImage: "images/casino-trilenium.png",
    gallery: [
      "images/casino-trilenium.png",
      "images/casino-trilenium-2.png",
      "images/casino-trilenium-3.png",
    ],
  },

  // =========================
  // DELTA / PASEOS NÁUTICOS
  // =========================
  {
    slug: "paseo-en-catamaran",
    name: "Paseo en catamarán",
    category: "paseos",
    shortDescription: "Recorrido guiado por ríos del Delta.",
    longDescription: [
      "El paseo en catamarán es una alternativa cómoda y guiada para recorrer el Delta sin necesidad de una lancha privada.",
      "Las embarcaciones suelen contar con espacios cubiertos y al aire libre, lo que permite disfrutar del paisaje con mayor confort.",
      "Durante el recorrido se explican aspectos históricos y naturales de la zona, lo que lo convierte en una experiencia más informativa.",
      "Es ideal para quienes quieren conocer el Delta de manera relajada y organizada.",
    ],
    duration: "1-2h",
    budget: "medio",
    zone: "Estación Fluvial",
    tips: [
      {
        id: "paseo-en-catamaran-comodidad",
        title: "Comodidad",
        description:
          "Ideal si buscás un recorrido guiado y cómodo, sin necesidad de organizar una lancha privada.",
      },
      {
        id: "paseo-en-catamaran-espacios",
        title: "Espacios",
        description:
          "Suelen tener sectores cubiertos y al aire libre para elegir según clima y preferencia.",
      },
      {
        id: "paseo-en-catamaran-ubicacion-a-bordo",
        title: "Ubicación a bordo",
        description:
          "Llegar con anticipación te permite elegir un buen lugar (cubierto o al aire libre).",
      },
      {
        id: "paseo-en-catamaran-experiencia",
        title: "Experiencia relajada",
        description:
          "Muy buena opción para parejas o grupos que quieren disfrutar del Delta sin apuro.",
      },
    ],
    tags: ["naturaleza", "pareja", "fotos"],
    lat: -34.4209,
    lng: -58.5795,
    locationType: "entrance",
    coverImage: "images/paseo-en-catamaran.jpg",
    gallery: [
      "images/paseo-en-catamaran.jpg",
      "images/paseo-en-catamaran-2.jpeg",
      "images/paseo-en-catamaran-3.jpg",
    ],
  },

  // =========================
  // NATURALEZA / AIRE LIBRE
  // =========================
  {
    slug: "reserva-natural-rincon-de-milberg",
    name: "Reserva Natural Rincón de Milberg",
    category: "naturaleza",
    shortDescription: "Reserva ecológica con senderos y avistaje de aves.",
    longDescription: [
      "La Reserva Natural Rincón de Milberg es un espacio verde pensado para el contacto directo con la naturaleza.",
      "Cuenta con senderos, áreas de observación y sectores ideales para caminatas tranquilas.",
      "Es un buen plan para desconectar del movimiento del centro de Tigre, observar aves y disfrutar de un entorno más silencioso.",
      "Resulta ideal para visitas de medio día y actividades al aire libre sin exigencia física.",
    ],
    duration: "medio-dia",
    budget: "gratis",
    zone: "Rincón de Milberg",
    tips: [
      {
        id: "reserva-rincon-aves",
        title: "Avistaje de aves",
        description:
          "Buen lugar para observar aves del Delta, especialmente en las primeras horas de la mañana.",
      },
      {
        id: "reserva-rincon-senderos",
        title: "Senderos",
        description:
          "Hay senderos y áreas de observación ideales para una caminata tranquila.",
      },
      {
        id: "reserva-rincon-que-llevar",
        title: "Qué llevar",
        description:
          "Ropa cómoda, calzado adecuado y repelente de insectos para recorrer con tranquilidad.",
      },
      {
        id: "reserva-rincon-plan-ideal",
        title: "Plan ideal",
        description:
          "Perfecta para una visita de medio día, lejos del movimiento del centro.",
      },
    ],
    tags: ["naturaleza", "aire-libre", "tranquilo"],
    lat: -34.39557,
    lng: -58.56721,
    locationType: "entrance",
    coverImage: "images/reserva-rincon.jpeg",
    gallery: [
      "images/reserva-rincon.jpeg",
      "images/reserva-rincon-2.jpg",
      "images/reserva-rincon-3.jpg",
    ],
  },

  {
    slug: "reserva-delta-terra",
    name: "Reserva Natural Delta Terra",
    category: "naturaleza",
    shortDescription: "Reserva privada con senderos y actividades.",
    longDescription: [
      "La Reserva Natural Delta Terra es una reserva privada orientada a la conservación y educación ambiental.",
      "Ofrece senderos guiados y actividades que permiten conocer la flora y fauna característica del Delta.",
      "Al ser un espacio gestionado de forma privada, requiere reserva previa y suele ofrecer experiencias más personalizadas.",
      "Es una buena opción para quienes buscan un contacto más profundo con la naturaleza y propuestas educativas.",
    ],
    duration: "medio-dia",
    budget: "medio",
    tips: [
      {
        id: "reserva-delta-terra-reserva-previa",
        title: "Reserva previa",
        description:
          "Al ser una reserva privada, es necesario reservar con anticipación para asegurar el acceso.",
      },
      {
        id: "reserva-delta-terra-cuidados",
        title: "Qué llevar",
        description:
          "Ropa cómoda, calzado adecuado y repelente. Si vas en verano, sumá protector solar.",
      },
      {
        id: "reserva-delta-terra-actividades",
        title: "Recorridos guiados",
        description:
          "Las visitas suelen incluir senderos guiados y actividades que enriquecen la experiencia.",
      },
      {
        id: "reserva-delta-terra-contacto-naturaleza",
        title: "Contacto con la naturaleza",
        description:
          "Ideal si querés un acercamiento más profundo a la flora y fauna del Delta.",
      },
    ],
    lat: -34.4098,
    lng: -58.5893,
    tags: ["naturaleza", "tranquilo"],
    locationType: "area",
    coverImage: "images/delta-terra.jpg",
    gallery: [
      "images/delta-terra.jpg",
      "images/delta-terra-2.jpg",
      "images/delta-terra-3.jpg",
    ],
  },

  // =========================
  // AVENTURA / ACTIVIDADES
  // =========================
  {
    slug: "euca-tigre",
    name: "Euca Tigre",
    category: "aventura",
    shortDescription: "Circuitos aéreos y tirolesas en los árboles.",
    longDescription: [
      "Euca Tigre es un parque de aventura ubicado en el municipio de Tigre, provincia de Buenos Aires.",
      "Ofrece circuitos aéreos, puentes colgantes y tirolesas montados entre los árboles.",
      "La experiencia se adapta a distintos niveles de dificultad, lo que lo hace accesible para grupos familiares.",
      "Es un buen lugar para quienes buscan diversión fuera del circuito tradicional de paseos.",
    ],
    duration: "1-2h",
    budget: "medio",
    tips: [
      {
        id: "euca-tigre-ropa-calzado",
        title: "Ropa y calzado",
        description:
          "Usá ropa cómoda y calzado cerrado para moverte con seguridad por los circuitos.",
      },
      {
        id: "euca-tigre-actividades",
        title: "Qué incluye",
        description:
          "Circuitos aéreos, puentes colgantes y tirolesas entre los árboles (según nivel).",
      },
      {
        id: "euca-tigre-para-quienes-es",
        title: "Para quiénes es",
        description:
          "Ideal para familias, grupos de amigos y personas que buscan aventura al aire libre.",
      },
      {
        id: "euca-tigre-planificacion",
        title: "Planificación",
        description:
          "Conviene reservar con anticipación, especialmente los fines de semana y vacaciones.",
      },
    ],
    tags: ["aventura", "familia", "aire-libre"],
    lat: -34.4089,
    lng: -58.5866,
    locationType: "entrance",
    coverImage: "images/euca-tigre.webp",
    gallery: [
      "images/euca-tigre.webp",
      "images/euca-tigre-2.webp",
      "images/euca-tigre-3.jpg",
    ],
  },

  {
    slug: "kayak-en-el-delta",
    name: "Kayak en el Delta",
    category: "aventura",
    shortDescription: "Actividad al aire libre para recorrer el Delta en kayak. Ideal si buscás naturaleza y movimiento.",
    longDescription: [
      "El kayak es una excelente manera de explorar el Delta y disfrutar de la naturaleza desde el agua.",
      "Es ideal para quienes disfrutan de actividades al aire libre y no tienen problema con un esfuerzo físico moderado.",
      "Remar por el Delta ofrece una perspectiva distinta del paisaje y permite acceder a zonas más tranquilas.",
    ],
    duration: "1-2h",
    budget: "medio",
    zone: "Delta",
    tips: [
      {
        id: "kayak-delta-ropa",
        title: "Preparación",
        description:
          "Llevá ropa cómoda, traje de baño y una muda por si te mojás.",
      },
      {
        id: "kayak-delta-proteccion",
        title: "Protección",
        description:
          "Usá protector solar y repelente para disfrutar el recorrido sin molestias.",
      },
      {
        id: "kayak-delta-experiencia",
        title: "Nivel de esfuerzo",
        description:
          "Suele ser esfuerzo moderado: ideal si querés actividad física y naturaleza en el mismo plan.",
      },
    ],
    tags: ["aventura", "deporte", "naturaleza"],
    lat: -34.4205,
    lng: -58.5801,
    locationType: "area",
    coverImage: "images/kayak-delta.jpg",
    gallery: [
      "images/kayak-delta.jpg",
      "images/kayak-delta-2.jpg",
      "images/kayak-delta-3.jpg",
    ],
  },

  // =========================
  // GASTRONOMÍA / RELAX
  // =========================
  {
    slug: "restaurantes-sobre-el-rio",
    name: "Restaurantes sobre el río",
    category: "gastronomia",
    shortDescription: "Restaurantes con vista al río, ideales para almorzar, cenar o ver el atardecer.",
    longDescription: [
      "La zona de restaurantes sobre el río reúne distintas propuestas gastronómicas con vistas abiertas al agua.",
      "Comer frente al río es una de las experiencias más buscadas por quienes visitan Tigre.",
      "Hay opciones para distintos presupuestos y estilos: desde restaurantes más formales hasta lugares informales para almorzar o cenar sin apuro.",
      "Es un plan ideal para combinar con una caminata por el Paseo Victorica.",
    ],
    duration: "1-2h",
    budget: "medio",
    tips: [
      {
        id: "restaurantes-rio-reservas",
        title: "Reservas",
        description:
          "Los fines de semana conviene reservar con anticipación, ya que es una de las zonas más concurridas.",
      },
      {
        id: "restaurantes-rio-mejor-horario",
        title: "Mejor horario",
        description:
          "El atardecer suele ser el momento ideal para disfrutar de las vistas al río.",
      },
      {
        id: "restaurantes-rio-precio",
        title: "Presupuesto",
        description:
          "Hay opciones para diferentes presupuestos: revisá cartas/menús antes si querés ajustar gastos.",
      },
      {
        id: "restaurantes-rio-plan-combinado",
        title: "Plan combinado",
        description:
          "Perfecto para sumar después de una caminata por el Paseo Victorica.",
      },
    ],
    zone: "Paseo Victorica",
    tags: ["comida", "pareja", "relax"],
    lat: -34.4151,
    lng: -58.5839,
    locationType: "area",
    coverImage: "images/restaurante.webp",
    gallery: [
      "images/restaurante.webp",
      "images/restaurante-2.webp",
      "images/restaurante-3.webp",
    ],
  },

  {
    slug: "spa-y-relax-en-tigre",
    name: "Spa y relax en Tigre",
    category: "relax",
    shortDescription: "Spas y circuitos de relax. Ideal para bajar el ritmo y cerrar el día con calma.",
    longDescription: [
      "Las propuestas de spa y relax en Tigre están pensadas para quienes buscan bajar el ritmo y disfrutar de un día de descanso.",
      "Incluyen masajes, circuitos de agua y tratamientos de bienestar.",
      "Muchos spas se encuentran en entornos naturales o con vista al río, lo que refuerza la sensación de desconexión.",
      "Es una opción ideal para escapadas en pareja o para cerrar el viaje con un plan tranquilo.",
    ],
    duration: "medio-dia",
    budget: "alto",
    zone: "Centro / Delta",
    tips: [
      {
        id: "spa-reservas-anticipadas",
        title: "Reservas anticipadas",
        description:
          "Reservá con tiempo, especialmente para fines de semana y fechas especiales.",
      },
      {
        id: "spa-que-llevar",
        title: "Qué llevar",
        description:
          "Algunos lugares requieren traje de baño y toalla. Conviene consultarlo antes.",
      },
      {
        id: "spa-precio",
        title: "Presupuesto",
        description:
          "Hay experiencias de distintos precios (masajes sueltos vs. circuitos completos). Mirá opciones antes de elegir.",
      },
      {
        id: "spa-tipo-de-plan",
        title: "Tipo de plan",
        description:
          "Ideal para parejas o para cerrar el viaje con una experiencia de descanso y desconexión.",
      },
    ],
    tags: ["relax", "pareja", "tranquilo"],
    lat: -34.4169,
    lng: -58.5823,
    locationType: "area",
    coverImage: "images/spa.jpg",
    gallery: ["images/spa.jpg", "images/spa-2.jpeg", "images/spa-3.webp"],
  },
];
