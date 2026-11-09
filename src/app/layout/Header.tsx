import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import Icon from "../../components/ui/Icon";
import { useItinerary } from "../../hooks/useItinerary";

const NAV = [
  { to: "/", label: "Inicio", end: true },
  { to: "/que-hacer", label: "Qué hacer" },
  { to: "/como-llegar", label: "Cómo llegar" },
];

const navClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-3.5 py-2 text-[15px] transition-colors ${
    isActive ? "bg-river-800/10 font-medium text-river-900" : "text-ink-soft hover:text-ink"
  }`;

function ItineraryPill({ onClick }: { onClick?: () => void }) {
  const { count } = useItinerary();
  return (
    <NavLink
      to="/itinerario"
      onClick={onClick}
      className={({ isActive }) =>
        `inline-flex h-10 items-center gap-2 rounded-full px-4 text-[15px] font-medium transition-colors ${
          isActive ? "bg-river-900 text-white" : "bg-river-800 text-white hover:bg-river-900"
        }`
      }
    >
      Mi itinerario
      <span
        className={`grid h-6 min-w-6 place-items-center rounded-full px-1.5 text-xs font-semibold ${
          count ? "bg-brick-600 text-white" : "bg-white/20 text-white"
        }`}
        aria-label={`${count} ${count === 1 ? "lugar guardado" : "lugares guardados"}`}
      >
        {count}
      </span>
    </NavLink>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream-100/90 backdrop-blur">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
      >
        Saltar al contenido
      </a>
      <div className="page-container flex h-16 items-center justify-between gap-4">
        <Link to="/" onClick={close} className="flex items-baseline gap-2.5" aria-label="Tigre Turismo, inicio">
          <span className="font-display text-2xl font-semibold text-river-900">Tigre</span>
          <span className="hidden text-xs uppercase tracking-[0.14em] text-ink-soft sm:inline">
            Guía práctica · no oficial
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={navClass}>
              {n.label}
            </NavLink>
          ))}
          <span className="ml-2">
            <ItineraryPill />
          </span>
        </nav>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-ink/5 md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "x" : "menu"} className="h-6 w-6" />
        </button>
      </div>

      {open ? (
        <>
          <button
            type="button"
            aria-label="Cerrar menú"
            tabIndex={-1}
            className="fixed inset-0 top-16 z-40 bg-ink/30 md:hidden"
            onClick={close}
          />
          <nav
            id="mobile-menu"
            aria-label="Principal"
            className="absolute inset-x-0 top-16 z-50 border-b border-ink/10 bg-cream-100 px-4 pb-5 pt-2 shadow-lg md:hidden"
          >
            <ul className="flex flex-col">
              {NAV.map((n) => (
                <li key={n.to}>
                  <NavLink
                    to={n.to}
                    end={n.end}
                    onClick={close}
                    className={({ isActive }) =>
                      `block border-b border-ink/10 py-3.5 font-display text-xl ${isActive ? "text-brick-600" : "text-ink"}`
                    }
                  >
                    {n.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <ItineraryPill onClick={close} />
            </div>
          </nav>
        </>
      ) : null}
    </header>
  );
}
