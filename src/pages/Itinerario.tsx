import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import LazyPlaceMap from "../components/place/LazyPlaceMap";
import Button, { ButtonAnchor, ButtonLink } from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import Photo from "../components/ui/Photo";
import { places } from "../data/places";
import { useItinerary } from "../hooks/useItinerary";
import { copyText } from "../lib/clipboard";
import { estimateTotalMinutes, formatMinutes, planSuggestion } from "../lib/itinerary";
import { CATEGORY_LABEL, metaLine } from "../lib/labels";
import { googleMapsDirectionsUrl } from "../lib/maps";
import { setSEO } from "../lib/seo";
import { buildItineraryShareText } from "../lib/share";
import type { Place } from "../types/place";

const BY_SLUG = new Map(places.map((p) => [p.slug, p] as const));

export default function Itinerario() {
  const { slugs, move, remove } = useItinerary();
  const [copied, setCopied] = useState<"ok" | "error" | null>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => setSEO("Mi itinerario", "Ordená los lugares que guardaste y estimá cuánto tiempo te lleva el día."), []);

  const list = useMemo(() => slugs.map((s) => BY_SLUG.get(s)).filter((p): p is Place => !!p), [slugs]);
  const total = estimateTotalMinutes(list);

  const copy = async () => {
    const ok = await copyText(buildItineraryShareText(list, window.location.href));
    setCopied(ok ? "ok" : "error");
    window.setTimeout(() => setCopied(null), 2000);
  };

  if (!list.length) {
    return (
      <div className="page-container py-16">
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-brick-600">Mi itinerario</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">Tu día todavía está en blanco</h1>
        <p className="mt-3 max-w-lg text-lg text-ink-soft">
          Tocá <strong className="font-medium text-ink">Agregar</strong> (o el corazón) en cualquier lugar y
          aparece acá, en el orden que quieras. Se guarda en este navegador.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink to="/que-hacer">Elegir lugares</ButtonLink>
          <ButtonLink to="/que-hacer?plan=bajo" variant="secondary">
            Ideas gastando poco
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container pt-10">
      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-brick-600">Mi itinerario</p>
          <h1 className="mt-3 text-4xl sm:text-5xl">Tu día en Tigre</h1>
          <p className="mt-3 text-lg text-ink-soft">
            {list.length} {list.length === 1 ? "lugar" : "lugares"} · {formatMinutes(total)} de actividades ·{" "}
            {planSuggestion(total)}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button onClick={copy}>
            <Icon name={copied === "ok" ? "check" : "copy"} />
            {copied === "ok" ? "Copiado" : copied === "error" ? "No se pudo copiar" : "Copiar plan"}
          </Button>
          <ButtonLink to="/que-hacer" variant="secondary">
            <Icon name="plus" /> Sumar lugares
          </ButtonLink>
        </div>
      </header>
      <p className="sr-only" aria-live="polite">
        {copied === "ok" ? "Plan copiado al portapapeles" : ""}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
        <ol className="grid gap-3" aria-label="Lugares en orden de visita">
          {list.map((p, i) => (
            <li
              key={p.slug}
              onMouseEnter={() => setActive(p.slug)}
              onMouseLeave={() => setActive(null)}
              className={`flex gap-4 rounded-2xl bg-white p-3 ring-1 transition ${
                active === p.slug ? "ring-2 ring-brick-600" : "ring-ink/10"
              }`}
            >
              <div className="relative shrink-0">
                <Photo
                  photoKey={p.photos[0]}
                  alt=""
                  fallbackEyebrow={CATEGORY_LABEL[p.category]}
                  sizes="140px"
                  className="h-24 w-24 rounded-xl sm:h-28 sm:w-32"
                />
                <span
                  aria-hidden="true"
                  className="absolute -left-1.5 -top-1.5 grid h-7 w-7 place-items-center rounded-full bg-river-800 text-xs font-semibold text-white ring-2 ring-white"
                >
                  {i + 1}
                </span>
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-[13px] font-medium text-river-700">{metaLine(p)}</p>
                <h2 className="mt-0.5 font-display text-lg leading-snug">
                  <Link to={`/lugares/${p.slug}`} className="hover:text-river-800">
                    <span className="sr-only">Parada {i + 1}: </span>
                    {p.name}
                  </Link>
                </h2>
                <p className="mt-1 line-clamp-1 text-sm text-ink-soft">{p.shortDescription}</p>
                <div className="mt-auto flex flex-wrap items-center gap-1 pt-2">
                  {Number.isFinite(p.lat) && Number.isFinite(p.lng) ? (
                    <ButtonAnchor href={googleMapsDirectionsUrl(p.lat!, p.lng!)} variant="ghost" size="sm">
                      <Icon name="pin" /> Cómo llegar
                    </ButtonAnchor>
                  ) : null}
                  <span className="ml-auto flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-9 px-0 ring-1 ring-ink/10"
                      onClick={() => move(i, -1)}
                      disabled={i === 0}
                      aria-label={`Subir ${p.name}`}
                    >
                      <Icon name="up" className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-9 px-0 ring-1 ring-ink/10"
                      onClick={() => move(i, 1)}
                      disabled={i === list.length - 1}
                      aria-label={`Bajar ${p.name}`}
                    >
                      <Icon name="down" className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-9 px-0 text-brick-700 ring-1 ring-brick-600/20 hover:bg-brick-50"
                      onClick={() => remove(p.slug)}
                      aria-label={`Quitar ${p.name} del itinerario`}
                    >
                      <Icon name="x" className="h-5 w-5" />
                    </Button>
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="lg:sticky lg:top-20 lg:h-fit">
          <LazyPlaceMap places={list} height={420} activeSlug={active} onActivate={setActive} />
          <p className="mt-3 flex gap-2 text-sm text-ink-soft">
            <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0" />
            La estimación cuenta solo las actividades: sumale traslados, filas y pausas para comer.
          </p>
        </div>
      </div>
    </div>
  );
}
