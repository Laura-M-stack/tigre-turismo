import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import AppImage from "../components/ui/AppImage";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { places } from "../data/places";
import { setSEO } from "../lib/seo";

export default function Home() {
  useEffect(() => {
    setSEO(
      "Tigre Turismo — Planificá tu visita",
      "Ideas para recorrer Tigre: imperdibles, actividades, mapas y un itinerario guardado.",
    );
  }, []);

  const featured = useMemo(() => {
    const ids = new Set([
      "paseo-victorica",
      "museo-de-arte-tigre",
      "paseo-en-lancha-por-el-delta",
      "puerto-de-frutos",
    ]);
    return places.filter((p) => ids.has(p.slug)).slice(0, 4);
  }, []);

  return (
    <div className="pb-14">
      {/* HERO full-bleed */}
      <section id="top" className="full-bleed relative overflow-hidden">
        <AppImage
          src="images/tigre-hero.jpg"
          alt="Tigre, Buenos Aires"
          className="h-[62vh] w-full object-cover md:h-[72vh]"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/35 to-black/10" />

        {/* Centro vertical + horizontal */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="page-container w-full">
            <div className="mx-auto max-w-3xl text-center text-white">
              <p className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-md font-medium backdrop-blur">
                🌿 Delta • 🛶 Paseos • 🏛️ Museos
              </p>

              <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
                Tigre, Buenos Aires
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-base text-white/90 md:text-xl">
                Armá un plan en minutos: explorá lugares, guardá favoritos y creá tu itinerario.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link to="/que-hacer">
                  <Button>Explorar qué hacer</Button>
                </Link>
                <Link to="/itinerario">
                  <Button variant="ghost">Ver mi itinerario</Button>
                </Link>
                <Link to="/como-llegar">
                  <Button variant="ghost">Cómo llegar</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENIDO */}
      <div className="page-container">
        {/* AVISO VERANO (Mitre)
        <section className="mt-8">
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  🚧 Aviso: no te frenes por el tren
                </h2>
                <p className="mt-1 text-lg text-slate-700">
                  Si el <b>Tren Mitre (Retiro–Tigre)</b> no está funcionando, o funciona con un recorrido reducido,igual podés venir:
                  <b> Tren de la Costa</b>, <b>colectivo</b> o <b>auto</b>.
                </p>
                <p className="mt-1 text-md text-slate-600">
                  Te dejamos opciones claras y un mapa rápido para planificar.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link to="/como-llegar">
                  <Button>Ver opciones para llegar</Button>
                </Link>
                <Link to="/que-hacer">
                  <Button variant="ghost">Ver lugares</Button>
                </Link>
              </div>
            </div>
          </div>
        </section> */}

        {/* IMPERDIBLES */}
        <div id="imperdibles" className="mt-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Imperdibles para empezar</h2>
            <p className="mt-1 text-lg text-slate-600">
              Cuatro ideas seguras si es tu primera vez (o si tenés poco tiempo).
            </p>
          </div>
          <Link className="text-lg font-medium text-slate-900 underline" to="/que-hacer">
            Ver todos
          </Link>
        </div>

        <section className="mt-5 grid gap-4 sm:grid-cols-2">
          {featured.map((p) => (
            <Link key={p.slug} to={`/lugares/${p.slug}`} className="block">
              <Card className="group relative overflow-hidden p-0">
                <AppImage
                  src={p.coverImage}
                  alt={p.name}
                  className="h-65 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-md font-medium text-white/85">
                    {p.category} • {p.duration} • {p.budget}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-white">{p.name}</h3>
                  <p className="mt-1 line-clamp-2 text-md text-white/90">
                    {p.shortDescription}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </section>

        {/* CÓMO FUNCIONA */}
        <section id="como-funciona" className="mt-10 grid gap-4 md:grid-cols-3">
          <Card className="p-6">
            <h3 className="text-base font-semibold">🧭 Elegí tu plan</h3>
            <p className="mt-2 text-lg text-slate-600">
              Familia, pareja, lluvia, naturaleza o aventura: filtrá y decidí rápido.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-base font-semibold">⭐ Guardá favoritos</h3>
            <p className="mt-2 text-lg text-slate-600">
              Armá tu lista y ordenala: tu itinerario queda guardado en el navegador.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-base font-semibold">🗺️ Movete fácil</h3>
            <p className="mt-2 text-lg text-slate-600">
              Abrí indicaciones en Maps y ubicá accesos vs. zonas aproximadas.
            </p>
          </Card>
        </section>
      </div>
    </div>
  );
}
