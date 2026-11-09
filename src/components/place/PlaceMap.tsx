import L from "leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Link } from "react-router-dom";

import "leaflet/dist/leaflet.css";
import { LOCATION_LABEL } from "../../lib/labels";
import { googleMapsDirectionsUrl } from "../../lib/maps";
import type { Place } from "../../types/place";

export type PlaceMapProps = {
  places: Place[];
  /** Alto en px; en pantallas grandes se puede pasar "fill" para ocupar el contenedor. */
  height?: number | "fill";
  showDetailLink?: boolean;
  /** Numera los marcadores según el orden de `places` (coincide con la lista). */
  numbered?: boolean;
  activeSlug?: string | null;
  onActivate?: (slug: string | null) => void;
  className?: string;
};

const IN_VIEW_OPTIONS: IntersectionObserverInit = { rootMargin: "300px 0px", threshold: 0.01 };

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  // Sin IntersectionObserver (navegadores muy viejos) se muestra el mapa directamente
  const [inView, setInView] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, IN_VIEW_OPTIONS);
    obs.observe(el);
    return () => obs.disconnect();
  }, [inView]);

  return { ref, inView };
}

function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();
  const key = points.map((p) => p.join(",")).join("|");

  useEffect(() => {
    if (!points.length) return;
    if (points.length === 1) map.setView(points[0], 15);
    else map.fitBounds(L.latLngBounds(points), { padding: [32, 32], maxZoom: 15 });
    // `key` resume `points`: evita re-encuadrar cuando solo cambia la referencia del array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, key]);

  return null;
}

function pinIcon(label: string, { area, active }: { area: boolean; active: boolean }) {
  return L.divIcon({
    className: "",
    html: `<div class="map-pin${area ? " map-pin--area" : ""}${active ? " map-pin--active" : ""}"><span>${label}</span></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28],
  });
}

export default function PlaceMap({
  places,
  height = 360,
  showDetailLink = true,
  numbered = true,
  activeSlug = null,
  onActivate,
  className = "",
}: PlaceMapProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  const withCoords = useMemo(
    () =>
      places
        .map((p, i) => ({ p, n: i + 1 }))
        .filter(({ p }) => Number.isFinite(p.lat) && Number.isFinite(p.lng)),
    [places],
  );
  const points = useMemo(
    () => withCoords.map(({ p }) => [p.lat!, p.lng!] as [number, number]),
    [withCoords],
  );

  const style = height === "fill" ? undefined : { height };
  const sizeClass = height === "fill" ? "h-full min-h-[320px]" : "";

  if (!withCoords.length) {
    return (
      <div className={`grid place-items-center rounded-2xl bg-cream-200 p-6 text-ink-soft ${sizeClass} ${className}`} style={style}>
        No hay ubicaciones para mostrar.
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-2xl ring-1 ring-ink/10 ${sizeClass} ${className}`}
      style={style}
    >
      {!inView ? (
        <div className="grid h-full place-items-center bg-cream-200 text-sm text-ink-soft" role="status">
          Cargando mapa…
        </div>
      ) : (
        <MapContainer center={points[0]} zoom={14} scrollWheelZoom={false} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitBounds points={points} />

          {withCoords.map(({ p, n }) => (
            <Marker
              key={p.slug}
              position={[p.lat!, p.lng!]}
              icon={pinIcon(numbered ? String(n) : "", {
                area: p.locationType === "area",
                active: activeSlug === p.slug,
              })}
              zIndexOffset={activeSlug === p.slug ? 1000 : 0}
              title={p.name}
              alt={numbered ? `${n}. ${p.name}` : p.name}
              eventHandlers={{
                mouseover: () => onActivate?.(p.slug),
                mouseout: () => onActivate?.(null),
              }}
            >
              <Popup>
                <div className="space-y-1 text-sm">
                  <div className="font-semibold">{p.name}</div>
                  {p.locationType ? <div className="text-ink-soft">{LOCATION_LABEL[p.locationType]}</div> : null}
                  <div className="flex gap-3 pt-1">
                    {showDetailLink ? <Link to={`/lugares/${p.slug}`}>Ver detalle</Link> : null}
                    <a href={googleMapsDirectionsUrl(p.lat!, p.lng!)} target="_blank" rel="noopener noreferrer">
                      Cómo llegar
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
}
