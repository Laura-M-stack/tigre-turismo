import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function copyToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  ta.style.top = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
}

export default function Footer() {
  const currentUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.href;
  }, []);

  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!feedback) return;
    const t = window.setTimeout(() => setFeedback(null), 2400);
    return () => window.clearTimeout(t);
  }, [feedback]);

  const onShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Tigre Turismo",
          text: "Guía práctica para recorrer Tigre: lugares, itinerario y cómo llegar.",
          url: currentUrl,
        });
        setFeedback("Compartido ✅");
        return;
      }

      await copyToClipboard(currentUrl);
      setFeedback("Link copiado ✅");
    } catch {
      try {
        await copyToClipboard(currentUrl);
        setFeedback("Link copiado ✅");
      } catch {
        setFeedback("No pude copiar el link. Copialo desde la barra del navegador.");
      }
    }
  };

  return (
    <footer className="mt-20 border-t border-slate-200 bg-teal-900">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* TOP */}
        <div className="grid gap-8 md:grid-cols-12 md:gap-10 items-start">
          {/* BRAND (5) */}
          <div className="md:col-span-4">
            <div className="text-xl font-semibold text-white">Tigre Turismo</div>

            <p className="mt-3 max-w-md text-base text-slate-50 leading-relaxed">
              Guía práctica para recorrer Tigre.
              <br />
              Armá tu itinerario, descubrí lugares imperdibles y movete sin perder tiempo.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={scrollToTop}
                className="rounded-xl bg-white/10 px-4 py-2 text-base text-white backdrop-blur transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                ↑ Volver arriba
              </button>

              <button
                type="button"
                onClick={() => void onShare()}
                className="rounded-xl bg-white/10 px-4 py-2 text-base text-white backdrop-blur transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                🔗 Compartir
              </button>
            </div>

            {/* feedback no intrusivo */}
            <div className="mt-3 min-h-[1.25rem]" aria-live="polite">
              {feedback ? <span className="text-base text-teal-50/90">{feedback}</span> : null}
            </div>
          </div>

          {/* NAV (3) */}
          <div className="md:col-span-3">
            <h4 className="mb-3 text-lg font-semibold text-teal-50">Explorar</h4>

            <ul className="space-y-2 text-base">
              <li>
                <Link className="text-white/90 hover:text-white hover:underline" to="/">
                  Inicio
                </Link>
              </li>
              <li>
                <Link className="text-white/90 hover:text-white hover:underline" to="/que-hacer">
                  Qué hacer
                </Link>
              </li>
              <li>
                <Link className="text-white/90 hover:text-white hover:underline" to="/itinerario">
                  Itinerario
                </Link>
              </li>
              <li>
                <Link className="text-white/90 hover:text-white hover:underline" to="/como-llegar">
                  Cómo llegar
                </Link>
              </li>
            </ul>
          </div>

          {/* INFO (4) */}
          <div className="md:col-span-5">
            <h4 className="mb-3 text-lg font-semibold text-teal-50">Información</h4>

            <p className="text-base text-white/90 leading-relaxed">
              Los horarios, precios y disponibilidad pueden variar. Recomendamos verificar con cada
              lugar antes de visitar.
            </p>

            <div className="mt-4 rounded-2xl bg-white/10 p-4 text-base text-white">
              <div className="font-semibold">Tip rápido</div>
              <p className="mt-1 text-slate-50 leading-relaxed">
                Guardá favoritos en “Itinerario” y compartí el link para organizar el plan en grupo.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-200/40 pt-6 text-base text-white md:flex-row">
          <span>© {new Date().getFullYear()} Tigre Turismo. Todos los derechos reservados.</span>

          <span className="text-center md:text-right text-white/90">
            Hecho con ❤ por{" "}
            <a
              className="font-semibold underline decoration-white/30 hover:decoration-white"
              href="https://github.com/laura-m-stack"
              target="_blank"
              rel="noreferrer noopener"
            >
              Laura Moyano
            </a>
            , para personas que quieren viajar mejor
          </span>
        </div>
      </div>
    </footer>
  );
}
