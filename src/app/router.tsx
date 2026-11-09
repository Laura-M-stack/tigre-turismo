import { lazy } from "react";
import { createHashRouter } from "react-router-dom";

import AppLayout from "./layout/AppLayout";

const Home = lazy(() => import("../pages/Home"));
const QueHacer = lazy(() => import("../pages/QueHacer"));
const LugarDetalle = lazy(() => import("../pages/LugarDetalle"));
const Itinerario = lazy(() => import("../pages/Itinerario"));
const ComoLlegar = lazy(() => import("../pages/ComoLlegar"));
const Creditos = lazy(() => import("../pages/Creditos"));
const NotFound = lazy(() => import("../pages/NotFound"));

export const router = createHashRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/que-hacer", element: <QueHacer /> },
      { path: "/lugares/:slug", element: <LugarDetalle /> },
      { path: "/itinerario", element: <Itinerario /> },
      { path: "/como-llegar", element: <ComoLlegar /> },
      { path: "/creditos", element: <Creditos /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
