import { useEffect } from "react";
import { Link } from "react-router-dom";

import PlaceCard from "../components/place/PlaceCard";
import AppImage from "../components/ui/AppImage";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { places } from "../data/places";

import { setSEO } from "../lib/seo";

export default function Home() {
  useEffect(() => {
    setSEO(
      "Tigre Turismo — Descubrí qué hacer y armá tu plan",
      "Guía simple para visitar Tigre: paseos, naturaleza y actividades para armar tu itinerario sin perder tiempo.",
    );
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border bg-white/70 shadow-sm backdrop-blur">
        <AppImage
          src="images/tigre-delta.jpg"
          alt="Tigre, Buenos Aires"
          className="h-56 w-full object-cover md:h-120"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/55 via-black/25 to-transparent" />
        <div className="absolute inset-0 flex items-start md:items-end-safe">
          <div className="p-6 md:p-10 text-white">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Descubrí Tigre, Buenos Aires
            </h1>
            <p className="mt-3 max-w-xl text-white/90 text-base md:text-lg">
              Naturaleza, río y paseos a pocos minutos de la ciudad.
              Ideas claras para armar tu plan sin perder tiempo.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/que-hacer">
                <Button>Explorar qué hacer</Button>
              </Link>
              <Link to="/itinerario">
                <Button variant="ghost">Armar mi itinerario</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FRASE EMOCIONAL */}
      <p className="mt-10 text-center text-slate-600 italic">
        Un día tranquilo, un fin de semana distinto o una escapada improvisada.
      </p>

      {/* DESTACADOS */}
      <section className="mt-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Imperdibles en Tigre</h2>
          <Link to="/que-hacer" className="text-sm underline text-slate-600">
            Ver todos
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {places
            .filter((p) =>
              [
                "paseo-victorica",
                "parque-de-la-costa",
                "museo-de-arte-tigre",
                "paseo-en-catamaran",
              ].includes(p.slug),
            )
            .map((place) => (
              <PlaceCard key={place.slug} place={place} />
            ))}
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <Card>
          <h2 className="font-semibold text-lg">🧭 Elegí tu plan</h2>
          <p className="mt-2 text-sm text-slate-600">
            Familia, pareja, lluvia, naturaleza o aventura.
          </p>
        </Card>

        <Card>
          <h2 className="font-semibold text-lg">⭐ Guardá favoritos</h2>
          <p className="mt-2 text-sm text-slate-600">
            Armá tu itinerario y ordenalo a tu ritmo.
          </p>
        </Card>

        <Card>
          <h2 className="font-semibold text-lg">🗺️ Ubicate fácil</h2>
          <p className="mt-2 text-sm text-slate-600">
            Mapas claros y accesos reales a cada lugar.
          </p>
        </Card>
      </section>
    </div>
  );
}
