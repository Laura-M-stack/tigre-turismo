import { useEffect, useMemo } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";

import { defaultIcon } from "../../lib/leafletIcon";
import type { Place } from "../../types/place";

type Props = {
  places: Place[];
  height?: number;
};

function FitBounds({ bounds }: { bounds: L.LatLngBounds }) {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(bounds, { padding: [24, 24] });
  }, [map, bounds]);

  return null;
}

export default function PlaceMap({ places, height = 320 }: Props) {
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

        {withCoords.map((place) => (
          <Marker
            key={place.slug}
            position={[place.lat!, place.lng!]}
            icon={defaultIcon}
          />
        ))}
      </MapContainer>
    </div>
  );
}
