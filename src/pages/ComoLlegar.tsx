import { useEffect } from "react";

import { ButtonAnchor, ButtonLink } from "../components/ui/Button";
import Icon, { type IconName } from "../components/ui/Icon";
import Photo from "../components/ui/Photo";
import { googleMapsSearchUrl } from "../lib/maps";
import { setSEO } from "../lib/seo";

const TRENES_ARGENTINOS = "https://www.argentina.gob.ar/transporte/trenes-argentinos";
const INFO_MITRE = "https://www.argentina.gob.ar/transporte/trenes-argentinos/areametropolitana/retiro-tigre";

type Option = { icon: IconName; title: string; tag: string; text: string; link?: { href: string; label: string } };

const OPTIONS: Option[] = [
  {
    icon: "train",
    title: "Tren Mitre (Retiro – Tigre)",
    tag: "Desde CABA",
    text: "La forma más directa desde el centro: sale de Retiro y termina en la estación Tigre, a pocas cuadras del río y de la Estación Fluvial.",
    link: { href: INFO_MITRE, label: "Horarios oficiales" },
  },
  {
    icon: "train",
    title: "Tren de la Costa (Maipú – Delta)",
    tag: "Paseo en sí mismo",
    text: "Recorre la costa en unos 30 minutos y termina en la estación Delta, al lado del Parque de la Costa. Combina con el Mitre en la estación Maipú (Olivos) por una pasarela.",
    link: { href: TRENES_ARGENTINOS, label: "Estado del servicio" },
  },
  {
    icon: "bus",
    title: "Colectivo",
    tag: "Según tu zona",
    text: "Hay varias líneas que llegan al centro de Tigre. La combinación depende de dónde salgas: buscala en Maps o en la app de transporte que uses.",
    link: { href: googleMapsSearchUrl("Estación Fluvial de Tigre"), label: "Ver rutas en Maps" },
  },
  {
    icon: "car",
    title: "Auto",
    tag: "Ida y vuelta flexible",
    text: "Cómodo si vas con chicos o querés seguir viaje. Los fines de semana el estacionamiento cerca del puerto se llena: llegá temprano.",
  },
];

const TIPS = [
  { title: "Elegí un punto base", text: "Para una primera vez: Estación Fluvial, Puerto de Frutos y Paseo Victorica quedan a distancia caminable." },
  { title: "Evitá el pico", text: "Sábados y domingos entre las 12 y las 17 es cuando más gente hay. Temprano se disfruta mucho más." },
  { title: "Al Delta, por agua", text: "Las lanchas colectivas y los paseos salen de la Estación Fluvial. Fijate el horario de regreso antes de subir." },
];

export default function ComoLlegar() {
  useEffect(() => {
    setSEO("Cómo llegar a Tigre", "Tren Mitre, Tren de la Costa, colectivo o auto: cómo llegar a Tigre y moverte por la zona del río.");
  }, []);

  return (
    <>
      <header className="page-container grid gap-8 pb-10 pt-10 md:grid-cols-[1fr_minmax(0,460px)] md:items-center">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-brick-600">Cómo llegar</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">Llegar es la parte fácil</h1>
          <p className="mt-3 max-w-xl text-lg text-ink-soft">
            Tigre está unos 30 km al norte de la Ciudad de Buenos Aires. Una vez ahí, lo principal se recorre
            caminando junto al río.
          </p>
        </div>
        <Photo
          photoKey="hero-como-llegar"
          alt="Estación Delta del Tren de la Costa, en Tigre"
          sizes="460px"
          className="aspect-[16/10] rounded-2xl"
          showCredit
          priority
        />
      </header>

      <div className="page-container">
        <aside className="flex gap-3 rounded-2xl bg-brick-50 p-5 text-[15px] ring-1 ring-brick-600/20">
          <Icon name="info" className="mt-0.5 h-5 w-5 shrink-0 text-brick-700" />
          <p>
            <strong className="font-semibold">Antes de salir, revisá el estado del servicio.</strong> Los trenes
            pueden tener obras o cambios de horario, y esta guía no se actualiza en tiempo real.{" "}
            <a href={TRENES_ARGENTINOS} target="_blank" rel="noopener noreferrer" className="font-medium text-brick-700 underline underline-offset-2">
              Ver Trenes Argentinos
            </a>
            .
          </p>
        </aside>

        <section aria-labelledby="opciones" className="mt-12">
          <h2 id="opciones" className="text-3xl">Opciones</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {OPTIONS.map((o) => (
              <li key={o.title} className="flex flex-col rounded-2xl bg-white p-6 ring-1 ring-ink/10">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-river-50 text-river-800">
                    <Icon name={o.icon} className="h-5 w-5" />
                  </span>
                  <span className="rounded-full bg-cream-200 px-3 py-1 text-xs font-medium text-ink-soft">{o.tag}</span>
                </div>
                <h3 className="mt-4 text-xl">{o.title}</h3>
                <p className="mt-2 flex-1 text-[15px] text-ink-soft">{o.text}</p>
                {o.link ? (
                  <ButtonAnchor href={o.link.href} variant="secondary" size="sm" className="mt-4 self-start">
                    {o.link.label} <Icon name="external" />
                  </ButtonAnchor>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="mapa" className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            <h2 id="mapa" className="text-3xl">La zona del río</h2>
            <p className="mt-2 text-ink-soft">Centro de Tigre, Estación Fluvial y Puerto de Frutos.</p>
            <iframe
              title="Mapa del centro de Tigre (OpenStreetMap)"
              loading="lazy"
              className="mt-4 h-[420px] w-full rounded-2xl ring-1 ring-ink/10"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-58.605%2C-34.435%2C-58.560%2C-34.405&layer=mapnik&marker=-34.420%2C-58.575"
            />
          </div>
          <div className="lg:pt-14">
            <Photo
              photoKey="estacion-fluvial"
              alt="Estación Fluvial de Tigre sobre el río Tigre"
              sizes="340px"
              className="aspect-[4/3] rounded-2xl"
              showCredit
            />
            <p className="mt-3 text-sm text-ink-soft">
              La Estación Fluvial es el punto de partida de lanchas colectivas y paseos por el Delta.
            </p>
          </div>
        </section>

        <section aria-labelledby="tips" className="mt-14">
          <h2 id="tips" className="text-3xl">Para moverte mejor</h2>
          <ol className="mt-6 grid gap-6 md:grid-cols-3">
            {TIPS.map((t, i) => (
              <li key={t.title} className="border-t-2 border-river-800 pt-4">
                <span className="text-sm font-semibold text-brick-600">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-1 text-xl">{t.title}</h3>
                <p className="mt-2 text-[15px] text-ink-soft">{t.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-12 flex flex-wrap gap-3">
          <ButtonLink to="/que-hacer">Ver qué hacer</ButtonLink>
          <ButtonLink to="/itinerario" variant="secondary">Mi itinerario</ButtonLink>
        </div>
      </div>
    </>
  );
}
