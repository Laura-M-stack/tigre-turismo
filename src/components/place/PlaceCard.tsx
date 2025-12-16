import { Link } from "react-router-dom";

import type { Place } from "../../types/place";
import Card from "../ui/Card";
import Tag from "../ui/Tag";

export default function PlaceCard({ place }: { place: Place }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">
            <Link className="hover:underline" to={`/lugares/${place.slug}`}>
              {place.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-slate-600">{place.shortDescription}</p>
        </div>
        <Tag>{place.duration}</Tag>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Tag>{place.category}</Tag>
        <Tag>{place.budget}</Tag>
        {place.zone ? <Tag>{place.zone}</Tag> : null}
      </div>
    </Card>
  );
}
