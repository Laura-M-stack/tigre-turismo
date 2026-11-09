import { useState } from "react";
import { Link } from "react-router-dom";

import Icon from "../../components/ui/Icon";
import { copyText } from "../../lib/clipboard";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const year = new Date().getFullYear();

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Tigre Turismo", url });
        return;
      } catch {
        /* el usuario canceló: probamos copiar */
      }
    }
    if (await copyText(url)) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <footer className="mt-20 bg-river-900 text-river-100">
      <div className="page-container grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl text-white">Tigre</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed">
            Guía práctica e independiente para planificar una visita a Tigre. No es un sitio oficial del
            Municipio ni de los lugares listados: horarios, precios y servicios pueden cambiar, así que
            confirmalos antes de ir.
          </p>
        </div>

        <nav aria-label="Pie de página">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-river-100/70">Explorar</p>
          <ul className="mt-3 space-y-2 text-[15px]">
            <li><Link className="hover:text-white" to="/que-hacer">Qué hacer</Link></li>
            <li><Link className="hover:text-white" to="/como-llegar">Cómo llegar</Link></li>
            <li><Link className="hover:text-white" to="/itinerario">Mi itinerario</Link></li>
            <li><Link className="hover:text-white" to="/creditos">Créditos de fotos</Link></li>
          </ul>
        </nav>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-river-100/70">Compartir</p>
          <button
            type="button"
            onClick={share}
            className="mt-3 inline-flex h-10 items-center gap-2 rounded-full border border-river-100/30 px-4 text-sm text-white hover:bg-white/10"
          >
            <Icon name={copied ? "check" : "share"} />
            {copied ? "Enlace copiado" : "Compartir esta página"}
          </button>
          <p className="sr-only" aria-live="polite">{copied ? "Enlace copiado al portapapeles" : ""}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="page-container flex flex-col gap-2 py-5 text-xs text-river-100/70 sm:flex-row sm:justify-between">
          <p>© {year} Tigre Turismo · Proyecto independiente</p>
          <p>
            Diseño y desarrollo:{" "}
            <a
              className="underline-offset-2 hover:text-white hover:underline"
              href="https://www.linkedin.com/in/laura-moyano-h/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Laura Moyano
            </a>
            {" · "}Mapas © OpenStreetMap
          </p>
        </div>
      </div>
    </footer>
  );
}
