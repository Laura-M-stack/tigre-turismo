import { lazy, Suspense, type ReactNode } from "react";
import { createHashRouter } from "react-router-dom";

import AppLayout from "./layout/AppLayout";

// Lazy pages
const Home = lazy(() => import("../pages/Home"));
const QueHacer = lazy(() => import("../pages/QueHacer"));
const LugarDetalle = lazy(() => import("../pages/LugarDetalle"));
const Itinerario = lazy(() => import("../pages/Itinerario"));
const ComoLlegar = lazy(() => import("../pages/ComoLlegar"));
const NotFound = lazy(() => import("../pages/NotFound"));

function Page({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="page-container py-10 text-slate-700">Cargando…</div>
      }
    >
      {children}
    </Suspense>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const router = createHashRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Page><Home /></Page> },
      { path: "/que-hacer", element: <Page><QueHacer /></Page> },
      { path: "/lugares/:slug", element: <Page><LugarDetalle /></Page> },
      { path: "/itinerario", element: <Page><Itinerario /></Page> },
      { path: "/como-llegar", element: <Page><ComoLlegar /></Page> },
      { path: "*", element: <Page><NotFound /></Page> },
    ],
  },
]);
