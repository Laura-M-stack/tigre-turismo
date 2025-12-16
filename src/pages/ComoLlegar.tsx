import { useEffect } from "react";

import { setSEO } from "../lib/seo";

export default function ComoLlegar() {
  useEffect(() => {
    setSEO(
      "Cómo llegar a Tigre — Info práctica",
      "Opciones para llegar y moverte por Tigre.",
    );
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold tracking-tight">Cómo llegar</h1>
      <div className="mt-4 space-y-3 text-slate-700">
        <p>
          <strong>Tren:</strong> Línea Mitre (Retiro → Tigre).
        </p>
        <p>
          <strong>Auto:</strong> Acceso Norte / Ramal Tigre (revisar estacionamiento según
          zona).
        </p>
        <p>
          <strong>Delta:</strong> Lanchas y paseos desde Estación Fluvial.
        </p>
      </div>
    </div>
  );
}
