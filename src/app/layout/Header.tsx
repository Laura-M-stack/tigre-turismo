import { NavLink, Link } from "react-router-dom";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "rounded-xl px-3 py-2 text-sm font-medium transition",
    isActive
      ? "bg-white/70 text-slate-900 shadow-sm ring-1 ring-black/5"
      : "text-slate-700 hover:bg-white/60 hover:text-slate-900",
  ].join(" ");

export default function Header() {
  return (
    <header className="sticky top-0 z-1100">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-3 rounded-2xl border bg-white/70 shadow-sm backdrop-blur">
          <div className="flex items-center justify-between gap-3 px-3 py-3 md:px-4">
            <Link
              to="/"
              className="flex items-center gap-2 rounded-xl px-2 py-1 text-slate-900"
            >
              <span className="text-2xl">🌊</span>
              <span className="text-lg font-semibold tracking-tight">
                Tigre Turismo
              </span>
            </Link>

            <nav className="flex flex-wrap items-center gap-1">
              <NavLink to="/" className={navLinkClass} end>
                Inicio
              </NavLink>
              <NavLink to="/que-hacer" className={navLinkClass}>
                Qué hacer
              </NavLink>
              <NavLink to="/itinerario" className={navLinkClass}>
                Itinerario
              </NavLink>
              <NavLink to="/como-llegar" className={navLinkClass}>
                Cómo llegar
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
