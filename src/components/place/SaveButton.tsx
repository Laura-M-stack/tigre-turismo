import { useItinerary } from "../../hooks/useItinerary";
import Icon from "../ui/Icon";

type Props = { slug: string; name: string; variant?: "chip" | "icon" | "large"; className?: string };

/**
 * Agrega / quita un lugar del itinerario. aria-pressed comunica el estado
 * a lectores de pantalla; el texto visible cambia para quien ve.
 */
export default function SaveButton({ slug, name, variant = "chip", className = "" }: Props) {
  const { has, toggle } = useItinerary();
  const saved = has(slug);
  const label = saved ? `Quitar ${name} de tu día` : `Agregar ${name} a tu día`;

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={() => toggle(slug)}
        aria-pressed={saved}
        aria-label={label}
        title={label}
        className={`grid h-10 w-10 place-items-center rounded-full bg-white/95 shadow-sm ring-1 ring-ink/10 transition hover:scale-105 ${
          saved ? "text-brick-600" : "text-ink-soft hover:text-brick-600"
        } ${className}`}
      >
        <Icon name="heart" filled={saved} className="h-5 w-5" />
      </button>
    );
  }

  const size = variant === "large" ? "h-12 px-6 text-base" : "h-9 px-3.5 text-sm";
  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={saved}
      aria-label={label}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full font-medium transition-colors ${size} ${
        saved
          ? "bg-river-100 text-river-900 hover:bg-river-50"
          : "bg-brick-600 text-white hover:bg-brick-700"
      } ${className}`}
    >
      <Icon name={saved ? "check" : "plus"} className="h-4 w-4" />
      {saved ? "En tu día" : "Agregar"}
    </button>
  );
}
