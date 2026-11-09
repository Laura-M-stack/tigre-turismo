import { Link } from "react-router-dom";

import { CATEGORY_LABEL, metaLine, metaLineLong } from "../../lib/labels";
import type { Place } from "../../types/place";
import Photo from "../ui/Photo";

import SaveButton from "./SaveButton";

type Props = {
  place: Place;
  number: number;
  active?: boolean;
  onActivate?: (slug: string | null) => void;
};

/** Fila compacta para la vista lista + mapa. El número coincide con el marcador. */
export default function PlaceListItem({ place, number, active = false, onActivate }: Props) {
  return (
    <article
      onMouseEnter={() => onActivate?.(place.slug)}
      onMouseLeave={() => onActivate?.(null)}
      onFocus={() => onActivate?.(place.slug)}
      className={`group relative flex gap-4 rounded-2xl bg-white p-3 ring-1 transition ${
        active ? "ring-2 ring-brick-600" : "ring-ink/10 hover:ring-ink/25"
      }`}
    >
      <div className="relative shrink-0">
        <Photo
          photoKey={place.photos[0]}
          alt=""
          fallbackEyebrow={CATEGORY_LABEL[place.category]}
          sizes="140px"
          className="h-28 w-28 rounded-xl sm:h-32 sm:w-36"
        />
        <span
          aria-hidden="true"
          className={`absolute -left-1.5 -top-1.5 grid h-7 w-7 place-items-center rounded-full text-xs font-semibold text-white ring-2 ring-white ${
            active ? "bg-brick-600" : "bg-river-800"
          }`}
        >
          {number}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col py-0.5">
        <p className="text-[13px] font-medium text-river-700" aria-label={metaLineLong(place)}>
          {metaLine(place)}
        </p>
        <h3 className="mt-0.5 text-lg leading-snug">
          <Link
            to={`/lugares/${place.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            <span className="sr-only">{number}. </span>
            {place.name}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{place.shortDescription}</p>
        <div className="relative z-10 mt-auto flex justify-end pt-2">
          <SaveButton slug={place.slug} name={place.name} />
        </div>
      </div>
    </article>
  );
}
