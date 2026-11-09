import { Link } from "react-router-dom";

import { CATEGORY_LABEL, metaLine, metaLineLong } from "../../lib/labels";
import type { Place } from "../../types/place";
import Photo from "../ui/Photo";

import SaveButton from "./SaveButton";

/** Card vertical: foto arriba, meta legible, nombre y bajada. Toda la card es clickeable. */
export default function PlaceCard({ place, priority = false }: { place: Place; priority?: boolean }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-ink/10 transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-ink/20">
      <Photo
        photoKey={place.photos[0]}
        alt={place.name}
        fallbackTitle={place.name}
        fallbackEyebrow={CATEGORY_LABEL[place.category]}
        sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
        className="aspect-[4/3]"
        imgClassName="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        priority={priority}
      />

      <div className="absolute right-3 top-3 z-10">
        <SaveButton slug={place.slug} name={place.name} variant="icon" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm font-medium text-river-700" aria-label={metaLineLong(place)}>
          {metaLine(place)}
        </p>
        <h3 className="mt-1.5 text-xl leading-snug">
          <Link
            to={`/lugares/${place.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {place.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[15px] text-ink-soft">{place.shortDescription}</p>
      </div>
    </article>
  );
}
