import { useEffect } from "react";

import AppImage from "../components/ui/AppImage";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Tag from "../components/ui/Tag";
import { setSEO } from "../lib/seo";

const GMAPS_TIGRE =
  "https://www.google.com/maps/search/?api=1&query=Tigre%2C%20Buenos%20Aires";
const GMAPS_PUERTO_FRUTOS =
  "https://www.google.com/maps/search/?api=1&query=Puerto%20de%20Frutos%2C%20Tigre";
const GMAPS_ESTACION_TIGRE =
  "https://www.google.com/maps/search/?api=1&query=Estaci%C3%B3n%20Tigre%2C%20Buenos%20Aires";

const INFO_MITRE = "https://www.argentina.gob.ar/transporte/trenes-argentinos/areametropolitana/retiro-tigre";
const INFO_COSTA = "https://www.trendelacosta.com.ar";

export default function ComoLlegar() {
  useEffect(() => {
    setSEO(
      "Cómo llegar a Tigre — Tigre Turismo",
      "Opciones para llegar a Tigre en verano: Tren de la Costa, colectivo, auto y tips para moverte por la zona turística.",
    );
  }, []);

  return (
    <div className="pb-14">
      {/* HERO full-bleed */}
      <section className="full-bleed relative overflow-hidden">
        <AppImage
          src="images/como-llegar-hero.png"
          alt="Cómo llegar a Tigre"
          className="h-[62vh] w-full object-cover md:h-[72vh]"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/35 to-black/10" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="page-container w-full">
            <div className="mx-auto max-w-3xl text-center text-white">
              <p className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-md font-medium backdrop-blur">
                🚆 Tren de la Costa • 🚌 Colectivo • 🚗 Auto • 🛶 Delta
              </p>

              <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
                Cómo llegar a Tigre
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-base text-white/90 md:text-xl">
                Llegá fácil y movete a pie entre Puerto de Frutos, Paseo Victorica y la Estación Fluvial.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <a href={GMAPS_TIGRE} target="_blank" rel="noreferrer">
                  <Button>Abrir Tigre en Maps</Button>
                </a>
                <a href={GMAPS_PUERTO_FRUTOS} target="_blank" rel="noreferrer">
                  <Button variant="ghost">Puerto de Frutos</Button>
                </a>
                <a href={GMAPS_ESTACION_TIGRE} target="_blank" rel="noreferrer">
                  <Button variant="ghost">Estación Tigre</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-container">
        {/* ALERTA SERVICIO */}
        <section className="mt-8">
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  🚧 Aviso importante (enero–febrero)
                </h2>
                <p className="mt-2 text-lg text-slate-700">
                  Si pensabas venir en el <b>Tren Mitre (Retiro–Tigre)</b>, durante enero y febrero puede no estar disponible.
                  Para venir igual, te conviene elegir una de estas alternativas: <b>Tren de la Costa</b>, <b>colectivo</b> o <b>auto</b>.
                </p>
                <p className="mt-2 text-md text-slate-600">
                  El <b>Tren de la Costa</b> sí funciona: es una opción linda y turística para llegar desde zona norte.
                </p>
              </div>

              <div className="flex gap-2">
                <Tag>Verano</Tag>
                <Tag>Plan alternativo</Tag>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <a href={INFO_MITRE} target="_blank" rel="noreferrer">
                <Button variant="ghost">Info oficial (Mitre)</Button>
              </a>
              <a href={INFO_COSTA} target="_blank" rel="noreferrer">
                <Button variant="ghost">Info oficial (Tren de la Costa)</Button>
              </a>
            </div>
          </div>
        </section>

        {/* Opciones */}
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <Card className="lg:col-span-2 overflow-hidden p-0">
            <div className="flex items-center justify-between gap-3 border-b bg-white/70 px-5 py-4">
              <div>
                <h2 className="text-base font-semibold">Mapa rápido</h2>
                <p className="mt-0.5 text-lg text-slate-600">
                  Centro + puerto (ideal para primera visita).
                </p>
              </div>
              <div className="flex gap-2">
                <Tag>Centro</Tag>
                <Tag>Puerto</Tag>
              </div>
            </div>

            <iframe
              title="Mapa de Tigre"
              className="h-105 w-full md:h-130"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-58.605%2C-34.435%2C-58.560%2C-34.405&layer=mapnik&marker=-34.420%2C-58.575"
            />
          </Card>

          <div className="grid gap-4">
            <Card className="p-6">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold">🚆 Tren de la Costa</h2>
                <Tag>Turístico</Tag>
              </div>
              <p className="mt-2 text-lg text-slate-600">
                Ideal si venís desde zona norte y querés un viaje con vistas. En Tigre te deja muy cerca del paseo.
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold">🚌 Colectivo</h2>
                <Tag>Flexible</Tag>
              </div>
              <p className="mt-2 text-lg text-slate-600">
                Práctico si te queda mejor por tu zona. Usá Maps para ver la mejor combinación desde tu punto de partida.
              </p>
              <div className="mt-4">
                <a href={GMAPS_TIGRE} target="_blank" rel="noreferrer">
                  <Button variant="ghost">Ver rutas en Maps</Button>
                </a>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold">🚗 Auto</h2>
                <Tag>Directo</Tag>
              </div>
              <p className="mt-2 text-lg text-slate-600">
                Cómodo para ir y volver cuando quieras. Tip: llegá temprano para estacionar cerca del puerto/centro.
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold">🚆 Tren Mitre (Retiro–Tigre)</h2>
                <Tag>Revisar estado</Tag>
              </div>
              <p className="mt-2 text-lg text-slate-600">
                Cuando funciona normal, es la forma más simple desde CABA. En verano, revisá el estado antes de salir.
              </p>
              <div className="mt-4">
                <a href={INFO_MITRE} target="_blank" rel="noreferrer">
                  <Button variant="ghost">Ver info oficial</Button>
                </a>
              </div>
            </Card>
          </div>
        </div>

        <section className="mt-10">
          <div className="mb-3">
            <h2 className="text-xl font-semibold">Tips para moverte mejor</h2>
            <p className="mt-1 text-lg text-slate-600">
              Pequeños ajustes que te ahorran tiempo (y caminata innecesaria).
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="p-6">
              <h3 className="text-base font-semibold">🗺️ Elegí un “punto base”</h3>
              <p className="mt-2 text-lg text-slate-600">
                Para primera vez: Puerto de Frutos + Paseo Victorica + zona de museos.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-base font-semibold">⏰ Evitá picos</h3>
              <p className="mt-2 text-lg text-slate-600">
                Si podés, llegá temprano o más tarde. Los fines de semana se llena.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-base font-semibold">📍 Acceso vs zona</h3>
              <p className="mt-2 text-lg text-slate-600">
                “Acceso principal” es el punto exacto. “Zona aproximada” es para lugares amplios.
              </p>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
