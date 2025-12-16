import L from "leaflet";
import { useEffect, useMemo } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  CircleMarker,
} from "react-leaflet";
import { Link } from "react-router-dom";

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

export default function PlaceMap({ places, height = 320, showDetailLink = true }: Props) {
  const withCoords = useMemo(
    () => places.filter((p) => typeof p.lat === "number" && typeof p.lng === "number"),
    [places],
  );

  if (!withCoords.length) {
    return (
      <div className="rounded-2xl border bg-slate-50 p-6 text-sm text-slate-600">
        No hay coordenadas para mostrar el mapa.
      </div>
    );
  }

  const bounds = useMemo(() => {
    const pts = withCoords.map((p) => [p.lat!, p.lng!] as [number, number]);
    return L.latLngBounds(pts);
  }, [withCoords]);

  // Centro inicial cualquiera dentro de Tigre (se corrige con FitBounds al montar)
  const initialCenter: [number, number] = [-34.41, -58.58];

  return (
    <div className="overflow-hidden rounded-2xl border">
      <MapContainer
        center={initialCenter}
        zoom={13}
        style={{ height }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds bounds={bounds} />

        {withCoords.map((place) => {
          const pos: [number, number] = [place.lat!, place.lng!];
          const isArea = place.locationType === "area";

          const popupContent = (
            <div className="space-y-1">
              <div className="font-semibold">{place.name}</div>

              {place.locationType ? (
                <div className="text-xs text-slate-600">
                  {place.locationType === "entrance"
                    ? "Acceso principal"
                    : "Zona aproximada"}
                </div>
              ) : null}

              {showDetailLink ? (
                <Link to={`/lugares/${place.slug}`} className="text-sm underline">
                  Ver detalle
                </Link>
              ) : null}
              {typeof place.lat === "number" && typeof place.lng === "number" ? (
                <a
                  href={googleMapsDirectionsUrl(place.lat, place.lng)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm underline"
                >
                  Cómo llegar
                </a>
              ) : null}
            </div>
          );

          if (isArea) {
            return (
              <CircleMarker key={place.slug} center={pos} radius={12} pathOptions={{}}>
                <Popup>{popupContent}</Popup>
              </CircleMarker>
            );
          }

          return (
            <Marker key={place.slug} position={pos} icon={defaultIcon}>
              <Popup>{popupContent}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
