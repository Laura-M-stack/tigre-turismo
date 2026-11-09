export type Category =
  | "naturaleza"
  | "paseos"
  | "museos"
  | "gastronomia"
  | "aventura"
  | "relax"
  | "entretenimiento"
  | "cultura";

export type Budget = "gratis" | "bajo" | "medio" | "alto";

export type Duration =
  | "1-2h"
  | "medio-dia"
  | "dia-completo";

export type LocationType =
  | "entrance"
  | "area";

export type PlaceTip = {
  id: string;
  title: string;
  description: string;
};

export type Place = {
  slug: string;
  name: string;

  category: Category;

  shortDescription: string;
  longDescription: string[];

  duration: Duration;
  budget: Budget;

  zone?: string;
  tags: string[];

  address?: string;
  website?: string;

  tips: PlaceTip[];

  lat?: number;
  lng?: number;
  locationType?: LocationType;

  /** Claves de src/data/photos.json. La primera es la portada; [] = sin foto con licencia. */
  photos: string[];
};
