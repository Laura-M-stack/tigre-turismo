import type { Budget, Category, Duration } from "../../types/place";
import Input from "../ui/Input";

type Props = {
  q: string;
  setQ: (v: string) => void;
  category: Category | "all";
  setCategory: (v: Category | "all") => void;
  duration: Duration | "all";
  setDuration: (v: Duration | "all") => void;
  budget: Budget | "all";
  setBudget: (v: Budget | "all") => void;
};

export default function PlaceFilters({
  q,
  setQ,
  category,
  setCategory,
  duration,
  setDuration,
  budget,
  setBudget,
}: Props) {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      <div className="grid gap-1">
        <label htmlFor="q" className="text-md font-medium text-slate-700">
          Buscar
        </label>
        <Input className="bg-white"
          id="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar (ej: delta, museo...)"
          aria-label="Buscar lugares"
        />
      </div>

      <div className="grid gap-1">
        <label htmlFor="category" className="text-md font-medium text-slate-700">
          Categoría
        </label>
        <select
          id="category"
          className="control"
          value={category}
          onChange={(e) => setCategory(e.target.value as Category | "all")}
        >
          <option value="all">Todas</option>
          <option value="naturaleza">Naturaleza</option>
          <option value="paseos">Paseos</option>
          <option value="museos">Museos</option>
          <option value="gastronomia">Gastronomía</option>
          <option value="aventura">Aventura</option>
          <option value="relax">Relax</option>
          <option value="entretenimiento">Entretenimiento</option>
          <option value="cultura">Cultura</option>
        </select>
      </div>

      <div className="grid gap-1">
        <label htmlFor="duration" className="text-md font-medium text-slate-700">
          Duración
        </label>
        <select
          id="duration"
          className="control"
          value={duration}
          onChange={(e) => setDuration(e.target.value as Duration | "all")}
        >
          <option value="all">Todas</option>
          <option value="1-2h">1–2h</option>
          <option value="medio-dia">Medio día</option>
          <option value="dia-completo">Día completo</option>
        </select>
      </div>

      <div className="grid gap-1">
        <label htmlFor="budget" className="text-md font-medium text-slate-700">
          Presupuesto
        </label>
        <select
          id="budget"
          className="control"
          value={budget}
          onChange={(e) => setBudget(e.target.value as Budget | "all")}
        >
          <option value="all">Todos</option>
          <option value="gratis">Gratis</option>
          <option value="bajo">Bajo</option>
          <option value="medio">Medio</option>
          <option value="alto">Alto</option>
        </select>
      </div>
    </div>
  );
}
