import L from "leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import { CircleMarker, MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Link } from "react-router-dom";

import "leaflet/dist/leaflet.css";
import { defaultIcon } from "../../lib/leafletIcon";
import { googleMapsDirectionsUrl } from "../../lib/maps";
import type { Place } from "../../types/place";

type Props = {
  places: Place[];
  height?: number;
  showDetailLink?: boolean;
};

function FitBounds({ bounds }: { bounds: L.LatLngBounds }) {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(bounds, { padding: [24, 24] });
  }, [map, bounds]);

  return null;
}

function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, options);

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
}

function heightClass(height: number) {
  const allowed = new Map<number, string>([
    [240, "h-[240px]"],
    [280, "h-[280px]"],
    [300, "h-[300px]"],
    [320, "h-[320px]"],
    [360, "h-[360px]"],
    [400, "h-[400px]"],
    [480, "h-[480px]"],
  ]);

  return allowed.get(height) ?? "h-[320px]";
}

export default function PlaceMap({ places, height = 320, showDetailLink = true }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({
    root: null,
    rootMargin: "300px 0px",
    threshold: 0.01,
  });

  const withCoords = useMemo(
    () => places.filter((p) => typeof p.lat === "number" && typeof p.lng === "number"),
    [places],
  );

  const bounds = useMemo(() => {
    if (!withCoords.length) return null;
    return L.latLngBounds(withCoords.map((p) => [p.lat!, p.lng!] as [number, number]));
  }, [withCoords]);

  if (!withCoords.length) {
    return (
      <div className="rounded-2xl border bg-slate-50 p-6 text-base text-slate-600">
        No hay coordenadas para mostrar el mapa.
      </div>
    );
  }

  const initialCenter: [number, number] = [-34.41, -58.58];
  const hClass = heightClass(height);

  return (
    <div
      ref={ref}
      className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      {!inView ? (
        <div
          className={`flex items-center justify-center bg-slate-50 ${hClass}`}
          aria-label="Mapa (cargando)"
        >
          <div className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-base text-slate-700 shadow-sm">
            Cargando mapa…
          </div>
        </div>
      ) : (
        <div className={hClass}>
          <MapContainer
            center={initialCenter}
            zoom={13}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {bounds ? <FitBounds bounds={bounds} /> : null}

            {withCoords.map((place) => {
              const pos: [number, number] = [place.lat!, place.lng!];
              const isArea = place.locationType === "area";

              const popupContent = (
                <div className="space-y-1">
                  <div className="font-semibold">{place.name}</div>

                  {place.locationType ? (
                    <div className="text-base text-slate-600">
                      {place.locationType === "entrance"
                        ? "Acceso principal"
                        : "Zona aproximada"}
                    </div>
                  ) : null}

                  {showDetailLink ? (
                    <Link to={`/lugares/${place.slug}`} className="text-base underline">
                      Ver detalle
                    </Link>
                  ) : null}

                  <a
                    href={googleMapsDirectionsUrl(place.lat!, place.lng!)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-base underline"
                  >
                    Cómo llegar
                  </a>
                </div>
              );

              return isArea ? (
                <CircleMarker key={place.slug} center={pos} radius={12}>
                  <Popup>{popupContent}</Popup>
                </CircleMarker>
              ) : (
                <Marker key={place.slug} position={pos} icon={defaultIcon}>
                  <Popup>{popupContent}</Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      )}
    </div>
  );
}
