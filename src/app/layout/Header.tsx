import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const linkBase =
  "rounded-xl px-3 py-2 text-lg transition hover:bg-slate-900/5";
const linkActive = "bg-teal-900 text-white hover:!bg-slate-700";

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${linkBase} ${linkActive}` : linkBase;

  // Bloquear scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape para cerrar (setState en callback OK)
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const closeMenu = () => setOpen(false);

  const goTop = () => {
    closeMenu();

    if (location.pathname === "/") {
      const el = document.getElementById("top");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigate("/");
    requestAnimationFrame(() => window.scrollTo({ top: 0 }));
  };

  const go = (to: string) => {
    closeMenu();
    navigate(to);
    requestAnimationFrame(() => window.scrollTo({ top: 0 }));
  };

  return (
    <header className="sticky top-0 z-50 bg-teal-50/80 shadow-sm backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="rounded-3xl bg-white/80 backdrop-blur">
          <div className="flex items-center justify-between gap-3 px-5 py-3">
            {/* LOGO */}
            <button
              type="button"
              onClick={goTop}
              className="flex items-center gap-2 rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-900/30"
              aria-label="Ir al inicio"
            >
              <div className="leading-tight">
                <div className="text-xl font-bold text-teal-900">
                  Tigre Turismo
                </div>
                <div className="text-base text-slate-600">Planificá tu visita</div>
              </div>
            </button>

            {/* DESKTOP NAV */}
            <nav className="hidden items-center gap-1 md:flex">
              <NavLink to="/" end className={linkClass}>
                Inicio
              </NavLink>
              <NavLink to="/que-hacer" className={linkClass}>
                Qué hacer
              </NavLink>
              <NavLink to="/itinerario" className={linkClass}>
                Itinerario
              </NavLink>
              <NavLink to="/como-llegar" className={linkClass}>
                Cómo llegar
              </NavLink>
            </nav>

            {/* HAMBURGER */}
            <button
              className="rounded-xl p-2 hover:bg-slate-900/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-900/30 md:hidden"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open ? "true" : "false"}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              type="button"
            >
              <span className="mb-1 block h-0.5 w-6 bg-teal-900" />
              <span className="mb-1 block h-0.5 w-6 bg-teal-900" />
              <span className="block h-0.5 w-6 bg-teal-900" />
            </button>
          </div>

          {/* MOBILE MENU + OVERLAY */}
          {open ? (
            <>
              <button
                type="button"
                aria-label="Cerrar menú"
                className="fixed inset-0 z-40 bg-black/30 md:hidden"
                onClick={closeMenu}
              />

              <div
                id="mobile-menu"
                className="fixed left-4 right-4 top-[84px] z-50 rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur md:hidden"
                role="dialog"
                aria-modal="true"
              >
                <nav className="flex flex-col gap-2">
                  <NavLink to="/" end className={linkClass} onClick={closeMenu}>
                    Inicio
                  </NavLink>
                  <NavLink to="/que-hacer" className={linkClass} onClick={closeMenu}>
                    Qué hacer
                  </NavLink>
                  <NavLink to="/itinerario" className={linkClass} onClick={closeMenu}>
                    Itinerario
                  </NavLink>
                  <NavLink to="/como-llegar" className={linkClass} onClick={closeMenu}>
                    Cómo llegar
                  </NavLink>

                  <Link
                    to="/como-llegar"
                    onClick={closeMenu}
                    className="mt-2 inline-flex items-center justify-center rounded-xl bg-teal-900 px-4 py-3 text-lg font-semibold text-white"
                  >
                    Ver cómo llegar
                  </Link>

                  {/* Accesos rápidos opcionales */}
                  <button
                    type="button"
                    onClick={() => go("/itinerario")}
                    className="mt-1 inline-flex items-center justify-center rounded-xl bg-slate-900/5 px-4 py-3 text-lg font-semibold text-slate-900 hover:bg-slate-900/10"
                  >
                    Ir a Itinerario
                  </button>
                </nav>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
