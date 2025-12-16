import { NavLink } from "react-router-dom";

const linkBase = "px-3 py-2 rounded-lg text-sm font-medium";
const link = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? `${linkBase} bg-slate-900 text-white`
    : `${linkBase} text-slate-700 hover:bg-slate-100`;

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
        <NavLink to="/" className="font-semibold tracking-tight">
          Tigre Turismo
        </NavLink>

        <nav className="flex items-center gap-1">
          <NavLink to="/que-hacer" className={link}>
            Qué hacer
          </NavLink>
          <NavLink to="/itinerario" className={link}>
            Itinerario
          </NavLink>
          <NavLink to="/como-llegar" className={link}>
            Cómo llegar
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
