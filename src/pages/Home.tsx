import { useEffect } from "react";
import { Link } from "react-router-dom";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { setSEO } from "../lib/seo";

export default function Home() {
  useEffect(() => {
    setSEO(
      "Tigre Turismo — Planificá tu día",
      "Guía simple para recorrer Tigre: qué hacer, cómo llegar y armar itinerario.",
    );
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <section className="rounded-3xl border bg-slate-50 p-8">
        <h1 className="text-3xl font-bold tracking-tight">Tigre, Buenos Aires</h1>
        <p className="mt-2 text-slate-700 max-w-2xl">
          Una guía práctica para planificar tu visita: ideas rápidas, filtros por tipo de
          plan y un itinerario con favoritos.
        </p>
        <div className="mt-6 flex gap-3">
          <Link to="/que-hacer">
            <Button>Explorar qué hacer</Button>
          </Link>
          <Link to="/itinerario">
            <Button variant="ghost">Ver mi itinerario</Button>
          </Link>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <Card>
          <h2 className="font-semibold">Planes por tipo</h2>
          <p className="mt-1 text-sm text-slate-600">
            Familia, pareja, lluvia, naturaleza.
          </p>
        </Card>
        <Card>
          <h2 className="font-semibold">Filtrar y guardar</h2>
          <p className="mt-1 text-sm text-slate-600">
            Elegí duración y presupuesto. Guardá favoritos.
          </p>
        </Card>
        <Card>
          <h2 className="font-semibold">Info práctica</h2>
          <p className="mt-1 text-sm text-slate-600">
            Cómo llegar, moverse y tips clave.
          </p>
        </Card>
      </section>
    </div>
  );
}
