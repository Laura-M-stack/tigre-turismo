import catalog from "../data/photos.json";

type CatalogEntry = {
  file?: string | null;
  local?: string;
  category?: string;
  author: string | null;
  license: string | null;
  licenseUrl: string | null;
};

export type Photo = {
  key: string;
  src: string;
  srcSet?: string;
  /** Solo para fotos locales: versión WebP generada con tools/webp. */
  webpSrc?: string;
  author: string | null;
  license: string | null;
  licenseUrl: string | null;
  /** Página de origen (archivo en Commons). null para fotos propias. */
  sourceUrl: string | null;
};

const PHOTOS = catalog as Record<string, CatalogEntry>;

/** Anchos estándar que Wikimedia cachea en su CDN. */
export const COMMONS_WIDTHS = [500, 960, 1280, 1920] as const;

function commonsSlug(file: string) {
  return encodeURIComponent(file.replace(/ /g, "_"));
}

export function commonsImageUrl(file: string, width: number) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${commonsSlug(file)}?width=${width}`;
}

export function commonsPageUrl(file: string) {
  return `https://commons.wikimedia.org/wiki/File:${commonsSlug(file)}`;
}

function baseUrl() {
  return import.meta.env?.BASE_URL ?? "/";
}

export function getPhoto(key: string | undefined | null): Photo | null {
  if (!key) return null;
  const entry = PHOTOS[key];
  if (!entry) return null;

  const credit = {
    author: entry.author,
    license: entry.license,
    licenseUrl: entry.licenseUrl,
  };

  if (entry.local) {
    const src = `${baseUrl()}${entry.local}`;
    const webpSrc = `${baseUrl()}${entry.local.replace(/^images\//, "images/webp/").replace(/\.(jpe?g|png)$/i, ".webp")}`;
    return { key, src, webpSrc, sourceUrl: null, ...credit };
  }

  if (!entry.file) return null;

  return {
    key,
    src: commonsImageUrl(entry.file, 1280),
    srcSet: COMMONS_WIDTHS.map((w) => `${commonsImageUrl(entry.file!, w)} ${w}w`).join(", "),
    sourceUrl: commonsPageUrl(entry.file),
    ...credit,
  };
}

export function allPhotos(): Photo[] {
  return Object.keys(PHOTOS)
    .map((k) => getPhoto(k))
    .filter((p): p is Photo => p !== null);
}

/** Commons a veces trae como autor la URL del perfil de Flickr: la mostramos como "usuario (Flickr)". */
export function cleanAuthor(author: string | null) {
  if (!author) return null;
  const flickr = author.match(/flickr\.com\/(?:people|photos)\/([^/\s]+)/i);
  if (flickr) return `${decodeURIComponent(flickr[1])} (Flickr)`;
  return author.replace(/[…\s]+$/u, "").trim() || null;
}

/** "Foto: Autor · CC BY-SA 3.0" (sin enlaces; el componente decide cómo enlazar). */
export function creditText(photo: Photo) {
  const author = cleanAuthor(photo.author);
  const parts = [author ? `Foto: ${author}` : "Foto: Wikimedia Commons"];
  if (photo.license) parts.push(photo.license);
  return parts.join(" · ");
}
