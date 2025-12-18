import { Link } from "react-router-dom";

import { googleMapsDirectionsUrl } from "../../lib/maps";
import type { Place } from "../../types/place";
import AppImage from "../ui/AppImage";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Tag from "../ui/Tag";

type Props = {
  place: Place;
};

export default function PlaceCard({ place }: Props) {
  return (
    <Card className="overflow-hidden bg-white/80 p-0 shadow-sm backdrop-blur">
      {/* Cover */}
      <div className="relative">
        <AppImage
          src={place.coverImage}
          alt={place.name}
          className="h-44 w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-lg font-semibold text-white">{place.name}</h3>
          {place.shortDescription ? (
            <p className="mt-1 line-clamp-2 text-sm text-white/90">
              {place.shortDescription}
            </p>
          ) : null}
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex flex-wrap gap-2">
          <Tag>{place.category}</Tag>
          <Tag>{place.duration}</Tag>
          <Tag>{place.budget}</Tag>
          {place.locationType ? (
            <Tag>{place.locationType === "entrance" ? "Acceso" : "Zona"}</Tag>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link to={`/lugares/${place.slug}`}>
            <Button variant="ghost" className="text-slate-700">
              Ver más detalles
            </Button>
          </Link>

          {typeof place.lat === "number" && typeof place.lng === "number" ? (
            <a
              href={googleMapsDirectionsUrl(place.lat, place.lng)}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="ghost">Cómo llegar</Button>
            </a>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
