import { lazy, Suspense } from "react";

import type { PlaceMapProps } from "./PlaceMap";

const PlaceMap = lazy(() => import("./PlaceMap"));

/** Leaflet pesa ~150 KB: se carga solo cuando una página muestra un mapa. */
export default function LazyPlaceMap(props: PlaceMapProps) {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-[320px] place-items-center rounded-2xl bg-cream-200 text-sm text-ink-soft" role="status">
          Cargando mapa…
        </div>
      }
    >
      <PlaceMap {...props} />
    </Suspense>
  );
}
