import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import PlaceCard from "../components/place/PlaceCard";
import { ButtonLink } from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import Photo from "../components/ui/Photo";
import { places } from "../data/places";
import { QUICK_PLANS } from "../lib/filterPlaces";
import { setSEO } from "../lib/seo";

const FEATURED = ["paseo-victorica", "puerto-de-frutos", "paseo-en-lancha-por-el-delta", "museo-de-arte-tigre"];

const STEPS = [
  {
    title: "Elegí qué hacer",
    text: "Filtrá por tiempo, presupuesto o con quién vas. Cada lugar tiene tips concretos y su ubicación.",
  },
  {
    title: "Armá tu día",
    text: "Agregá lugares a tu itinerario y ordenalos. Se guarda en este navegador, sin registrarte.",
  },
  {
    title: "Llegá y movete",
    text: "Tren, colectivo o auto, y un mapa con todo numerado para abrir indicaciones en Maps.",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  useEffect(() => {
    setSEO(
      "Tigre Turismo — Guía práctica para planificar tu día en Tigre",
      "Qué hacer en Tigre, cómo llegar y un itinerario que se guarda en tu navegador. Guía independiente y no oficial.",
    );
  }, []);

  const featured = useMemo(
    () => FEATURED.map((s) => places.find((p) => p.slug === s)).filter((p) => p !== undefined),
    [],
  );

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    navigate(term ? `/que-hacer?q=${encodeURIComponent(term)}` : "/que-hacer");
  };

  return (
    <>
      {/* HERO dividido: texto + búsqueda a la izquierda, foto con crédito a la derecha */}
      <section className="page-container grid items-center gap-10 pb-14 pt-10 md:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-brick-600">
            Tigre · Delta del Paraná
          </p>
          <h1 className="mt-4 text-[2.6rem] leading-[1.05] sm:text-6xl">
            Un día en Tigre,
            <br />
            <em className="font-medium italic text-river-800">sin improvisar.</em>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-ink-soft">
            Qué ver, cuánto tiempo lleva y cuánto cuesta, en un solo lugar. Elegí, guardá y salí con el plan
            armado.
          </p>

          <form onSubmit={onSearch} role="search" className="mt-8 flex max-w-lg gap-2">
            <label htmlFor="home-q" className="sr-only">
              Buscar lugares y actividades
            </label>
            <div className="relative flex-1">
              <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-soft" />
              <input
                id="home-q"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Lancha, museo, Puerto de Frutos…"
                className="h-13 w-full rounded-full border border-ink/15 bg-white pl-11 pr-4 text-base shadow-sm focus:border-river-700 focus:outline-none focus:ring-2 focus:ring-river-700/20"
              />
            </div>
            <button
              type="submit"
              className="h-13 shrink-0 rounded-full bg-river-800 px-6 font-medium text-white hover:bg-river-900"
            >
              Buscar
            </button>
          </form>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-sm text-ink-soft">Planes rápidos:</span>
            {QUICK_PLANS.slice(0, 4).map((p) => (
              <Link
                key={p.id}
                to={`/que-hacer?plan=${p.id}`}
                className="rounded-full border border-ink/15 bg-white px-3.5 py-1.5 text-sm text-ink hover:border-river-700 hover:text-river-800"
              >
                {p.label}
              </Link>
            ))}
          </div>
        </div>

        <figure className="relative">
          <Photo
            photoKey="hero-home"
            alt="Tigre, Buenos Aires"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/3] rounded-[28px] lg:aspect-[4/5]"
            priority
          />
          <figcaption className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 rounded-2xl bg-white/90 px-4 py-3 text-sm shadow-sm backdrop-blur sm:right-auto">
            <span>
              <span className="block font-medium text-ink">A 1 hora de Buenos Aires</span>
              <span className="text-ink-soft">Tren, colectivo o auto · Foto: Laura Moyano</span>
            </span>
          </figcaption>
        </figure>
      </section>

      {/* IMPERDIBLES */}
      <section aria-labelledby="imperdibles" className="page-container">
        <div className="flex items-end justify-between gap-4 border-t border-ink/10 pt-10">
          <div>
            <h2 id="imperdibles" className="text-3xl sm:text-4xl">
              Para empezar
            </h2>
            <p className="mt-2 text-ink-soft">Cuatro clásicos si es tu primera vez o tenés poco tiempo.</p>
          </div>
          <Link to="/que-hacer" className="hidden shrink-0 items-center gap-1.5 font-medium text-river-800 hover:text-river-900 sm:inline-flex">
            Ver los {places.length} lugares <Icon name="arrowRight" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <PlaceCard key={p.slug} place={p} />
          ))}
        </div>

        <ButtonLink to="/que-hacer" variant="secondary" className="mt-6 w-full sm:hidden">
          Ver los {places.length} lugares
        </ButtonLink>
      </section>

      {/* CÓMO FUNCIONA */}
      <section aria-labelledby="como-funciona" className="page-container mt-20">
        <div className="rounded-[28px] bg-river-800 px-6 py-12 text-white sm:px-10">
          <h2 id="como-funciona" className="text-3xl text-white sm:text-4xl">
            Cómo usar la guía
          </h2>
          <ol className="mt-8 grid gap-8 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="font-display text-5xl text-brick-500" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-xl text-white">{s.title}</h3>
                <p className="mt-2 text-river-100">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink to="/que-hacer" variant="accent">
              Empezar a elegir
            </ButtonLink>
            <ButtonLink to="/como-llegar" className="border border-white/30 bg-transparent hover:bg-white/10">
              Cómo llegar
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
