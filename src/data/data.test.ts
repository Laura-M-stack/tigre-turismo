import { describe, expect, it } from "vitest";

import { cleanAuthor, getPhoto } from "../lib/photos";

import photos from "./photos.json";
import { places } from "./places";

describe("datos de lugares", () => {
  it("slugs únicos", () => {
    const slugs = places.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("toda clave de foto existe en photos.json", () => {
    const keys = new Set(Object.keys(photos));
    const missing = places.flatMap((p) => p.photos.filter((k) => !keys.has(k)).map((k) => `${p.slug}:${k}`));
    expect(missing).toEqual([]);
  });

  it("coordenadas dentro del partido de Tigre", () => {
    const out = places.filter(
      (p) => p.lat !== undefined && (p.lat < -34.5 || p.lat > -34.2 || p.lng! < -58.75 || p.lng! > -58.4),
    );
    expect(out.map((p) => p.slug)).toEqual([]);
  });

  it("las fotos de Commons generan srcset y enlace a la página del archivo", () => {
    const ph = getPhoto("parque-de-la-costa")!;
    expect(ph.srcSet).toContain("Special:FilePath/Monta%C3%B1as_rusas_en_el_Parque_de_la_Costa.jpg?width=500 500w");
    expect(ph.sourceUrl).toBe(
      "https://commons.wikimedia.org/wiki/File:Monta%C3%B1as_rusas_en_el_Parque_de_la_Costa.jpg",
    );
    expect(getPhoto("no-existe")).toBeNull();
  });

  it("limpia autores que vienen como URL de Flickr", () => {
    expect(cleanAuthor("https://www.flickr.com/people/zanaguara/")).toBe("zanaguara (Flickr)");
    expect(cleanAuthor("Aleksandrs Timofejev…")).toBe("Aleksandrs Timofejev");
    expect(cleanAuthor(null)).toBeNull();
  });
});
