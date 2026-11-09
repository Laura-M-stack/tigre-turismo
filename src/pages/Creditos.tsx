import { useEffect } from "react";

import Photo, { PhotoCredit } from "../components/ui/Photo";
import { allPhotos } from "../lib/photos";
import { setSEO } from "../lib/seo";

export default function Creditos() {
  useEffect(() => setSEO("Créditos de fotos", "Autoría y licencias de las fotos usadas en la guía."), []);
  const photos = allPhotos();

  return (
    <div className="page-container py-12">
      <p className="text-sm font-medium uppercase tracking-[0.14em] text-brick-600">Créditos</p>
      <h1 className="mt-3 text-4xl">Fotos y licencias</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        La foto de portada es de Laura Moyano. El resto proviene de Wikimedia Commons, publicadas por sus
        autores con licencias libres. Cada foto enlaza a su página original, donde está la licencia completa.
        Cuando no hay una foto libre del lugar exacto, la guía muestra un panel sin foto en vez de usar una
        imagen de otro sitio.
      </p>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {photos.map((p) => (
          <li key={p.key} className="overflow-hidden rounded-2xl bg-white ring-1 ring-ink/10">
            <Photo photoKey={p.key} alt="" sizes="300px" className="aspect-[4/3]" />
            <p className="p-3 text-xs text-ink-soft">
              <PhotoCredit photo={p} />
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
