import type { Filters, SortKey } from "../../lib/filterPlaces";
import { BUDGET_LONG_LABEL, CATEGORY_LABEL, DURATION_LABEL } from "../../lib/labels";
import type { Budget, Category, Duration } from "../../types/place";
import Icon from "../ui/Icon";

type Props = {
  value: Filters;
  onChange: (patch: Partial<Filters>) => void;
};

const control =
  "h-11 w-full rounded-xl border border-ink/15 bg-white px-3 text-[15px] text-ink shadow-xs focus:border-river-700 focus:outline-none focus:ring-2 focus:ring-river-700/20";

function entries<K extends string>(rec: Record<K, string>) {
  return Object.entries(rec) as [K, string][];
}

export default function PlaceFilters({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,1fr))]">
      <div className="col-span-2 lg:col-span-1">
        <label htmlFor="f-q" className="mb-1 block text-sm font-medium text-ink-soft">
          Buscar
        </label>
        <div className="relative">
          <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
          <input
            id="f-q"
            type="search"
            value={value.q}
            onChange={(e) => onChange({ q: e.target.value })}
            placeholder="Delta, museo, lancha…"
            className={`${control} pl-9`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="f-cat" className="mb-1 block text-sm font-medium text-ink-soft">
          Categoría
        </label>
        <select
          id="f-cat"
          className={control}
          value={value.category}
          onChange={(e) => onChange({ category: e.target.value as Category | "all" })}
        >
          <option value="all">Todas</option>
          {entries(CATEGORY_LABEL).map(([k, l]) => (
            <option key={k} value={k}>
              {l}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="f-dur" className="mb-1 block text-sm font-medium text-ink-soft">
          Duración
        </label>
        <select
          id="f-dur"
          className={control}
          value={value.duration}
          onChange={(e) => onChange({ duration: e.target.value as Duration | "all" })}
        >
          <option value="all">Cualquiera</option>
          {entries(DURATION_LABEL).map(([k, l]) => (
            <option key={k} value={k}>
              {l}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="f-bud" className="mb-1 block text-sm font-medium text-ink-soft">
          Presupuesto
        </label>
        <select
          id="f-bud"
          className={control}
          value={value.budget}
          onChange={(e) => onChange({ budget: e.target.value as Budget | "all" })}
        >
          <option value="all">Cualquiera</option>
          {entries(BUDGET_LONG_LABEL).map(([k, l]) => (
            <option key={k} value={k}>
              {l}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="f-sort" className="mb-1 block text-sm font-medium text-ink-soft">
          Ordenar
        </label>
        <select
          id="f-sort"
          className={control}
          value={value.sort}
          onChange={(e) => onChange({ sort: e.target.value as SortKey })}
        >
          <option value="relevance">Recomendados</option>
          <option value="budget_low">Más económicos</option>
          <option value="duration_short">Más cortos</option>
        </select>
      </div>
    </div>
  );
}
