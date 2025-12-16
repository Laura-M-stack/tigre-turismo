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
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar (ej: delta, museo...)"
      />

      <select
        aria-label="Categoría"
        className="rounded-xl border px-3 py-2 text-sm"
        value={category}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setCategory(e.target.value as Category | "all")
        }
      >
        <option value="all">Categoría</option>
        <option value="naturaleza">Naturaleza</option>
        <option value="paseos">Paseos</option>
        <option value="museos">Museos</option>
        <option value="gastronomia">Gastronomía</option>
      </select>

      <select
        aria-label="Duración"
        className="rounded-xl border px-3 py-2 text-sm"
        value={duration}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setDuration(e.target.value as Duration | "all")
        }
      >
        <option value="all">Duración</option>
        <option value="1-2h">1–2h</option>
        <option value="medio-dia">Medio día</option>
        <option value="dia-completo">Día completo</option>
      </select>

      <select
        aria-label="Presupuesto"
        className="rounded-xl border px-3 py-2 text-sm"
        value={budget}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setBudget(e.target.value as Budget | "all")
        }
      >
        <option value="all">Presupuesto</option>
        <option value="gratis">Gratis</option>
        <option value="bajo">Bajo</option>
        <option value="medio">Medio</option>
        <option value="alto">Alto</option>
      </select>
    </div>
  );
}
