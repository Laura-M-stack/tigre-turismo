import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import LazyPlaceMap from "../components/place/LazyPlaceMap";
import PlaceCard from "../components/place/PlaceCard";
import SaveButton from "../components/place/SaveButton";
import { ButtonAnchor, ButtonLink } from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import Photo, { PhotoCredit } from "../components/ui/Photo";
import { places } from "../data/places";
import { BUDGET_LONG_LABEL, CATEGORY_LABEL, DURATION_LABEL, LOCATION_LABEL } from "../lib/labels";
import { googleMapsDirectionsUrl } from "../lib/maps";
import { getPhoto, type Photo as PhotoData } from "../lib/photos";
import { setSEO } from "../lib/seo";
import { clearPlaceStructuredData, setPlaceStructuredData } from "../lib/structuredData";

import NotFound from "./NotFound";

const Lightbox = lazy(() => import("../components/ui/Lightbox"));

export default function LugarDetalle() {
  const { slug } = useParams();
  const place = useMemo(() => places.find((p) => p.slug === slug), [slug]);
  const [lb, setLb] = useState<number | null>(null);

  useEffect(() => {
    if (!place) return;
    setSEO(place.name, place.shortDescription);
    setPlaceStructuredData({
      name: place.name,
      description: place.shortDescription,
      lat: place.lat,
      lng: place.lng,
    });
    return clearPlaceStructuredData;
  }, [place]);

  const gallery = useMemo(
    () =>
      (place?.photos ?? [])
        .map((k) => getPhoto(k))
        .filter((p): p is PhotoData => p !== null)
        .map((photo, i) => ({ photo, alt: `${place!.name}, foto ${i + 1}` })),
    [place],
  );

  const related = useMemo(
    () => (place ? places.filter((p) => p.category === place.category && p.slug !== place.slug).slice(0, 3) : []),
    [place],
  );

  const close = useCallback(() => setLb(null), []);
  const prev = useCallback(() => setLb((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length)), [gallery.length]);
  const next = useCallback(() => setLb((i) => (i === null ? i : (i + 1) % gallery.length)), [gallery.length]);

  if (!place) return <NotFound />;

  const hasCoords = Number.isFinite(place.lat) && Number.isFinite(place.lng);
  const directions = hasCoords ? googleMapsDirectionsUrl(place.lat!, place.lng!) : null;

  const facts = [
    { label: "Duración", value: DURATION_LABEL[place.duration] },
    { label: "Presupuesto", value: BUDGET_LONG_LABEL[place.budget] },
    place.zone ? { label: "Zona", value: place.zone } : null,
    place.locationType ? { label: "Ubicación", value: LOCATION_LABEL[place.locationType] } : null,
  ].filter((f) => f !== null);

  return (
    <article>
      {/* HERO: texto + foto principal con crédito */}
      <header className="page-container grid gap-8 pb-10 pt-8 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-12">
        <div>
          <nav aria-label="Migas de pan" className="text-sm text-ink-soft">
            <Link to="/que-hacer" className="inline-flex items-center gap-1 hover:text-ink">
              <Icon name="arrowLeft" /> Qué hacer
            </Link>
            <span aria-hidden="true"> / </span>
            <span>{CATEGORY_LABEL[place.category]}</span>
          </nav>
          <h1 className="mt-4 text-4xl leading-tight sm:text-5xl">{place.name}</h1>
          <p className="mt-4 text-lg text-ink-soft">{place.shortDescription}</p>

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-ink/10 py-4 text-[15px]">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-xs uppercase tracking-[0.12em] text-ink-soft">{f.label}</dt>
                <dd className="mt-0.5 font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            <SaveButton slug={place.slug} name={place.name} variant="large" />
            {directions ? (
              <ButtonAnchor href={directions} variant="secondary" size="lg">
                <Icon name="pin" /> Cómo llegar
              </ButtonAnchor>
            ) : null}
          </div>
        </div>

        {gallery.length ? (
          <figure>
            <button
              type="button"
              onClick={() => setLb(0)}
              className="block w-full cursor-zoom-in"
              aria-label={`Ver fotos de ${place.name} en grande`}
            >
              <Photo
                photoKey={place.photos[0]}
                alt={place.name}
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="aspect-[4/3] rounded-[24px]"
                priority
              />
            </button>
            <figcaption className="mt-2 text-right text-xs text-ink-soft">
              <PhotoCredit photo={gallery[0].photo} />
            </figcaption>
          </figure>
        ) : (
          <Photo
            alt={`${place.name}: todavía no hay una foto con licencia libre de este lugar`}
            fallbackEyebrow={CATEGORY_LABEL[place.category]}
            fallbackTitle={place.name}
            className="aspect-[4/3] rounded-[24px]"
          />
        )}
      </header>

      <div className="page-container grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <section aria-labelledby="sobre">
            <h2 id="sobre" className="text-3xl">Sobre este lugar</h2>
            <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-ink/90">
              {place.longDescription.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {gallery.length > 1 ? (
            <section aria-labelledby="fotos" className="mt-12">
              <h2 id="fotos" className="text-3xl">Fotos</h2>
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {gallery.map((g, i) => (
                  <li key={g.photo.key}>
                    <button
                      type="button"
                      onClick={() => setLb(i)}
                      className="block w-full cursor-zoom-in"
                      aria-label={`Abrir foto ${i + 1} de ${gallery.length}`}
                    >
                      <Photo photoKey={g.photo.key} alt={g.alt} sizes="(min-width: 640px) 240px, 50vw" className="aspect-square rounded-xl" />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <aside aria-labelledby="tips" className="lg:pt-1">
          <div className="rounded-2xl bg-white p-6 ring-1 ring-ink/10">
            <h2 id="tips" className="text-2xl">Tips para tu visita</h2>
            <ul className="mt-4 divide-y divide-ink/10">
              {place.tips.map((t) => (
                <li key={t.id} className="py-4 first:pt-0 last:pb-0">
                  <h3 className="font-sans text-[15px] font-semibold text-river-800">{t.title}</h3>
                  <p className="mt-1 text-[15px] text-ink-soft">{t.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 flex gap-2 text-sm text-ink-soft">
            <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0" />
            Horarios y precios cambian seguido: confirmalos en el sitio oficial del lugar antes de ir.
          </p>
        </aside>
      </div>

      {hasCoords ? (
        <section aria-labelledby="ubicacion" className="page-container mt-14">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 id="ubicacion" className="text-3xl">Ubicación</h2>
            {place.locationType === "area" ? (
              <p className="text-sm text-ink-soft">Es un área amplia: el punto es aproximado.</p>
            ) : null}
          </div>
          <div className="mt-4">
            <LazyPlaceMap places={[place]} height={380} showDetailLink={false} numbered={false} />
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section aria-labelledby="relacionados" className="page-container mt-16">
          <h2 id="relacionados" className="text-3xl">Más de {CATEGORY_LABEL[place.category].toLowerCase()}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PlaceCard key={p.slug} place={p} />
            ))}
          </div>
        </section>
      ) : null}

      <div className="page-container mt-10">
        <ButtonLink to="/itinerario" variant="ghost">
          Ver mi itinerario <Icon name="arrowRight" />
        </ButtonLink>
      </div>

      {lb !== null && gallery.length ? (
        <Suspense fallback={null}>
          <Lightbox items={gallery} index={lb} onClose={close} onPrev={prev} onNext={next} />
        </Suspense>
      ) : null}
    </article>
  );
}
