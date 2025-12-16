import { createHashRouter } from "react-router-dom";

import ComoLlegar from "../pages/ComoLlegar";
import Home from "../pages/Home";
import Itinerario from "../pages/Itinerario";
import LugarDetalle from "../pages/LugarDetalle";
import NotFound from "../pages/NotFound";
import QueHacer from "../pages/QueHacer";

import AppLayout from "./layout/AppLayout";

export const router = createHashRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/que-hacer", element: <QueHacer /> },
      { path: "/lugares/:slug", element: <LugarDetalle /> },
      { path: "/itinerario", element: <Itinerario /> },
      { path: "/como-llegar", element: <ComoLlegar /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
