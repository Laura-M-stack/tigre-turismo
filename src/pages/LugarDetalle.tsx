import { motion } from "framer-motion";
import { Suspense, lazy, useEffect, useMemo, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";

import AppImage from "../components/ui/AppImage";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Tag from "../components/ui/Tag";
import { places } from "../data/places";
import { googleMapsDirectionsUrl } from "../lib/maps";
import { setSEO } from "../lib/seo";
import { getFavs, toggleFav } from "../lib/storage";

const PlaceMap = lazy(() => import("../components/place/PlaceMap"));
const Lightbox = lazy(() => import("../components/ui/Lightbox"));

type GalleryItem = { src: string; alt?: string };

export default function LugarDetalle() {
  const { slug } = useParams();
  const place = useMemo(() => places.find((p) => p.slug === slug), [slug]);

  const [favs, setFavs] = useState<string[]>(() => getFavs());
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!place) return;
    setSEO(`${place.name} — Tigre Turismo`, place.shortDescription ?? "");
  }, [place]);

  const gallery: GalleryItem[] = useMemo(() => {
    if (!place) return [];
    const imgs = place.gallery?.length ? place.gallery : place.coverImage ? [place.coverImage] : [];
    return imgs.filter(Boolean).map((src) => ({ src, alt: place.name }));
  }, [place]);

  const isFav = place ? favs.includes(place.slug) : false;

  const openLb = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLb = useCallback(() => setLightboxIndex(null), []);

  const prev = useCallback(() => {
    setLightboxIndex((idx) => {
      if (idx === null) return null;
      return (idx - 1 + gallery.length) % gallery.length;
    });
  }, [gallery.length]);

  const next = useCallback(() => {
    setLightboxIndex((idx) => {
      if (idx === null) return null;
      return (idx + 1) % gallery.length;
    });
  }, [gallery.length]);

  if (!place) {
    return (
      <div className="page-container py-10">
        <p className="text-slate-700">Lugar no encontrado.</p>
        <Link className="text-sm underline" to="/que-hacer">
          Volver a Qué hacer
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-14">
      {/* HERO */}
      <section className="full-bleed relative overflow-hidden">
        <AppImage
          src={place.coverImage}
          alt={place.name}
          className="h-[62vh] w-full object-cover md:h-[72vh]"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/35 to-black/10" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="page-container w-full">
            <div className="mx-auto max-w-3xl text-center text-white">
              <Link
                className="mb-5 inline-flex w-fit items-center justify-center text-lg text-white/90 underline"
                to="/que-hacer"
              >
                ← Volver
              </Link>

              <p className="mx-auto mb-4 inline-flex w-fit rounded-full bg-white/15 px-4 py-2 text-md font-medium backdrop-blur">
                {place.category} • {place.duration} • {place.budget}
              </p>

              <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
                {place.name}
              </h1>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {place.zone ? <Tag variant="overlay">{place.zone}</Tag> : null}
                {place.locationType ? (
                  <Tag variant="overlay">
                    {place.locationType === "entrance" ? "Acceso principal" : "Zona aproximada"}
                  </Tag>
                ) : null}
                {place.tags?.slice(0, 4).map((t) => (
                  <Tag variant="overlay" key={t}>
                    {t}
                  </Tag>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button
                  onClick={() => setFavs(toggleFav(place.slug))}
                  aria-pressed={isFav}
                >
                  {isFav ? "Guardado ✓" : "Guardar en itinerario"}
                </Button>

                {typeof place.lat === "number" && typeof place.lng === "number" ? (
                  <a href={googleMapsDirectionsUrl(place.lat, place.lng)} target="_blank" rel="noreferrer">
                    <Button variant="ghost">Abrir en Maps</Button>
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENIDO */}
      <div className="page-container">
        {/* Galería */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold">Galería</h2>
          <p className="mt-1 text-lg text-slate-600">Tocá una imagen para verla en grande.</p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((img, i) => (
              <Card key={`${img.src}-${i}`} className="cursor-zoom-in overflow-hidden p-0">
                <button
                  type="button"
                  onClick={() => openLb(i)}
                  className="block w-full"
                  aria-label={`Abrir imagen ${i + 1} de ${gallery.length}`}
                >
                  <AppImage
                    src={img.src}
                    alt={img.alt ?? place.name}
                    className="h-48 w-full object-cover"
                    loading={i < 2 ? "eager" : "lazy"}
                    fetchPriority="low"
                  />
                </button>
              </Card>
            ))}
          </div>
        </div>

        {/* Descripción */}
        <section className="mx-auto mt-12 mb-12 max-w-6xl rounded-3xl bg-teal-800 px-6 py-10 text-white md:px-10 md:py-12">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">Sobre este lugar</h2>

          <div className="space-y-4 text-teal-50 leading-relaxed">
            {place.longDescription?.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="mt-12">
          <h2 className="mb-6 text-base font-semibold">Tips para tu visita</h2>

          <ul className="grid gap-4 sm:grid-cols-2">
            {place.tips.map((tip, index) => (
              <motion.li
                key={tip.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.06 }}
                className="rounded-2xl border-2 border-teal-900/90 bg-teal-600/20 p-5 shadow-sm"
              >
                <h3 className="mb-1 text-base font-semibold text-teal-800">{tip.title}</h3>
                <p className="text-md text-muted-foreground leading-relaxed">{tip.description}</p>
              </motion.li>
            ))}
          </ul>
        </section>

        {/* Ubicación */}
        <section className="mx-auto mt-10 mb-10 max-w-6xl rounded-3xl bg-teal-900 px-6 py-10 text-white md:px-10 md:py-12">
          <div className="mb-3 flex items-end justify-between gap-4">
            <h2 className="text-lg font-semibold">Ubicación</h2>

            {typeof place.lat === "number" && typeof place.lng === "number" ? (
              <a
                href={googleMapsDirectionsUrl(place.lat, place.lng)}
                target="_blank"
                rel="noreferrer"
                className="text-lg font-medium underline"
              >
                Cómo llegar
              </a>
            ) : null}
          </div>

          <Card className="overflow-hidden p-0">
            <div className="p-4">
              <Suspense fallback={<div className="rounded-2xl border bg-white/70 p-6 text-slate-700">Cargando mapa…</div>}>
                <PlaceMap places={[place]} showDetailLink={false} />
              </Suspense>
            </div>
          </Card>
        </section>
      </div>

      {/* Lightbox lazy */}
      {lightboxIndex !== null ? (
        <Suspense fallback={null}>
          <Lightbox
            items={gallery}
            index={lightboxIndex}
            onClose={closeLb}
            onPrev={prev}
            onNext={next}
          />
        </Suspense>
      ) : null}
    </div>
  );
}
