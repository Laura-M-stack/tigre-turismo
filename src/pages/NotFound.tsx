import { useEffect } from "react";

import { ButtonLink } from "../components/ui/Button";
import { setSEO } from "../lib/seo";

export default function NotFound() {
  useEffect(() => setSEO("Página no encontrada"), []);
  return (
    <div className="page-container py-20">
      <p className="text-sm font-medium uppercase tracking-[0.14em] text-brick-600">Error 404</p>
      <h1 className="mt-2 text-4xl">Esta página se fue río abajo.</h1>
      <p className="mt-3 max-w-md text-ink-soft">El enlace puede estar mal escrito o el lugar ya no está en la guía.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonLink to="/que-hacer">Ver qué hacer</ButtonLink>
        <ButtonLink to="/" variant="secondary">Ir al inicio</ButtonLink>
      </div>
    </div>
  );
}
